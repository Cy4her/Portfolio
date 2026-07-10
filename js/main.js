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

  document.querySelectorAll(".navbar nav a").forEach((link) => {
    link.addEventListener("click", () => {
      navbar?.classList.remove("menu-open");
      document.body.classList.remove("menu-open");
    });
  });

  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");

    if (
      href &&
      !href.startsWith("#") &&
      !href.startsWith("mailto:") &&
      !href.startsWith("http") &&
      !href.includes(".pdf") &&
      link.target !== "_blank"
    ) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        document.body.classList.remove("loaded");

        setTimeout(() => {
          window.location.href = href;
        }, 300);
      });
    }
  });
});