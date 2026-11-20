/**
 * Ambient Wedding Audio Engine - "أرواحنا كالجند تلاقت"
 * Controls HTML5 Audio element with smooth volume fades, autoplay unlocking, iOS compatibility, and UI sync.
 */
(function () {
    'use strict';

    class WeddingAudioEngine {
        constructor() {
            this.audio = document.getElementById('wedding-audio-player');
            if (!this.audio) {
                this.audio = new Audio('/audio/wedding-nasheed.m4a');
                this.audio.id = 'wedding-audio-player';
                this.audio.preload = 'auto';
                this.audio.loop = true;
                this.audio.playsInline = true;
                document.body.appendChild(this.audio);
            }

            this.btnEl = document.getElementById('audio-control-btn');
            this.isPlaying = false;
            this.userPaused = false;
            this.targetVolume = 0.65;
            this.fadeInterval = null;

            // Test if browser supports volume modification (iOS Safari does not allow JS volume control)
            this.supportsVolume = true;
            try {
                const initialVol = this.audio.volume;
                this.audio.volume = 0.5;
                if (this.audio.volume === initialVol && initialVol !== 0.5) {
                    this.supportsVolume = false;
                }
            } catch (e) {
                this.supportsVolume = false;
            }

            if (this.supportsVolume) {
                this.audio.volume = 0;
            } else {
                this.audio.volume = 1;
            }

            this.audio.loop = true;

            if (this.btnEl) {
                this.btnEl.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggle();
                });
            }

            // Sync UI with native audio state events
            this.audio.addEventListener('play', () => this.updateUi(true));
            this.audio.addEventListener('playing', () => this.updateUi(true));
            this.audio.addEventListener('pause', () => this.updateUi(false));
            this.audio.addEventListener('ended', () => this.updateUi(false));
            this.audio.addEventListener('error', (e) => {
                console.warn('Wedding audio player encountered an error:', this.audio.error);
                this.updateUi(false);
            });

            // Unlock autoplay on first user interaction anywhere on the document
            this.setupAutoplayUnlock();
            this.setupScrollFade();
        }

        setupScrollFade() {
            const cluster = document.querySelector('.floating-controls-cluster');
            if (!cluster) return;
            let scrollTimer = null;
            window.addEventListener('scroll', () => {
                cluster.classList.add('is-scrolling');
                if (scrollTimer) clearTimeout(scrollTimer);
                scrollTimer = setTimeout(() => {
                    cluster.classList.remove('is-scrolling');
                }, 800);
            }, { passive: true });
        }

        setupAutoplayUnlock() {
            const unlock = () => {
                if (!this.userPaused && (!this.isPlaying || this.audio.paused)) {
                    this.startAudio();
                }
            };

            const events = ['click', 'touchstart', 'touchend', 'pointerdown', 'keydown'];
            const listenerOptions = { once: true, passive: true };

            const removeListeners = () => {
                events.forEach(evt => document.removeEventListener(evt, handler));
            };

            const handler = () => {
                unlock();
                if (this.isPlaying && !this.audio.paused) {
                    removeListeners();
                }
            };

            events.forEach(evt => document.addEventListener(evt, handler, listenerOptions));
        }

        fadeTo(target, callback) {
            if (this.fadeInterval) {
                clearInterval(this.fadeInterval);
                this.fadeInterval = null;
            }

            if (!this.supportsVolume) {
                if (callback) callback();
                return;
            }

            const step = target > this.audio.volume ? 0.05 : -0.05;
            this.fadeInterval = setInterval(() => {
                const next = this.audio.volume + step;
                if ((step > 0 && next >= target) || (step < 0 && next <= target)) {
                    this.audio.volume = Math.max(0, Math.min(1, target));
                    clearInterval(this.fadeInterval);
                    this.fadeInterval = null;
                    if (callback) callback();
                } else {
                    this.audio.volume = Math.max(0, Math.min(1, next));
                }
            }, 40);
        }

        startAudio() {
            if (!this.audio.paused && this.isPlaying) return;

            // Ensure source is loaded
            if (this.audio.readyState === 0) {
                this.audio.load();
            }

            const playPromise = this.audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    this.isPlaying = true;
                    this.userPaused = false;
                    this.fadeTo(this.targetVolume);
                    this.updateUi(true);
                }).catch((err) => {
                    console.info('Audio autoplay pending user gesture:', err.name);
                    this.isPlaying = false;
                    this.updateUi(false);
                });
            }
        }

        stopAudio() {
            if (this.audio.paused && !this.isPlaying) return;

            this.fadeTo(0, () => {
                this.audio.pause();
                this.isPlaying = false;
                this.updateUi(false);
            });
        }

        toggle() {
            if (this.audio.paused) {
                this.userPaused = false;
                this.startAudio();
            } else {
                this.userPaused = true;
                this.stopAudio();
            }
        }

        updateUi(playing) {
            this.isPlaying = playing;
            if (!this.btnEl) return;
            this.btnEl.classList.toggle('playing', playing);
            this.btnEl.setAttribute('aria-pressed', playing ? 'true' : 'false');
        }
    }

    // Expose engine immediately
    function initAudio() {
        if (!window.weddingAudio) {
            window.weddingAudio = new WeddingAudioEngine();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAudio);
    } else {
        initAudio();
    }
})();
