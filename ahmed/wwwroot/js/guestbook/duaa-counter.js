/**
 * Duaa Counter Module ("ادعُ لنا")
 * Shared live prayer counter with rate-limiting, localStorage, and gold sparkle particles.
 */
(function () {
    'use strict';

    function initDuaaCounter() {
        const btn = document.getElementById('duaa-pray-btn');
        const countDisplay = document.getElementById('duaa-counter-number');
        const toast = document.getElementById('duaa-feedback-toast');
        if (!btn || !countDisplay) return;

        const storageKey = 'has_prayed_for_ahmed_sarah';
        let isSubmitting = false;

        function showToast(msg) {
            if (!toast) return;
            toast.textContent = msg;
            toast.classList.add('active');
            setTimeout(() => toast.classList.remove('active'), 3500);
        }

        function markAsPrayed(animate = true) {
            btn.classList.add('prayed');
            btn.setAttribute('disabled', 'true');
            const txt = btn.querySelector('.duaa-btn-text');
            if (txt) txt.textContent = 'جزاكم الله خيراً';
            const icon = btn.querySelector('.duaa-btn-icon');
            if (icon) icon.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
            if (animate) {
                btn.classList.add('pulse-golden');
                setTimeout(() => btn.classList.remove('pulse-golden'), 800);
            }
        }

        function spawnParticles(originX, originY) {
            const x = originX || window.innerWidth / 2, y = originY || window.innerHeight / 2;
            for (let i = 0; i < 10; i++) {
                const p = document.createElement('span');
                p.className = 'duaa-floating-particle';
                const angle = (Math.PI * 2 * i) / 10 + (Math.random() * 0.4 - 0.2);
                const dist = 30 + Math.random() * 50;
                p.style.left = `${x}px`;
                p.style.top = `${y}px`;
                p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
                p.style.setProperty('--dy', `${Math.sin(angle) * dist - 35}px`);
                document.body.appendChild(p);
                setTimeout(() => p.remove(), 1200);
            }
        }

        if (localStorage.getItem(storageKey) === 'true') markAsPrayed(false);

        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            if (isSubmitting) return;

            if ('vibrate' in navigator) {
                try { navigator.vibrate(10); } catch (_) {}
            }

            if (localStorage.getItem(storageKey) === 'true') {
                showToast('جزاكم الله خيراً، شملتنا دعوتكم الطيبة سلفاً');
                spawnParticles(e.clientX, e.clientY);
                return;
            }

            isSubmitting = true;
            spawnParticles(e.clientX, e.clientY);

            try {
                const res = await fetch('/Home/PrayForUs', { method: 'POST', headers: { 'X-Requested-With': 'XMLHttpRequest' } });
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.success) {
                        countDisplay.textContent = data.formattedCount;
                        countDisplay.classList.add('counter-fade-roll');
                        setTimeout(() => countDisplay.classList.remove('counter-fade-roll'), 300);
                        localStorage.setItem(storageKey, 'true');
                        markAsPrayed(true);
                        showToast(data.message || 'جزاك الله خيراً على دعائك المبارك!');
                        window.dispatchEvent(new CustomEvent('duaa:prayed'));
                    }
                }
            } catch (err) { console.error('Prayer error:', err); }
            finally { isSubmitting = false; }
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initDuaaCounter);
    else initDuaaCounter();
})();
