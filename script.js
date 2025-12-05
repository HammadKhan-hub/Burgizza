// === INIT ===
emailjs.init("MEacSC-yAyA641Gxt");

// === CART LOGIC ===
let cart = JSON.parse(localStorage.getItem('burgizza-cart')) || [];

// Menu data (sync with HTML)
const menuItemData = [
  { id: 'burger-1', name: 'Truffle Beef Burger', price: 2499 },
  { id: 'burger-2', name: 'Lobster Burger', price: 3299 },
  { id: 'pizza-1', name: 'Truffle Margherita', price: 2699 },
  { id: 'pizza-2', name: 'Wild Mushroom Pizza', price: 2899 },
  { id: 'side-1', name: 'Black Truffle Fries', price: 1299 },
  { id: 'side-2', name: 'Wagyu Beef Tartare', price: 1899 }
];

// Click menu item to add to cart
document.querySelectorAll('.menu-item').forEach((item, i) => {
  item.addEventListener('click', () => {
    const data = menuItemData[i];
    if (data) {
      cart.push({ ...data, quantity: 1 });
      localStorage.setItem('burgizza-cart', JSON.stringify(cart));
      updateCartCount();
      alert(`${data.name} added to cart!`);
    }
  });
});

function updateCartCount() {
  const count = cart.reduce((s, i) => s + (i.quantity || 1), 0);
  document.getElementById('burgizza-cart-count').textContent = count;
}
updateCartCount();

// Open cart
document.getElementById('burgizza-cart-btn').addEventListener('click', () => {
  renderCart();
  document.getElementById('cart-sidebar').classList.add('active');
  document.getElementById('cart-overlay').classList.add('active');
});

// Close cart
document.getElementById('close-cart').addEventListener('click', () => {
  document.getElementById('cart-sidebar').classList.remove('active');
  document.getElementById('cart-overlay').classList.remove('active');
});
document.getElementById('cart-overlay').addEventListener('click', () => {
  document.getElementById('cart-sidebar').classList.remove('active');
  document.getElementById('cart-overlay').classList.remove('active');
});

// Render cart
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
    // ✅ INCLUDE THE REMOVE BUTTON HERE
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
// Handle item removal from cart
document.getElementById('cart-items').addEventListener('click', function(e) {
  if (e.target.classList.contains('remove')) {
    const index = parseInt(e.target.getAttribute('data-index'));
    cart.splice(index, 1);
    localStorage.setItem('burgizza-cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
  }
});

// WhatsApp Checkout
document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) return alert('Cart is empty!');
  let text = 'Hi, I want to place an order:\n\n';
  let total = 0;
  cart.forEach(i => {
    const t = i.price * i.quantity;
    text += `- ${i.name} ×${i.quantity} = ₨${t}\n`;
    total += t;
  });
  text += `\nTotal: ₨${total}\n\nI will pay via EasyPaisa/JazzCash. Please confirm.`;
  const wa = '923001234567'; // 👈 REPLACE WITH YOUR NUMBER
  window.open(`https://wa.me/${wa}?text=${encodeURIComponent(text)}`, '_blank');
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

// Slider, scroll, menu, etc.
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

window.addEventListener('scroll', () => {
  document.querySelector('header').classList.toggle('scrolled', window.scrollY > 100);
});

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

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

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

document.getElementById('contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you! We’ll contact you soon to confirm your reservation.');
  e.target.reset();
});

// === CHAT WIDGET ===
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

// WhatsApp Order
function orderWhatsApp() {
  const phone = "923001234567"; // 👈 REPLACE
  const text = encodeURIComponent("Hi, I want to order from Burgizza 🍔");
  window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
}

// Book Table (with EmailJS + WhatsApp)
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

  // Email customer
  emailjs.send("service_m5iejij", "template_agyzcvp", {
    customer_name: name, customer_email: email, guests, date, time, phone,
    special_requests: special || "None", message: msg
  });

  // WhatsApp confirmation
  const waText = encodeURIComponent(`Hi ${name}! Your table is confirmed for ${guests} at ${time} 🍔`);
  window.open(`https://wa.me/${phone.replace(/\D/g,'')}?text=${waText}`, "_blank");

  addMessage("Burgizza AI", msg);
}