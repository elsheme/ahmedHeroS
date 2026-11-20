/**
 * Add-to-Calendar Dropdown Menu Controller
 * Handles toggling, click outside, and aria-expanded accessibility.
 */
(function () {
    'use strict';

    function initCalendarDropdown() {
        const btn = document.getElementById('calendar-dropdown-btn');
        const menu = document.getElementById('calendar-dropdown-menu');
        if (!btn || !menu) return;

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = menu.classList.contains('active');
            menu.classList.toggle('active', !isOpen);
            btn.setAttribute('aria-expanded', String(!isOpen));
        });

        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && e.target !== btn) {
                menu.classList.remove('active');
                btn.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.classList.contains('active')) {
                menu.classList.remove('active');
                btn.setAttribute('aria-expanded', 'false');
                btn.focus();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCalendarDropdown);
    } else {
        initCalendarDropdown();
    }
})();
