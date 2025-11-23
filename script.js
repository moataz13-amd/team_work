document.addEventListener('DOMContentLoaded', function() {
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });

    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    var watchBtn = document.getElementById('watchVideoBtn');
    var videoSection = document.getElementById('video');
    if (watchBtn && videoSection) {
        watchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            videoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightboxImage');
    var closeBtn = document.querySelector('.lightbox-close');

    function openLightbox(src, alt) {
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = src;
        lightboxImg.alt = alt || 'Preview';
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox || !lightboxImg) return;
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImg.src = '';
        document.body.style.overflow = '';
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() { closeLightbox(); });
    }

    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
    });

    var gridLinks = document.querySelectorAll('[data-lightbox]');
    gridLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var img = link.querySelector('img');
            var src = link.getAttribute('href');
            var alt = img ? img.getAttribute('alt') : '';
            openLightbox(src, alt);
        });
    });
});