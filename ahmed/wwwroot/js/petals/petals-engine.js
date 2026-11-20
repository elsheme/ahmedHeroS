/**
 * Falling Rose Petals Canvas Engine
 * Renders full-page continuous ambient petal rain layered gracefully over all sections.
 */
(function () {
    'use strict';

    function initPetals() {
        const canvas = document.getElementById('petals-canvas');
        if (!canvas || !window.FallingBotanicalRose) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            canvas.style.display = 'none';
            return;
        }

        const ctx = canvas.getContext('2d');
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);
        let petals = [];
        let isRunning = false;
        let time = 0;
        let animId = null;

        const baseCount = window.innerWidth <= 768 ? 16 : 26;
        for (let i = 0; i < baseCount; i++) {
            petals.push(new window.FallingBotanicalRose(width, height, true));
        }

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        function loop() {
            if (!isRunning) return;
            time += 0.5;
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < petals.length; i++) {
                petals[i].update(width, height, time);
                petals[i].draw(ctx);
            }
            animId = requestAnimationFrame(loop);
        }

        function start() {
            if (isRunning) return;
            isRunning = true;
            loop();
        }

        function stop() {
            isRunning = false;
            if (animId) cancelAnimationFrame(animId);
        }

        window.addEventListener('resize', resize, { passive: true });
        document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

        // Celebratory burst when envelope opens, then smoothly settles into ambient rain
        window.addEventListener('wedding:envelopeOpened', () => {
            const burstCount = window.innerWidth <= 768 ? 20 : 35;
            for (let i = 0; i < burstCount; i++) {
                petals.push(new window.FallingBotanicalRose(width, height, false, true));
            }
            start();
            setTimeout(() => {
                if (petals.length > baseCount) petals.splice(baseCount);
            }, 8000);
        });

        start();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPetals);
    } else {
        initPetals();
    }
})();
