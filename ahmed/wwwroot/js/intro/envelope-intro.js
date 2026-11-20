/**
 * Cinematic Opening Envelope Experience Orchestrator
 */
(function () {
    'use strict';

    class CinematicEnvelope {
        constructor() {
            this.overlay = document.getElementById('envelope-overlay');
            this.envelope = document.getElementById('wedding-envelope');
            this.waxSeal = document.getElementById('wax-seal');
            this.openBtn = document.getElementById('open-invitation-btn');
            this.skipBtn = document.getElementById('skip-intro-btn');
            this.replayBtn = document.getElementById('replay-intro-btn');
            if (!this.overlay || !this.envelope) return;

            this.isOpening = false;
            this.init();
        }

        init() {
            document.body.classList.add('envelope-active');

            if (this.waxSeal) this.waxSeal.addEventListener('click', (e) => { e.stopPropagation(); this.openEnvelope(); });
            if (this.openBtn) this.openBtn.addEventListener('click', (e) => { e.stopPropagation(); this.openEnvelope(); });
            this.envelope.addEventListener('click', (e) => {
                if (e.target && e.target.closest('#skip-intro-btn')) return;
                if (!this.isOpening) this.openEnvelope();
            });

            if (this.skipBtn) this.skipBtn.addEventListener('click', (e) => { e.stopPropagation(); this.skipIntro(); });
            if (this.replayBtn) this.replayBtn.addEventListener('click', (e) => { e.stopPropagation(); this.replayIntro(); });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !this.overlay.classList.contains('revealed')) this.skipIntro();
            });
        }

        openEnvelope() {
            if (this.isOpening) return;
            this.isOpening = true;

            if (window.weddingAudio) window.weddingAudio.startAudio();
            if (window.triggerRoseBloom) window.triggerRoseBloom();

            setTimeout(() => {
                this.envelope.classList.add('open');
            }, 850);

            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('wedding:envelopeOpened'));
                this.completeOpening();
            }, 2100);
        }

        completeOpening() {
            this.overlay.classList.add('revealed');
            document.body.classList.remove('envelope-active');
            this.isOpening = false;
        }

        skipIntro() {
            if (window.weddingAudio) window.weddingAudio.startAudio();
            this.completeOpening();
        }

        replayIntro() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.envelope.classList.remove('open');
            if (window.resetRoseBloom) window.resetRoseBloom();
            this.overlay.classList.remove('revealed');
            document.body.classList.add('envelope-active');
            this.isOpening = false;
        }
    }

    window.addEventListener('DOMContentLoaded', () => {
        new CinematicEnvelope();
    });
})();
