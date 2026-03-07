/**
 * Header menu drawer – works on any page. Include after header with id="header-menu-btn" and drawer markup.
 * Back button: id="header-back-btn" – one tap goes to previous page (or home if no history).
 */
(function() {
    function init() {
        var backBtn = document.getElementById('header-back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', function() {
                if (window.history.length > 1) {
                    window.history.back();
                } else {
                    window.location.href = 'home.html';
                }
            });
        }
        var menuBtn = document.getElementById('header-menu-btn');
        var drawer = document.getElementById('header-drawer');
        var backdrop = document.getElementById('header-drawer-backdrop');
        var closeBtn = document.getElementById('header-drawer-close');
        if (!menuBtn || !drawer) return;
        function openDrawer(e) {
            if (e) { e.preventDefault(); e.stopPropagation(); }
            drawer.classList.add('header-drawer--open');
            drawer.setAttribute('aria-hidden', 'false');
            if (backdrop) { backdrop.classList.add('header-drawer-backdrop--open'); backdrop.setAttribute('aria-hidden', 'false'); }
        }
        function closeDrawer() {
            drawer.classList.remove('header-drawer--open');
            drawer.setAttribute('aria-hidden', 'true');
            if (backdrop) { backdrop.classList.remove('header-drawer-backdrop--open'); backdrop.setAttribute('aria-hidden', 'true'); }
        }
        menuBtn.addEventListener('click', openDrawer);
        if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
        if (backdrop) backdrop.addEventListener('click', closeDrawer);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
