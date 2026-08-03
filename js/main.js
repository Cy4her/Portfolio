"use strict";

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");

  const navbar = document.querySelector(".navbar");

  if (!navbar) {
    return;
  }

  let menuToggle = navbar.querySelector(".menu-toggle");
  const navigation = navbar.querySelector("nav");

  if (!navigation) {
    return;
  }

  /*
    Create the hamburger button automatically
    if it is not already present in the HTML.
  */
  if (!menuToggle) {
    menuToggle = document.createElement("button");

    menuToggle.className = "menu-toggle";
    menuToggle.type = "button";
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;

    navbar.appendChild(menuToggle);
  }

  function openMenu() {
    navbar.classList.add("menu-open");
    document.body.classList.add("menu-open");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
  }

  function closeMenu() {
    navbar.classList.remove("menu-open");
    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  function toggleMenu() {
    if (navbar.classList.contains("menu-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  menuToggle.addEventListener("click", toggleMenu);

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      navbar.classList.contains("menu-open")
    ) {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 850) {
      closeMenu();
    }
  });
});