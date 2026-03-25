const features = [
  {
    icon: "zap",
    title: "Lightning Fast",
    desc: "Optimized performance that delivers sub-second load times across all devices and networks.",
  },
  {
    icon: "shield",
    title: "Enterprise Security",
    desc: "Bank-grade encryption and security protocols to keep your data safe at every layer.",
  },
  {
    icon: "bar-chart-3",
    title: "Advanced Analytics",
    desc: "Real-time insights and comprehensive dashboards to make data-driven decisions instantly.",
  },
  {
    icon: "layers",
    title: "Modular Design",
    desc: "Flexible architecture that scales with your needs. Add or remove features without friction.",
  },
  {
    icon: "globe",
    title: "Global CDN",
    desc: "Content delivery across 200+ edge locations, ensuring blazing speed worldwide.",
  },
  {
    icon: "cpu",
    title: "AI-Powered",
    desc: "Machine learning integrations that automate workflows and surface intelligent recommendations.",
  },
];

const stats = [
  { icon: "users", value: 10000, suffix: "+", label: "Active Users" },
  { icon: "code", value: 500, suffix: "+", label: "Projects Shipped" },
  { icon: "globe", value: 99.9, suffix: "%", label: "Uptime SLA" },
  { icon: "award", value: 50, suffix: "+", label: "Awards Won" },
];

const testimonials = [
  {
    stars: 5,
    quote:
      "NovaX completely transformed how we approach design. The speed and quality are unmatched - we shipped 3x faster.",
    name: "Sarah Chen",
    role: "CTO, Lumitech",
    initials: "SC",
  },
  {
    stars: 5,
    quote:
      "The attention to detail is extraordinary. Every component feels premium, and the performance is blazing fast.",
    name: "Marcus Johnson",
    role: "Lead Engineer, Craftware",
    initials: "MJ",
  },
  {
    stars: 5,
    quote:
      "Their AI integrations saved us hundreds of hours. The analytics dashboard alone justified the entire investment.",
    name: "Aisha Patel",
    role: "VP Product, DataForge",
    initials: "AP",
  },
  {
    stars: 5,
    quote:
      "I have never seen a more polished platform. The glassmorphism design language is absolutely stunning.",
    name: "Erik Lindstrom",
    role: "Creative Director, PixelFrame",
    initials: "EL",
  },
  {
    stars: 5,
    quote:
      "Support is incredible - every question answered within minutes. This is what enterprise-level service should look like.",
    name: "Diana Morales",
    role: "Founder, NexGen Studio",
    initials: "DM",
  },
  {
    stars: 4,
    quote:
      "We migrated our entire stack to NovaX in under two weeks. The developer experience is best-in-class.",
    name: "Tomasz Kowal",
    role: "Backend Lead, Synthwave",
    initials: "TK",
  },
];

function renderFeatures() {
  const grid = document.getElementById("featuresGrid");
  if (!grid) return;

  grid.innerHTML = features
    .map(
      (feature, index) => `
        <article class="features__card reveal" data-reveal-delay="${index * 0.08}s">
          <div class="features__icon"><i data-lucide="${feature.icon}"></i></div>
          <h3 class="features__title">${feature.title}</h3>
          <p class="features__desc">${feature.desc}</p>
        </article>
      `,
    )
    .join("");
}

function renderStats() {
  const grid = document.getElementById("statsGrid");
  if (!grid) return;

  grid.innerHTML = stats
    .map(
      (item, index) => `
        <article class="stats__card reveal" data-reveal-delay="${index * 0.1}s">
          <div class="stats__icon"><i data-lucide="${item.icon}"></i></div>
          <div class="stats__number" data-counter-target="${item.value}" data-counter-suffix="${item.suffix}">0${item.suffix}</div>
          <div class="stats__label">${item.label}</div>
        </article>
      `,
    )
    .join("");
}

function testimonialCardTemplate(item) {
  const stars = Array.from({ length: item.stars })
    .map(() => '<i data-lucide="star"></i>')
    .join("");

  return `
    <article class="testimonials__card">
      <div class="testimonials__stars">${stars}</div>
      <p class="testimonials__quote">${item.quote}</p>
      <div class="testimonials__author">
        <div class="testimonials__avatar">${item.initials}</div>
        <div class="testimonials__author-info">
          <h4>${item.name}</h4>
          <p>${item.role}</p>
        </div>
      </div>
    </article>
  `;
}

function renderTestimonials() {
  const rowOne = document.getElementById("testimonialsRowOne");
  const rowTwo = document.getElementById("testimonialsRowTwo");
  if (!rowOne || !rowTwo) return;

  const marqueeItems = [...testimonials, ...testimonials, ...testimonials];
  const markup = marqueeItems.map(testimonialCardTemplate).join("");
  rowOne.innerHTML = markup;
  rowTwo.innerHTML = markup;
}

function setFooterYear() {
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}

