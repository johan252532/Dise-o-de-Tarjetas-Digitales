document.addEventListener('DOMContentLoaded', () => {
    // Para la animación de fade-in en scroll
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.2 // Cuando el 20% del elemento esté visible, se activa
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('is-visible');
                appearOnScroll.unobserve(entry.target); // Dejar de observar una vez visible
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Para el año actual en el footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Para el header pegajoso (sticky header)
    const header = document.getElementById('main-header');
    const headerHeight = header.offsetHeight;
    const body = document.body;

    window.addEventListener('scroll', () => {
        if (window.scrollY > headerHeight / 2) { // Activar sticky cuando se scrollea la mitad del hero
            header.classList.add('sticky');
            body.classList.add('header-is-sticky');
        } else {
            header.classList.remove('sticky');
            body.classList.remove('header-is-sticky');
        }
    });

    // Para la sección de Preguntas Frecuentes (FAQ)
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const header = item.querySelector('h3');
        header.addEventListener('click', () => {
            // Cierra todos los demás FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Alterna el estado del FAQ item clickeado
            item.classList.toggle('active');
        });
    });
});