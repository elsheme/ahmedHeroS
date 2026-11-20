/**
 * Opening Seal Botanical Rose Bloom Trigger
 */
(function () {
    'use strict';

    window.triggerRoseBloom = function () {
        const roseEl = document.getElementById('seal-rose-bloom');
        const waxSeal = document.getElementById('wax-seal');
        if (waxSeal) waxSeal.classList.add('blooming');
        if (roseEl) roseEl.classList.add('blooming');
    };

    window.resetRoseBloom = function () {
        const roseEl = document.getElementById('seal-rose-bloom');
        const waxSeal = document.getElementById('wax-seal');
        if (waxSeal) waxSeal.classList.remove('blooming');
        if (roseEl) roseEl.classList.remove('blooming');
    };
})();
