const PRODUCTS = [
  {
    id: "run-01",
    name: "Velocity Runner",
    category: "Running",
    price: 89.99,
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "cas-01",
    name: "Metro Casual",
    category: "Lifestyle",
    price: 74.99,
    image: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "bas-01",
    name: "Classic Court",
    category: "Daily",
    price: 64.99,
    image: "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "pro-01",
    name: "Aero Sprint Pro",
    category: "Performance",
    price: 119.99,
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "hik-01",
    name: "Trail Hiker X",
    category: "Outdoor",
    price: 109.99,
    image: "https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "st-01",
    name: "Street Nova",
    category: "Streetwear",
    price: 79.99,
    image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "sne-01",
    name: "Urban Sneaker",
    category: "Casual",
    price: 69.99,
    image: "https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "air-01",
    name: "Air Glide",
    category: "Athletic",
    price: 129.99,
    image: "https://images.pexels.com/photos/2529146/pexels-photo-2529146.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

const CART_KEY = "shoeShopCart";
const THEME_KEY = "shoeShopTheme";
let revealObserver = null;

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "{}");
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getProductById(id) {
  return PRODUCTS.find((item) => item.id === id);
}

function addToCart(productId) {
  const cart = getCart();
  cart[productId] = (cart[productId] || 0) + 1;
  saveCart(cart);
  updateCartCount();
}

function changeQty(productId, amount) {
  const cart = getCart();
  if (!cart[productId]) return;
  cart[productId] += amount;
  if (cart[productId] <= 0) {
    delete cart[productId];
  }
  saveCart(cart);
  updateCartCount();
  renderCartPage();
}

function removeFromCart(productId) {
  const cart = getCart();
  delete cart[productId];
  saveCart(cart);
  updateCartCount();
  renderCartPage();
}

function getCartCount() {
  const cart = getCart();
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

function updateCartCount() {
  const count = getCartCount();
  document.querySelectorAll(".cart-count").forEach((el) => {
    el.textContent = count;
  });
}

function createProductCard(product) {
  return `
    <article class="product-card reveal">
      <img class="product-image" src="${product.image}" alt="${product.name}" />
      <div class="product-content">
        <p class="subtext">${product.category}</p>
        <h3>${product.name}</h3>
        <div class="product-meta">
          <span class="price">${formatPrice(product.price)}</span>
          <button class="btn add-to-cart" data-product-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    </article>
  `;
}

function renderFeaturedProducts() {
  const root = document.getElementById("featured-products");
  if (!root) return;
  root.innerHTML = PRODUCTS.slice(0, 4).map(createProductCard).join("");
}

function renderAllProducts() {
  const root = document.getElementById("all-products");
  if (!root) return;
  root.innerHTML = PRODUCTS.map(createProductCard).join("");
}

function renderCartPage() {
  const container = document.getElementById("cart-items");
  const summary = document.getElementById("cart-summary");
  const subtotalEl = document.getElementById("cart-subtotal");
  if (!container || !summary || !subtotalEl) return;

  const cart = getCart();
  const entries = Object.entries(cart);

  if (!entries.length) {
    container.innerHTML = `
      <div class="prose reveal">
        <h3>Your cart is empty</h3>
        <p>Add products from the shop page to start your order.</p>
        <a class="btn" href="products.html">Go to Products</a>
      </div>
    `;
    summary.classList.add("hidden");
    initRevealAnimations();
    return;
  }

  let subtotal = 0;
  container.innerHTML = entries
    .map(([id, qty]) => {
      const product = getProductById(id);
      if (!product) return "";
      const itemTotal = product.price * qty;
      subtotal += itemTotal;
      return `
        <article class="cart-item reveal">
          <img src="${product.image}" alt="${product.name}" />
          <div>
            <h3>${product.name}</h3>
            <p class="subtext">${product.category}</p>
            <p class="price">${formatPrice(itemTotal)}</p>
            <div class="qty-controls">
              <button class="qty-btn" data-action="decrease" data-product-id="${product.id}">-</button>
              <span>${qty}</span>
              <button class="qty-btn" data-action="increase" data-product-id="${product.id}">+</button>
              <button class="qty-btn" data-action="remove" data-product-id="${product.id}">x</button>
            </div>
          </div>
          <div><strong>${formatPrice(product.price)}</strong></div>
        </article>
      `;
    })
    .join("");

  subtotalEl.textContent = formatPrice(subtotal);
  summary.classList.remove("hidden");
  summary.classList.add("reveal");
  initRevealAnimations();
}

function applyTheme(theme) {
  const dark = theme === "dark";
  document.body.classList.toggle("dark", dark);
  document.querySelectorAll(".theme-toggle").forEach((button) => {
    button.textContent = dark ? "Light Mode" : "Dark Mode";
  });
}

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  applyTheme(savedTheme);

  document.querySelectorAll(".theme-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, nextTheme);
      applyTheme(nextTheme);
    });
  });
}

function closeMobileNav() {
  const nav = document.getElementById("primary-nav");
  const toggle = document.querySelector(".nav-toggle");
  if (!nav || !toggle) return;
  nav.classList.remove("open");
  toggle.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}

function initMobileNav() {
  const nav = document.getElementById("primary-nav");
  const toggle = document.querySelector(".nav-toggle");
  if (!nav || !toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 900px)").matches) {
        closeMobileNav();
      }
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (!window.matchMedia("(max-width: 900px)").matches) return;

    const insideNav = target.closest("#primary-nav");
    const insideToggle = target.closest(".nav-toggle");
    if (!insideNav && !insideToggle) {
      closeMobileNav();
    }
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 901px)").matches) {
      closeMobileNav();
    }
  });
}

function initRevealAnimations() {
  const revealTargets = document.querySelectorAll(
    ".hero-grid > *, .section h1, .section h2, .section .subtext, .product-card, .prose, .contact-form, .cart-item, .cart-summary"
  );

  if (!revealTargets.length) return;

  revealTargets.forEach((el, index) => {
    el.classList.add("reveal");
    const delay = Math.min(index * 45, 260);
    el.style.transitionDelay = `${delay}ms`;
  });

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
  }

  revealTargets.forEach((el) => {
    if (!el.classList.contains("is-visible")) {
      revealObserver.observe(el);
    }
  });
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.classList.contains("add-to-cart")) {
      const productId = target.dataset.productId;
      if (productId) {
        addToCart(productId);
        target.textContent = "Added";
        setTimeout(() => {
          target.textContent = "Add to Cart";
        }, 700);
      }
    }

    if (target.dataset.action === "increase") {
      changeQty(target.dataset.productId, 1);
    }
    if (target.dataset.action === "decrease") {
      changeQty(target.dataset.productId, -1);
    }
    if (target.dataset.action === "remove") {
      removeFromCart(target.dataset.productId);
    }
  });

  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      alert("Checkout complete. Thank you for your order.");
      localStorage.removeItem(CART_KEY);
      updateCartCount();
      renderCartPage();
    });
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("Message sent successfully. We will contact you soon.");
      contactForm.reset();
    });
  }
}

function initPage() {
  initTheme();
  initMobileNav();
  updateCartCount();
  renderFeaturedProducts();
  renderAllProducts();
  renderCartPage();
  bindEvents();
  initRevealAnimations();
}

document.addEventListener("DOMContentLoaded", initPage);
