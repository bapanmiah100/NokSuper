/**
 * NOK Chat Overlay — opens from .chat-trigger on every page.
 * If #chat-overlay is missing, loads chat-overlay-fragment.html (same folder as this script) and appends it.
 * Serve over http(s) so fetch works (e.g. npx serve www).
 */
(function() {
    var pendingOpenChat = false;
    var fragmentLoading = false;

    document.addEventListener('click', function(e) {
        var t = e.target && e.target.closest && e.target.closest('.chat-trigger');
        if (!t || document.getElementById('chat-overlay')) return;
        e.preventDefault();
        pendingOpenChat = true;
    }, true);

    function scriptBaseUrl() {
        try {
            var sc = document.currentScript;
            if (sc && sc.src) return sc.src.replace(/[/\\][^/\\]*$/, '/');
            var scripts = document.getElementsByTagName('script');
            for (var i = scripts.length - 1; i >= 0; i--) {
                var src = scripts[i].src || '';
                if (src.indexOf('nok-chat-overlay') !== -1) return src.replace(/[/\\][^/\\]*$/, '/');
            }
        } catch (err) {}
        return '';
    }

    /** Folder URL of nok-chat-overlay.js (works after deferred load; scriptBaseUrl alone can be empty). */
    function nokAssetsDirUrl() {
        try {
            var scripts = document.getElementsByTagName('script');
            for (var i = scripts.length - 1; i >= 0; i--) {
                var attr = scripts[i].getAttribute('src');
                if (!attr || attr.indexOf('nok-chat-overlay') === -1) continue;
                return new URL(attr, window.location.href).href.replace(/[/\\][^/\\]*$/, '/');
            }
        } catch (_) {}
        return scriptBaseUrl();
    }

    function nokStyleCssRootUrl() {
        var b = nokAssetsDirUrl();
        if (b) return b;
        try {
            var path = window.location.pathname || '';
            var ix = path.indexOf('/style.css/');
            if (ix !== -1) return window.location.origin + path.slice(0, ix + '/style.css/'.length);
        } catch (_) {}
        return '';
    }

    function injectOverlayHtml(html) {
        if (document.getElementById('chat-overlay')) return true;
        if (!html || typeof html !== 'string') return false;
        var wrap = document.createElement('div');
        wrap.innerHTML = html.trim();
        var el = wrap.querySelector('#chat-overlay');
        if (!el) return false;
        document.body.appendChild(el);
        return true;
    }

    function normalizeNokChatThreadLinks(root) {
        var base = nokStyleCssRootUrl();
        try {
            var loc = (window.location.href || '').split('#')[0];
            var pageDir = loc.replace(/[/\\][^/\\]*$/, '/');
            var resolveBase = base || pageDir;
            root.querySelectorAll('a.nok-chat__item').forEach(function(a) {
                var h = a.getAttribute('href');
                if (!h || h === '#' || h.toLowerCase().indexOf('chat-thread.html') === -1) return;
                if (!/^[a-z][a-z0-9+.-]*:/i.test(h)) {
                    try {
                        a.setAttribute('href', new URL(h, resolveBase).href);
                    } catch (_) {}
                }
                a.setAttribute('target', '_top');
                a.setAttribute('rel', 'noopener');
            });
        } catch (_) {}
    }

    /** Resolved full URL for a chat row <a>, or '' if not a thread link. */
    function nokChatThreadUrlFromLink(link) {
        if (!link) return '';
        var raw = (link.getAttribute('href') || '').trim();
        if (!raw || raw === '#') return '';
        if (raw.toLowerCase().indexOf('chat-thread.html') === -1) return '';
        try {
            return new URL(raw, window.location.href).href;
        } catch (_) {
            var h = link.href || '';
            return h.toLowerCase().indexOf('chat-thread') !== -1 ? h : '';
        }
    }

    function runNokChatOverlayInit() {
        var overlay = document.getElementById('chat-overlay');
        if (!overlay) return;

        normalizeNokChatThreadLinks(overlay);

        var nokThreadNavAt = 0;
        function nokNavigateToChatThread(url) {
            if (!url) return;
            var now = Date.now();
            if (now - nokThreadNavAt < 320) return;
            nokThreadNavAt = now;
            setTimeout(function() { window.location.href = url; }, 0);
        }
        function wireNokChatListThreadNav() {
            var listRoot = overlay.querySelector('.nok-chat__list');
            if (!listRoot || listRoot._nokChatThreadWired) return;
            listRoot._nokChatThreadWired = true;
            function rowLink(el) {
                return el && el.closest && el.closest('a.nok-chat__item');
            }
            listRoot.addEventListener('click', function(e) {
                var a = rowLink(e.target);
                if (!a) return;
                if (e.button !== 0 && e.button != null) return;
                if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
                var url = nokChatThreadUrlFromLink(a);
                if (!url) return;
                e.preventDefault();
                nokNavigateToChatThread(url);
            }, true);
            var touchStart = null;
            listRoot.addEventListener('touchstart', function(e) {
                if (e.touches.length !== 1) { touchStart = null; return; }
                var t = e.touches[0];
                touchStart = { x: t.clientX, y: t.clientY };
            }, { passive: true });
            listRoot.addEventListener('touchend', function(e) {
                if (!touchStart || e.changedTouches.length !== 1) { touchStart = null; return; }
                var t = e.changedTouches[0];
                var dx = Math.abs(t.clientX - touchStart.x);
                var dy = Math.abs(t.clientY - touchStart.y);
                touchStart = null;
                if (dx > 50 || dy > 65) return;
                var a = rowLink(e.target);
                if (!a) return;
                var url = nokChatThreadUrlFromLink(a);
                if (!url) return;
                e.preventDefault();
                nokNavigateToChatThread(url);
            }, { passive: false });
        }
        wireNokChatListThreadNav();

        var card = overlay.querySelector('.chat-overlay__card');
        var backdrop = document.getElementById('chat-overlay-backdrop') || overlay.querySelector('.chat-overlay__backdrop');
        var closeBtn = document.getElementById('chat-menu-close');
        var menuTrigger = document.getElementById('chat-menu-trigger');
        var chatMenu = document.getElementById('chat-menu');
        var resizeBtn = document.getElementById('chat-card-resize');
        var dragHandle = document.getElementById('chat-drag-handle');
        var resizeHandle = document.getElementById('chat-resize-handle');

        var dragOffset = { x: 0, y: 0 };

        function setChatCardView() {
            var isLoggedIn = (sessionStorage.getItem('nokAuth') === 'loggedIn') || (localStorage.getItem('nokAuth') === 'loggedIn');
            var mobileVerified = localStorage.getItem('nokMobileVerified') === 'yes';
            var chatLogin = document.getElementById('chat-login');
            var chatContent = document.getElementById('chat-content');
            var chatStepLogin = document.getElementById('chat-step-login');
            var chatStepVerify = document.getElementById('chat-step-verify');
            if (chatLogin) chatLogin.style.display = (!isLoggedIn || !mobileVerified) ? 'flex' : 'none';
            if (chatContent) chatContent.style.display = (isLoggedIn && mobileVerified) ? 'flex' : 'none';
            if (chatStepLogin) chatStepLogin.style.display = !isLoggedIn ? 'block' : 'none';
            if (chatStepVerify) chatStepVerify.style.display = (isLoggedIn && !mobileVerified) ? 'block' : 'none';
            if (isLoggedIn && mobileVerified) {
                try {
                    normalizeNokChatThreadLinks(overlay);
                    wireNokChatListThreadNav();
                } catch (_) {}
            }
        }
        setChatCardView();
        window.addEventListener('pageshow', setChatCardView);

        var chatVerifyForm = document.getElementById('chat-verify-form');
        var chatOtpStep = document.getElementById('chat-otp-step');
        var chatVerifyOtp = document.getElementById('chat-verify-otp');
        if (chatVerifyForm) chatVerifyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var phoneEl = document.getElementById('chat-verify-phone');
            var p = phoneEl ? phoneEl.value : '';
            if (p && chatOtpStep) { chatVerifyForm.style.display = 'none'; chatOtpStep.style.display = 'block'; }
        });
        if (chatVerifyOtp) chatVerifyOtp.addEventListener('click', function() {
            var digits = document.querySelectorAll('.chat-login__otp-digit');
            var code = digits.length ? Array.from(digits).map(function(x) { return x.value; }).join('') : '';
            if (code.length === 6) { localStorage.setItem('nokMobileVerified', 'yes'); setChatCardView(); }
        });
        var od = document.querySelectorAll('.chat-login__otp-digit');
        od.forEach(function(inp, i) {
            inp.addEventListener('input', function() { if (this.value.length === 1 && i < od.length - 1) od[i + 1].focus(); });
            inp.addEventListener('keydown', function(e) { if (e.key === 'Backspace' && !this.value && i > 0) od[i - 1].focus(); });
        });

        function openChat() {
            dragOffset = { x: 0, y: 0 };
            normalizeNokChatThreadLinks(overlay);
            wireNokChatListThreadNav();
            overlay.classList.add('chat-overlay--open');
            document.body.classList.add('chat-overlay-open');
            overlay.setAttribute('aria-hidden', 'false');
            if (card) {
                card.style.transform = card.classList.contains('chat-overlay__card--fullscreen') ? 'scale(1)' : 'translateY(-50%) scale(1)';
            }
        }

        function closeChat() {
            overlay.classList.remove('chat-overlay--open', 'chat-overlay--fullscreen');
            document.body.classList.remove('chat-overlay-open');
            if (card) {
                card.classList.remove('chat-overlay__card--fullscreen');
                card.style.transform = '';
                card.style.width = '';
                card.style.height = '';
            }
            if (chatMenu) chatMenu.classList.remove('nok-chat__menu--open');
        }

        document.querySelectorAll('.chat-trigger').forEach(function(el) {
            el.addEventListener('click', function(e) {
                e.preventDefault();
                if (overlay.classList.contains('chat-overlay--open')) closeChat();
                else openChat();
            });
        });

        if (backdrop) backdrop.addEventListener('click', closeChat);
        if (closeBtn) closeBtn.addEventListener('click', function() { closeChat(); });

        if (menuTrigger && chatMenu) {
            menuTrigger.addEventListener('click', function(e) {
                e.stopPropagation();
                chatMenu.classList.toggle('nok-chat__menu--open');
            });
            document.addEventListener('click', function(e) {
                if (!chatMenu.contains(e.target) && !menuTrigger.contains(e.target)) chatMenu.classList.remove('nok-chat__menu--open');
            });
        }

        if (resizeBtn && card) {
            resizeBtn.addEventListener('click', function() {
                var goingFull = !card.classList.contains('chat-overlay__card--fullscreen');
                card.classList.toggle('chat-overlay__card--fullscreen');
                overlay.classList.toggle('chat-overlay--fullscreen');
                if (goingFull) card.style.transform = 'scale(1)';
                else card.style.transform = 'translate(' + dragOffset.x + 'px, ' + dragOffset.y + 'px) translateY(-50%) scale(1)';
                resizeBtn.setAttribute('title', card.classList.contains('chat-overlay__card--fullscreen') ? 'Small' : 'Full screen');
            });
        }

        if (dragHandle && card) {
            var isDragging = false, dragPid = null, startX, startY, startOffsetX, startOffsetY;
            function endDrag(e) {
                if (!isDragging) return;
                isDragging = false;
                dragPid = null;
                if (e && dragHandle.releasePointerCapture) {
                    try { dragHandle.releasePointerCapture(e.pointerId); } catch (_) {}
                }
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
            }
            dragHandle.addEventListener('pointerdown', function(e) {
                if (card.classList.contains('chat-overlay__card--fullscreen')) return;
                if (e.pointerType === 'mouse' && e.button !== 0) return;
                e.preventDefault();
                isDragging = true;
                dragPid = e.pointerId;
                try { dragHandle.setPointerCapture(e.pointerId); } catch (_) {}
                startX = e.clientX; startY = e.clientY;
                startOffsetX = dragOffset.x; startOffsetY = dragOffset.y;
                document.body.style.cursor = 'move';
                document.body.style.userSelect = 'none';
            });
            dragHandle.addEventListener('pointermove', function(e) {
                if (!isDragging || e.pointerId !== dragPid) return;
                e.preventDefault();
                dragOffset.x = startOffsetX + (e.clientX - startX);
                dragOffset.y = startOffsetY + (e.clientY - startY);
                var ty = card.classList.contains('chat-overlay__card--fullscreen') ? 0 : -50;
                card.style.transform = ty ? 'translate(' + dragOffset.x + 'px, ' + dragOffset.y + 'px) translateY(-50%) scale(1)' : 'translate(' + dragOffset.x + 'px, ' + dragOffset.y + 'px) scale(1)';
            });
            dragHandle.addEventListener('pointerup', endDrag);
            dragHandle.addEventListener('pointercancel', endDrag);
        }

        if (resizeHandle && card) {
            var isResizing = false, resizePid = null, rsX, rsY, startW, startH;
            function endResize(e) {
                if (!isResizing) return;
                isResizing = false;
                resizePid = null;
                if (e && resizeHandle.releasePointerCapture) {
                    try { resizeHandle.releasePointerCapture(e.pointerId); } catch (_) {}
                }
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
            }
            resizeHandle.addEventListener('pointerdown', function(e) {
                if (card.classList.contains('chat-overlay__card--fullscreen')) return;
                if (e.pointerType === 'mouse' && e.button !== 0) return;
                e.preventDefault();
                isResizing = true;
                resizePid = e.pointerId;
                try { resizeHandle.setPointerCapture(e.pointerId); } catch (_) {}
                rsX = e.clientX; rsY = e.clientY;
                startW = card.offsetWidth; startH = card.offsetHeight;
                document.body.style.cursor = 'nwse-resize';
                document.body.style.userSelect = 'none';
            });
            resizeHandle.addEventListener('pointermove', function(e) {
                if (!isResizing || e.pointerId !== resizePid) return;
                e.preventDefault();
                var newW = Math.max(280, Math.min(window.innerWidth * 0.95, startW + (e.clientX - rsX)));
                var newH = Math.max(400, Math.min(window.innerHeight * 0.9, startH + (e.clientY - rsY)));
                card.style.width = newW + 'px';
                card.style.height = newH + 'px';
            });
            resizeHandle.addEventListener('pointerup', endResize);
            resizeHandle.addEventListener('pointercancel', endResize);
        }

        document.querySelectorAll('.nok-chat__tab').forEach(function(tab) {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.nok-chat__tab').forEach(function(t) { t.classList.remove('nok-chat__tab--active'); });
                this.classList.add('nok-chat__tab--active');
            });
        });

        document.querySelectorAll('.chat-overlay__card a[href="#"]').forEach(function(a) {
            a.addEventListener('click', function(e) { e.preventDefault(); });
        });

        if (pendingOpenChat) {
            pendingOpenChat = false;
            openChat();
        }
    }

    function boot() {
        if (document.getElementById('chat-overlay')) {
            runNokChatOverlayInit();
            return;
        }
        if (!document.querySelector('.chat-trigger')) return;
        if (fragmentLoading) return;
        fragmentLoading = true;
        var base = nokStyleCssRootUrl() || scriptBaseUrl();
        var urls = [base + 'chat-overlay-fragment.html', 'style.css/chat-overlay-fragment.html', 'chat-overlay-fragment.html'];
        var idx = 0;
        function tryLoad() {
            if (idx >= urls.length) {
                fragmentLoading = false;
                console.warn('NOK Chat: could not load chat-overlay-fragment.html — use a local server (e.g. npx serve www).');
                return;
            }
            fetch(urls[idx++])
                .then(function(r) { if (!r.ok) throw new Error('bad'); return r.text(); })
                .then(function(html) {
                    if (injectOverlayHtml(html)) {
                        fragmentLoading = false;
                        runNokChatOverlayInit();
                    } else tryLoad();
                })
                .catch(function() { tryLoad(); });
        }
        tryLoad();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
