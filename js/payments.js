// Инициализация PayPal
function initPayPal() {
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: calculateTotal()
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                handleSuccessfulPayment('paypal', details.id);
            });
        }
    }).render('#paypal-button-container');
}

// Инициализация Monobank
function initMonobank() {
    const monoSettings = {
        merchantId: 'YOUR_MONO_MERCHANT_ID', // Замените на ваш ID мерчанта
        amount: calculateTotal() * 100, // Сумма в копейках
        currencyCode: 980, // UAH
        merchantPaymInfo: {
            reference: generateOrderId(),
            destination: 'Оплата заказа в Lakt4'
        }
    };

    const button = document.querySelector('#monobank-button');
    button.addEventListener('click', () => {
        monobank.send(monoSettings)
            .then(response => {
                handleSuccessfulPayment('monobank', response.invoiceId);
            })
            .catch(error => {
                handlePaymentError('monobank', error);
            });
    });
}

// Инициализация PrivatBank
function initPrivatBank() {
    const privatSettings = {
        merchant_id: 'YOUR_PRIVAT_MERCHANT_ID', // Замените на ваш ID мерчанта
        order_id: generateOrderId(),
        amount: calculateTotal(),
        currency: 'UAH',
        description: 'Оплата заказа в Lakt4'
    };

    const button = document.querySelector('#privatbank-button');
    button.addEventListener('click', () => {
        LiqPay.checkout(privatSettings)
            .then(response => {
                handleSuccessfulPayment('privatbank', response.payment_id);
            })
            .catch(error => {
                handlePaymentError('privatbank', error);
            });
    });
}

// Обработка успешного платежа
function handleSuccessfulPayment(provider, transactionId) {
    // Сохраняем информацию о заказе
    const orderData = {
        orderId: generateOrderId(),
        transactionId: transactionId,
        provider: provider,
        amount: calculateTotal(),
        items: getCart(),
        customerInfo: getCustomerInfo(),
        date: new Date().toISOString()
    };

    // Отправляем данные на сервер
    saveOrder(orderData).then(() => {
        // Очищаем корзину
        clearCart();
        // Перенаправляем на страницу успешного заказа
        window.location.href = 'order-success.html?orderId=' + orderData.orderId;
    });
}

// Обработка ошибки платежа
function handlePaymentError(provider, error) {
    console.error(`Ошибка оплаты через ${provider}:`, error);
    alert('Произошла ошибка при оплате. Пожалуйста, попробуйте снова или выберите другой способ оплаты.');
}

// Генерация ID заказа
function generateOrderId() {
    return 'ORDER-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// Получение информации о покупателе из формы
function getCustomerInfo() {
    return {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    };
}

// Подсчет общей суммы заказа
function calculateTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.price, 0);
}

// Инициализация всех способов оплаты при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Загружаем необходимые скрипты
    loadPaymentScripts().then(() => {
        initPayPal();
        initMonobank();
        initPrivatBank();
    });

    // Обработка отправки формы
    document.getElementById('checkoutForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const selectedPayment = document.querySelector('input[name="payment"]:checked');
        if (!selectedPayment) {
            alert('Пожалуйста, выберите способ оплаты');
            return;
        }

        // Запускаем соответствующий процесс оплаты
        switch (selectedPayment.value) {
            case 'paypal':
                document.querySelector('#paypal-button-container button').click();
                break;
            case 'monobank':
                document.querySelector('#monobank-button').click();
                break;
            case 'privatbank':
                document.querySelector('#privatbank-button').click();
                break;
        }
    });
});
