// Конфигурация платежных систем
const paymentConfig = {
    paypal: {
        clientId: 'YOUR_PAYPAL_CLIENT_ID',
        currency: 'USD',
        intent: 'capture'
    },
    monobank: {
        merchantId: 'YOUR_MONO_MERCHANT_ID',
        merchantName: 'Lakt4 Store',
        currencyCode: 980, // UAH
        redirectUrl: 'https://your-site.com/success',
        webHookUrl: 'https://your-site.com/webhook/mono'
    },
    privatbank: {
        merchantId: 'YOUR_PRIVAT_MERCHANT_ID',
        merchantKey: 'YOUR_PRIVAT_MERCHANT_KEY',
        currency: 'UAH',
        language: 'uk',
        serverUrl: 'https://your-site.com/webhook/privat'
    }
};
