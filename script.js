document.addEventListener("DOMContentLoaded", () => {
  // --- HAMBURGER MENU TOGGLE ---
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileNavOverlay = document.getElementById("mobile-nav-overlay");

  function closeMenu() {
    hamburgerBtn?.classList.remove("open");
    mobileNavOverlay?.classList.remove("open");
    document.body.classList.remove("no-scroll");
  }

  function toggleMenu() {
    hamburgerBtn?.classList.toggle("open");
    mobileNavOverlay?.classList.toggle("open");
    document.body.classList.toggle("no-scroll");
  }

  if (hamburgerBtn && mobileNavOverlay) {
    hamburgerBtn.addEventListener("click", toggleMenu);
  }

  // --- MOBILE DROPDOWN TOGGLE ---
  const dropdownBtn = document.querySelector(".mobile-dropdown-btn");
  const dropdownParent = document.querySelector(".mobile-dropdown");

  if (dropdownBtn && dropdownParent) {
    dropdownBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); // Stops dropdown toggle from closing overlay
      dropdownParent.classList.toggle("active");
    });
  }

  // --- UNIVERSAL MENU CLOSE DELEGATION ---
  // Using event delegation guarantees ALL <a> clicks close the drawer
  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener("click", (e) => {
      const targetLink = e.target.closest("a");

      // If clicked element is a link and NOT the "Projects" dropdown trigger
      if (targetLink && !targetLink.classList.contains("mobile-dropdown-btn")) {
        closeMenu();
      }
    });
  }

  // --- SCROLL EFFECTS & SECTION SYNC ---
  const header = document.querySelector("header");
  const sections = document.querySelectorAll("section, div[id]");
  const navItems = document.querySelectorAll(".nav-item");
  const mNavItems = document.querySelectorAll(".mobile-nav-item");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }

    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${currentSectionId}`) {
        item.classList.add("active");
      }
    });

    mNavItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${currentSectionId}`) {
        item.classList.add("active");
      }
    });
  });

  // --- LET'S TALK NAV TRIGGER ACTIONS ---
  const handleTalkRedirect = () => {
    closeMenu();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  document
    .getElementById("nav-talk-btn")
    ?.addEventListener("click", handleTalkRedirect);
  document
    .getElementById("mobile-talk-btn")
    ?.addEventListener("click", handleTalkRedirect);

  // --- MISC HANDLERS ---
  document.getElementById("about-resume-btn")?.addEventListener("click", () => {
    alert("Downloading Resume file update package...");
  });

  document
    .getElementById("contact-form-element")
    ?.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! Your portfolio message was successfully transmitted.");
      e.target.reset();
    });

  const columns = document.querySelectorAll(".column");
  columns.forEach((col) => {
    col.addEventListener("click", () => {
      const title = col.querySelector("h3")?.innerText;
      if (title) {
        console.log(`You selected the ${title} stage.`);
      }
    });
  });
});
