// CONFIGURACIÓN: reemplaza este número por el WhatsApp real del negocio.
// Formato internacional sin +, espacios ni guiones. Ejemplo: 51987654321
const STORE_WHATSAPP = "51987654321";
const STORE_NAME = "La Barra";

const products = [
  {id:1,name:"Pisco Quebranta 750 ml",category:"pisco",label:"PISCO",description:"Pisco peruano · Quebranta",price:42.90,emoji:"🍾",tag:"Favorito",tone:"#e8dfc8"},
  {id:2,name:"Pisco acholado 750 ml",category:"pisco",label:"PISCO",description:"Ideal para preparar chilcanos",price:49.90,emoji:"🥃",tag:"Peruano",tone:"#e9ddc5"},
  {id:3,name:"Vodka Smirnoff 750 ml",category:"pisco",label:"VODKA",description:"Clásico para compartir",price:49.90,emoji:"🍸",tag:"Popular",tone:"#dce5e1"},
  {id:4,name:"Ron Cartavio 5 años 750 ml",category:"whisky",label:"RON",description:"Ron añejado · Perú",price:39.90,emoji:"🥃",tag:"Clásico",tone:"#e9d8c5"},
  {id:5,name:"Ron Flor de Caña 7 años",category:"whisky",label:"RON",description:"Ron añejo · 750 ml",price:79.90,emoji:"🍹",tag:"Selección",tone:"#e9ddc8"},
  {id:6,name:"Whisky Johnnie Walker Red",category:"whisky",label:"WHISKY",description:"Whisky escocés · 750 ml",price:69.90,emoji:"🥃",tag:"Popular",tone:"#e6d8bd"},
  {id:7,name:"Whisky Old Parr 12 años",category:"whisky",label:"WHISKY",description:"Blended Scotch · 750 ml",price:139.90,emoji:"🥃",tag:"Premium",tone:"#ded7c6"},
  {id:8,name:"Gin Gordon's 750 ml",category:"pisco",label:"GIN",description:"London Dry Gin",price:69.90,emoji:"🍸",tag:"Para cócteles",tone:"#dce5db"},
  {id:9,name:"Vino Tacama Gran Tinto",category:"vino",label:"VINO TINTO",description:"Vino peruano · 750 ml",price:39.90,emoji:"🍷",tag:"Peruano",tone:"#e8d8d3"},
  {id:10,name:"Vino Intipalka Malbec",category:"vino",label:"VINO TINTO",description:"Malbec · 750 ml",price:49.90,emoji:"🍷",tag:"Recomendado",tone:"#e5d5d2"},
  {id:11,name:"Vino Santiago Queirolo Borgoña",category:"vino",label:"VINO",description:"Borgoña · 750 ml",price:29.90,emoji:"🍷",tag:"Clásico",tone:"#e9d9d4"},
  {id:12,name:"Vino blanco Tabernero",category:"vino",label:"VINO BLANCO",description:"Blanco semiseco · 750 ml",price:27.90,emoji:"🥂",tag:"Fresco",tone:"#e7e5d2"},
  {id:13,name:"Vino espumante Riccadonna",category:"vino",label:"ESPUMANTE",description:"Brut · 750 ml",price:59.90,emoji:"🍾",tag:"Para celebrar",tone:"#e8e0c9"},
  {id:14,name:"Cerveza Cusqueña Dorada 620 ml",category:"cerveza",label:"CERVEZA",description:"Botella · 620 ml",price:9.90,emoji:"🍺",tag:"Peruana",tone:"#e9dfc9"},
  {id:15,name:"Cerveza Pilsen Callao 630 ml",category:"cerveza",label:"CERVEZA",description:"Botella · 630 ml",price:8.50,emoji:"🍺",tag:"Popular",tone:"#e6dfc8"},
  {id:16,name:"Cerveza Cristal 650 ml",category:"cerveza",label:"CERVEZA",description:"Botella · 650 ml",price:7.90,emoji:"🍺",tag:"Clásica",tone:"#e7e0c9"},
  {id:17,name:"Cerveza Arequipeña 620 ml",category:"cerveza",label:"CERVEZA",description:"Botella · 620 ml",price:8.50,emoji:"🍺",tag:"Peruana",tone:"#e8dfc9"},
  {id:18,name:"Inca Kola 1.5 L",category:"bebidas",label:"GASEOSA",description:"La de sabor nacional",price:8.50,emoji:"🥤",tag:"Favorita",tone:"#e9dfc6"},
  {id:19,name:"Coca-Cola 1.5 L",category:"bebidas",label:"GASEOSA",description:"Botella familiar · 1.5 L",price:8.90,emoji:"🥤",tag:"Clásica",tone:"#e8d8d3"},
  {id:20,name:"Sprite 1.5 L",category:"bebidas",label:"GASEOSA",description:"Lima-limón · 1.5 L",price:7.90,emoji:"🥤",tag:"Refrescante",tone:"#dce5d7"},
  {id:21,name:"Agua San Luis sin gas 2.5 L",category:"bebidas",label:"AGUA",description:"Agua de mesa · 2.5 L",price:5.50,emoji:"💧",tag:"Esencial",tone:"#dce5e8"}
];

