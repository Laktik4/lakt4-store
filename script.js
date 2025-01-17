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
    // Получаем текущую корзину из localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Добавляем товар в корзину
    cart.push(productId);
    
    // Сохраняем обновленную корзину
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Анимация добавления в корзину
    const button = event.target;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);

    // Анимация иконки корзины
    const cartLink = document.querySelector('a[href="/lakt4-store/cart.html"]');
    if (cartLink) {
        cartLink.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartLink.style.transform = 'scale(1)';
        }, 200);
    }
}

// Функция отображения корзины
function displayCart() {
    const cartContainer = document.getElementById('cartItems');
    if (!cartContainer) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const products = [
        {
            id: 1,
            name: "Nike Sweater",
            price: 2999,
            image: "/lakt4-store/assets/images/nike-sweater.jpg",
            description: "Стильный свитер Nike"
        },
        {
            id: 2,
            name: "Louis Vuitton Wallet",
            price: 4999,
            image: "/lakt4-store/assets/images/lv-wallet.jpg",
            description: "Кошелек Louis Vuitton"
        },
        {
            id: 3,
            name: "Goyard Bag",
            price: 7999,
            image: "/lakt4-store/assets/images/goyard.jpg",
            description: "Сумка Goyard"
        },
        {
            id: 4,
            name: "Stussy x Nike",
            price: 3499,
            image: "/lakt4-store/assets/images/stussy-nike.jpg",
            description: "Коллаборация Stussy x Nike"
        },
        {
            id: 5,
            name: "Nike Socks",
            price: 499,
            image: "/lakt4-store/assets/images/носки.jpg",
            description: "Носки Nike"
        }
    ];

    cartContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Ваша корзина пуста</p>';
        document.getElementById('totalAmount').textContent = '0';
        return;
    }

    cart.forEach((productId, index) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            total += product.price;
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h3 class="cart-item-name">${product.name}</h3>
                    <p class="cart-item-description">${product.description}</p>
                    <p class="cart-item-price">${product.price} Kč</p>
                </div>
                <button class="remove-button" onclick="removeFromCart(${index})">
                    Удалить
                </button>
            `;
            cartContainer.appendChild(cartItem);
        }
    });

    document.getElementById('totalAmount').textContent = total;
}

// Функция удаления из корзины
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Функция отображения товаров
function displayProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    const products = [
        {
            id: 1,
            name: "Nike Sweater",
            price: 2999,
            image: "/lakt4-store/assets/images/nike-sweater.jpg",
            description: "Стильный свитер Nike"
        },
        {
            id: 2,
            name: "Louis Vuitton Wallet",
            price: 4999,
            image: "/lakt4-store/assets/images/lv-wallet.jpg",
            description: "Кошелек Louis Vuitton"
        },
        {
            id: 3,
            name: "Goyard Bag",
            price: 7999,
            image: "/lakt4-store/assets/images/goyard.jpg",
            description: "Сумка Goyard"
        },
        {
            id: 4,
            name: "Stussy x Nike",
            price: 3499,
            image: "/lakt4-store/assets/images/stussy-nike.jpg",
            description: "Коллаборация Stussy x Nike"
        },
        {
            id: 5,
            name: "Nike Socks",
            price: 499,
            image: "/lakt4-store/assets/images/носки.jpg",
            description: "Носки Nike"
        }
    ];

    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-price">${product.price} Kč</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Добавить в корзину
            </button>
        </div>
    `).join('');
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

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    displayCart();
});
