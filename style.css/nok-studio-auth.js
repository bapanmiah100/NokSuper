/**
 * Studio & Upload (Dashboard): require login. Redirect to login with return URL if not logged in.
 * Settings page: no redirect – Preferences, Playback, Appearance, Support, Data saver visible without login.
 */
(function() {
    function isLoggedIn() {
        return (sessionStorage.getItem('nokAuth') === 'loggedIn') || (localStorage.getItem('nokAuth') === 'loggedIn');
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
})();
