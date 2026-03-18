/**
 * NOK Shorts - Comment Send (shokol cheye sohoj - shudhu form submit)
 */
(function() {
    'use strict';
    if (!document.querySelector('.shorts-page--scroll')) return;

    function whenReady(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    whenReady(function() {
        /* Inline Send: shudhu form submit - Enter ba Send click e form submit hobe */
        document.addEventListener('submit', function(e) {
            var form = e.target;
            if (form && form.classList && form.classList.contains('shorts-slide__comment-form')) {
                e.preventDefault();
                if (window.handleCommentSend) window.handleCommentSend(form, e);
            }
        }, true);

        /* Inline Gift icon: open Super comment modal */
        document.addEventListener('click', function(e) {
            var giftBtn = e.target.closest('.shorts-slide__comment-gift-inline');
            if (giftBtn && window.setPendingSuperComment && window.addSuperCommentDirect) {
                e.preventDefault();
                e.stopPropagation();
                var shortId = giftBtn.getAttribute('data-id');
                var idx = parseInt(giftBtn.getAttribute('data-idx'), 10);
                var form = giftBtn.closest('form.shorts-slide__comment-form');
                var inp = form ? form.querySelector('.shorts-slide__comment-inline-input') : null;
                var text = (inp && inp.value) ? inp.value.trim() : '';
                window.setPendingSuperComment({ shortId: shortId, idx: isNaN(idx) ? 0 : idx, text: text, overlay: false });
                window.addSuperCommentDirect();
                return;
            }
            var commentIcon = e.target.closest('.shorts-comment-trigger');
            if (commentIcon && window.openCommentOverlay) {
                e.preventDefault();
                e.stopPropagation();
                var idx = parseInt(commentIcon.getAttribute('data-idx'), 10);
                var shortId = commentIcon.getAttribute('data-id');
                if (shortId || (!isNaN(idx) && window.shortsList && window.shortsList[idx])) {
                    window.openCommentOverlay(shortId || window.shortsList[idx].id);
                }
                return;
            }
            var overlayGift = e.target.closest('#shorts-comment-gift, .shorts-comment-overlay__gift-btn');
            if (overlayGift && window.openOverlayGiftModal) {
                e.preventDefault();
                e.stopPropagation();
                window.openOverlayGiftModal();
            }
        }, true);

        document.addEventListener('pointerdown', function(e) {
            var giftBtn = e.target.closest('.shorts-slide__comment-gift-inline');
            if (giftBtn && window.setPendingSuperComment && window.addSuperCommentDirect) {
                e.preventDefault();
                e.stopPropagation();
                var shortId = giftBtn.getAttribute('data-id');
                var idx = parseInt(giftBtn.getAttribute('data-idx'), 10);
                var form = giftBtn.closest('form.shorts-slide__comment-form');
                var inp = form ? form.querySelector('.shorts-slide__comment-inline-input') : null;
                var text = (inp && inp.value) ? inp.value.trim() : '';
                window.setPendingSuperComment({ shortId: shortId, idx: isNaN(idx) ? 0 : idx, text: text, overlay: false });
                window.addSuperCommentDirect();
            }
        }, true);

        document.addEventListener('touchend', function(e) {
            var giftBtn = e.target.closest('.shorts-slide__comment-gift-inline');
            if (giftBtn && window.setPendingSuperComment && window.addSuperCommentDirect) {
                e.preventDefault();
                var shortId = giftBtn.getAttribute('data-id');
                var idx = parseInt(giftBtn.getAttribute('data-idx'), 10);
                var form = giftBtn.closest('form.shorts-slide__comment-form');
                var inp = form ? form.querySelector('.shorts-slide__comment-inline-input') : null;
                var text = (inp && inp.value) ? inp.value.trim() : '';
                window.setPendingSuperComment({ shortId: shortId, idx: isNaN(idx) ? 0 : idx, text: text, overlay: false });
                window.addSuperCommentDirect();
            }
        }, { passive: false, capture: true });

        document.addEventListener('pointerdown', function(e) {
            if (e.target.closest('.shorts-comment-trigger') && window.openCommentOverlay) {
                var el = e.target.closest('.shorts-comment-trigger');
                var idx = parseInt(el.getAttribute('data-idx'), 10);
                var shortId = el.getAttribute('data-id');
                if (shortId || (!isNaN(idx) && window.shortsList && window.shortsList[idx])) {
                    e.preventDefault();
                    window.openCommentOverlay(shortId || window.shortsList[idx].id);
                }
            }
        }, true);

        document.addEventListener('touchend', function(e) {
            if (e.target.closest('.shorts-comment-trigger') && window.openCommentOverlay) {
                var el = e.target.closest('.shorts-comment-trigger');
                var idx = parseInt(el.getAttribute('data-idx'), 10);
                var shortId = el.getAttribute('data-id');
                if (shortId || (!isNaN(idx) && window.shortsList && window.shortsList[idx])) {
                    e.preventDefault();
                    window.openCommentOverlay(shortId || window.shortsList[idx].id);
                }
            }
            if (e.target.closest('#shorts-comment-gift, .shorts-comment-overlay__gift-btn') && window.openOverlayGiftModal) {
                e.preventDefault();
                window.openOverlayGiftModal();
            }
        }, { passive: false, capture: true });
    });
})();
