/**
 * Story Lightbox & Image Parallax Controller
 * Handles pointed-arch photo lightbox opening, close events, and keyboard support.
 */
(function () {
    'use strict';

    function initStoryLightbox() {
        const wrappers = document.querySelectorAll('.story-image-arched-wrapper');
        const lightbox = document.getElementById('gallery-lightbox');
        if (!lightbox) return;

        const lightboxImg = lightbox.querySelector('.lightbox-image');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const closeBtn = lightbox.querySelector('.lightbox-close');

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        wrappers.forEach((wrapper) => {
            wrapper.addEventListener('click', () => {
                const img = wrapper.querySelector('img');
                const card = wrapper.closest('.story-moment-card');
                const title = card ? card.querySelector('.story-card-title') : null;

                if (img && img.src && !img.src.includes('undefined')) {
                    if (lightboxImg) lightboxImg.src = img.src;
                    if (lightboxCaption && title) lightboxCaption.textContent = title.textContent;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
        });
    }

    function initStoryDots() {
        const grid = document.querySelector('.story-timeline-grid');
        const dots = document.querySelectorAll('.story-dot-btn');
        const cards = document.querySelectorAll('.story-card-wrapper');
        if (!grid || dots.length === 0 || cards.length === 0) return;

        dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                const idx = parseInt(dot.getAttribute('data-target'), 10);
                if (cards[idx]) {
                    cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            });
        });

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                        const idx = parseInt(entry.target.getAttribute('data-index'), 10);
                        dots.forEach((d, i) => {
                            const isActive = i === idx;
                            d.classList.toggle('active', isActive);
                            d.setAttribute('aria-selected', String(isActive));
                        });
                    }
                });
            }, {
                root: grid,
                threshold: 0.5
            });

            cards.forEach((card) => observer.observe(card));
        }
    }

    function init() {
        initStoryLightbox();
        initStoryDots();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
