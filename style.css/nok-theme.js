/* Theme: system (normal/default), dark, or light. First-time open = default theme set for always. */
(function() {
    var KEY = 'nokTheme';
    var DEFAULT = 'system';
    function getSaved() { return localStorage.getItem(KEY) || DEFAULT; }
    function apply() {
        var saved = getSaved();
        if (saved === 'system') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', saved);
        }
    }
    if (localStorage.getItem(KEY) === null) {
        localStorage.setItem(KEY, DEFAULT);
    }
    apply();
})();
