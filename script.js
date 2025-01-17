let cart = [];

// Безопасное сохранение значения в localStorage
function safeSetItem(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Ошибка сохранения значения в localStorage:', e);
    }
}

// Безопасное получение значения из localStorage
function safeGetItem(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (e) {
        console.error('Ошибка получения значения из localStorage:', e);
        return null;
    }
}

// Безопасное добавление товара в корзину
function safelyAddToCart(product) {
    return product;
}

// Безопасное сохранение корзины
function saveCart(cart) {
    safeSetItem('cart', cart);
}

// Безопасное получение корзины
function getCart() {
    return safeGetItem('cart') || [];
}

// Безопасное добавление товара в корзину
function addToCart(productId) {
    const cart = getCart();
    const safeProduct = safelyAddToCart(productId);
    cart.push(safeProduct);
    saveCart(cart);
    alert('Товар добавлен в корзину!');
    window.location.href = 'cart.html'; // Сразу переходим в корзину
}

function removeFromCart(productId) {
    cart = getCart().filter(id => id !== productId);
    saveCart(cart);
    loadCartItems(); // Перезагрузить корзину
}

function buyNow(productId) {
    window.location.href = 'checkout.html';
}

// Загрузка данных из localStorage
cart = getCart();

// Функция загрузки товаров в корзину
function loadCartItems() {
    const cartContainer = document.getElementById('cartItems');
    if (!cartContainer) return;

    const products = {
        1: { name: 'Nike Socs', price: '50 Kč ($2.04)', image: 'https://via.placeholder.com/300x300?text=Nike+Socks' },
        2: { name: 'Свитер Nike', price: '3500 Kč ($145)', image: 'https://via.placeholder.com/300x300?text=Nike+Sweater' },
        3: { name: 'Кофта Nike', price: '2699 Kč ($110)', image: 'https://via.placeholder.com/300x300?text=Nike+Hoodie' },
        4: { name: 'Louis Vuitton', price: '4999 Kč ($205)', image: 'https://via.placeholder.com/300x300?text=Louis+Vuitton+Wallet' },
        5: { name: 'Сумка Goyard', price: '12999 Kč ($530)', image: 'https://via.placeholder.com/300x300?text=Goyard+Bag' }
    };

    cartContainer.innerHTML = '';
    cart.forEach(productId => {
        const product = products[productId];
        if (product) {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" style="width: 100px; height: 100px; object-fit: cover;">
                <div class="cart-item-details">
                    <h3>${product.name}</h3>
                    <p>${product.price}</p>
                </div>
                <button onclick="removeFromCart(${productId})" class="remove-btn">Удалить</button>
            `;
            cartContainer.appendChild(cartItem);
        }
    });

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Корзина пуста</p>';
    }
}

// Безопасное сохранение темы
function saveTheme(theme) {
    safeSetItem('theme', theme);
}

// Безопасное получение темы
function getTheme() {
    return safeGetItem('theme') || 'dark';
}

// Переключатель темы
function toggleTheme(theme) {
    document.body.className = theme;
    saveTheme(theme);
}

// Загрузка темы
const savedTheme = getTheme();
document.body.className = savedTheme;

// Загрузить корзину при загрузке страницы
document.addEventListener('DOMContentLoaded', loadCartItems);
