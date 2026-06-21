document.addEventListener("DOMContentLoaded", () => {
  // Trigger fade-in on load
  requestAnimationFrame(() => {
    document.body.classList.add("loaded");
  });

  const FADE_DURATION = 350; // ms, should be <= CSS transition time

  const links = document.querySelectorAll("a[href]");
  links.forEach((link) => {
    const href = link.getAttribute("href");

    if (
      href &&
      !href.startsWith("#") &&
      !href.startsWith("mailto:") &&
      !href.startsWith("http") &&
      link.target !== "_blank" &&
      !href.includes(".pdf")
    ) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        document.body.classList.remove("loaded");
        setTimeout(() => {
          window.location.href = href;
        }, FADE_DURATION);
      });
    }
  });
});
