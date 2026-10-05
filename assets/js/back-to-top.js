document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("back-to-top");
  if (!button) return;
  const update = () => {
    button.hidden = window.scrollY < 600;
  };
  window.addEventListener("scroll", update, { passive: true });
  button.addEventListener("click", () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
    document.getElementById("main-content")?.focus({ preventScroll: true });
  });
  update();
});
