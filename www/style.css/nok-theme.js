/* Shared theme and language preferences for the whole app. */
(function() {
    /* Capacitor Android WebView: lighter CSS + dynamic screen-fit vars */
    function applyAndroidScreenMetrics() {
        try {
            if (typeof window.Capacitor === 'undefined') return;
            var root = document.documentElement;
            root.classList.add('android-webview');

            var vv = window.visualViewport;
            var vw = (vv && vv.width) ? vv.width : window.innerWidth;
            var vh = (vv && vv.height) ? vv.height : window.innerHeight;
            var shortSide = Math.min(vw, vh);
            var longSide = Math.max(vw, vh);
            var scale = shortSide / 390;
            if (scale < 0.9) scale = 0.9;
            if (scale > 1.08) scale = 1.08;

            root.style.setProperty('--app-screen-width', vw + 'px');
            root.style.setProperty('--app-screen-height', vh + 'px');
            root.style.setProperty('--app-screen-short', shortSide + 'px');
            root.style.setProperty('--app-screen-long', longSide + 'px');
            root.style.setProperty('--app-ui-scale', scale.toFixed(3));

            root.classList.toggle('screen-compact', shortSide < 360);
            root.classList.toggle('screen-medium', shortSide >= 360 && shortSide < 420);
            root.classList.toggle('screen-large', shortSide >= 420);
        } catch (e) {}
    }
    applyAndroidScreenMetrics();
    window.addEventListener('resize', applyAndroidScreenMetrics, { passive: true });
    window.addEventListener('orientationchange', applyAndroidScreenMetrics, { passive: true });
    if (window.visualViewport && window.visualViewport.addEventListener) {
        window.visualViewport.addEventListener('resize', applyAndroidScreenMetrics, { passive: true });
    }
    var THEME_KEY = 'nokTheme';
    var THEME_DEFAULT = 'system';
    var LANGUAGE_KEY = 'nokLanguage';
    var LANGUAGE_DEFAULT = 'en';
    var RTL_LANGUAGES = { ar: true, fa: true, he: true, ur: true };
    var TRANSLATE_STYLE_ID = 'nok-google-translate-style';
    var PAGE_TRANSLATION_CACHE_KEY = 'nokPageTranslationCache';
    var translateWidgetInitialized = false;
    var translateScriptLoading = false;
    var translateCallbacks = [];
    var pageTranslationCache = null;
    var autoTranslateRequestId = 0;
    var autoTranslateObserver = null;
    var autoTranslateTimer = 0;
    var autoTranslateApplying = false;
    var NATIVE_TRANSLATIONS = {
        bn: {
            'common.search': 'সার্চ',
            'common.home': 'হোম',
            'common.shorts': 'শর্টস',
            'common.upload': 'আপলোড',
            'common.library': 'লাইব্রেরি',
            'common.settings': 'সেটিংস',
            'common.menu': 'মেনু',
            'common.login': 'লগ ইন',
            'common.change': 'পরিবর্তন',
            'common.add': 'যোগ করুন',
            'common.manage': 'ম্যানেজ',
            'common.clear': 'ক্লিয়ার',
            'settings.title': 'সেটিংস',
            'settings.subtitle': 'আপনার অ্যাকাউন্ট, পছন্দ ও প্রাইভেসি ম্যানেজ করুন',
            'settings.profileMeta': 'চ্যানেল ক্রিয়েটর',
            'settings.viewChannel': 'চ্যানেল দেখুন',
            'settings.editProfile': 'প্রোফাইল এডিট',
            'settings.account': 'অ্যাকাউন্ট',
            'settings.accountSettings': 'অ্যাকাউন্ট সেটিংস',
            'settings.accountSettingsHint': 'ইমেইল, পাসওয়ার্ড ও সিকিউরিটি',
            'settings.channel': 'চ্যানেল',
            'settings.channelHint': 'আপনার চ্যানেল ম্যানেজ করুন',
            'settings.wallet': 'ওয়ালেট ও কয়েন',
            'settings.preferences': 'পছন্দ',
            'settings.autoplay': 'অটোপ্লে',
            'settings.autoplayHint': 'পরের ভিডিও স্বয়ংক্রিয়ভাবে চালান',
            'settings.soundEffects': 'সাউন্ড ইফেক্ট',
            'settings.soundEffectsHint': 'UI সাউন্ড ও ফিডব্যাক',
            'settings.commentsDefault': 'ডিফল্টভাবে কমেন্ট দেখান',
            'settings.commentsDefaultHint': 'ভিডিও পেজে কমেন্ট খুলে দিন',
            'settings.playback': 'প্লেব্যাক',
            'settings.videoQuality': 'ডিফল্ট ভিডিও কোয়ালিটি',
            'settings.videoQualityHint': 'যখন পাওয়া যাবে তখন পছন্দের কোয়ালিটি',
            'settings.playbackSpeed': 'ডিফল্ট প্লেব্যাক স্পিড',
            'settings.notifications': 'নোটিফিকেশন',
            'settings.pushNotifications': 'পুশ নোটিফিকেশন',
            'settings.pushNotificationsHint': 'ভিডিও ও চ্যানেল আপডেট',
            'settings.emailNotifications': 'ইমেইল নোটিফিকেশন',
            'settings.emailNotificationsHint': 'আপডেট ও নিউজলেটার',
            'settings.subUploads': 'সাবস্ক্রিপশন থেকে নতুন আপলোড',
            'settings.subUploadsHint': 'যখন আপনি ফলো করা ক্রিয়েটর পোস্ট করে',
            'settings.appearance': 'অ্যাপিয়ারেন্স',
            'settings.theme': 'থিম',
            'settings.themeHintSystem': 'নরমাল (ডিফল্ট)',
            'settings.themeHintLight': 'লাইট',
            'settings.themeHintDark': 'ডার্ক',
            'settings.themeSystem': 'সিস্টেম',
            'settings.themeLight': 'লাইট',
            'settings.themeDark': 'ডার্ক',
            'settings.dataStorage': 'ডেটা ও স্টোরেজ',
            'settings.watchHistory': 'ওয়াচ হিস্ট্রি',
            'settings.watchHistoryHint': 'আপনার ওয়াচ ও সার্চ হিস্ট্রি মুছুন',
            'settings.cache': 'ক্যাশ ও টেম্পোরারি ডেটা',
            'settings.cacheHint': 'স্টোরেজ খালি করুন',
            'settings.dataSaver': 'ডেটা সেভার',
            'settings.dataSaverHint': 'ভিডিওর জন্য ডেটা ব্যবহার কমান',
            'settings.privacy': 'প্রাইভেসি',
            'settings.privacySecurity': 'প্রাইভেসি ও সিকিউরিটি',
            'settings.profileVisibility': 'প্রোফাইল ভিজিবিলিটি',
            'settings.profileVisibilityHint': 'কে আপনার চ্যানেল দেখতে পারবে',
            'settings.profilePublic': 'পাবলিক',
            'settings.profilePrivate': 'প্রাইভেট',
            'settings.whoCanComment': 'কে কমেন্ট করতে পারবে',
            'settings.whoCanCommentHint': 'আপনার ভিডিওতে',
            'settings.commentEveryone': 'সকলেই',
            'settings.commentSubscribers': 'শুধু সাবস্ক্রাইবার',
            'settings.commentNobody': 'কেউ না',
            'settings.showWatchHistory': 'ওয়াচ হিস্ট্রি দেখান',
            'settings.showWatchHistoryHint': 'আপনি যে ভিডিও দেখেছেন তা সেভ ও দেখান',
            'settings.showLikedVideos': 'লাইক করা ভিডিও দেখান',
            'settings.showLikedVideosHint': 'আপনার প্রোফাইলে লাইক করা ভিডিও দেখান',
            'settings.blockedAccounts': 'ব্লক করা অ্যাকাউন্ট',
            'settings.blockedAccountsHint': 'ব্লক করা ইউজার ম্যানেজ করুন',
            'settings.languageRegion': 'ভাষা ও অঞ্চল',
            'settings.language': 'ভাষা',
            'settings.languageHint': 'অ্যাপের ভাষা',
            'settings.countryRegion': 'দেশ / অঞ্চল',
            'settings.accessibility': 'অ্যাক্সেসিবিলিটি',
            'settings.captions': 'ডিফল্টভাবে ক্যাপশন',
            'settings.captionsHint': 'যখন পাওয়া যাবে সাবটাইটেল দেখান',
            'settings.reducedMotion': 'রিডিউসড মোশন',
            'settings.reducedMotionHint': 'অ্যানিমেশন কমান',
            'settings.dangerZone': 'ডেঞ্জার জোন',
            'settings.deleteAccount': 'অ্যাকাউন্ট ডিলিট',
            'settings.deleteAccountHint': 'স্থায়ীভাবে আপনার অ্যাকাউন্ট ও ডেটা মুছুন',
            'settings.logout': 'লগ আউট',
            'settings.logoutHint': 'আপনার অ্যাকাউন্ট থেকে সাইন আউট করুন',
            'settings.support': 'সাপোর্ট',
            'settings.helpFaq': 'হেল্প ও FAQ',
            'settings.helpFaqHint': 'সাপোর্ট নিন',
            'settings.privacyPolicy': 'প্রাইভেসি পলিসি',
            'settings.privacyPolicyHint': 'সেবার শর্তাবলি',
            'settings.alertHistoryConfirm': 'সব ওয়াচ এবং সার্চ হিস্ট্রি মুছে ফেলবেন?',
            'settings.alertHistoryDone': 'হিস্ট্রি মুছে ফেলা হয়েছে।',
            'settings.alertCacheConfirm': 'ক্যাশড ডেটা মুছে ফেলবেন? এতে কিছু সেশন থেকে লগ আউট হতে পারেন।',
            'settings.alertCacheDone': 'ক্যাশ মুছে ফেলা হয়েছে।',
            'settings.alertBlockedAccounts': 'ব্লক করা অ্যাকাউন্ট তালিকা পরে যোগ করা হবে।',
            'account.title': 'অ্যাকাউন্ট সেটিংস',
            'account.subtitle': 'ইমেইল, পাসওয়ার্ড ও সিকিউরিটি ম্যানেজ করুন',
            'account.loginPrompt': 'আপনার অ্যাকাউন্ট, ইমেইল, পাসওয়ার্ড এবং সিকিউরিটি ম্যানেজ করতে লগ ইন করুন।',
            'account.signInInfo': 'সাইন-ইন তথ্য',
            'account.email': 'ইমেইল',
            'account.notSet': 'সেট করা নেই',
            'account.password': 'পাসওয়ার্ড',
            'account.passwordHint': 'পাসওয়ার্ড পরিবর্তন বা রিসেট করুন',
            'account.phone': 'ফোন নাম্বার',
            'account.phoneHint': 'রিকভারি ও সিকিউরিটির জন্য ফোন যোগ করুন',
            'account.security': 'সিকিউরিটি',
            'account.twoFactor': 'টু-ফ্যাক্টর অথেনটিকেশন',
            'account.twoFactorHint': 'সাইন ইন করার সময় অতিরিক্ত ধাপ',
            'account.activeSessions': 'অ্যাক্টিভ সেশন',
            'account.activeSessionsHint': 'যে ডিভাইসগুলোতে আপনি সাইন ইন আছেন',
            'account.account': 'অ্যাকাউন্ট',
            'account.personalInfo': 'পার্সোনাল তথ্য',
            'account.personalInfoHint': 'নাম, ছবি, বায়ো',
            'account.signedIn': 'সাইন ইন করা আছে',
            'account.you': 'আপনি',
            'account.changeEmailAlert': 'ইমেইল পরিবর্তন করুন। নতুন ইমেইল দিলে আমরা ভেরিফিকেশন লিংক পাঠাব। (ডেমো)',
            'account.addPhoneAlert': 'ফোন যোগ করুন। ভেরিফিকেশনের জন্য কোড পাঠানো হবে। (ডেমো)',
            'account.changePhoneAlert': 'ফোন পরিবর্তন করুন। আবার ভেরিফিকেশন লাগবে। (ডেমো)',
            'account.sessionsAlert': 'অ্যাক্টিভ সেশন এখানে ম্যানেজ করতে পারবেন। (ডেমো)'
        }
    };

    function getSaved(key, fallback) {
        try {
            return localStorage.getItem(key) || fallback;
        } catch (_) {
            return fallback;
        }
    }

    function ensureDefault(key, value) {
        try {
            if (localStorage.getItem(key) === null) {
                localStorage.setItem(key, value);
            }
        } catch (_) {}
    }

    function applyTheme() {
        var savedTheme = getSaved(THEME_KEY, THEME_DEFAULT);
        if (savedTheme === 'system') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }

    function applyDocumentLanguage() {
        var savedLanguage = getSaved(LANGUAGE_KEY, LANGUAGE_DEFAULT);
        document.documentElement.setAttribute('lang', savedLanguage);
        document.documentElement.setAttribute('dir', RTL_LANGUAGES[savedLanguage] ? 'rtl' : 'ltr');
        return savedLanguage;
    }

    function getTranslation(language, key, fallback) {
        var pack = NATIVE_TRANSLATIONS[language];
        if (pack && Object.prototype.hasOwnProperty.call(pack, key)) return pack[key];
        return fallback;
    }

    function translateNodes(language, attributeName, datasetKey, setter) {
        var nodes = document.querySelectorAll('[' + attributeName + ']');
        nodes.forEach(function(node) {
            var key = node.getAttribute(attributeName);
            if (!key) return;
            if (!node.dataset[datasetKey]) {
                node.dataset[datasetKey] = setter.get(node);
            }
            setter.set(node, getTranslation(language, key, node.dataset[datasetKey]));
        });
    }

    function applyNativeTranslations(language) {
        translateNodes(language, 'data-i18n', 'i18nDefault', {
            get: function(node) { return node.textContent; },
            set: function(node, value) { node.textContent = value; }
        });
        translateNodes(language, 'data-i18n-placeholder', 'i18nPlaceholderDefault', {
            get: function(node) { return node.getAttribute('placeholder') || ''; },
            set: function(node, value) { node.setAttribute('placeholder', value); }
        });
        translateNodes(language, 'data-i18n-title', 'i18nTitleDefault', {
            get: function(node) { return node.getAttribute('title') || ''; },
            set: function(node, value) { node.setAttribute('title', value); }
        });
        translateNodes(language, 'data-i18n-aria-label', 'i18nAriaDefault', {
            get: function(node) { return node.getAttribute('aria-label') || ''; },
            set: function(node, value) { node.setAttribute('aria-label', value); }
        });
    }

    function getPageTranslationCache() {
        if (pageTranslationCache) return pageTranslationCache;
        try {
            pageTranslationCache = JSON.parse(localStorage.getItem(PAGE_TRANSLATION_CACHE_KEY) || '{}');
        } catch (_) {
            pageTranslationCache = {};
        }
        return pageTranslationCache;
    }

    function savePageTranslationCache() {
        try {
            localStorage.setItem(PAGE_TRANSLATION_CACHE_KEY, JSON.stringify(getPageTranslationCache()));
        } catch (_) {}
    }

    function getCachedPageTranslation(language, text) {
        var cache = getPageTranslationCache();
        return cache[language] ? cache[language][text] : null;
    }

    function setCachedPageTranslation(language, text, translatedText) {
        var cache = getPageTranslationCache();
        if (!cache[language]) cache[language] = {};
        cache[language][text] = translatedText;
    }

    function isAutoTranslateSkippedElement(element) {
        if (!element) return true;
        if (element.closest('[data-no-auto-translate], .notranslate, [data-i18n], [data-i18n-placeholder], [data-i18n-title], [data-i18n-aria-label]')) return true;
        var tagName = element.tagName;
        return /^(SCRIPT|STYLE|NOSCRIPT|SVG|PATH|IMG|VIDEO|AUDIO|CANVAS|IFRAME|CODE|PRE)$/.test(tagName);
    }

    function shouldSkipAutoTranslateText(text) {
        var trimmed = (text || '').replace(/\s+/g, ' ').trim();
        if (!trimmed) return true;
        if (trimmed.length <= 1 && !/[A-Za-z\u00C0-\u024F\u0400-\u04FF\u0590-\u05FF\u0600-\u06FF]/.test(trimmed)) return true;
        if (/^[\d\s()+\-:/.%,]+$/.test(trimmed)) return true;
        if (/^[^ ]+@[^ ]+\.[^ ]+$/.test(trimmed)) return true;
        if (/^(https?:\/\/|www\.|#|\/)/i.test(trimmed)) return true;
        return false;
    }

    function rememberOriginalAttribute(node, attributeName, dataKey) {
        if (!Object.prototype.hasOwnProperty.call(node.dataset, dataKey)) {
            node.dataset[dataKey] = node.getAttribute(attributeName) || '';
        }
        return node.dataset[dataKey];
    }

    function restoreAutoTranslatedContent() {
        if (!document.body) return;
        var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
        var textNode;
        while ((textNode = walker.nextNode())) {
            if (Object.prototype.hasOwnProperty.call(textNode, '__nokOriginalText')) {
                textNode.nodeValue = textNode.__nokOriginalText;
            }
        }
        document.querySelectorAll('[data-nok-original-placeholder]').forEach(function(node) {
            node.setAttribute('placeholder', node.dataset.nokOriginalPlaceholder || '');
        });
        document.querySelectorAll('[data-nok-original-title]').forEach(function(node) {
            node.setAttribute('title', node.dataset.nokOriginalTitle || '');
        });
        document.querySelectorAll('[data-nok-original-aria-label]').forEach(function(node) {
            node.setAttribute('aria-label', node.dataset.nokOriginalAriaLabel || '');
        });
    }

    function collectAutoTranslateTargets() {
        var targets = [];
        if (!document.body) return targets;

        var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
            acceptNode: function(node) {
                if (!node.parentElement || isAutoTranslateSkippedElement(node.parentElement)) return NodeFilter.FILTER_REJECT;
                if (!Object.prototype.hasOwnProperty.call(node, '__nokOriginalText')) {
                    node.__nokOriginalText = node.nodeValue;
                }
                return shouldSkipAutoTranslateText(node.__nokOriginalText) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
            }
        });

        var textNode;
        while ((textNode = walker.nextNode())) {
            targets.push({ type: 'text', node: textNode, original: textNode.__nokOriginalText });
        }

        document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(function(node) {
            if (isAutoTranslateSkippedElement(node)) return;
            var original = rememberOriginalAttribute(node, 'placeholder', 'nokOriginalPlaceholder');
            if (shouldSkipAutoTranslateText(original)) return;
            targets.push({ type: 'attr', node: node, attribute: 'placeholder', original: original });
        });

        document.querySelectorAll('[title]').forEach(function(node) {
            if (isAutoTranslateSkippedElement(node)) return;
            var original = rememberOriginalAttribute(node, 'title', 'nokOriginalTitle');
            if (shouldSkipAutoTranslateText(original)) return;
            targets.push({ type: 'attr', node: node, attribute: 'title', original: original });
        });

        document.querySelectorAll('[aria-label]').forEach(function(node) {
            if (isAutoTranslateSkippedElement(node)) return;
            var original = rememberOriginalAttribute(node, 'aria-label', 'nokOriginalAriaLabel');
            if (shouldSkipAutoTranslateText(original)) return;
            targets.push({ type: 'attr', node: node, attribute: 'aria-label', original: original });
        });

        return targets;
    }

    function applyAutoTranslatedTargets(targets, language) {
        targets.forEach(function(target) {
            var translated = getCachedPageTranslation(language, target.original);
            if (!translated) return;
            if (target.type === 'text') target.node.nodeValue = translated;
            if (target.type === 'attr') target.node.setAttribute(target.attribute, translated);
        });
    }

    function fetchTranslatedText(text, language) {
        return fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=' + encodeURIComponent(language) + '&dt=t&q=' + encodeURIComponent(text))
            .then(function(response) {
                if (!response.ok) throw new Error('translate failed');
                return response.json();
            })
            .then(function(data) {
                if (!Array.isArray(data) || !Array.isArray(data[0])) return text;
                return data[0].map(function(part) { return part[0] || ''; }).join('') || text;
            })
            .catch(function() {
                return text;
            });
    }

    function translateMissingTexts(texts, language) {
        var uniqueTexts = [];
        var seen = {};
        texts.forEach(function(text) {
            if (seen[text]) return;
            seen[text] = true;
            if (getCachedPageTranslation(language, text)) return;
            uniqueTexts.push(text);
        });
        if (!uniqueTexts.length) return Promise.resolve();

        var queue = uniqueTexts.slice();
        var workers = [];
        var concurrency = Math.min(6, queue.length);
        function worker() {
            if (!queue.length) return Promise.resolve();
            var text = queue.shift();
            return fetchTranslatedText(text, language)
                .then(function(translated) {
                    setCachedPageTranslation(language, text, translated);
                    return worker();
                });
        }
        for (var i = 0; i < concurrency; i += 1) workers.push(worker());
        return Promise.all(workers).then(savePageTranslationCache);
    }

    function scheduleAutoPageTranslation(language) {
        window.clearTimeout(autoTranslateTimer);
        autoTranslateTimer = window.setTimeout(function() {
            applyAutoPageTranslations(language);
        }, 120);
    }

    function startAutoTranslateObserver() {
        if (autoTranslateObserver || !window.MutationObserver || !document.body) return;
        autoTranslateObserver = new MutationObserver(function() {
            if (autoTranslateApplying) return;
            var language = getSaved(LANGUAGE_KEY, LANGUAGE_DEFAULT);
            if (!language || language === 'en') return;
            scheduleAutoPageTranslation(language);
        });
        autoTranslateObserver.observe(document.body, { childList: true, subtree: true, characterData: true });
    }

    function applyAutoPageTranslations(language) {
        var requestId = ++autoTranslateRequestId;
        restoreAutoTranslatedContent();
        if (!language || language === 'en') return Promise.resolve();
        var targets = collectAutoTranslateTargets();
        if (!targets.length) return Promise.resolve();
        autoTranslateApplying = true;
        return translateMissingTexts(targets.map(function(target) { return target.original; }), language)
            .then(function() {
                if (requestId !== autoTranslateRequestId) return;
                applyAutoTranslatedTargets(targets, language);
            })
            .finally(function() {
                autoTranslateApplying = false;
            });
    }

    function ensureTranslateStyles() {
        if (document.getElementById(TRANSLATE_STYLE_ID)) return;
        var style = document.createElement('style');
        style.id = TRANSLATE_STYLE_ID;
        style.textContent = ''
            + 'body{top:0!important;}'
            + 'iframe.goog-te-banner-frame,.goog-te-banner-frame,.goog-te-balloon-frame{display:none!important;}'
            + 'body>.skiptranslate{display:none!important;}'
            + '#goog-gt-tt,.goog-tooltip,.goog-tooltip:hover{display:none!important;}';
        document.head.appendChild(style);
    }

    function syncTranslatedLayout(language) {
        var isRtl = !!RTL_LANGUAGES[language];
        document.documentElement.classList.toggle('translated-ltr', !!language && language !== 'en' && !isRtl);
        document.documentElement.classList.toggle('translated-rtl', !!language && language !== 'en' && isRtl);
        if (document.body) document.body.style.top = '0px';
    }

    function setGoogleTranslateCookie(language) {
        if (!language || language === 'en') return;
        try {
            var cookieValue = '/en/' + language;
            document.cookie = 'googtrans=' + cookieValue + ';path=/';
            if (window.location.hostname) {
                document.cookie = 'googtrans=' + cookieValue + ';path=/;domain=' + window.location.hostname;
            }
        } catch (_) {}
    }

    function clearGoogleTranslateCookie() {
        try {
            document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
            document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            if (window.location.hostname) {
                document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + window.location.hostname;
                document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=' + window.location.hostname;
            }
        } catch (_) {}
    }

    function ensureTranslateHost() {
        var host = document.getElementById('nok-google-translate-host');
        if (host) return host;
        host = document.createElement('div');
        host.id = 'nok-google-translate-host';
        host.setAttribute('aria-hidden', 'true');
        host.style.position = 'fixed';
        host.style.left = '-9999px';
        host.style.bottom = '0';
        host.style.width = '1px';
        host.style.height = '1px';
        host.style.overflow = 'hidden';
        (document.body || document.documentElement).appendChild(host);
        return host;
    }

    function flushTranslateCallbacks() {
        var callbacks = translateCallbacks.slice();
        translateCallbacks = [];
        callbacks.forEach(function(callback) {
            try {
                callback();
            } catch (_) {}
        });
    }

    function initializeGoogleTranslate() {
        if (translateWidgetInitialized) {
            flushTranslateCallbacks();
            return;
        }
        if (!(window.google && window.google.translate && window.google.translate.TranslateElement)) return;
        ensureTranslateStyles();
        var host = ensureTranslateHost();
        if (!host) return;
        translateWidgetInitialized = true;
        new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
        }, host.id);
        flushTranslateCallbacks();
    }

    function loadGoogleTranslate(callback) {
        if (callback) translateCallbacks.push(callback);
        if (window.google && window.google.translate && window.google.translate.TranslateElement) {
            initializeGoogleTranslate();
            return;
        }
        if (translateScriptLoading) return;
        translateScriptLoading = true;
        window.nokGoogleTranslateInit = function() {
            translateScriptLoading = false;
            initializeGoogleTranslate();
        };
        var script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=nokGoogleTranslateInit';
        script.async = true;
        script.onerror = function() {
            translateScriptLoading = false;
            translateCallbacks = [];
        };
        document.head.appendChild(script);
    }

    function waitForTranslateCombo(language, attempt) {
        var combo = document.querySelector('.goog-te-combo');
        if (combo) {
            combo.value = language;
            combo.dispatchEvent(new Event('change'));
            syncTranslatedLayout(language);
            window.setTimeout(function() { syncTranslatedLayout(language); }, 400);
            window.setTimeout(function() { syncTranslatedLayout(language); }, 1200);
            return;
        }
        if (attempt >= 40) return;
        window.setTimeout(function() {
            waitForTranslateCombo(language, attempt + 1);
        }, 250);
    }

    function restoreOriginalLanguage() {
        clearGoogleTranslateCookie();
        document.documentElement.classList.remove('translated-ltr');
        document.documentElement.classList.remove('translated-rtl');
        if (document.body) document.body.style.top = '0px';
        var combo = document.querySelector('.goog-te-combo');
        if (combo && combo.value) {
            combo.selectedIndex = 0;
            combo.dispatchEvent(new Event('change'));
        }
        var bannerFrame = document.querySelector('iframe.goog-te-banner-frame');
        if (bannerFrame) window.location.reload();
    }

    function applyGoogleLanguage(language) {
        if (!language || language === 'en') {
            restoreOriginalLanguage();
            return;
        }
        setGoogleTranslateCookie(language);
        loadGoogleTranslate(function() {
            waitForTranslateCombo(language, 0);
        });
    }

    function applyLanguage() {
        var savedLanguage = applyDocumentLanguage();
        ensureTranslateStyles();
        syncTranslatedLayout(savedLanguage);
        applyNativeTranslations(savedLanguage);
        startAutoTranslateObserver();
        applyAutoPageTranslations(savedLanguage);
    }

    ensureDefault(THEME_KEY, THEME_DEFAULT);
    ensureDefault(LANGUAGE_KEY, LANGUAGE_DEFAULT);
    applyTheme();
    applyDocumentLanguage();

    window.nokApplyTheme = applyTheme;
    window.nokApplyLanguage = applyLanguage;
    window.nokT = function(key, fallback) {
        return getTranslation(getSaved(LANGUAGE_KEY, LANGUAGE_DEFAULT), key, fallback);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyLanguage);
    } else {
        applyLanguage();
    }

    window.addEventListener('storage', function(event) {
        if (event.key === THEME_KEY) applyTheme();
        if (event.key === LANGUAGE_KEY) applyLanguage();
    });
})();

