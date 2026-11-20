/**
 * RSVP Form Controller
 * Handles attendance status toggle, AJAX submission, modal feedback, and live feed updates.
 */
(function () {
    'use strict';

    const DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    const toIndic = (n) => String(Math.max(0, Math.floor(n))).replace(/\d/g, (d) => DIGITS[d]);
    const escapeHtml = (s) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    function initRsvpForm() {
        const form = document.getElementById('wedding-rsvp-form');
        const modal = document.getElementById('rsvp-modal-feedback');
        const modalMsg = document.getElementById('rsvp-feedback-message');
        const modalClose = document.getElementById('rsvp-modal-close');
        const attendanceBtns = document.querySelectorAll('.attendance-pill-btn');
        const attendanceInput = document.getElementById('AttendanceStatusInput');
        if (!form) return;

        attendanceBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                attendanceBtns.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');
                if (attendanceInput) attendanceInput.value = btn.getAttribute('data-status');
            });
        });

        function appendWitnessCard(entry) {
            const feed = document.getElementById('guestbook-feed');
            if (!feed) return;
            let sigHtml = '';
            if (entry.signatureData) {
                if (entry.signatureData.startsWith('data:image/')) {
                    sigHtml = `<div class="witness-card-signature"><img src="${entry.signatureData}" alt="توقيع" class="witness-sig-img" /></div>`;
                } else if (entry.signatureData.startsWith('typed:')) {
                    sigHtml = `<div class="witness-card-signature"><span class="witness-sig-calligraphy">${escapeHtml(entry.signatureData.substring(6))}</span></div>`;
                }
            }
            const compBadge = entry.companionsCount > 0 ? `<span class="witness-companions-badge">+ ${toIndic(entry.companionsCount)} مرافق</span>` : '';
            const card = document.createElement('div');
            card.className = 'editorial-wish-card reveal-on-scroll is-revealed';
            card.innerHTML = `
                <div class="wish-quote-glyph" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#C9A24B">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                </div>
                <p class="wish-text-body">${escapeHtml(entry.messageText)}</p>
                ${sigHtml}
                <div class="wish-card-divider"></div>
                <div class="wish-card-footer">
                    <span class="wish-author-title" title="${escapeHtml(entry.guestName)}">${escapeHtml(entry.guestName)}</span>
                    <div class="wish-pills-row">
                        <span class="wish-status-badge">${escapeHtml(entry.attendanceStatus || 'شاهد')}</span>
                        ${compBadge}
                    </div>
                </div>`;
            feed.prepend(card);
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '<span>جاري تسجيل التوقيع...</span>'; }

            try {
                const res = await fetch('/Home/SubmitRsvp', { method: 'POST', body: new FormData(form) });
                const result = await res.json();
                if (res.ok && result.success) {
                    if (modalMsg) modalMsg.textContent = result.message;
                    if (modal) modal.classList.add('active');
                    if (result.newEntry) appendWitnessCard(result.newEntry);
                    form.reset();
                    if (window.witnessSignaturePadInstance) window.witnessSignaturePadInstance.clear();
                } else {
                    alert(result.message || 'يرجى ملء الحقول المطلوبة');
                }
            } catch (err) {
                console.error('RSVP submission error:', err);
            } finally {
                if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = originalText; }
            }
        });

        if (modalClose && modal) {
            modalClose.addEventListener('click', () => modal.classList.remove('active'));
            modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });
        }

        const toggleWishesBtn = document.getElementById('toggle-more-wishes-btn');
        if (toggleWishesBtn) {
            toggleWishesBtn.addEventListener('click', () => {
                const isExpanded = toggleWishesBtn.getAttribute('aria-expanded') === 'true';
                const extras = document.querySelectorAll('.wish-item-extra');
                extras.forEach((el) => {
                    el.style.display = isExpanded ? 'none' : 'block';
                    el.classList.toggle('is-collapsed', isExpanded);
                });
                toggleWishesBtn.setAttribute('aria-expanded', String(!isExpanded));
                const textSpan = toggleWishesBtn.querySelector('.btn-wishes-text');
                if (textSpan) textSpan.textContent = isExpanded ? 'عرض المزيد من التهاني' : 'عرض أقل';
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRsvpForm);
    } else {
        initRsvpForm();
    }
})();
