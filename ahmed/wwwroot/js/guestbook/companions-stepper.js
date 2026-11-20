/**
 * Companions Stepper Module
 * Manages the counter from 0 to 5. Displays 'بدون مرافقين' at zero, otherwise Arabic-Indic digits.
 */
(function () {
    'use strict';

    const DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    const toIndic = (n) => String(Math.max(0, Math.floor(n))).replace(/\d/g, (d) => DIGITS[d]);

    function initCompanionsStepper() {
        const minus = document.getElementById('counter-minus');
        const plus = document.getElementById('counter-plus');
        const display = document.getElementById('counter-display');
        const input = document.getElementById('CompanionsCountInput');
        if (!minus || !plus || !display || !input) return;

        let count = parseInt(input.value, 10) || 0;

        function update(newVal) {
            count = Math.max(0, Math.min(5, newVal));
            input.value = String(count);
            if (count === 0) {
                display.textContent = 'بدون مرافقين';
                display.classList.add('is-zero');
                minus.setAttribute('disabled', 'true');
                minus.setAttribute('aria-disabled', 'true');
            } else {
                display.textContent = toIndic(count);
                display.classList.remove('is-zero');
                minus.removeAttribute('disabled');
                minus.removeAttribute('aria-disabled');
            }
        }

        update(count);

        minus.addEventListener('click', () => update(count - 1));
        plus.addEventListener('click', () => update(count + 1));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCompanionsStepper);
    } else {
        initCompanionsStepper();
    }
})();
