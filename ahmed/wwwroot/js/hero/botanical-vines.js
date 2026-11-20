/**
 * Botanical Vines Controller
 * Handles line-drawing reveal and ambient sway animation for hero rose vines.
 */
(function () {
    'use strict';

    function initHeroVines() {
        const vines = document.querySelectorAll('.hero-rose-vine');
        if (!vines.length) return;

        const activateVines = () => {
            vines.forEach((vine) => {
                vine.classList.add('drawn');
                setTimeout(() => {
                    vine.classList.add('swaying');
                }, 1200);
            });
        };

        window.addEventListener('wedding:envelopeOpened', activateVines);

        // Check if envelope is already opened/hidden
        const overlay = document.getElementById('envelope-overlay');
        if (!overlay || overlay.classList.contains('revealed') || overlay.classList.contains('hidden')) {
            activateVines();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroVines);
    } else {
        initHeroVines();
    }
})();
