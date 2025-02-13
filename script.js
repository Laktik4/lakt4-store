document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header animation on scroll
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Contact button functionality
    const contactBtn = document.querySelector('.contact-btn');
    contactBtn.addEventListener('click', () => {
        // You can replace this with your preferred contact method
        window.location.href = 'mailto:info@lakt4.club';
    });

    // Booking button functionality
    const bookingBtn = document.querySelector('.booking-btn');
    bookingBtn.addEventListener('click', () => {
        // You can replace this with your booking system
        alert('Бронирование будет доступно в ближайшее время!');
    });

    // Add neon hover effect to cards
    const cards = document.querySelectorAll('.service-card, .membership-card, .testimonial-card');
    cards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.3)';
        });

        card.addEventListener('mouseout', () => {
            card.style.boxShadow = 'none';
        });
    });

    // Modal handling
    const bookingBtnModal = document.querySelector('.booking-btn');
    const contactBtnModal = document.querySelector('.contact-btn');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    const paymentMethod = document.getElementById('paymentMethod');
    const cardDetails = document.getElementById('cardDetails');

    // Open modals
    bookingBtnModal.addEventListener('click', () => {
        document.getElementById('bookingModal').classList.add('active');
    });

    contactBtnModal.addEventListener('click', () => {
        document.getElementById('contactModal').classList.add('active');
    });

    // Close modals
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').classList.remove('active');
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Handle payment method change
    paymentMethod.addEventListener('change', (e) => {
        if (e.target.value === 'card') {
            cardDetails.classList.remove('hidden');
        } else {
            cardDetails.classList.add('hidden');
        }
    });

    // Form validation and submission
    const bookingForm = document.getElementById('bookingForm');
    const contactForm = document.getElementById('contactForm');

    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('bookingName').value,
            date: document.getElementById('bookingDate').value,
            time: document.getElementById('bookingTime').value,
            service: document.getElementById('bookingService').value,
            paymentMethod: document.getElementById('paymentMethod').value,
        };

        if (formData.paymentMethod === 'card') {
            formData.cardNumber = document.getElementById('cardNumber').value;
            formData.cardExpiry = document.getElementById('cardExpiry').value;
            formData.cardCVV = document.getElementById('cardCVV').value;
        }

        // Here you would typically send the data to your server
        console.log('Booking submitted:', formData);
        alert('Бронирование успешно отправлено! Мы свяжемся с вами для подтверждения.');
        bookingForm.reset();
        document.getElementById('bookingModal').classList.remove('active');
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            message: document.getElementById('contactMessage').value,
        };

        // Here you would typically send the data to your server
        console.log('Contact form submitted:', formData);
        alert('Сообщение успешно отправлено! Мы ответим вам в ближайшее время.');
        contactForm.reset();
        document.getElementById('contactModal').classList.remove('active');
    });

    // Card input formatting
    const cardNumber = document.getElementById('cardNumber');
    const cardExpiry = document.getElementById('cardExpiry');
    const cardCVV = document.getElementById('cardCVV');

    cardNumber.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(.{4})/g, '$1 ').trim();
        e.target.value = value.substring(0, 19);
    });

    cardExpiry.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        e.target.value = value.substring(0, 5);
    });

    cardCVV.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        e.target.value = value.substring(0, 3);
    });
});
