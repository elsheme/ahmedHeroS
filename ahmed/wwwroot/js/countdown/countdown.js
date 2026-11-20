/**
 * Typographic Wedding Countdown
 * Renders Arabic-Indic numerals (٠١٢٣٤٥٦٧٨٩) with digit-roll transitions.
 */
(function () {
    'use strict';

    const DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    const toIndic = (n) => {
        const v = Math.max(0, Math.floor(n));
        return (v < 10 ? '0' + v : String(v)).replace(/\d/g, (d) => DIGITS[d]);
    };

    function initCountdown() {
        const container = document.getElementById('wedding-countdown-timer');
        if (!container) return;

        const daysEl = document.getElementById('count-days');
        const hoursEl = document.getElementById('count-hours');
        const minsEl = document.getElementById('count-minutes');
        const secsEl = document.getElementById('count-seconds');
        const celebEl = document.getElementById('countdown-celebration');
        const headerEl = document.getElementById('countdown-pre-header');

        const targetAttr = container.getAttribute('data-target-date');
        const targetDate = targetAttr ? new Date(targetAttr).getTime() : new Date('2027-04-15T20:00:00').getTime();
        const last = { days: -1, hours: -1, minutes: -1, seconds: -1 };
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function setDigit(el, val, key) {
            if (!el || last[key] === val) return;
            last[key] = val;
            const text = toIndic(val);
            if (prefersReduced) {
                el.textContent = text;
                return;
            }
            el.classList.add('rolling');
            setTimeout(() => {
                el.textContent = text;
                el.classList.remove('rolling');
            }, 150);
        }

        function update() {
            const diff = targetDate - Date.now();
            if (diff <= 0) {
                container.style.display = 'none';
                if (headerEl) headerEl.style.display = 'none';
                if (celebEl) {
                    celebEl.style.display = 'block';
                    celebEl.classList.add('active');
                }
                clearInterval(timer);
                return;
            }

            const days = Math.floor(diff / 86400000);
            const hours = Math.floor((diff % 86400000) / 3600000);
            const minutes = Math.floor((diff % 3600000) / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);

            setDigit(daysEl, days, 'days');
            setDigit(hoursEl, hours, 'hours');
            setDigit(minsEl, minutes, 'minutes');
            setDigit(secsEl, seconds, 'seconds');
        }

        update();
        const timer = setInterval(update, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCountdown);
    } else {
        initCountdown();
    }
})();
