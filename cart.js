function toggleMenu() { 
    const navMenu = document.getElementById("nav-menu");
    if (navMenu.style.display === "flex") {
        navMenu.style.display = "none";
    } else {
        navMenu.style.display = "flex";
    }
}

function closeMenu() {
    const navMenu = document.getElementById("nav-menu");
    if (window.innerWidth <= 768) {  // Solo cerrar el menú si es móvil
        navMenu.style.display = "none"; // Cierra el menú
    }
}


// Variables para manejar el carrito y el modal
let cart = [];
const cartModal = document.getElementById("cartModal");
const cartItemsContainer = document.getElementById("cartItems");
const subtotalElement = document.getElementById("subtotal");

// Función para guardar el carrito en localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));  // Convertir el carrito a string y almacenarlo
}

// Función para cargar el carrito desde localStorage
function loadCart() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);  // Convertir el carrito almacenado de vuelta a un objeto
        document.getElementById("cart-count").innerText = cart.length;  // Actualizar el contador del carrito
    }
}

// Llamada a loadCart() cuando la página cargue
window.onload = function() {
    loadCart();
    updateCartDisplay(); // Asegúrate de actualizar el carrito en la primera carga
};

// Función para abrir el modal del carrito
function openCartModal() {
    cartModal.style.display = "block";
    updateCartDisplay();  // Actualiza la visualización del carrito al abrir el modal
}

// Función para cerrar el modal
function closeModal() {
    cartModal.style.display = "none";
}

// Función para actualizar la visualización del carrito
function updateCartDisplay() {
    cartItemsContainer.innerHTML = "";
    let subtotal = 0;

    // Asegúrate de que estamos recorriendo el carrito correctamente
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} USD</p>
                <input type="number" value="${item.quantity}" min="1" class="quantity-input" onchange="updateQuantity(${item.id}, this.value)">
                <button onclick="removeFromCart(${item.id})" class="remove-btn">Eliminar</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    subtotalElement.innerText = `Subtotal: $${subtotal.toFixed(2)} USD`;
}

// Función para añadir un producto al carrito
function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    document.getElementById("cart-count").innerText = cart.length;
    updateCartDisplay();
    saveCart();  // Guardamos el carrito actualizado
}

// Función para eliminar un producto del carrito
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    document.getElementById("cart-count").innerText = cart.length;
    updateCartDisplay();
    saveCart();  // Guardamos el carrito actualizado
}

// Función para actualizar la cantidad de un producto en el carrito
function updateQuantity(id, quantity) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = parseInt(quantity);
        updateCartDisplay();
        saveCart();  // Guardamos el carrito actualizado
    }
}

// Función de checkout (aún sin implementación)
function checkout() {
    alert("Continuando con el proceso de pago...");
}
