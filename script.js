// === INIT ===
emailjs.init("MEacSC-yAyA641Gxt");

// === CART ===
let cart = JSON.parse(localStorage.getItem('burgizza-cart')) || [];

const menuItemData = {
  'burger-1': { id: 'burger-1', name: 'Beef Burger', price: 2499 },
  'burger-2': { id: 'burger-2', name: 'Lobster Burger', price: 3299 },
  'pizza-1': { id: 'pizza-1', name: 'Truffle Margherita', price: 2699 },
  'pizza-2': { id: 'pizza-2', name: 'Wild Mushroom Pizza', price: 2899 },
  'side-1': { id: 'side-1', name: 'Black Truffle Fries', price: 1299 },
  'side-2': { id: 'side-2', name: 'Wagyu Beef Tartare', price: 1899 }
};

// Add to cart via button
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const id = btn.dataset.id;
    const item = menuItemData[id];
    if (item) {
      cart.push({ ...item, quantity: 1 });
      localStorage.setItem('burgizza-cart', JSON.stringify(cart));
      updateCartCount();
      alert(`${item.name} added to cart!`);
    }
  });
});

function updateCartCount() {
  const count = cart.reduce((s, i) => s + (i.quantity || 1), 0);
  document.getElementById('burgizza-cart-count').textContent = count || '';
}
updateCartCount();

// Cart UI
document.getElementById('burgizza-cart-btn').addEventListener('click', () => {
  renderCart();
  document.getElementById('cart-sidebar').classList.add('active');
  document.getElementById('cart-overlay').classList.add('active');
});
document.getElementById('close-cart').addEventListener('click', closeCart);
document.getElementById('cart-overlay').addEventListener('click', closeCart);
function closeCart() {
  document.getElementById('cart-sidebar').classList.remove('active');
  document.getElementById('cart-overlay').classList.remove('active');
}

function renderCart() {
  const items = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  if (cart.length === 0) {
    items.innerHTML = '<p>Your cart is empty.</p>';
    totalEl.textContent = '0';
    return;
  }
  items.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div><strong>${item.name}</strong> × ${item.quantity}</div>
      <div>
        ₨${itemTotal.toLocaleString()}
        <span class="remove" data-index="${index}">×</span>
      </div>
    `;
    items.appendChild(div);
  });
  totalEl.textContent = total.toLocaleString();
}

document.getElementById('cart-items').addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    const index = parseInt(e.target.getAttribute('data-index'));
    cart.splice(index, 1);
    localStorage.setItem('burgizza-cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
  }
});

// WhatsApp Checkout — ✅ NO SPACE
document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) return alert('Cart is empty!');
  let text = 'Hi, I want to place an order:\n';
  let total = 0;
  cart.forEach(i => {
    const t = i.price * i.quantity;
    text += `- ${i.name} ×${i.quantity} = ₨${t}\n`;
    total += t;
  });
  text += `\nTotal: ₨${total}\nI will pay via EasyPaisa/JazzCash. Please confirm.`;
  const wa = '923001234567';
  window.open(`https://wa.me/${wa}?text=${encodeURIComponent(text)}`, '_blank');
});

// === TESTIMONIAL CAROUSEL (Mobile) ===
document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth > 767) return;
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const totalUnique = 3;
  let currentIndex = 0;
  for (let i = 0; i < totalUnique; i++) {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
  function goToSlide(index) {
    currentIndex = index;
    const offset = -(index * (100 / 3));
    track.style.transform = `translateX(${offset}%)`;
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
  let autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalUnique;
    goToSlide(currentIndex);
  }, 5000);
});

// === EXISTING BURGIZZA JS ===
mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-74.0066, 40.7135],
  zoom: 14
});
new mapboxgl.Marker()
  .setLngLat([-74.0066, 40.7135])
  .setPopup(new mapboxgl.Popup().setHTML('<h3>BURGIZZA</h3><p>123 Gourmet Avenue</p>'))
  .addTo(map);

