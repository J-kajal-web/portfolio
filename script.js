document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const sidebar = document.getElementById("sidebar");
  const mobileToggle = document.getElementById("mobile-nav-toggle");
  const sidebarBackdrop = document.getElementById("sidebar-backdrop");
  const navLinks = document.querySelectorAll(".nav-link-custom");
  const sections = document.querySelectorAll("section[id]");

  function toggleSidebar() {
    body.classList.toggle("sidebar-open");
  }

  function closeSidebar() {
    body.classList.remove("sidebar-open");
  }

  mobileToggle.addEventListener("click", toggleSidebar);
  sidebarBackdrop.addEventListener("click", closeSidebar);

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992) {
        closeSidebar();
      }
    });
  });

  function setActiveNav() {
    let currentSection = "hero";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 180;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
    });
  }

  window.addEventListener("scroll", setActiveNav);
  setActiveNav();

  const typingTarget = document.getElementById("typed-text");
  const roles = [
    "Web Developer",
    "Frontend Enthusiast",
    "UI Designer",
    "Problem Solver"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentRole = roles[roleIndex];
    let speed = 115;

    if (!isDeleting) {
      typingTarget.textContent = currentRole.substring(0, charIndex + 1);
      charIndex += 1;

      if (charIndex === currentRole.length) {
        isDeleting = true;
        speed = 1350;
      }
    } else {
      typingTarget.textContent = currentRole.substring(0, charIndex - 1);
      charIndex -= 1;
      speed = 65;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 250;
      }
    }

    window.setTimeout(typeEffect, speed);
  }

  typeEffect();

  const skillBars = document.querySelectorAll(".skill-progress-fill");
  const skillsSection = document.getElementById("skills");
  let skillsAnimated = false;

  const skillsObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !skillsAnimated) {
          skillsAnimated = true;
          skillBars.forEach((bar, index) => {
            const percent = bar.dataset.progress || "0";
            window.setTimeout(() => {
              bar.style.width = `${percent}%`;
            }, index * 120);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 }
  );

  skillsObserver.observe(skillsSection);

  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.dataset.filter;

      portfolioItems.forEach((item) => {
        const category = item.dataset.category;
        const shouldShow = filterValue === "all" || category === filterValue;
        item.classList.toggle("d-none", !shouldShow);
      });
    });
  });

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "Thanks for reaching out. I will reply soon.";
    contactForm.reset();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 992) {
      closeSidebar();
    }
  });
});
