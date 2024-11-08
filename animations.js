// animations.js
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer para animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos a animar
    const animatedElements = document.querySelectorAll('.price-card, .terms article, .about-content, .contact-form');
    animatedElements.forEach(el => {
        el.classList.add('animate-initial');
        observer.observe(el);
    });

    // Animación del navbar al hacer scroll
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Animación suave para los enlaces del navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Cerrar menú móvil si está abierto
                const navLinks = document.querySelector('.nav-links');
                const navToggle = document.querySelector('.nav-toggle');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Animación para los price cards al hacer hover
    const priceCards = document.querySelectorAll('.price-card');
    priceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('price-card-hover');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('price-card-hover');
        });
    });
});
