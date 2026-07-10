document.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
    document.body.classList.add("loaded");
  });

  const navbar = document.querySelector(".navbar");

  if (navbar) {
    const toggle = document.createElement("button");
    toggle.className = "menu-toggle";
    toggle.setAttribute("aria-label", "Open navigation menu");
    toggle.innerHTML = "<span></span><span></span><span></span>";

    navbar.appendChild(toggle);

    toggle.addEventListener("click", () => {
      navbar.classList.toggle("menu-open");
      document.body.classList.toggle("menu-open");
    });
  }

  const FADE_DURATION = 350;

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

        if (navbar) {
          navbar.classList.remove("menu-open");
          document.body.classList.remove("menu-open");
        }

        document.body.classList.remove("loaded");

        setTimeout(() => {
          window.location.href = href;
        }, FADE_DURATION);
      });
    }
  });
});