const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const revealItems = document.querySelectorAll(".reveal");
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

function handleNavbarScroll() {
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > 12);
}

window.addEventListener("scroll", handleNavbarScroll);
handleNavbarScroll();

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navAnchors.forEach((anchor) => {
    anchor.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}

function setFieldState(field, message, isValid) {
  const wrapper = field.closest(".field");
  if (!wrapper) return;

  const feedback = wrapper.querySelector(".feedback");
  wrapper.classList.remove("error", "success");

  if (message) {
    wrapper.classList.add(isValid ? "success" : "error");
    feedback.textContent = message;
  } else {
    feedback.textContent = "";
  }
}

function validateName(value) {
  if (!value.trim()) return "Please enter your full name.";
  if (value.trim().length < 2) return "Name must be at least 2 characters.";
  return "";
}

function validateEmail(value) {
  if (!value.trim()) return "Please enter your email address.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(value.trim())) return "Please enter a valid email address.";
  return "";
}

function validateService(value) {
  if (!value) return "Please choose a shopping category.";
  return "";
}

function validateMessage(value) {
  if (!value.trim()) return "Please add your order notes.";
  if (value.trim().length < 20) return "Notes should be at least 20 characters.";
  return "";
}

function validateField(field) {
  const { id, value } = field;
  let error = "";

  if (id === "name") error = validateName(value);
  if (id === "email") error = validateEmail(value);
  if (id === "service") error = validateService(value);
  if (id === "message") error = validateMessage(value);

  if (error) {
    setFieldState(field, error, false);
    return false;
  }

  setFieldState(field, "Looks good.", true);
  return true;
}

if (form) {
  const trackedFields = Array.from(form.querySelectorAll("input, select, textarea"));

  trackedFields.forEach((field) => {
    field.addEventListener("input", () => validateField(field));
    field.addEventListener("blur", () => validateField(field));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const results = trackedFields.map((field) => validateField(field));
    const isFormValid = results.every(Boolean);

    formMessage.classList.remove("success");
    formMessage.textContent = "";

    if (!isFormValid) {
      formMessage.textContent = "Please fix the highlighted fields and try again.";
      const firstInvalid = trackedFields.find((field) => !validateField(field));
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    formMessage.classList.add("success");
    formMessage.textContent = "Thanks! Your request has been received. We will send your discount and size guidance soon.";
    form.reset();

    trackedFields.forEach((field) => {
      const wrapper = field.closest(".field");
      if (!wrapper) return;
      wrapper.classList.remove("success");
      const feedback = wrapper.querySelector(".feedback");
      feedback.textContent = "";
    });
  });
}
