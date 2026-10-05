document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.getElementById("site-navigation");
  if (!toggle || !navigation) return;
  const setExpanded = (expanded) => {
    toggle.setAttribute("aria-expanded", String(expanded));
    toggle.setAttribute("aria-label", expanded ? "メニューを閉じる" : "メニューを開く");
    navigation.dataset.expanded = String(expanded);
  };
  toggle.addEventListener("click", () => setExpanded(toggle.getAttribute("aria-expanded") !== "true"));
  navigation.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setExpanded(false);
      toggle.focus();
    }
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) setExpanded(false);
  });
});