/* Global Android back navigation
   - Each page back goes one step back (web history)
   - When you reach welcome page (`index.html`) and press back again, app closes
*/
(function () {
    function isWelcomePage() {
        try {
            var u = (window.location && window.location.href) ? window.location.href : '';
            return /(?:^|\/)index\.html(?:\?|#|$)/i.test(u);
        } catch (e) {
            return false;
        }
    }

    function installBackListener() {
        try {
            var cap = window.Capacitor;
            var appPlugin = cap && cap.Plugins && cap.Plugins.App;
            if (!appPlugin || typeof appPlugin.addListener !== 'function') return;

            appPlugin.addListener('backButton', function (evt) {
                var canGoBack = !!(evt && evt.canGoBack);

                // Welcome page: back again => close app
                if (isWelcomePage()) {
                    try {
                        // First back: stay on welcome (arm). Second back: exit.
                        if (!window.__nokWelcomeBackPressed) {
                            window.__nokWelcomeBackPressed = true;
                            // Keep it in history.
                            try { history.pushState({}, '', window.location.href); } catch (e2) { }
                            return;
                        }
                        window.__nokWelcomeBackPressed = false;
                        if (typeof appPlugin.exitApp === 'function') appPlugin.exitApp();
                    } catch (e) { }
                    return;
                }

                // Normal pages: go back one step if web history allows
                try { window.__nokWelcomeBackPressed = false; } catch (e0) { }
                if (canGoBack) {
                    try { history.back(); } catch (e2) { }
                    return;
                }

                // If web history can't go back, jump to welcome page
                try { window.location.replace('index.html'); } catch (e3) { window.location.href = 'index.html'; }
            });
        } catch (e) { }
    }

    // Install when Capacitor is ready
    try {
        document.addEventListener('deviceready', installBackListener, { once: true });
    } catch (e) { }
    // Fallback for slow init
    try { setTimeout(installBackListener, 600); } catch (e2) { }

    // Legacy fallback (won't close app; only navigates)
    try {
        document.addEventListener('backbutton', function (ev) {
            try { if (ev && ev.preventDefault) ev.preventDefault(); } catch (e) { }

            if (isWelcomePage()) return; // allow native to handle/exit
            try {
                if (history && history.length > 1) history.back();
                else window.location.replace('index.html');
            } catch (e2) { window.location.replace('index.html'); }
        }, false);
    } catch (e3) { }
})();
