/**
 * Signature Modes Controller
 * Manages Draw vs Type mode tabs and live typed calligraphy preview.
 */
(function () {
    'use strict';

    function initSignatureModes() {
        const modeDrawBtn = document.getElementById('sig-mode-draw');
        const modeTypeBtn = document.getElementById('sig-mode-type');
        const drawContainer = document.getElementById('sig-draw-container');
        const typeContainer = document.getElementById('sig-type-container');
        const typedInput = document.getElementById('sig-typed-name');
        const typedPreview = document.getElementById('sig-typed-preview');
        const hiddenData = document.getElementById('SignatureData');
        const hiddenType = document.getElementById('SignatureType');
        const fullNameInput = document.getElementById('FullName');

        if (!modeDrawBtn || !modeTypeBtn) return;

        function setMode(mode) {
            if (mode === 'draw') {
                modeDrawBtn.classList.add('active');
                modeTypeBtn.classList.remove('active');
                if (drawContainer) drawContainer.style.display = 'block';
                if (typeContainer) typeContainer.style.display = 'none';
                if (hiddenType) hiddenType.value = 'drawn';
            } else {
                modeDrawBtn.classList.remove('active');
                modeTypeBtn.classList.add('active');
                if (drawContainer) drawContainer.style.display = 'none';
                if (typeContainer) typeContainer.style.display = 'block';
                if (hiddenType) hiddenType.value = 'typed';
                const name = (typedInput && typedInput.value.trim()) || (fullNameInput && fullNameInput.value.trim()) || '';
                syncTyped(name);
            }
        }

        function syncTyped(text) {
            if (typedPreview) typedPreview.textContent = text || 'توقيع الشاهد بخط الرقعة';
            if (hiddenData) hiddenData.value = text ? 'typed:' + text : '';
        }

        modeDrawBtn.addEventListener('click', (e) => { e.preventDefault(); setMode('draw'); });
        modeTypeBtn.addEventListener('click', (e) => { e.preventDefault(); setMode('typed'); });

        if (typedInput) {
            typedInput.addEventListener('input', () => syncTyped(typedInput.value.trim()));
        }
        if (fullNameInput) {
            fullNameInput.addEventListener('input', () => {
                if (modeTypeBtn.classList.contains('active') && typedInput && !typedInput.value) {
                    syncTyped(fullNameInput.value.trim());
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSignatureModes);
    } else {
        initSignatureModes();
    }
})();
