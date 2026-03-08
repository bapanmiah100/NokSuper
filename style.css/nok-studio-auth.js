/**
 * Studio & Upload: require login. Redirect to login with return URL if not logged in.
 */
(function() {
    function isLoggedIn() {
        return (sessionStorage.getItem('nokAuth') === 'loggedIn') || (localStorage.getItem('nokAuth') === 'loggedIn');
    }
    if (!isLoggedIn()) {
        var path = window.location.pathname || '';
        var page = path.substring(path.lastIndexOf('/') + 1) || 'studio.html';
        var base = page.split('?')[0].split('#')[0];
        if (!base || base === '') base = 'studio.html';
        window.location.replace('login.html?next=' + encodeURIComponent(base));
    }
})();
