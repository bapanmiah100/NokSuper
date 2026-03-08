/**
 * Studio & Upload (Dashboard): require login. Redirect to login with return URL if not logged in.
 * Preserves current page path + query string so after login user returns to the same page.
 */
(function() {
    function isLoggedIn() {
        return (sessionStorage.getItem('nokAuth') === 'loggedIn') || (localStorage.getItem('nokAuth') === 'loggedIn');
    }
    if (!isLoggedIn()) {
        var path = window.location.pathname || '';
        var page = path.substring(path.lastIndexOf('/') + 1) || 'studio.html';
        var search = window.location.search || '';
        var base = page.split('?')[0].split('#')[0];
        if (!base || base === '') base = 'studio.html';
        var nextUrl = base + (search ? search : '');
        window.location.replace('login.html?next=' + encodeURIComponent(nextUrl));
    }
})();
