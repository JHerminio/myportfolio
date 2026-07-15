document.addEventListener("DOMContentLoaded", () => {
  // --- HAMBURGER MENU TOGGLE ---
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileNavOverlay = document.getElementById("mobile-nav-overlay");
  const mobileNavItems = document.querySelectorAll(".mobile-nav-item");

  function toggleMenu() {
    hamburgerBtn.classList.toggle("open");
    mobileNavOverlay.classList.toggle("open");
    document.body.classList.toggle("no-scroll");
  }

  if (hamburgerBtn && mobileNavOverlay) {
    hamburgerBtn.addEventListener("click", toggleMenu);
  }

  // Close the sidebar menu immediately when clicking any link
  mobileNavItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (mobileNavOverlay.classList.contains("open")) {
        toggleMenu();
      }
    });
  });

  // --- SCROLL EFFECTS & SECTION SYNC ---
  const header = document.querySelector("header");
  const sections = document.querySelectorAll("section, div[id]");
  const navItems = document.querySelectorAll(".nav-item");
  const mNavItems = document.querySelectorAll(".mobile-nav-item");

  window.addEventListener("scroll", () => {
    // Toggle header solid color
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Highlight Active Link depending on current scrolling index
    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        currentSectionId = section.getAttribute("id");
      }
    });

    // Sync Desktop Nav Highlight
    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${currentSectionId}`) {
        item.classList.add("active");
      }
    });

    // Sync Mobile Drawer Nav Highlight
    mNavItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${currentSectionId}`) {
        item.classList.add("active");
      }
    });
  });

  // Let's Talk Nav Button Trigger Actions
  const handleTalkRedirect = () => {
    if (mobileNavOverlay.classList.contains("open")) toggleMenu();
    document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
  };

  document
    .getElementById("nav-talk-btn")
    ?.addEventListener("click", handleTalkRedirect);
  document
    .getElementById("mobile-talk-btn")
    ?.addEventListener("click", handleTalkRedirect);

  // --- MISC HANDLERS ---
  // Resume Download Trigger
  document.getElementById("about-resume-btn")?.addEventListener("click", () => {
    alert("Downloading Resume file update package...");
  });

  // Contact Form Submission Handling
  document
    .getElementById("contact-form-element")
    ?.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! Your portfolio message was successfully transmitted.");
      e.target.reset();
    });
});
