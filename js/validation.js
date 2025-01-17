// Функция для санитизации пользовательского ввода
function sanitizeInput(input) {
    return input.replace(/[<>&"']/g, function (match) {
        const entities = {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
            '"': '&quot;',
            "'": '&#x27;'
        };
        return entities[match];
    });
}

// Валидация email
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

// Валидация телефона
function validatePhone(phone) {
    const re = /^\+?[0-9]{10,15}$/;
    return re.test(String(phone));
}

// Валидация формы оформления заказа
function validateCheckoutForm(form) {
    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email"]').value;
    const phone = form.querySelector('[name="phone"]').value;
    const address = form.querySelector('[name="address"]').value;

    let isValid = true;
    let errorMessage = '';

    // Проверка имени
    if (name.length < 2) {
        errorMessage += 'Имя должно содержать не менее 2 символов\n';
        isValid = false;
    }

    // Проверка email
    if (!validateEmail(email)) {
        errorMessage += 'Введите корректный email адрес\n';
        isValid = false;
    }

    // Проверка телефона
    if (!validatePhone(phone)) {
        errorMessage += 'Введите корректный номер телефона\n';
        isValid = false;
    }

    // Проверка адреса
    if (address.length < 10) {
        errorMessage += 'Введите полный адрес доставки\n';
        isValid = false;
    }

    if (!isValid) {
        alert(errorMessage);
        return false;
    }

    // Санитизация всех полей перед отправкой
    form.querySelector('[name="name"]').value = sanitizeInput(name);
    form.querySelector('[name="email"]').value = sanitizeInput(email);
    form.querySelector('[name="phone"]').value = sanitizeInput(phone);
    form.querySelector('[name="address"]').value = sanitizeInput(address);

    return true;
}

// Защита от XSS при добавлении товаров в корзину
function safelyAddToCart(product) {
    product.name = sanitizeInput(product.name);
    product.description = sanitizeInput(product.description);
    product.price = parseFloat(product.price) || 0;
    
    // Проверка путей к изображениям
    if (product.image && !product.image.startsWith('assets/images/')) {
        product.image = 'assets/images/default.jpg';
    }
    
    return product;
}

// Защита localStorage от XSS
function safeSetItem(key, value) {
    const sanitizedValue = JSON.stringify(value).replace(/<\/?[^>]+(>|$)/g, "");
    localStorage.setItem(key, sanitizedValue);
}

function safeGetItem(key) {
    const value = localStorage.getItem(key);
    if (!value) return null;
    try {
        return JSON.parse(value);
    } catch {
        localStorage.removeItem(key);
        return null;
    }
}
