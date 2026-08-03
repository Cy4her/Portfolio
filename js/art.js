"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const artworkButtons = Array.from(
    document.querySelectorAll(".art-piece[data-image]")
  );

  const lightbox = document.getElementById("art-lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxCategory = document.getElementById("lightbox-category");
  const lightboxCounter = document.getElementById("lightbox-counter");

  const previousButton = document.getElementById("previous-artwork");
  const nextButton = document.getElementById("next-artwork");

  const closeButtons = document.querySelectorAll(
    "[data-close-lightbox]"
  );

  const mobileQuery = window.matchMedia("(max-width: 650px)");

  let currentArtworkIndex = 0;
  let selectedArtwork = null;
  let lastFocusedElement = null;

  if (
    artworkButtons.length === 0 ||
    !lightbox ||
    !lightboxImage ||
    !lightboxTitle ||
    !lightboxCategory
  ) {
    console.warn("Artwork gallery or lightbox elements are missing.");
    return;
  }

  function showArtwork(index) {
    const normalizedIndex =
      (index + artworkButtons.length) % artworkButtons.length;

    const artwork = artworkButtons[normalizedIndex];

    currentArtworkIndex = normalizedIndex;

    const imagePath = artwork.dataset.image;
    const title = artwork.dataset.title || "Artwork";
    const category = artwork.dataset.category || "Art";

    lightboxImage.src = imagePath;
    lightboxImage.alt = title;

    lightboxTitle.textContent = title;
    lightboxCategory.textContent = category;

    if (lightboxCounter) {
      lightboxCounter.textContent =
        `${normalizedIndex + 1} / ${artworkButtons.length}`;
    }
  }

  function clearSelection() {
    artworkButtons.forEach((button) => {
      button.classList.remove("is-selected");
    });

    selectedArtwork = null;
  }

  function openLightbox(index, triggerElement) {
    lastFocusedElement = triggerElement;

    clearSelection();
    showArtwork(index);

    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");

    lightbox.querySelector(".lightbox-close")?.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");

    lightboxImage.src = "";

    lastFocusedElement?.focus();
  }

  function showPreviousArtwork() {
    showArtwork(currentArtworkIndex - 1);
  }

  function showNextArtwork() {
    showArtwork(currentArtworkIndex + 1);
  }

  artworkButtons.forEach((button, index) => {
    button.addEventListener("click", (event) => {
      /*
        Desktop:
        Clicking opens the lightbox immediately.
      */
      if (!mobileQuery.matches) {
        openLightbox(index, button);
        return;
      }

      /*
        Mobile:
        First tap selects the image and shows its overlay.
        Second tap opens the full image.
      */
      if (selectedArtwork !== button) {
        event.preventDefault();

        clearSelection();

        button.classList.add("is-selected");
        selectedArtwork = button;

        return;
      }

      openLightbox(index, button);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeLightbox);
  });

  previousButton?.addEventListener(
    "click",
    showPreviousArtwork
  );

  nextButton?.addEventListener(
    "click",
    showNextArtwork
  );

  document.addEventListener("click", (event) => {
    if (!mobileQuery.matches || !selectedArtwork) {
      return;
    }

    const clickedArtwork = event.target.closest(".art-piece");

    if (!clickedArtwork) {
      clearSelection();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      showPreviousArtwork();
    }

    if (event.key === "ArrowRight") {
      showNextArtwork();
    }
  });

  mobileQuery.addEventListener("change", clearSelection);
});