function setupNavbar() {
  const navbar = document.getElementById("navbar");
  const mobileToggle = document.getElementById("mobileToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = Array.from(document.querySelectorAll(".navbar__link[data-scroll]"));

  const closeMobileMenu = () => {
    if (!mobileToggle || !mobileMenu) return;
    mobileToggle.classList.remove("is-open");
    mobileMenu.classList.remove("is-open");
    mobileToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  };

  const openMobileMenu = () => {
    if (!mobileToggle || !mobileMenu) return;
    mobileToggle.classList.add("is-open");
    mobileMenu.classList.add("is-open");
    mobileToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll");
  };

  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mobileMenu?.classList.contains("is-open");
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  const updateNavbarState = () => {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    }

    const sectionIds = ["hero", "features", "about", "stats", "testimonials", "contact"];
    let activeId = "hero";

    for (let index = sectionIds.length - 1; index >= 0; index -= 1) {
      const section = document.getElementById(sectionIds[index]);
      if (!section) continue;
      if (section.getBoundingClientRect().top <= 120) {
        activeId = sectionIds[index];
        break;
      }
    }

    navLinks.forEach((link) => {
      const target = link.getAttribute("data-scroll")?.replace("#", "") || "";
      link.classList.toggle("is-active", target === activeId);
    });
  };

  window.addEventListener("scroll", updateNavbarState, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!mobileMenu || !mobileToggle) return;
    if (!mobileMenu.classList.contains("is-open")) return;

    const target = event.target;
    if (!(target instanceof Node)) return;

    if (!mobileMenu.contains(target) && !mobileToggle.contains(target)) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });

  document.querySelectorAll("[data-scroll]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      const element = event.currentTarget;
      if (!(element instanceof HTMLElement)) return;
      const selector = element.getAttribute("data-scroll");
      if (!selector || selector === "#") return;

      const targetSection = document.querySelector(selector);
      if (!targetSection) return;

      event.preventDefault();
      targetSection.scrollIntoView({ behavior: "smooth" });
      closeMobileMenu();
    });
  });

  updateNavbarState();
}

function setupRevealAnimations() {
  const revealElements = Array.from(document.querySelectorAll(".reveal"));
  revealElements.forEach((element) => {
    const delay = element.getAttribute("data-reveal-delay");
    if (delay) {
      element.style.transitionDelay = delay;
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px",
    },
  );

  revealElements.forEach((element) => observer.observe(element));
}

function setupFeatureTilt() {
  const cards = Array.from(document.querySelectorAll(".features__card"));

  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = event.clientX - bounds.left - bounds.width / 2;
      const y = event.clientY - bounds.top - bounds.height / 2;

      const rotateX = (-y / bounds.height) * 12;
      const rotateY = (x / bounds.width) * 12;

      card.style.setProperty("--rx", `${rotateX}deg`);
      card.style.setProperty("--ry", `${rotateY}deg`);
      card.classList.add("is-tilting");
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
      card.classList.remove("is-tilting");
    });
  });
}

function setupCounters() {
  const counterElements = Array.from(document.querySelectorAll("[data-counter-target]"));
  if (counterElements.length === 0) return;

  const activeTimers = new Map();

  const animateCounter = (element) => {
    const target = Number.parseFloat(element.getAttribute("data-counter-target") || "0");
    const suffix = element.getAttribute("data-counter-suffix") || "";

    if (Number.isNaN(target)) return;

    if (activeTimers.has(element)) {
      clearInterval(activeTimers.get(element));
    }

    const duration = 2000;
    const totalSteps = 60;
    const increment = target / totalSteps;
    let step = 0;

    const timer = setInterval(() => {
      step += 1;
      const current = Math.min(target, increment * step);

      const formatted = Number.isInteger(target)
        ? Math.round(current).toLocaleString()
        : current.toFixed(1);

      element.textContent = `${formatted}${suffix}`;

      if (step >= totalSteps) {
        clearInterval(timer);
        activeTimers.delete(element);
      }
    }, duration / totalSteps);

    activeTimers.set(element, timer);
  };

  const resetCounter = (element) => {
    if (activeTimers.has(element)) {
      clearInterval(activeTimers.get(element));
      activeTimers.delete(element);
    }

    const suffix = element.getAttribute("data-counter-suffix") || "";
    const target = Number.parseFloat(element.getAttribute("data-counter-target") || "0");
    const startValue = Number.isInteger(target) ? "0" : "0.0";
    element.textContent = `${startValue}${suffix}`;
  };

  const statsSection = document.getElementById("stats");
  if (!statsSection) return;

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counterElements.forEach((element) => animateCounter(element));
        } else {
          counterElements.forEach((element) => resetCounter(element));
        }
      });
    },
    {
      threshold: 0.25,
      rootMargin: "0px 0px -100px 0px",
    },
  );

  sectionObserver.observe(statsSection);
}

function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

function boot() {
  renderFeatures();
  renderStats();
  renderTestimonials();
  setFooterYear();

  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }

  setupNavbar();
  setupRevealAnimations();
  setupFeatureTilt();
  setupCounters();
  setupContactForm();

  window.requestAnimationFrame(() => {
    document.body.classList.add("loaded");
  });
}

document.addEventListener("DOMContentLoaded", boot);
