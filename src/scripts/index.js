document.addEventListener("DOMContentLoaded", () => {
  const loadScript = async (page) => {
    try {
      switch (page) {
        case "index":
          await import("./experiment_01.js");
          break;
        case "experiment-02":
          await import("./experiment_02.js");
          break;
        case "experiment-03":
          await import("./experiment_03.js");
          break;
        case "experiment-04":
          await import("./experiment_04.js");
          break;
        default:
          console.log(`No specific script found for the page: ${page}`);
      }
    } catch (error) {
      console.error(`Error loading script for ${page}:`, error);
    }
  };

  let currentPage = window.location.pathname
    .split("/")
    .pop()
    .replace(".html", "");

  if (!currentPage) {
    currentPage = "index";
  }

  loadScript(currentPage);

  infoToggle();
});

function infoToggle() {
  const infoToggler = document.getElementById("info-toggle");
  const infoWindow = document.getElementById("info-wrapper");
  infoToggler.addEventListener("click", () => {
    infoWindow.classList.toggle("is-visible");
  });
}