let cart = [];
const grid = document.getElementById("product-grid");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const cartItemsEl = document.getElementById("cart-items");
const toast = document.getElementById("toast");

const money = value => `S/ ${value.toFixed(2)}`;

function renderProducts(filter = "todos") {
  const visible = filter === "todos" ? products : products.filter(p => p.category === filter);
  grid.innerHTML = visible.map(p => `
    <article class="product-card">
      <div class="product-visual" style="background:${p.tone}">
        <span class="product-tag">${p.tag}</span>
        <span class="product-emoji" aria-hidden="true">${p.emoji}</span>
      </div>
      <div class="product-info">
        <div class="product-category">${p.label}</div>
        <h3>${p.name}</h3>
        <div class="product-description">${p.description}</div>
        <div class="product-bottom">
          <div class="product-price">${money(p.price)} <small>PEN</small></div>
          <button class="add-button" data-add="${p.id}" aria-label="Agregar ${p.name} al carrito">+</button>
        </div>
        <button class="quick-order" data-quick="${p.id}">PEDIR POR WHATSAPP ↗</button>
      </div>
    </article>`).join("");
}

function addToCart(id) {
  const item = cart.find(row => row.id === id);
  if (item) item.quantity += 1;
  else cart.push({id, quantity:1});
  renderCart();
  showToast("Producto agregado al carrito");
}

function changeQuantity(id, amount) {
  const item = cart.find(row => row.id === id);
  if (!item) return;
  item.quantity += amount;
  if (item.quantity <= 0) cart = cart.filter(row => row.id !== id);
  renderCart();
}

function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + product.price * item.quantity;
  }, 0);
  document.getElementById("cart-count").textContent = count;
  document.getElementById("drawer-count").textContent = `(${count})`;
  document.getElementById("cart-total").textContent = money(total);
  document.getElementById("checkout-button").disabled = count === 0;

  if (!cart.length) {
    cartItemsEl.innerHTML = `<div class="empty-cart"><span>＋</span><h3>Tu carrito está vacío</h3><p>Agrega tus bebidas favoritas para comenzar.</p></div>`;
    return;
  }
  cartItemsEl.innerHTML = cart.map(item => {
    const p = products.find(product => product.id === item.id);
    return `<div class="cart-item">
      <div class="cart-item-icon">${p.emoji}</div>
      <div><h4>${p.name}</h4><small>${money(p.price)} c/u</small>
        <div class="quantity-control">
          <button data-change="${p.id}" data-amount="-1" aria-label="Quitar una unidad">−</button>
          <span>${item.quantity}</span>
          <button data-change="${p.id}" data-amount="1" aria-label="Agregar una unidad">+</button>
        </div>
      </div>
      <div style="text-align:right"><strong style="font-size:11px">${money(p.price * item.quantity)}</strong><br>
        <button class="remove-item" data-remove="${p.id}">Quitar</button></div>
    </div>`;
  }).join("");
}

function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}
function whatsappUrl(message) {
  return `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`;
}
function quickOrder(id) {
  const p = products.find(product => product.id === id);
  const message = `Hola, ${STORE_NAME}. Quisiera pedir:\n• ${p.name} x 1 — ${money(p.price)}\n\n¿Tienen disponibilidad y cuánto cuesta el delivery a mi dirección?`;
  window.open(whatsappUrl(message), "_blank", "noopener");
}
function checkout() {
  if (!cart.length) return;
  const lines = cart.map(item => {
    const p = products.find(product => product.id === item.id);
    return `• ${p.name} x ${item.quantity} — ${money(p.price * item.quantity)}`;
  });
  const total = cart.reduce((sum, item) => sum + products.find(p => p.id === item.id).price * item.quantity, 0);
  const message = `Hola, ${STORE_NAME}. Quiero realizar este pedido:\n\n${lines.join("\n")}\n\n*Total referencial: ${money(total)}*\n\nMi dirección de entrega es:\n\n¿Me confirman disponibilidad, costo de delivery y medios de pago?`;
  window.open(whatsappUrl(message), "_blank", "noopener");
}

grid.addEventListener("click", event => {
  const add = event.target.closest("[data-add]");
  const quick = event.target.closest("[data-quick]");
  if (add) addToCart(Number(add.dataset.add));
  if (quick) quickOrder(Number(quick.dataset.quick));
});
cartItemsEl.addEventListener("click", event => {
  const change = event.target.closest("[data-change]");
  const remove = event.target.closest("[data-remove]");
  if (change) changeQuantity(Number(change.dataset.change), Number(change.dataset.amount));
  if (remove) {
    cart = cart.filter(item => item.id !== Number(remove.dataset.remove));
    renderCart();
  }
});
document.querySelector(".category-tabs").addEventListener("click", event => {
  const tab = event.target.closest("[data-filter]");
  if (!tab) return;
  document.querySelectorAll(".category-tab").forEach(button => button.classList.remove("active"));
  tab.classList.add("active");
  renderProducts(tab.dataset.filter);
});
document.getElementById("open-cart").addEventListener("click", openCart);
document.getElementById("close-cart").addEventListener("click", closeCart);
document.getElementById("continue-shopping").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
document.getElementById("checkout-button").addEventListener("click", checkout);
document.addEventListener("keydown", event => { if (event.key === "Escape") closeCart(); });

renderProducts();
renderCart();
