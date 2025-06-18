document.addEventListener('DOMContentLoaded', () => {

    // --- FUNCIÓN PARA EL AÑO ACTUAL EN EL FOOTER ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- ANIMACIÓN DE ELEMENTOS AL HACER SCROLL ---
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => {
        observer.observe(el);
    });
    
    // --- HEADER PEGAJOSO (STICKY HEADER) - VERSIÓN CORREGIDA ---
    const header = document.getElementById('main-header');
    const body = document.body;

    // ¡CORRECCIÓN CLAVE!
    // Obtenemos la altura ORIGINAL del header UNA SOLA VEZ, antes de cualquier cambio.
    const headerOriginalHeight = header.offsetHeight; 

    window.addEventListener('scroll', () => {
        // Usamos la altura original para decidir cuándo se activa el modo pegajoso.
        if (window.scrollY > headerOriginalHeight) {
            if (!body.classList.contains('header-is-sticky')) {
                // Usamos la altura original que guardamos para el padding.
                body.style.paddingTop = headerOriginalHeight + 'px';
                body.classList.add('header-is-sticky');
                header.classList.add('sticky');
            }
        } else {
            if (body.classList.contains('header-is-sticky')) {
                 body.style.paddingTop = '0';
                 body.classList.remove('header-is-sticky');
                 header.classList.remove('sticky');
            }
        }
    }, { passive: true });

});