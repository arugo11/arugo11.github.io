// Initialize medium zoom.
$(document).ready(function () {
  if (typeof mediumZoom === "undefined") {
    return;
  }

  medium_zoom = mediumZoom("[data-zoomable]", {
    background: getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color") + "ee", // + 'ee' for trasparency.
  });
});
