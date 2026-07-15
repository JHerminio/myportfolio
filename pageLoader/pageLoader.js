// 1. Get the loader element as soon as the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("page-loader");

  // 2. Listen for the full page load on the window independently
  window.addEventListener("load", function handleLoad() {
    // Remove the listener so it doesn't linger
    window.removeEventListener("load", handleLoad);

    // Fade out or hide the loader
    setTimeout(() => {
      if (loader) {
        loader.style.display = "none";
      }
    }, 300);
  });
});
