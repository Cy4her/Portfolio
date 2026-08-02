"use strict";

/*
  This file does not render the models itself.
  Google Model Viewer performs the rendering.

  This code only:
  1. Confirms that Model Viewer loaded.
  2. Displays success or error messages.
  3. Logs the exact failing model path in the browser console.
*/

document.addEventListener("DOMContentLoaded", async () => {
  const viewers = document.querySelectorAll(".interactive-model");

  if (viewers.length === 0) {
    console.warn("No model-viewer elements were found.");
    return;
  }

  try {
    /*
      Wait until the browser has registered the <model-viewer>
      custom web component.
    */
    await customElements.whenDefined("model-viewer");

    console.log("Google Model Viewer is ready.");
  } catch (error) {
    console.error("Model Viewer could not initialize:", error);
  }

  viewers.forEach((viewer) => {
    const card = viewer.closest(".model-card");
    const status = card?.querySelector(".model-status");

    const modelName =
      viewer.dataset.name ||
      viewer.getAttribute("alt") ||
      "3D model";

    const modelSource = viewer.getAttribute("src");

    if (!status) {
      console.warn("Status element missing for:", modelName);
      return;
    }

    viewer.addEventListener("load", () => {
      status.textContent = `${modelName} loaded successfully`;
      status.classList.remove("error");
      status.classList.add("loaded");

      console.log(`Loaded ${modelName}:`, modelSource);
    });

    viewer.addEventListener("error", (event) => {
      status.textContent =
        `${modelName} could not load. Check its file name and path.`;

      status.classList.remove("loaded");
      status.classList.add("error");

      console.error(`Failed to load ${modelName}:`, {
        source: modelSource,
        eventType: event.detail?.type || "unknown error",
        event
      });
    });
  });
});