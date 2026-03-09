/* Theme: dark = black dark, light = light UI, system = show app default background (bg.png) */
(function() {
    var s = localStorage.getItem('nokTheme') || 'dark';
    document.documentElement.setAttribute('data-theme', s);
})();
