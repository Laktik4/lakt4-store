// Инициализация платежных систем
document.addEventListener('DOMContentLoaded', function() {
    initializePayments();
    loadOrderItems();
});

let selectedPayment = '';

function initializePayments() {
    // Добавляем обработчики для выбора способа оплаты
    document.querySelectorAll('input[name="payment"]').forEach(input => {
        input.addEventListener('change', function() {
            selectedPayment = this.value;
            highlightSelectedPayment(this);
        });
    });

    // Добавляем обработчик отправки формы
    const form = document.getElementById('checkoutForm');
    if (form) {
        form.addEventListener('submit', handleCheckoutSubmit);
    }
}

function highlightSelectedPayment(input) {
    // Убираем выделение у всех методов оплаты
    document.querySelectorAll('.payment-method').forEach(method => {
        method.classList.remove('selected');
    });
    // Добавляем выделение выбранному методу
    input.closest('.payment-method').classList.add('selected');
}

function loadOrderItems() {
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

    const orderItems = document.getElementById('orderItems');
    if (!orderItems) return;

    let total = 0;
    const itemsHTML = cart.map(productId => {
        const product = products.find(p => p.id === productId);
        if (product) {
            total += product.price;
            return `
                <div class="order-item">
                    <div class="order-item-info">
                        <span class="order-item-name">${product.name}</span>
                        <span class="order-item-description">${product.description}</span>
                    </div>
                    <span class="order-item-price">${product.price} Kč</span>
                </div>
            `;
        }
        return '';
    }).join('');

    orderItems.innerHTML = itemsHTML || '<p>Корзина пуста</p>';
    const totalElement = document.getElementById('totalAmount');
    if (totalElement) {
        totalElement.textContent = total;
    }
}

async function handleCheckoutSubmit(event) {
    event.preventDefault();

    if (!selectedPayment) {
        alert('Пожалуйста, выберите способ оплаты');
        return;
    }

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        paymentMethod: selectedPayment,
        items: JSON.parse(localStorage.getItem('cart') || '[]')
    };

    try {
        // В реальном приложении здесь был бы запрос к серверу
        console.log('Отправка заказа:', formData);

        // Очищаем корзину
        localStorage.setItem('cart', '[]');

        // Показываем сообщение об успехе
        alert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');

        // Перенаправляем на главную страницу
        window.location.href = '/lakt4-store/index.html';
    } catch (error) {
        console.error('Ошибка при оформлении заказа:', error);
        alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте снова.');
    }
}
