document.addEventListener("DOMContentLoaded", () => {
  const $ = (sel, root = document) => root.querySelector(sel);

  const subscribeForm = $("#subscribeForm");
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = $("#subscribeEmail")?.value?.trim();
      if (!email) return;
      alert("تم استلام بريدك ✅ " + email);
      subscribeForm.reset();
    });
  }

  const contactForm = $("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("تم إرسال رسالتك ✅ سنعاود التواصل معك قريباً.");
      contactForm.reset();
    });
  }

  const dots = document.querySelectorAll("#dots .dot");
  if (dots.length) {
    let idx = 0;
    setInterval(() => {
      dots.forEach((d) => d.classList.remove("active"));
      idx = (idx + 1) % dots.length;
      dots[idx].classList.add("active");
    }, 2400);
  }

  const fab = document.querySelector(".whatsapp-fab");
  if (!fab) return;

  const subscribeSection = document.querySelector(".subscribe");
  const footer = document.querySelector(".site-footer");
  const target = subscribeSection || footer;
  if (!target) return;

  let hideByTarget = false;
  let hideByBottom = false;

  const apply = () => {
    fab.classList.toggle("is-hidden", hideByTarget || hideByBottom);
  };

  const obs = new IntersectionObserver(
    ([entry]) => {
      hideByTarget = entry.isIntersecting;
      apply();
    },
    {
      threshold: 0,
      rootMargin: "0px 0px 0px 0px",
    }
  );

  obs.observe(target);

  const checkBottom = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    const vh = window.innerHeight || 0;
    const docH = document.documentElement.scrollHeight || 0;

    const distanceToBottom = docH - (scrollY + vh);
    hideByBottom = distanceToBottom < 160;
    apply();
  };

  window.addEventListener("scroll", checkBottom, { passive: true });
  window.addEventListener("resize", checkBottom);
  checkBottom();
});
