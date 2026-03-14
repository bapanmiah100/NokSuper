/**
 * Studio & Upload (Dashboard): require login. Redirect to login with return URL if not logged in.
 * Settings page: no redirect – Preferences, Playback, Appearance, Support, Data saver visible without login.
 */
(function() {
    function isLoggedIn() {
        return (sessionStorage.getItem('nokAuth') === 'loggedIn') || (localStorage.getItem('nokAuth') === 'loggedIn');
    }
    function normalizeStudioSidebar(currentBase) {
        var nav = document.querySelector('.studio-sidebar__nav');
        if (!nav) return;

        var analyticsPages = {
            'studio-videos.html': true,
            'studio-shorts.html': true,
            'studio-captions.html': true,
            'studio-short-edit.html': true,
            'studio-video-analytics.html': true,
            'studio-short-analytics.html': true,
            'studio-promotion.html': true,
            'studio-promotion-setup.html': true,
            'studio-live.html': true
        };

        var activeKey = '';
        if (currentBase === 'studio.html') activeKey = 'dashboard';
        else if (currentBase === 'studio-earning.html') activeKey = 'earning';
        else if (currentBase === 'studio-monetization.html') activeKey = 'monetization';
        else if (currentBase === 'studio-analytics.html') activeKey = 'analytics';
        else if (currentBase === 'studio-content-detection.html') activeKey = 'content-detection';
        else if (currentBase === 'studio-customization.html') activeKey = 'customization';
        else if (currentBase === 'studio-content.html') activeKey = 'content';
        else if (currentBase === 'channel.html') activeKey = 'channel';
        else if (currentBase === 'settings.html') activeKey = 'settings';
        else if (analyticsPages[currentBase]) activeKey = 'analytics';

        var items = [
            {
                key: 'dashboard',
                href: 'studio.html',
                label: 'Dashboard',
                icon: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>'
            },
            {
                key: 'upload',
                href: 'upload.html',
                label: 'Upload',
                icon: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>'
            },
            {
                key: 'earning',
                href: 'studio-earning.html',
                label: 'Earning',
                icon: '<circle cx="12" cy="12" r="10"/><path d="M12 6v12M15 9.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>'
            },
            {
                key: 'monetization',
                href: 'studio-monetization.html',
                label: 'Monetization',
                icon: '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/><path d="M12 15h6"/>'
            },
            {
                key: 'analytics',
                href: 'studio-analytics.html',
                label: 'Analytics',
                icon: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>'
            },
            {
                key: 'content-detection',
                href: 'studio-content-detection.html',
                label: 'Content Detection',
                icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'
            },
            {
                key: 'customization',
                href: 'studio-customization.html',
                label: 'Customization',
                icon: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>'
            },
            {
                key: 'content',
                href: 'studio-content.html',
                label: 'Content',
                icon: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/>'
            },
            {
                key: 'channel',
                href: 'channel.html',
                label: 'Channel',
                icon: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>'
            },
            {
                key: 'settings',
                href: 'settings.html',
                label: 'Settings',
                icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>'
            }
        ];

        nav.innerHTML = items.map(function(item) {
            var activeClass = item.key === activeKey ? ' studio-sidebar__item--active' : '';
            return '<a href="' + item.href + '" class="studio-sidebar__item' + activeClass + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' + item.icon + '</svg><span>' + item.label + '</span></a>';
        }).join('');
    }
    var path = window.location.pathname || '';
    var page = path.substring(path.lastIndexOf('/') + 1) || '';
    var base = page.split('?')[0].split('#')[0].toLowerCase();
    var allowWithoutLogin = (base === 'settings.html');
    if (!isLoggedIn() && !allowWithoutLogin) {
        var search = window.location.search || '';
        if (!base || base === '') base = 'studio.html';
        var nextUrl = base + (search ? search : '');
        window.location.replace('login.html?next=' + encodeURIComponent(nextUrl));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            normalizeStudioSidebar(base);
        });
    } else {
        normalizeStudioSidebar(base);
    }
})();
