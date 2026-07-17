document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");

  const navbar = document.querySelector(".navbar");

  if (navbar && !navbar.querySelector(".menu-toggle")) {
    const toggle = document.createElement("button");
    toggle.className = "menu-toggle";
    toggle.setAttribute("aria-label", "Toggle navigation");
    toggle.innerHTML = "<span></span><span></span><span></span>";
    navbar.appendChild(toggle);

    toggle.addEventListener("click", () => {
      navbar.classList.toggle("menu-open");
      document.body.classList.toggle("menu-open");
    });
  }

  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");

    const isNormalPageLink =
      href &&
      !href.startsWith("#") &&
      !href.startsWith("mailto:") &&
      !href.startsWith("http") &&
      !href.includes(".pdf") &&
      link.target !== "_blank";

    if (isNormalPageLink) {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        if (navbar) navbar.classList.remove("menu-open");
        document.body.classList.remove("menu-open");

        document.body.classList.remove("loaded");

        setTimeout(() => {
          window.location.href = href;
        }, 300);
      });
    }
  });
});

/* Fix blank page when using phone/browser back button */
window.addEventListener("pageshow", () => {
  document.body.classList.add("loaded");
  document.body.classList.remove("menu-open");

  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.classList.remove("menu-open");
  }
});