// Slider
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
let currentSlide = 0;
const totalSlides = slides.length;
function showSlide(index) {
  slides.forEach(s => s.classList.remove('active'));
  indicators.forEach(i => i.classList.remove('active'));
  slides[index].classList.add('active');
  indicators[index].classList.add('active');
  currentSlide = index;
}
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}
let slideInterval = setInterval(nextSlide, 6000);
indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    clearInterval(slideInterval);
    showSlide(index);
    slideInterval = setInterval(nextSlide, 6000);
  });
});

// Scroll header
window.addEventListener('scroll', () => {
  document.querySelector('header').classList.toggle('scrolled', window.scrollY > 100);
});

// Mobile nav
const mobileToggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('nav');
mobileToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  mobileToggle.innerHTML = nav.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Scroll animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// Menu filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    menuItems.forEach(item => {
      item.style.display = (filter === 'all' || item.getAttribute('data-category') === filter) ? 'block' : 'none';
    });
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      nav.classList.remove('active');
      mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
});

// Contact form
document.getElementById('contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you! We’ll contact you soon to confirm your reservation.');
  e.target.reset();
});

// Chat widget
const chatBtn = document.getElementById("burgizza-chat-btn");
const chatBox = document.getElementById("burgizza-chat-box");
const messagesEl = document.getElementById("burgizza-chat-messages");
const inputEl = document.getElementById("burgizza-user-input");
const sendBtn = document.getElementById("burgizza-send-btn");
chatBtn.addEventListener("click", () => {
  chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
});
function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("burgizza-msg", sender === "You" ? "burgizza-user" : "burgizza-ai");
  msg.innerHTML = `<b>${sender}:</b> ${text}`;
  messagesEl.appendChild(msg);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}
function aiReply(userText) {
  let t = userText.toLowerCase();
  let r = t.includes("menu") ? "Our menu: Burgers, Pizzas, Fries, Drinks! 🍔🍕" :
      t.includes("deal") ? "Today's deal: Buy 1 Burger, Get 1 Free! 🎉" :
      (t.includes("reserve") || t.includes("table")) ? "Click 'Book a Table' to reserve!" :
      t.includes("order") ? "Click 'WhatsApp Order' to place your order!" :
      "Hi! Welcome to Burgizza 🍔🍕 How can I help?";
  addMessage("Burgizza AI", r);
}
function sendMessage() {
  const text = inputEl.value.trim();
  if (!text) return;
  addMessage("You", text);
  inputEl.value = "";
  setTimeout(() => aiReply(text), 700);
}
sendBtn.addEventListener("click", sendMessage);
inputEl.addEventListener("keypress", e => { if (e.key === "Enter") sendMessage(); });

// WhatsApp Order — ✅ NO SPACE
function orderWhatsApp() {
  const phone = "923001234567";
  const text = encodeURIComponent("Hi, I want to order from Burgizza 🍔");
  window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
}

// Book Table
async function bookTable() {
  const name = prompt("Your name?");
  const guests = prompt("Number of guests?");
  const date = prompt("Date (e.g., 05-12-2025)?");
  const time = prompt("Time?");
  const email = prompt("Email?");
  const phone = prompt("Phone (for WhatsApp)?");
  const special = prompt("Special requests? (Optional)");
  if (!name || !guests || !date || !time || !email || !phone) {
    alert("All fields required!");
    return;
  }
  const msg = `Hi ${name},\nYour table for ${guests} on ${date} at ${time} is confirmed! 🎉\nSpecial: ${special || "None"}\nThank you, Burgizza`;
  alert(msg);
  emailjs.send("service_m5iejij", "template_agyzcvp", {
    customer_name: name, customer_email: email, guests, date, time, phone,
    special_requests: special || "None", message: msg
  });
  const waText = encodeURIComponent(`Hi ${name}! Your table is confirmed for ${guests} at ${time} 🍔`);
  window.open(`https://wa.me/${phone.replace(/\D/g,'')}?text=${waText}`, "_blank");
  addMessage("Burgizza AI", msg);
}

