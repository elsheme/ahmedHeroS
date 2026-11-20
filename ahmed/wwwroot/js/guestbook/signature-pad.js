/**
 * Witness Signature Canvas Pad
 * Canvas touch/pointer drawing, quadratic curve smoothing, undo and clear.
 */
(function () {
    'use strict';

    function initSignaturePad() {
        const canvas = document.getElementById('signature-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const clearBtn = document.getElementById('sig-clear-btn');
        const undoBtn = document.getElementById('sig-undo-btn');
        const hiddenData = document.getElementById('SignatureData');

        let isDrawing = false, strokes = [], currentStroke = [];

        function resize() {
            const rect = canvas.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
            canvas.width = Math.floor((rect.width || 360) * dpr);
            canvas.height = Math.floor((rect.height || 140) * dpr);
            ctx.scale(dpr, dpr);
            ctx.lineCap = ctx.lineJoin = 'round';
            redraw();
        }

        function redraw() {
            const rect = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, rect.width, rect.height);
            ctx.strokeStyle = '#0B2E2A';
            ctx.lineWidth = 2.4;
            for (const s of strokes) {
                if (s.length < 2) continue;
                ctx.beginPath();
                ctx.moveTo(s[0].x, s[0].y);
                for (let i = 1; i < s.length - 1; i++) {
                    ctx.quadraticCurveTo(s[i].x, s[i].y, (s[i].x + s[i + 1].x) / 2, (s[i].y + s[i + 1].y) / 2);
                }
                ctx.lineTo(s[s.length - 1].x, s[s.length - 1].y);
                ctx.stroke();
            }
        }

        const exportSig = () => { if (hiddenData) hiddenData.value = strokes.length > 0 ? canvas.toDataURL('image/png') : ''; };
        const getPos = (e) => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };

        canvas.addEventListener('pointerdown', (e) => {
            isDrawing = true;
            canvas.setPointerCapture(e.pointerId);
            currentStroke = [getPos(e)];
        });

        canvas.addEventListener('pointermove', (e) => {
            if (!isDrawing) return;
            const pt = getPos(e);
            currentStroke.push(pt);
            if (currentStroke.length > 1) {
                const prev = currentStroke[currentStroke.length - 2];
                ctx.beginPath();
                ctx.strokeStyle = '#0B2E2A';
                ctx.lineWidth = 2.4;
                ctx.moveTo(prev.x, prev.y);
                ctx.lineTo(pt.x, pt.y);
                ctx.stroke();
            }
        });

        const endStroke = (e) => {
            if (!isDrawing) return;
            isDrawing = false;
            try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
            if (currentStroke.length > 0) { strokes.push([...currentStroke]); currentStroke = []; exportSig(); }
        };

        canvas.addEventListener('pointerup', endStroke);
        canvas.addEventListener('pointercancel', endStroke);

        window.witnessSignaturePadInstance = {
            clear: () => { strokes = []; currentStroke = []; const r = canvas.getBoundingClientRect(); ctx.clearRect(0, 0, r.width, r.height); exportSig(); },
            undo: () => { if (strokes.length > 0) { strokes.pop(); redraw(); exportSig(); } }
        };

        if (clearBtn) clearBtn.addEventListener('click', (e) => { e.preventDefault(); window.witnessSignaturePadInstance.clear(); });
        if (undoBtn) undoBtn.addEventListener('click', (e) => { e.preventDefault(); window.witnessSignaturePadInstance.undo(); });

        resize();
        window.addEventListener('resize', resize);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initSignaturePad);
    else initSignaturePad();
})();
