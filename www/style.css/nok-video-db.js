(function(window) {
    var DB_NAME = 'NOKVideoDB';
    var STORE = 'videos';

    function openDB() {
        return new Promise(function(resolve, reject) {
            var r = indexedDB.open(DB_NAME, 1);
            r.onerror = reject;
            r.onsuccess = function() { resolve(r.result); };
            r.onupgradeneeded = function() { r.result.createObjectStore(STORE, { keyPath: 'id' }); };
        });
    }

    /* Short video file lokano: blob save/get/delete */
    window.nokVideoDB = {
        save: function(id, blob) {
            return openDB().then(function(db) {
                return new Promise(function(resolve, reject) {
                    var tx = db.transaction(STORE, 'readwrite');
                    tx.objectStore(STORE).put({ id: id, blob: blob });
                    tx.oncomplete = resolve;
                    tx.onerror = reject;
                });
            });
        },
        get: function(id) {
            return openDB().then(function(db) {
                return new Promise(function(resolve, reject) {
                    var tx = db.transaction(STORE, 'readonly');
                    var r = tx.objectStore(STORE).get(id);
                    r.onsuccess = function() { resolve(r.result ? r.result.blob : null); };
                    r.onerror = reject;
                });
            });
        },
        delete: function(id) {
            return openDB().then(function(db) {
                return new Promise(function(resolve, reject) {
                    var tx = db.transaction(STORE, 'readwrite');
                    tx.objectStore(STORE).delete(id);
                    tx.oncomplete = resolve;
                    tx.onerror = reject;
                });
            });
        }
    };
})(window);
