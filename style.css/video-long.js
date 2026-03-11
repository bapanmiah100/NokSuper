(function() {
    function updateVideoAuthView() {
        var isLoggedIn = (sessionStorage.getItem('nokAuth') === 'loggedIn') || (localStorage.getItem('nokAuth') === 'loggedIn');
        var profileWrap = document.getElementById('long-video-profile-wrap');
        var authBtns = document.getElementById('long-video-auth-btns');
        if (profileWrap) profileWrap.style.display = isLoggedIn ? 'flex' : 'none';
        if (authBtns) authBtns.style.display = isLoggedIn ? 'none' : 'flex';
        var avatarEl = document.getElementById('long-video-avatar');
        if (avatarEl && isLoggedIn) {
            var name = (localStorage.getItem('nokUserChannel') || sessionStorage.getItem('nokUserEmail') || 'You').toString().trim();
            var initial = name ? name.charAt(0).toUpperCase() : '?';
            var photoUrl = localStorage.getItem('nokUserPhotoUrl') || '';
            if (photoUrl) {
                avatarEl.innerHTML = '<img src="' + photoUrl.replace(/"/g, '&quot;') + '" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover">';
            } else {
                avatarEl.textContent = initial;
            }
        }
    }
    updateVideoAuthView();
    window.addEventListener('pageshow', function() { updateVideoAuthView(); });

    var params = new URLSearchParams(window.location.search);
    var id = params.get('id') || 'mountains';
    var shortOnlyIds = ['night', 'hike', 'beach', 'citywalk', 'dance', 'lights'];
    var nokShortsVideos = JSON.parse(localStorage.getItem('nokShortsVideos') || '[]');
    var shortsIdSet = {};
    nokShortsVideos.forEach(function(s) { shortsIdSet[s.id] = true; });
    if (shortOnlyIds.indexOf(id) >= 0 || shortsIdSet[id]) {
        window.location.replace('shorts.html?id=' + encodeURIComponent(id));
        return;
    }
    var videoEl = document.getElementById('video-player-el');
    var playBtn = document.getElementById('video-play');
    var playerBg = document.getElementById('video-player');
    var titleEl = document.getElementById('video-title');
    var timeCurrent = document.getElementById('video-time-current');
    var timeDurationEl = document.getElementById('video-time-duration');
    var progressBar = document.getElementById('video-progress-bar');
    var progressThumb = document.getElementById('progress-thumb');
    var progressWrap = document.getElementById('progress-wrap');
    var controlPlayPause = document.getElementById('control-play-pause');
    var controlsWrap = document.querySelector('.long-video__player-controls');
    var channelNameEl = document.getElementById('video-channel-name');
    var tagsEl = document.getElementById('video-tags');
    var descEl = document.getElementById('video-desc');
    var descWrap = document.getElementById('video-desc-wrap');
    var descMoreBtn = document.getElementById('video-desc-more');
    var chatMessagesEl = document.getElementById('video-chat-messages');
    var likeCountEl = document.getElementById('video-like-count');
    var commentCountEl = document.getElementById('video-comment-count');

    (function initHeaderDrawer() {
        var menuBtn = document.getElementById('header-menu-btn');
        var drawer = document.getElementById('header-drawer');
        var backdrop = document.getElementById('header-drawer-backdrop');
        var closeBtn = document.getElementById('header-drawer-close');
        if (!menuBtn && !drawer) return;
        function openDrawer(e) {
            if (e) e.preventDefault();
            if (drawer) { drawer.classList.add('header-drawer--open'); drawer.setAttribute('aria-hidden', 'false'); }
            if (backdrop) { backdrop.classList.add('header-drawer-backdrop--open'); backdrop.setAttribute('aria-hidden', 'false'); }
        }
        function closeDrawer() {
            if (drawer) { drawer.classList.remove('header-drawer--open'); drawer.setAttribute('aria-hidden', 'true'); }
            if (backdrop) { backdrop.classList.remove('header-drawer-backdrop--open'); backdrop.setAttribute('aria-hidden', 'true'); }
        }
        if (menuBtn) menuBtn.addEventListener('click', function(e) { e.stopPropagation(); openDrawer(e); });
        if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
        if (backdrop) backdrop.addEventListener('click', closeDrawer);
    })();

    function formatCount(n) {
        if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
        if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
        return String(n);
    }

    var defaultComments = [
        { user: 'Phoebe', avatar: 'P', text: 'Hi, stunning!' },
        { user: 'Dennis', avatar: 'D', text: 'Wow!' },
        { user: 'Robert', avatar: 'R', text: 'Amazing!' },
        { user: 'Alex', avatar: 'A', text: 'Love this video, keep it up!' },
        { user: 'Sam', avatar: 'S', text: 'So good, shared with friends.' },
        { user: 'Maya', avatar: 'M', text: 'Waiting for more content like this.' },
        { user: 'Jay', avatar: 'J', text: 'Best one so far, respect!' },
        { user: 'Kira', avatar: 'K', text: 'Subscribed. Don\'t stop posting.' }
    ];
    var data = {
        mountains: { title: 'Dreamy Expedition', channel: 'A2Zzen', category: 'nature', likeCount: 120000, hashtags: '#travel #nature #adventure #mountains #hiking #explore', desc: 'A breathtaking journey through the mountains. This video takes you on an epic adventure across snow-capped peaks, hidden valleys, and stunning landscapes. We spent weeks capturing the best sunrise and sunset shots. Perfect for anyone who loves travel and nature. Don\'t forget to like, comment, and subscribe for more!', thumb: 'mountains', sampleUrl: 0, maxQuality: 1080, comments: [
            { user: 'Riya', avatar: 'R', text: 'So peaceful, exactly what I needed.' },
            { user: 'Amit', avatar: 'A', text: 'Dreamy Expedition is the best title for this!' },
            { user: 'Sneha', avatar: 'S', text: 'Mountains never disappoint. Great video.' },
            { user: 'Test User', avatar: 'T', text: 'Test comment – logic working fine.' }
        ]},
        waterfall: { title: 'Ocean Mysteries', channel: 'A2Zzen', category: 'ocean', likeCount: 85000, hashtags: '#ocean #nature #deep #waves', desc: 'Dive into the deep blue. Ocean life and waves.', thumb: 'waterfall', sampleUrl: 1, maxQuality: 2160, comments: [
            { user: 'OceanFan', avatar: 'O', text: 'Ocean vibes are unreal here.' },
            { user: 'Deepa', avatar: 'D', text: 'Mysteries of the deep – love it!' },
            { user: 'Test User', avatar: 'T', text: 'Test comment for Ocean video.' }
        ]},
        city: { title: 'Cyber City Lights', channel: 'A2Zzen', category: 'city', likeCount: 210000, hashtags: '#cyber #city #lights #neon', desc: 'Neon nights and city vibes.', thumb: 'city', sampleUrl: 2, maxQuality: 1080, comments: [
            { user: 'NeonLover', avatar: 'N', text: 'Cyber City Lights – fire!' },
            { user: 'Rahul', avatar: 'R', text: 'Night drive vibes. Perfect.' },
            { user: 'Test User', avatar: 'T', text: 'Test comment – city page logic ok.' }
        ]},
        wild: { title: 'Mystic Forest', channel: 'A2Zzen', category: 'nature', likeCount: 95000, hashtags: '#forest #wildlife #nature', desc: 'Explore the mystic forest and wildlife.', thumb: 'wild', sampleUrl: 3, maxQuality: 2160, comments: [
            { user: 'NatureBoy', avatar: 'N', text: 'Mystic Forest is my favourite.' },
            { user: 'Priya', avatar: 'P', text: 'So green and calming.' },
            { user: 'Test User', avatar: 'T', text: 'Test comment for forest video.' }
        ]},
        portrait: { title: 'Desert Adventure', channel: 'A2Zzen', category: 'travel', likeCount: 62000, hashtags: '#desert #adventure #travel', desc: 'Desert dunes and adventure.', thumb: 'portrait', sampleUrl: 4, maxQuality: 1080, comments: [
            { user: 'DesertWalker', avatar: 'D', text: 'Desert Adventure delivered. Subscribed!' },
            { user: 'Vikram', avatar: 'V', text: 'Dunes look incredible.' },
            { user: 'Test User', avatar: 'T', text: 'Test comment – desert logic works.' }
        ]},
        sunset: { title: 'Sunset Vibes', channel: 'NOK Demo', category: 'nature', likeCount: 78000, hashtags: '#sunset #nature #vibes', desc: 'Relaxing sunset views from the coast. Perfect for testing demo videos.', thumb: 'mountains', sampleUrl: 0, maxQuality: 1080, comments: [
            { user: 'Demo', avatar: 'D', text: 'Nice demo for testing!' }
        ]},
        river: { title: 'River Journey', channel: 'NOK Demo', category: 'nature', likeCount: 54000, hashtags: '#river #nature #journey', desc: 'A calm journey along the river. Demo video for testing.', thumb: 'waterfall', sampleUrl: 1, maxQuality: 1080, comments: [
            { user: 'Tester', avatar: 'T', text: 'Good for testing related videos.' }
        ]},
        tech: { title: 'Tech Review 2024', channel: 'NOK Demo', category: 'tech', likeCount: 125000, hashtags: '#tech #review #gadgets', desc: 'Quick tech review – demo content for testing the video page.', thumb: 'city', sampleUrl: 2, maxQuality: 1080, comments: [
            { user: 'TechFan', avatar: 'T', text: 'Demo video works!' }
        ]},
        food: { title: 'Street Food Tour', channel: 'NOK Demo', category: 'food', likeCount: 92000, hashtags: '#food #streetfood #tour', desc: 'Street food tour – demo video for testing.', thumb: 'wild', sampleUrl: 3, maxQuality: 1080, comments: [
            { user: 'Foodie', avatar: 'F', text: 'Testing comments here.' }
        ]},
        vlog: { title: 'Day in My Life', channel: 'NOK Demo', category: 'vlog', likeCount: 45000, hashtags: '#vlog #lifestyle #daily', desc: 'A day in my life – demo vlog for testing.', thumb: 'portrait', sampleUrl: 4, maxQuality: 1080, comments: [
            { user: 'Viewer', avatar: 'V', text: 'Demo content for testing.' }
        ]}
    };
    var videoOrder = ['mountains', 'waterfall', 'city', 'wild', 'portrait', 'sunset', 'river', 'tech', 'food', 'vlog'];

    var sampleUrls = [
        'https://lorem.video/720p',
        'https://lorem.video/720p_h264_10s',
        'https://lorem.video/cat_720p',
        'https://lorem.video/corgi_720p',
        'https://lorem.video/test_720p'
    ];

    var userVideos = JSON.parse(localStorage.getItem('nokUserVideos') || '[]');
    var userMap = {};
    userVideos.forEach(function(v) {
        userMap[v.id] = { title: v.title, channel: v.channel || 'A2Zzen', category: v.category || 'general', likeCount: v.likeCount != null ? v.likeCount : 0, hashtags: v.hashtags || '', desc: v.desc || ('Watch ' + v.title + '...'), thumb: v.thumb || 'mountains', thumbData: v.thumbData, maxQuality: v.maxQuality || 1080 };
    });
    var libraryFiles = (function() { try { return JSON.parse(localStorage.getItem('nokLibraryFiles') || '[]'); } catch (e) { return []; } })();
    libraryFiles.forEach(function(f) {
        var fid = f.id || f.name;
        if (fid) userMap[fid] = { title: f.name || fid, channel: 'My Library', category: 'library', likeCount: 0, hashtags: '', desc: 'Added from your device.', thumb: 'mountains', maxQuality: 1080 };
    });
    var userLongIds = userVideos.filter(function(v) { return !shortsIdSet[v.id]; }).map(function(v) { return v.id; });
    var libraryIds = libraryFiles.map(function(f) { return f.id || f.name; }).filter(Boolean);
    var fullVideoList = videoOrder.concat(userLongIds).concat(libraryIds);
    var playMode = (function() {
        try {
            var s = localStorage.getItem('nokPlayMode');
            if (s === 'off' || s === 'autoNext' || s === 'autoRewind' || s === 'mix') return s;
        } catch (e) {}
        return 'off';
    })();

    var info = userMap[id] || data[id] || data.mountains;

    function escapeHtml(s) {
        if (!s) return '';
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }
    function renderComments(comments) {
        if (!comments || !comments.length) return '<div class="long-video__chat-msg"><div class="long-video__chat-body"><span class="long-video__chat-text">No comments yet. Be the first!</span></div></div>';
        return comments.map(function(c) {
            var commentId = c.id || '';
            var replies = getRepliesForComment(commentId);
            if (c.type === 'super') {
                var name = escapeHtml(c.name || c.user || 'Viewer');
                var text = escapeHtml(c.text || '');
                var avatar = escapeHtml((name ? name.charAt(0) : '?').toString());
                var pending = c.status === 'pending';
                var extra = ' <span class="long-video__chat-super-badge">Super</span>' + (pending ? ' <span class="long-video__chat-pending">Pending</span> <button type="button" class="long-video__chat-approve" data-super-id="' + escapeHtml(c.superId) + '">Approve</button>' : '');
                var replyHtml = '<div class="long-video__chat-replies" data-comment-id="' + escapeHtml(commentId) + '">' + (replies.length ? replies.map(function(r) {
                    var ru = escapeHtml(r.user || ''); var rt = escapeHtml(r.text || ''); var ra = escapeHtml((r.avatar || (ru ? ru.charAt(0) : '?')).toString());
                    return '<div class="long-video__chat-msg long-video__chat-msg--reply"><span class="long-video__chat-avatar">' + ra + '</span><div class="long-video__chat-body">' + (ru ? '<span class="long-video__chat-user">' + ru + ':</span> ' : '') + '<span class="long-video__chat-text">' + rt + '</span></div></div>';
                }).join('') : '') + '</div><div class="long-video__chat-reply-form" data-comment-id="' + escapeHtml(commentId) + '" style="display:none"><input type="text" class="long-video__chat-reply-input" placeholder="Write a reply..." maxlength="200"><button type="button" class="long-video__chat-reply-send">Reply</button></div>';
                return '<div class="long-video__chat-msg long-video__chat-msg--super" data-comment-id="' + escapeHtml(commentId) + '"><span class="long-video__chat-avatar">' + avatar + '</span><div class="long-video__chat-body">' + (name ? '<span class="long-video__chat-user">' + name + ':</span> ' : '') + extra + '<span class="long-video__chat-text">' + text + '</span>' + (c.amount != null ? ' <span class="long-video__chat-super-meta">$' + c.amount + ' · ' + (c.timeLabel || '') + '</span>' : '') + ' <button type="button" class="long-video__chat-reply-btn">Reply</button>' + replyHtml + '</div></div>';
            }
            var user = escapeHtml(c.user || '');
            var text = escapeHtml(c.text || '');
            var avatar = escapeHtml((c.avatar || (user ? user.charAt(0) : '?')).toString());
            var replyHtml = '<div class="long-video__chat-replies" data-comment-id="' + escapeHtml(commentId) + '">' + (replies.length ? replies.map(function(r) {
                var ru = escapeHtml(r.user || ''); var rt = escapeHtml(r.text || ''); var ra = escapeHtml((r.avatar || (ru ? ru.charAt(0) : '?')).toString());
                return '<div class="long-video__chat-msg long-video__chat-msg--reply"><span class="long-video__chat-avatar">' + ra + '</span><div class="long-video__chat-body">' + (ru ? '<span class="long-video__chat-user">' + ru + ':</span> ' : '') + '<span class="long-video__chat-text">' + rt + '</span></div></div>';
            }).join('') : '') + '</div><div class="long-video__chat-reply-form" data-comment-id="' + escapeHtml(commentId) + '" style="display:none"><input type="text" class="long-video__chat-reply-input" placeholder="Write a reply..." maxlength="200"><button type="button" class="long-video__chat-reply-send">Reply</button></div>';
            return '<div class="long-video__chat-msg" data-comment-id="' + escapeHtml(commentId) + '"><span class="long-video__chat-avatar">' + avatar + '</span><div class="long-video__chat-body">' + (user ? '<span class="long-video__chat-user">' + user + ':</span> ' : '') + '<span class="long-video__chat-text">' + text + '</span> <button type="button" class="long-video__chat-reply-btn">Reply</button>' + replyHtml + '</div></div>';
        }).join('');
    }

    var STORAGE_COMMENTS_KEY = 'nokVideoComments';
    var STORAGE_REPLIES_KEY = 'nokVideoReplies';
    var STORAGE_LIKES_KEY = 'nokVideoLikes';
    var STORAGE_REACTIONS_KEY = 'nokVideoReactions';
    var STORAGE_SAVED_VIDEOS_KEY = 'nokSavedVideos';
    var STORAGE_WATCH_LATER_KEY = 'nokWatchLater';
    var STORAGE_SUBSCRIBED_KEY = 'nokSubscribedChannels';
    var STORAGE_LONG_SUPER_KEY = 'nokLongSuperComments';
    function getLongSuperComments() { try { return JSON.parse(localStorage.getItem(STORAGE_LONG_SUPER_KEY) || '{}'); } catch (e) { return {}; } }
    function getStoredReplies() { try { return JSON.parse(localStorage.getItem(STORAGE_REPLIES_KEY) || '{}'); } catch (e) { return {}; } }
    function addStoredReply(videoId, parentId, reply) {
        var all = getStoredReplies();
        if (!all[videoId]) all[videoId] = {};
        if (!all[videoId][parentId]) all[videoId][parentId] = [];
        all[videoId][parentId].push(reply);
        try { localStorage.setItem(STORAGE_REPLIES_KEY, JSON.stringify(all)); } catch (e) {}
    }
    function setLongSuperComments(obj) { try { localStorage.setItem(STORAGE_LONG_SUPER_KEY, JSON.stringify(obj)); } catch (e) {} }
    function getSubscribedChannels() {
        try { return JSON.parse(localStorage.getItem(STORAGE_SUBSCRIBED_KEY) || '[]'); } catch (e) { return []; }
    }
    function isChannelSubscribed(channelName) {
        return getSubscribedChannels().indexOf(channelName) >= 0;
    }
    function subscribeToChannel(channelName) {
        var list = getSubscribedChannels();
        if (list.indexOf(channelName) < 0) { list.push(channelName); localStorage.setItem(STORAGE_SUBSCRIBED_KEY, JSON.stringify(list)); }
    }
    function unsubscribeFromChannel(channelName) {
        var list = getSubscribedChannels().filter(function(c) { return c !== channelName; });
        localStorage.setItem(STORAGE_SUBSCRIBED_KEY, JSON.stringify(list));
    }
    var channelSubscribers = { 'A2Zzen': 2500000, 'NOK Demo': 580000 };
    function getChannelSubCount(name) { return channelSubscribers[name] != null ? channelSubscribers[name] : 0; }
    function formatSubCount(n) {
        if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
        if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
        return String(n);
    }
    function renderSubscriptionsList() {
        var el = document.getElementById('video-subscriptions-list');
        if (!el) return;
        var list = getSubscribedChannels();
        if (!list.length) {
            el.innerHTML = '<p class="long-video__subscribed-empty">Subscribe to channels to see them here.</p>';
            return;
        }
        var sorted = list.slice().sort(function(a, b) { return getChannelSubCount(b) - getChannelSubCount(a); });
        el.innerHTML = sorted.map(function(ch) {
            var letter = (ch && ch.charAt(0)) ? ch.charAt(0).toUpperCase() : '?';
            var subStr = formatSubCount(getChannelSubCount(ch));
            return '<a href="#" class="long-video__subscribed-channel" data-channel="' + escapeHtml(ch) + '" title="' + escapeHtml(ch) + '">' +
                '<span class="long-video__subscribed-channel-avatar">' + escapeHtml(letter) + '</span>' +
                '<span class="long-video__subscribed-channel-name">' + escapeHtml(ch) + '</span>' +
                '<span class="long-video__subscribed-channel-subs">' + escapeHtml(subStr) + ' subs</span></a>';
        }).join('');
    }
    function getStoredComments() {
        try { return JSON.parse(localStorage.getItem(STORAGE_COMMENTS_KEY) || '{}'); } catch (e) { return {}; }
    }
    function getStoredLikes() {
        try { return JSON.parse(localStorage.getItem(STORAGE_LIKES_KEY) || '{}'); } catch (e) { return {}; }
    }
    function setStoredLike(videoId, liked) {
        var all = getStoredLikes();
        all[videoId] = !!liked;
        try { localStorage.setItem(STORAGE_LIKES_KEY, JSON.stringify(all)); } catch (e) {}
    }
    function getStoredReactions() {
        try { return JSON.parse(localStorage.getItem(STORAGE_REACTIONS_KEY) || '{}'); } catch (e) { return {}; }
    }
    function setStoredReaction(videoId, reaction) {
        var all = getStoredReactions();
        if (reaction) all[videoId] = reaction; else delete all[videoId];
        try { localStorage.setItem(STORAGE_REACTIONS_KEY, JSON.stringify(all)); } catch (e) {}
    }
    function getStoredSavedVideos() {
        try { return JSON.parse(localStorage.getItem(STORAGE_SAVED_VIDEOS_KEY) || '[]'); } catch (e) { return []; }
    }
    function isVideoSaved(videoId) {
        return getStoredSavedVideos().indexOf(videoId) >= 0;
    }
    function setVideoSaved(videoId, saved) {
        var list = getStoredSavedVideos();
        var i = list.indexOf(videoId);
        if (saved && i < 0) list.push(videoId);
        else if (!saved && i >= 0) list.splice(i, 1);
        try { localStorage.setItem(STORAGE_SAVED_VIDEOS_KEY, JSON.stringify(list)); } catch (e) {}
    }
    function getStoredWatchLater() {
        try { return JSON.parse(localStorage.getItem(STORAGE_WATCH_LATER_KEY) || '[]'); } catch (e) { return []; }
    }
    function isVideoWatchLater(videoId) {
        return getStoredWatchLater().indexOf(videoId) >= 0;
    }
    function setVideoWatchLater(videoId, add) {
        var list = getStoredWatchLater();
        var i = list.indexOf(videoId);
        if (add && i < 0) list.push(videoId);
        else if (!add && i >= 0) list.splice(i, 1);
        try { localStorage.setItem(STORAGE_WATCH_LATER_KEY, JSON.stringify(list)); } catch (e) {}
    }
    function getMergedCommentsForCurrentVideo() {
        var base = (info.comments || defaultComments).map(function(c, i) {
            return { id: 'b' + i, user: c.user, avatar: c.avatar, text: c.text, type: c.type };
        });
        var stored = (getStoredComments()[id] || []).map(function(c, i) {
            return { id: c.id || ('c' + i), user: c.user, avatar: c.avatar, text: c.text };
        });
        var superList = (getLongSuperComments()[id] || []).map(function(s, i) {
            return { type: 'super', id: 'super' + i, superId: s.id, name: s.name, user: s.name, text: s.text, status: s.status, amount: s.amount, timeLabel: s.timeLabel };
        });
        return base.concat(stored).concat(superList);
    }
    function getRepliesForComment(commentId) {
        var replies = getStoredReplies()[id] || {};
        return replies[commentId] || [];
    }
    function saveStoredComment(videoId, comment) {
        var all = getStoredComments();
        if (!all[videoId]) all[videoId] = [];
        if (!comment.id) comment.id = 'c' + Date.now();
        all[videoId].push(comment);
        try { localStorage.setItem(STORAGE_COMMENTS_KEY, JSON.stringify(all)); } catch (e) {}
    }
    function refreshCommentsDisplay() {
        if (chatMessagesEl) chatMessagesEl.innerHTML = renderComments(getMergedCommentsForCurrentVideo());
        updateLikeAndCommentCounts();
    }
    function updateLikeAndCommentCounts() {
        var baseLikes = (info.likeCount != null ? Number(info.likeCount) : 0) || 0;
        var isLoggedIn = (sessionStorage.getItem('nokAuth') === 'loggedIn') || (localStorage.getItem('nokAuth') === 'loggedIn');
        var userLiked = isLoggedIn && getStoredLikes()[id];
        if (likeCountEl) likeCountEl.textContent = formatCount(baseLikes + (userLiked ? 1 : 0));
        var merged = getMergedCommentsForCurrentVideo();
        var replyCount = 0;
        merged.forEach(function(c) { replyCount += (getRepliesForComment(c.id) || []).length; });
        var commentCount = merged.length + replyCount;
        if (commentCountEl) commentCountEl.textContent = formatCount(commentCount);
    }

    var moreGridEl = document.getElementById('video-more-grid');
    var thumbToMoreClass = { mountains: 'mountains', waterfall: 'ocean', city: 'city', wild: 'forest', portrait: 'desert' };
    var shortsThumbToClass = { night: 'mountains', hike: 'forest', beach: 'ocean', citywalk: 'city', dance: 'mountains', lights: 'desert', portrait: 'desert', 'short-portrait': 'desert' };
    function getThumbUrl(item, itemId, w, h) {
        var url = (item && item.thumbData) ? item.thumbData : 'https://picsum.photos/seed/' + encodeURIComponent(String(itemId || 'nok')) + '/' + (w || 320) + '/' + (h || 180);
        return url.replace(/"/g, '&quot;');
    }
    function getThumbStyle(item, itemId, w, h) {
        var url = getThumbUrl(item, itemId, w, h);
        return ' style="background-image:url(' + url + ');background-size:cover;background-position:center"';
    }
    function getSameCategoryVideoIds() {
        var currentInfo = userMap[id] || data[id] || data.mountains;
        var cat = currentInfo.category || 'general';
        var same = fullVideoList.filter(function(vid) {
            if (vid === id) return false;
            var inf = userMap[vid] || data[vid];
            return inf && (inf.category || 'general') === cat;
        });
        if (same.length === 0) same = fullVideoList.filter(function(vid) { return vid !== id; });
        return same.slice(0, 8);
    }
    function renderMoreLikeThis() {
        if (!moreGridEl) return;
        var ids = getSameCategoryVideoIds();
        var html = ids.map(function(vidId) {
            var inf = userMap[vidId] || data[vidId] || data.mountains;
            var thumbClass = 'long-video__more-thumb';
            var title = escapeHtml(inf.title || vidId);
            var views = (inf.views != null ? inf.views : '18 views') + '';
            if (views && /^\d+$/.test(views)) views = views + ' views';
            var thumbStyle = getThumbStyle(inf, vidId, 320, 180);
            return '<a href="video.html?id=' + encodeURIComponent(vidId) + '" class="long-video__more-item"><div class="long-video__more-thumb ' + thumbClass + '"' + thumbStyle + '></div><span class="long-video__more-title">' + title + '</span><span class="long-video__more-views">' + escapeHtml(views) + '</span></a>';
        }).join('');
        moreGridEl.innerHTML = html || '<span class="long-video__more-views">No other videos in this category.</span>';
    }

    var creatorUploadsSectionEl = document.getElementById('video-creator-uploads-section');
    var creatorUploadsGridEl = document.getElementById('video-creator-uploads-grid');
    var creatorUploadsTitleEl = document.getElementById('video-creator-uploads-title');
    function getCreatorUploadIds() {
        var channel = (info && info.channel) ? info.channel : 'A2Zzen';
        var fromChannel = fullVideoList.filter(function(vid) {
            if (vid === id) return false;
            var inf = userMap[vid] || data[vid];
            return inf && (inf.channel || 'A2Zzen') === channel;
        });
        var shortsFromChannel = (nokShortsVideos || []).filter(function(s) {
            return (s.channel || '') === channel && s.id !== id;
        }).map(function(s) { return { id: s.id, isShort: true, title: s.title || s.id, thumb: s.thumb, thumbData: s.thumbData, views: s.views || '0 views' }; });
        var longIds = fromChannel.slice(0, 12);
        var shortItems = shortsFromChannel.slice(0, 6);
        return { long: longIds, shorts: shortItems };
    }
    function renderCreatorUploads() {
        if (!creatorUploadsGridEl) return;
        var creatorInfo = getCreatorUploadIds();
        var channelName = (info && info.channel) ? info.channel : 'A2Zzen';
        if (creatorUploadsTitleEl) creatorUploadsTitleEl.textContent = 'From this creator';
        var parts = [];
        creatorInfo.long.forEach(function(vidId) {
            var inf = userMap[vidId] || data[vidId] || data.mountains;
            var thumbClass = 'long-video__creator-upload-thumb';
            var title = escapeHtml(inf.title || vidId);
            var views = (inf.views != null ? inf.views : '18 views') + '';
            if (views && /^\d+$/.test(views)) views = views + ' views';
            var thumbStyle = getThumbStyle(inf, vidId, 320, 180);
            parts.push('<a href="video.html?id=' + encodeURIComponent(vidId) + '" class="long-video__creator-upload-card"><div class="long-video__creator-upload-thumb ' + thumbClass + '"' + thumbStyle + '></div><span class="long-video__creator-upload-title">' + title + '</span><span class="long-video__creator-upload-views">' + escapeHtml(views) + '</span></a>');
        });
        creatorInfo.shorts.forEach(function(s) {
            var thumbClass = 'long-video__creator-upload-thumb long-video__more-thumb';
            var thumbStyle = getThumbStyle(s, s.id, 180, 320);
            var title = escapeHtml(s.title || s.id);
            var views = (s.views != null ? s.views : '0 views') + '';
            if (views && /^\d+$/.test(views)) views = views + ' views';
            parts.push('<a href="shorts.html?id=' + encodeURIComponent(s.id) + '" class="long-video__creator-upload-card long-video__creator-upload-card--short"><div class="long-video__creator-upload-thumb ' + thumbClass + '"' + thumbStyle + '></div><span class="long-video__creator-upload-badge">Short</span><span class="long-video__creator-upload-title">' + title + '</span><span class="long-video__creator-upload-views">' + escapeHtml(views) + '</span></a>');
        });
        if (parts.length === 0) {
            if (creatorUploadsSectionEl) creatorUploadsSectionEl.style.display = 'none';
            return;
        }
        if (creatorUploadsSectionEl) creatorUploadsSectionEl.style.display = 'block';
        creatorUploadsGridEl.innerHTML = parts.join('');
    }

    var relatedSectionEl = document.getElementById('video-related-section');
    var relatedGridEl = document.getElementById('video-related-grid');
    function getRelatedVideoIds() {
        return getSameCategoryVideoIds();
    }
    function renderRelatedVideos() {
        if (!relatedGridEl) return;
        var ids = getRelatedVideoIds();
        if (ids.length === 0) {
            if (relatedSectionEl) relatedSectionEl.style.display = 'none';
            return;
        }
        if (relatedSectionEl) relatedSectionEl.style.display = 'block';
        var html = ids.map(function(vidId) {
            var inf = userMap[vidId] || data[vidId] || data.mountains;
            var thumbClass = 'long-video__more-thumb';
            var title = escapeHtml(inf.title || vidId);
            var views = (inf.views != null ? inf.views : '18 views') + '';
            if (views && /^\d+$/.test(views)) views = views + ' views';
            var thumbStyle = getThumbStyle(inf, vidId, 320, 180);
            return '<a href="video.html?id=' + encodeURIComponent(vidId) + '" class="long-video__creator-item"><div class="long-video__more-thumb ' + thumbClass + '"' + thumbStyle + '></div><span class="long-video__more-title">' + title + '</span><span class="long-video__more-views">' + escapeHtml(views) + '</span></a>';
        }).join('');
        relatedGridEl.innerHTML = html;
    }

    function updatePageForVideo() {
        info = userMap[id] || data[id] || data.mountains;
    if (titleEl) titleEl.textContent = info.title;
    document.title = info.title + ' - NOK Super';
        if (channelNameEl) channelNameEl.textContent = info.channel || 'A2Zzen';
        var creatorAvatarEl = document.getElementById('video-creator-avatar');
        if (creatorAvatarEl) {
            var ch = (info.channel || 'A2Zzen').trim();
            var letter = ch ? ch.charAt(0).toUpperCase() : '?';
            var photo = info.creatorPhotoUrl || '';
            if (photo) creatorAvatarEl.innerHTML = '<img src="' + photo.replace(/"/g, '&quot;') + '" alt="">';
            else creatorAvatarEl.textContent = letter;
        }
        if (tagsEl) { tagsEl.textContent = info.hashtags || ''; tagsEl.style.display = (info.hashtags && info.hashtags.trim()) ? '' : 'none'; }
        var fullDesc = info.desc || ('Watch ' + info.title + '...');
        if (descEl) {
            var maxLen = 80;
            if (fullDesc.length <= maxLen) {
                descEl.textContent = fullDesc;
                descEl.dataset.fullDesc = '';
                if (descMoreBtn) { descMoreBtn.style.display = 'none'; descMoreBtn.textContent = 'more'; }
                if (descWrap) descWrap.classList.remove('long-video__desc-wrap--expanded');
            } else {
                descEl.textContent = fullDesc.substring(0, maxLen).trim() + '...';
                descEl.dataset.fullDesc = fullDesc;
                if (descMoreBtn) { descMoreBtn.style.display = 'inline'; descMoreBtn.textContent = 'more'; }
                if (descWrap) descWrap.classList.remove('long-video__desc-wrap--expanded');
            }
        }
        refreshCommentsDisplay();
        if (typeof updateLongVideoSuperDisplay === 'function') updateLongVideoSuperDisplay();
        updateLikeAndCommentCounts();
        renderCreatorUploads();
        renderMoreLikeThis();
        renderRelatedVideos();
        updateLikeButtonState();
        updateFavoriteButtonState();
        updateWatchLaterButtonState();
        updateSubscribeButton();
        updateReactionButtonsState();
        renderSubscriptionsList();
    if (playerBg) {
        playerBg.className = 'long-video__player-bg long-video__player-bg--' + (info.thumb || 'mountains');
            var mainThumb = getThumbUrl(info, id, 1280, 720);
            playerBg.style.backgroundImage = 'url(' + mainThumb + ')';
            playerBg.style.backgroundSize = 'cover';
            playerBg.style.backgroundPosition = 'center';
        }
        if (timeCurrent) timeCurrent.textContent = '0:00';
        if (timeDurationEl) timeDurationEl.textContent = '0:00';
        if (progressBar) progressBar.style.width = '0%';
    }

    function initSidebarThumbs() {
        var neonThumb = document.querySelector('.long-video__neon--sidebar .long-video__neon-thumb');
        if (neonThumb) {
            var neonUrl = getThumbUrl(null, 'neon-shorts', 400, 600);
            neonThumb.style.backgroundImage = 'url(' + neonUrl + ')';
            neonThumb.style.backgroundSize = 'cover';
            neonThumb.style.backgroundPosition = 'center';
        }
        var sidebarThumbs = document.querySelectorAll('.long-video__shorts-list .long-video__shorts-thumb');
        sidebarThumbs.forEach(function(el, i) {
            var seed = 'sidebar-short-' + (i + 1);
            var url = getThumbUrl(null, seed, 144, 256);
            el.style.backgroundImage = 'url(' + url + ')';
            el.style.backgroundSize = 'cover';
            el.style.backgroundPosition = 'center';
        });
    }

    // Viewer liked this video → show like icon red (only when logged in)
    function updateLikeButtonState() {
        var likeBtn = document.getElementById('video-like-btn');
        if (!likeBtn) return;
        var isLoggedIn = (sessionStorage.getItem('nokAuth') === 'loggedIn') || (localStorage.getItem('nokAuth') === 'loggedIn');
        var liked = isLoggedIn && getStoredLikes()[id];
        likeBtn.classList.toggle('long-video__action--liked', !!liked);
        likeBtn.setAttribute('aria-pressed', liked ? 'true' : 'false');
    }

    function updateReactionButtonsState() {
        var current = getStoredReactions()[id] || null;
        var btns = document.querySelectorAll('.long-video__reaction-btn');
        btns.forEach(function(btn) {
            var r = btn.getAttribute('data-reaction');
            btn.classList.toggle('long-video__reaction-btn--active', r === current);
            btn.setAttribute('aria-pressed', r === current ? 'true' : 'false');
        });
    }

    function updateFavoriteButtonState() {
        var favoriteBtn = document.getElementById('video-favorite-btn');
        if (!favoriteBtn) return;
        var saved = isVideoSaved(id);
        favoriteBtn.classList.toggle('long-video__action--saved', saved);
        favoriteBtn.setAttribute('aria-pressed', saved ? 'true' : 'false');
    }
    function updateWatchLaterButtonState() {
        var watchLaterBtn = document.getElementById('video-watch-later-btn');
        if (!watchLaterBtn) return;
        var added = isVideoWatchLater(id);
        watchLaterBtn.classList.toggle('long-video__action--watch-later', added);
        watchLaterBtn.setAttribute('aria-pressed', added ? 'true' : 'false');
    }

    var subscribeBtn = document.getElementById('video-subscribe-btn');
    // Viewer subscribed to this channel → show tick (only when logged in)
    function updateSubscribeButton() {
        if (!subscribeBtn) return;
        var isLoggedIn = (sessionStorage.getItem('nokAuth') === 'loggedIn') || (localStorage.getItem('nokAuth') === 'loggedIn');
        var channel = info.channel || 'A2Zzen';
        var sub = isLoggedIn && isChannelSubscribed(channel);
        subscribeBtn.classList.toggle('long-video__subscribe-btn--subscribed', sub);
        subscribeBtn.setAttribute('aria-pressed', sub ? 'true' : 'false');
        var textEl = subscribeBtn.querySelector('.long-video__subscribe-text');
        if (textEl) {
            textEl.textContent = sub ? 'Subscribed' : 'Subscribe';
            var tick = subscribeBtn.querySelector('.long-video__subscribe-tick');
            if (sub) {
                if (!tick) {
                    tick = document.createElement('span');
                    tick.className = 'long-video__subscribe-tick';
                    tick.setAttribute('aria-hidden', 'true');
                    tick.textContent = '\u2713';
                    subscribeBtn.insertBefore(tick, textEl);
                }
                tick.style.display = '';
            } else if (tick) tick.style.display = 'none';
        } else {
            subscribeBtn.innerHTML = sub ? '<span class="long-video__subscribe-tick" aria-hidden="true">\u2713</span><span class="long-video__subscribe-text">Subscribed</span>' : '<span class="long-video__subscribe-text">Subscribe</span>';
        }
    }

    updatePageForVideo();
    initSidebarThumbs();

    function getVideoPageUrl() {
        var p = new URLSearchParams(window.location.search);
        var idParam = p.get('id');
        return idParam ? 'video.html?id=' + encodeURIComponent(idParam) : 'video.html';
    }
    function requireLoginForAction() {
        if (sessionStorage.getItem('nokAuth') !== 'loggedIn' && localStorage.getItem('nokAuth') !== 'loggedIn') {
            window.location.href = 'login.html?next=' + encodeURIComponent(getVideoPageUrl());
            return true;
        }
        return false;
    }

    var likeBtn = document.getElementById('video-like-btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', function() {
            if (requireLoginForAction()) return;
            var liked = !getStoredLikes()[id];
            setStoredLike(id, liked);
            updateLikeAndCommentCounts();
            updateLikeButtonState();
        });
    }
    var reactionLabels = { love: '❤️ Love', like: '👍 Like', clap: '👏 Clap', fire: '🔥 Fire' };
    var reactionToastEl = null;
    var reactionToastHideTimer = null;
    function showReactionToast(text) {
        if (!reactionToastEl) {
            reactionToastEl = document.createElement('div');
            reactionToastEl.className = 'long-video__reaction-toast';
            reactionToastEl.setAttribute('aria-live', 'polite');
            document.body.appendChild(reactionToastEl);
        }
        if (reactionToastHideTimer) clearTimeout(reactionToastHideTimer);
        reactionToastEl.textContent = text;
        reactionToastEl.classList.add('long-video__reaction-toast--show');
        reactionToastHideTimer = setTimeout(function() {
            reactionToastHideTimer = null;
            reactionToastEl.classList.remove('long-video__reaction-toast--show');
        }, 1800);
    }
    var reactionBtns = document.querySelectorAll('.long-video__reaction-btn');
    reactionBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            if (requireLoginForAction()) return;
            var reaction = btn.getAttribute('data-reaction');
            var current = getStoredReactions()[id];
            var next = (current === reaction) ? null : reaction;
            setStoredReaction(id, next);
            updateReactionButtonsState();
            if (next) showReactionToast(reactionLabels[reaction] || reaction);
            else showReactionToast('Reaction removed');
        });
    });
    var commentBtn = document.getElementById('video-comment-btn');
    if (commentBtn) {
        commentBtn.addEventListener('click', function() {
            var chatEl = document.getElementById('video-chat-messages');
            if (chatEl) chatEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
    var shareBtn = document.getElementById('video-share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            var url = window.location.href;
            var title = (titleEl && titleEl.textContent) ? titleEl.textContent.trim() : document.title || 'Video';
            if (navigator.share && typeof navigator.share === 'function') {
                navigator.share({ title: title, url: url }).then(function() { showReactionToast('Shared'); }).catch(function(err) {
                    if (err.name !== 'AbortError') copyLinkAndToast(url);
                });
            } else {
                copyLinkAndToast(url);
            }
        });
    }
    function copyLinkAndToast(url) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(function() { showReactionToast('Link copied'); }).catch(function() { showReactionToast('Copy link: ' + url); });
        } else {
            try {
                var ta = document.createElement('textarea');
                ta.value = url;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
                showReactionToast('Link copied');
            } catch (e) { showReactionToast('Copy link: ' + url); }
        }
    }
    var favoriteBtn = document.getElementById('video-favorite-btn');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', function() {
            if (requireLoginForAction()) return;
            var saved = !isVideoSaved(id);
            setVideoSaved(id, saved);
            if (saved) {
                setVideoWatchLater(id, false);
                updateWatchLaterButtonState();
            }
            updateFavoriteButtonState();
            showReactionToast(saved ? 'Saved to list' : 'Removed from saved');
        });
    }
    var watchLaterBtn = document.getElementById('video-watch-later-btn');
    if (watchLaterBtn) {
        watchLaterBtn.addEventListener('click', function() {
            if (requireLoginForAction()) return;
            var add = !isVideoWatchLater(id);
            setVideoWatchLater(id, add);
            if (add) {
                setVideoSaved(id, false);
                updateFavoriteButtonState();
            }
            updateWatchLaterButtonState();
            showReactionToast(add ? 'Added to Watch later' : 'Removed from Watch later');
        });
    }
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function() {
            if (requireLoginForAction()) return;
            var channel = info.channel || 'A2Zzen';
            if (isChannelSubscribed(channel)) {
                unsubscribeFromChannel(channel);
            } else {
                subscribeToChannel(channel);
            }
            updateSubscribeButton();
            renderSubscriptionsList();
        });
    }
    if (descMoreBtn && descEl) {
        descMoreBtn.addEventListener('click', function() {
            var full = descEl.dataset.fullDesc || '';
            if (descWrap && descWrap.classList.contains('long-video__desc-wrap--expanded')) {
                var maxLen = 80;
                descEl.textContent = full.length <= maxLen ? full : full.substring(0, maxLen).trim() + '...';
                descWrap.classList.remove('long-video__desc-wrap--expanded');
                descMoreBtn.textContent = 'more';
            } else if (full) {
                descEl.textContent = full;
                if (descWrap) descWrap.classList.add('long-video__desc-wrap--expanded');
                descMoreBtn.textContent = 'show less';
            }
        });
    }
    var notifBtn = document.getElementById('video-notification-btn');
    if (notifBtn) {
        var notifOnWrap = notifBtn.querySelector('.long-video__icon-bell-wrap');
        var notifOffWrap = notifBtn.querySelector('.long-video__icon-bell-off-wrap');
        function updateNotificationIcon() {
            var on = localStorage.getItem('nokNotificationOn') !== '0';
            notifBtn.setAttribute('aria-label', on ? 'Notifications on (click to turn off)' : 'Notifications off (click to turn on)');
            notifBtn.setAttribute('title', on ? 'Notifications on' : 'Notifications off');
            notifBtn.setAttribute('aria-pressed', on ? 'false' : 'true');
            if (notifOnWrap) notifOnWrap.style.display = on ? '' : 'none';
            if (notifOffWrap) notifOffWrap.style.display = on ? 'none' : '';
        }
        updateNotificationIcon();
        notifBtn.addEventListener('click', function() {
            var on = localStorage.getItem('nokNotificationOn') !== '0';
            localStorage.setItem('nokNotificationOn', on ? '0' : '1');
            updateNotificationIcon();
        });
    }

    function fmt(t) { var m = Math.floor(t / 60); var s = Math.floor(t % 60); return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s; }

    var currentBlobUrl = null;
    function switchToVideo(newId) {
        if (!videoEl || fullVideoList.indexOf(newId) < 0) return;
        if (currentBlobUrl) { URL.revokeObjectURL(currentBlobUrl); currentBlobUrl = null; }
        id = newId;
        updatePageForVideo();
        if (window.history && window.history.replaceState) history.replaceState({}, '', 'video.html?id=' + encodeURIComponent(id));
        var isUser = userMap[id];
        var sampleInfo = data[id] || data.mountains;
        if (isUser && window.nokVideoDB) {
            nokVideoDB.get(id).then(function(blob) {
                if (blob) {
                    currentBlobUrl = URL.createObjectURL(blob);
                    videoEl.src = currentBlobUrl;
                    videoEl.play();
                    playBtn.style.display = 'none';
                    if (controlPlayPause) { var iconPlay = controlPlayPause.querySelector('.long-video__icon-play'); var iconPause = controlPlayPause.querySelector('.long-video__icon-pause'); if (iconPlay) iconPlay.style.display = 'none'; if (iconPause) iconPause.style.display = 'block'; }
                } else if (sampleUrls[0]) {
                    videoEl.src = sampleUrls[0];
                    videoEl.play();
                    playBtn.style.display = 'none';
                    if (controlPlayPause) { var iconPlay = controlPlayPause.querySelector('.long-video__icon-play'); var iconPause = controlPlayPause.querySelector('.long-video__icon-pause'); if (iconPlay) iconPlay.style.display = 'none'; if (iconPause) iconPause.style.display = 'block'; }
                }
            }).catch(function() {
                if (sampleUrls[0]) { videoEl.src = sampleUrls[0]; videoEl.play(); playBtn.style.display = 'none'; }
            });
        } else if (sampleInfo.sampleUrl !== undefined && sampleUrls[sampleInfo.sampleUrl]) {
            videoEl.src = sampleUrls[sampleInfo.sampleUrl];
            videoEl.play();
            playBtn.style.display = 'none';
            if (controlPlayPause) { var iconPlay = controlPlayPause.querySelector('.long-video__icon-play'); var iconPause = controlPlayPause.querySelector('.long-video__icon-pause'); if (iconPlay) iconPlay.style.display = 'none'; if (iconPause) iconPause.style.display = 'block'; }
        } else if (sampleUrls[0]) {
            videoEl.src = sampleUrls[0];
            videoEl.play();
            playBtn.style.display = 'none';
        }
    }

    function setupVideo() {
        if (!videoEl || !playBtn) return;
        var isUser = userMap[id];
        var sampleInfo = data[id] || data.mountains;
        var bindPlaybackDone = false;

        function bindPlayback() {
            if (bindPlaybackDone) return;
            bindPlaybackDone = true;
            function togglePlay() {
                if (videoEl.paused) { videoEl.play(); playBtn.style.display = 'none'; updatePlayPauseIcon(true); }
                else { videoEl.pause(); playBtn.style.display = 'flex'; updatePlayPauseIcon(false); }
            }
            function updatePlayPauseIcon(playing) {
                if (!controlPlayPause) return;
                var iconPlay = controlPlayPause.querySelector('.long-video__icon-play');
                var iconPause = controlPlayPause.querySelector('.long-video__icon-pause');
                if (iconPlay) iconPlay.style.display = playing ? 'none' : 'block';
                if (iconPause) iconPause.style.display = playing ? 'block' : 'none';
            }
            playBtn.addEventListener('click', togglePlay);
            videoEl.addEventListener('click', togglePlay);
            if (playerBg) playerBg.addEventListener('click', togglePlay);
            videoEl.addEventListener('play', function() { playBtn.style.display = 'none'; updatePlayPauseIcon(true); });
            videoEl.addEventListener('pause', function() { playBtn.style.display = 'flex'; updatePlayPauseIcon(false); });
            videoEl.addEventListener('ended', function() {
                playBtn.style.display = 'flex';
                updatePlayPauseIcon(false);
                var inFs = !!document.fullscreenElement;
                if (playMode === 'autoNext') {
                    var idx = fullVideoList.indexOf(id);
                    if (idx >= 0 && idx < fullVideoList.length - 1) {
                        if (inFs) switchToVideo(fullVideoList[idx + 1]);
                        else goToVideoUrl('video.html?id=' + encodeURIComponent(fullVideoList[idx + 1]) + '&autoplay=1');
                    }
                } else if (playMode === 'autoRewind') {
                    videoEl.currentTime = 0;
                    videoEl.play();
                } else if (playMode === 'mix') {
                    var others = fullVideoList.filter(function(vid) { return vid !== id; });
                    if (others.length) {
                        var nextId = others[Math.floor(Math.random() * others.length)];
                        if (inFs) switchToVideo(nextId);
                        else goToVideoUrl('video.html?id=' + encodeURIComponent(nextId) + '&autoplay=1');
                    }
                }
            });

            function goToVideoUrl(url) {
                window.location.href = url;
            }
            if (controlPlayPause) controlPlayPause.addEventListener('click', togglePlay);
            var closeBtn = document.getElementById('video-close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    var featuredCard = document.getElementById('featured-video-card');
                    var isMinimized = featuredCard && featuredCard.classList.contains('long-video__card--minimized');
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                        var sw = document.querySelector('.long-video__scroll-wrap');
                        setTimeout(function() { if (sw) sw.scrollTop = 0; }, 150);
                        return;
                    }
                    if (isMinimized) {
                        if (videoEl) videoEl.pause();
                        featuredCard.classList.add('long-video__card--minimized-closed');
                    } else {
                        window.location.href = 'home.html';
                    }
                });
            }
            if (controlsWrap) {
                var ctrlPrev = controlsWrap.querySelector('.long-video__control-prev');
                var ctrlNext = controlsWrap.querySelector('.long-video__control-next');
                var ctrlFs = controlsWrap.querySelector('button[aria-label="Fullscreen"]');
                if (ctrlPrev) ctrlPrev.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var idx = fullVideoList.indexOf(id);
                    if (idx > 0) {
                        if (document.fullscreenElement) switchToVideo(fullVideoList[idx - 1]);
                        else goToVideoUrl('video.html?id=' + encodeURIComponent(fullVideoList[idx - 1]) + '&autoplay=1');
                    }
                });
                if (ctrlNext) ctrlNext.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var idx = fullVideoList.indexOf(id);
                    if (idx >= 0 && idx < fullVideoList.length - 1) {
                        if (document.fullscreenElement) switchToVideo(fullVideoList[idx + 1]);
                        else goToVideoUrl('video.html?id=' + encodeURIComponent(fullVideoList[idx + 1]) + '&autoplay=1');
                    }
                });
                if (ctrlFs) ctrlFs.addEventListener('click', function() {
                    if (!document.fullscreenElement) { videoEl.parentElement.requestFullscreen(); }
                    else { document.exitFullscreen(); }
                });
            }
            var playerWrap = videoEl.parentElement;
            var fullscreenHideTimeout;
            var fullscreenLocked = false;
            var lockBtn = document.getElementById('video-lock-btn');
            var lockIcon = lockBtn && lockBtn.querySelector('.long-video__lock-icon');
            var unlockIcon = lockBtn && lockBtn.querySelector('.long-video__unlock-icon');
            function updateLockButton() {
                if (!lockBtn) return;
                lockBtn.style.display = document.fullscreenElement === playerWrap ? 'flex' : 'none';
                lockBtn.setAttribute('aria-label', fullscreenLocked ? 'Unlock screen' : 'Lock screen');
                lockBtn.title = fullscreenLocked ? 'Tap to unlock screen' : 'Lock screen';
                if (lockIcon) lockIcon.style.display = fullscreenLocked ? 'none' : 'block';
                if (unlockIcon) unlockIcon.style.display = fullscreenLocked ? 'block' : 'none';
            }
            var unlockShowTimeout = null;
            if (lockBtn) lockBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                fullscreenLocked = !fullscreenLocked;
                updateLockButton();
                if (fullscreenLocked) {
                    clearTimeout(fullscreenHideTimeout);
                    fullscreenHideTimeout = null;
                    playerWrap.classList.add('long-video__player-wrap--screen-locked');
                    playerWrap.classList.remove('long-video__player-wrap--show-unlock', 'long-video__player-wrap--controls-hidden');
                    clearTimeout(unlockShowTimeout);
                    unlockShowTimeout = null;
                } else {
                    playerWrap.classList.remove('long-video__player-wrap--screen-locked', 'long-video__player-wrap--show-unlock');
                    clearTimeout(unlockShowTimeout);
                    unlockShowTimeout = null;
                    fullscreenHideTimeout = setTimeout(function() {
                        playerWrap.classList.add('long-video__player-wrap--controls-hidden');
                    }, 5000);
                }
            });
            function onFullscreenChange() {
                var fsEl = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;
                var inFs = !!(fsEl && (fsEl === playerWrap || playerWrap.contains(fsEl) || fsEl.contains(playerWrap)));
                if (inFs) {
                    playerWrap.classList.add('long-video__player-wrap--fullscreen');
                } else {
                    playerWrap.classList.remove('long-video__player-wrap--fullscreen');
                }
                if (inFs) {
                    fullscreenLocked = false;
                    updateLockButton();
                    playerWrap.classList.remove('long-video__player-wrap--screen-locked', 'long-video__player-wrap--show-unlock');
                    clearTimeout(unlockShowTimeout);
                    unlockShowTimeout = null;
                    playerWrap.classList.remove('long-video__player-wrap--controls-hidden');
                    clearTimeout(fullscreenHideTimeout);
                    fullscreenHideTimeout = setTimeout(function() {
                        if (!fullscreenLocked) playerWrap.classList.add('long-video__player-wrap--controls-hidden');
                    }, 5000);
                    function showControlsAndReschedule(e) {
                        if (fullscreenLocked && e) {
                            var t = e.target;
                            if (lockBtn && (t === lockBtn || lockBtn.contains(t))) return;
                            e.preventDefault();
                            e.stopPropagation();
                            playerWrap.classList.add('long-video__player-wrap--show-unlock');
                            clearTimeout(unlockShowTimeout);
                            unlockShowTimeout = setTimeout(function() {
                                playerWrap.classList.remove('long-video__player-wrap--show-unlock');
                            }, 4000);
                            return;
                        }
                        var wasHidden = playerWrap.classList.contains('long-video__player-wrap--controls-hidden');
                        if (wasHidden) {
                            if (e) { e.preventDefault(); e.stopPropagation(); }
                            playerWrap.classList.remove('long-video__player-wrap--controls-hidden');
                        }
                        clearTimeout(fullscreenHideTimeout);
                        if (!fullscreenLocked) fullscreenHideTimeout = setTimeout(function() {
                            playerWrap.classList.add('long-video__player-wrap--controls-hidden');
                        }, 5000);
                    }
                    playerWrap._fsShow = showControlsAndReschedule;
                    playerWrap.addEventListener('click', showControlsAndReschedule, true);
                    playerWrap.addEventListener('touchstart', showControlsAndReschedule, true);
                } else {
                    fullscreenLocked = false;
                    updateLockButton();
                    clearTimeout(unlockShowTimeout);
                    unlockShowTimeout = null;
                    playerWrap.classList.remove('long-video__player-wrap--fullscreen', 'long-video__player-wrap--screen-locked', 'long-video__player-wrap--show-unlock');
                    clearTimeout(fullscreenHideTimeout);
                    fullscreenHideTimeout = null;
                    playerWrap.classList.remove('long-video__player-wrap--controls-hidden');
                    if (playerWrap._fsShow) {
                        playerWrap.removeEventListener('click', playerWrap._fsShow);
                        playerWrap.removeEventListener('touchstart', playerWrap._fsShow);
                        playerWrap._fsShow = null;
                    }
                }
            }
            document.addEventListener('fullscreenchange', onFullscreenChange);
            document.addEventListener('webkitfullscreenchange', onFullscreenChange);
            document.addEventListener('mozfullscreenchange', onFullscreenChange);

            (function initDropUp() {
                var DROP_UP_COUNT = 80; /* 70–80 long video cards; only long videos (no Shorts) */
                var dropUp = document.getElementById('video-drop-up');
                var dropUpBackdrop = document.getElementById('video-drop-up-backdrop');
                var dropUpList = document.getElementById('video-drop-up-list');
                var dropUpBtn = document.getElementById('video-drop-up-btn');
                var dropUpPill = document.getElementById('video-drop-up-pill');
                var dropUpClose = document.getElementById('video-drop-up-close');
                var dropUpHandle = document.getElementById('video-drop-up-handle');
                if (!dropUp || !dropUpList) return;
                function getDropUpVideoIds() {
                    /* Only long videos (fullVideoList has no shorts). Show 70–80 cards. */
                    var list = fullVideoList.slice();
                    if (list.length === 0) return [];
                    while (list.length < DROP_UP_COUNT) list = list.concat(fullVideoList);
                    return list.slice(0, DROP_UP_COUNT);
                }
                function renderDropUpList() {
                    var ids = getDropUpVideoIds();
                    var html = '<div class="long-video__drop-up-grid">';
                    ids.forEach(function(vidId) {
                        var inf = userMap[vidId] || data[vidId] || data.mountains;
                        if (!inf) return;
                        var title = escapeHtml(inf.title || vidId);
                        var views = (inf.views != null ? inf.views : inf.likeCount != null ? formatCount(inf.likeCount) : '18') + '';
                        if (views && /^\d+$/.test(views)) views = views + ' views';
                        var thumbStyle = getThumbStyle(inf, vidId, 160, 90);
                        html += '<a href="video.html?id=' + encodeURIComponent(vidId) + '" class="long-video__drop-up-card" data-video-id="' + escapeHtml(vidId) + '"><div class="long-video__drop-up-card-thumb"' + thumbStyle + '></div><span class="long-video__drop-up-card-title">' + title + '</span></a>';
                    });
                    html += '</div>';
                    dropUpList.innerHTML = html;
                    dropUpList.querySelectorAll('.long-video__drop-up-card').forEach(function(a) {
                        a.addEventListener('click', function(e) {
                            e.preventDefault();
                            var vid = a.getAttribute('data-video-id');
                            if (vid && fullVideoList.indexOf(vid) >= 0) {
                                switchToVideo(vid);
                                closeDropUp();
                            }
                        });
                    });
                }
                function isPlayerFullscreen() {
                    if (!playerWrap) return false;
                    if (playerWrap.classList.contains('long-video__player-wrap--fullscreen')) return true;
                    var el = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;
                    return !!(el && (el === playerWrap || playerWrap.contains(el) || el.contains(playerWrap)));
                }
                function openDropUp() {
                    if (!isPlayerFullscreen()) return;
                    if (playerWrap) playerWrap.classList.add('long-video__player-wrap--drop-up-open');
                    dropUp.classList.add('long-video__drop-up--open');
                    dropUpBackdrop.classList.add('long-video__drop-up-backdrop--open');
                    dropUp.setAttribute('aria-hidden', 'false');
                    dropUpBackdrop.setAttribute('aria-hidden', 'false');
                    renderDropUpList();
                }
                function closeDropUp() {
                    if (playerWrap) playerWrap.classList.remove('long-video__player-wrap--drop-up-open');
                    dropUp.classList.remove('long-video__drop-up--open');
                    dropUpBackdrop.classList.remove('long-video__drop-up-backdrop--open');
                    dropUp.setAttribute('aria-hidden', 'true');
                    dropUpBackdrop.setAttribute('aria-hidden', 'true');
                }
                if (dropUpBtn) dropUpBtn.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); openDropUp(); });
                if (dropUpPill) dropUpPill.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); openDropUp(); });
                if (dropUpClose) dropUpClose.addEventListener('click', function(e) { e.preventDefault(); closeDropUp(); });
                if (dropUpBackdrop) dropUpBackdrop.addEventListener('click', closeDropUp);
                if (dropUpHandle) {
                    dropUpHandle.addEventListener('click', function() { closeDropUp(); });
                }
                document.addEventListener('fullscreenchange', function() {
                    if (!isPlayerFullscreen()) closeDropUp();
                });
                document.addEventListener('webkitfullscreenchange', function() {
                    if (!isPlayerFullscreen()) closeDropUp();
                });
                var touchStartY = 0;
                var touchStartScreenY = 0;
                playerWrap.addEventListener('touchstart', function(e) {
                    if (!isPlayerFullscreen() || dropUp.classList.contains('long-video__drop-up--open')) return;
                    touchStartY = e.touches && e.touches[0] ? e.touches[0].clientY : 0;
                    touchStartScreenY = window.innerHeight - touchStartY;
                }, { passive: true });
                playerWrap.addEventListener('touchmove', function(e) {
                    if (!isPlayerFullscreen() || dropUp.classList.contains('long-video__drop-up--open')) return;
                    if (touchStartY < window.innerHeight * 0.6) return;
                    var y = e.touches && e.touches[0] ? e.touches[0].clientY : 0;
                    if (touchStartY - y > 45) openDropUp();
                }, { passive: true });
            })();

            var playModeBtn = document.getElementById('play-mode-btn');
            if (playModeBtn) {
                function updatePlayModeLabel() {
                    var label = playMode === 'off' ? 'Off' : (playMode === 'autoNext' ? 'Auto Next' : playMode === 'autoRewind' ? 'Auto Rewind' : 'Mix');
                    playModeBtn.textContent = label;
                    playModeBtn.title = 'Play mode: ' + label + ' (click to change)';
                }
                playModeBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (playMode === 'off') playMode = 'autoNext';
                    else if (playMode === 'autoNext') playMode = 'autoRewind';
                    else if (playMode === 'autoRewind') playMode = 'mix';
                    else playMode = 'off';
                    try { localStorage.setItem('nokPlayMode', playMode); } catch (err) {}
                    updatePlayModeLabel();
                });
                updatePlayModeLabel();
            }
            var volumeWrap = document.getElementById('volume-wrap');
            var volumeSlider = document.getElementById('volume-slider');
            var volumeIcon = document.getElementById('volume-icon');
            var volumeBtn = document.getElementById('control-volume-btn');
            if (volumeWrap && volumeSlider && videoEl) {
                function updateVolumeIcon() {
                    var muted = videoEl.muted;
                    var onIcon = volumeIcon && volumeIcon.querySelector('.long-video__icon-volume-on');
                    var mutedIcon = volumeIcon && volumeIcon.querySelector('.long-video__icon-volume-muted');
                    if (onIcon) onIcon.style.display = muted ? 'none' : 'block';
                    if (mutedIcon) mutedIcon.style.display = muted ? 'block' : 'none';
                    var label = muted ? 'Unmute' : 'Mute';
                    if (volumeBtn) { volumeBtn.setAttribute('aria-label', label); volumeBtn.title = label; }
                    volumeWrap.title = 'Volume ' + (muted ? '0' : Math.round(videoEl.volume * 100)) + '%';
                }
                if (volumeBtn) {
                    volumeBtn.addEventListener('click', function() {
                        videoEl.muted = !videoEl.muted;
                        updateVolumeIcon();
                    });
                }
                volumeSlider.addEventListener('input', function() {
                    var v = parseInt(volumeSlider.value, 10) / 100;
                    var stableEl = document.getElementById('settings-stable-volume-value');
                    if (stableEl && stableEl.textContent === 'On' && v > 0.9) { v = 0.9; volumeSlider.value = 90; }
                    videoEl.volume = v;
                    videoEl.muted = false;
                    updateVolumeIcon();
                });
                volumeSlider.addEventListener('click', function() {
                    videoEl.muted = false;
                    updateVolumeIcon();
                });
                videoEl.addEventListener('volumechange', function() {
                    var stableEl = document.getElementById('settings-stable-volume-value');
                    if (stableEl && stableEl.textContent === 'On' && !videoEl.muted && videoEl.volume > 0.9) {
                        videoEl.volume = 0.9;
                        volumeSlider.value = 90;
                    }
                    if (!videoEl.muted) volumeSlider.value = Math.round(videoEl.volume * 100);
                    updateVolumeIcon();
                });
                videoEl.volume = 1;
                volumeSlider.value = 100;
                updateVolumeIcon();
            }
            var settingsBtn = document.getElementById('control-settings');
            var settingsMenu = document.getElementById('settings-menu');
            if (settingsBtn && settingsMenu) {
                settingsBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    var open = settingsMenu.classList.toggle('long-video__settings-menu--open');
                    settingsMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
                    if (open) {
                        if (speedVal && videoEl) {
                            var rate = videoEl.playbackRate;
                            speedVal.textContent = rate + 'x';
                            var speedSlider = document.getElementById('speed-slider');
                            var speedSliderVal = document.getElementById('settings-speed-slider-value');
                            if (speedSlider) {
                                var v = Math.round(rate * 100);
                                v = Math.max(25, Math.min(200, v));
                                speedSlider.value = v;
                                if (speedSliderVal) speedSliderVal.textContent = (v / 100) + 'x';
                            }
                        }
                        if (captionsVal && videoEl && videoEl.textTracks.length) captionsVal.textContent = videoEl.textTracks[0].mode === 'showing' ? 'On' : 'Off';
                        if (ambientVal && playerWrap) ambientVal.textContent = playerWrap.classList.contains('long-video__player-wrap--ambient') ? 'On' : 'Off';
                    }
                });
                var advanceDropdown = document.getElementById('advance-dropdown');
                var speedDropdown = document.getElementById('speed-dropdown');
                document.addEventListener('click', function() {
                    settingsMenu.classList.remove('long-video__settings-menu--open');
                    settingsMenu.setAttribute('aria-hidden', 'true');
                    if (qualityDropdown) {
                        qualityDropdown.classList.remove('long-video__quality-dropdown--open');
                        qualityDropdown.setAttribute('aria-hidden', 'true');
                    }
                    if (advanceDropdown) {
                        advanceDropdown.classList.remove('long-video__advance-dropdown--open');
                        advanceDropdown.setAttribute('aria-hidden', 'true');
                    }
                    if (speedDropdown) {
                        speedDropdown.classList.remove('long-video__speed-control-line--open');
                        speedDropdown.setAttribute('aria-hidden', 'true');
                    }
                });
                settingsMenu.addEventListener('click', function(e) { e.stopPropagation(); });
                var qualityVal = document.getElementById('settings-quality-value');
                var qualityDropdown = document.getElementById('quality-dropdown');
                var speedVal = document.getElementById('settings-speed-value');
                var captionsVal = document.getElementById('settings-captions-value');
                var ambientVal = document.getElementById('settings-ambient-value');
                var stableVolVal = document.getElementById('settings-stable-volume-value');
                var qualityLabels = { auto: 'Auto', high: 'High picture quality', advance: 'Advance' };
                document.getElementById('settings-quality') && document.getElementById('settings-quality').addEventListener('click', function(e) {
                    e.stopPropagation();
                    if (qualityDropdown) {
                        var open = qualityDropdown.classList.toggle('long-video__quality-dropdown--open');
                        qualityDropdown.setAttribute('aria-hidden', open ? 'false' : 'true');
                        if (advanceDropdown) {
                            advanceDropdown.classList.remove('long-video__advance-dropdown--open');
                            advanceDropdown.setAttribute('aria-hidden', 'true');
                        }
                        if (speedDropdown) {
                            speedDropdown.classList.remove('long-video__speed-control-line--open');
                            speedDropdown.setAttribute('aria-hidden', 'true');
                        }
                    }
                });
                document.getElementById('quality-advance-btn') && document.getElementById('quality-advance-btn').addEventListener('click', function(e) {
                    e.stopPropagation();
                    if (advanceDropdown) {
                        var open = advanceDropdown.classList.toggle('long-video__advance-dropdown--open');
                        advanceDropdown.setAttribute('aria-hidden', open ? 'false' : 'true');
                        var maxQ = (info && info.maxQuality) ? info.maxQuality : 2160;
                        advanceDropdown.querySelectorAll('.long-video__resolution-opt').forEach(function(opt) {
                            var res = parseInt(opt.getAttribute('data-res'), 10);
                            opt.style.display = res <= maxQ ? '' : 'none';
                        });
                    }
                });
                if (qualityDropdown) {
                    qualityDropdown.querySelectorAll('.long-video__quality-opt').forEach(function(opt) {
                        opt.addEventListener('click', function(e) {
                            e.stopPropagation();
                            var q = this.getAttribute('data-quality');
                            if (q === 'advance') return;
                            if (qualityVal) qualityVal.textContent = qualityLabels[q] || q;
                            qualityDropdown.querySelectorAll('.long-video__quality-opt').forEach(function(o) { o.classList.remove('long-video__quality-opt--active'); });
                            this.classList.add('long-video__quality-opt--active');
                            qualityDropdown.classList.remove('long-video__quality-dropdown--open');
                            qualityDropdown.setAttribute('aria-hidden', 'true');
                            if (advanceDropdown) {
                                advanceDropdown.classList.remove('long-video__advance-dropdown--open');
                                advanceDropdown.setAttribute('aria-hidden', 'true');
                            }
                        });
                    });
                }
                if (advanceDropdown && videoEl) {
                    advanceDropdown.querySelectorAll('.long-video__resolution-opt').forEach(function(opt) {
                        opt.addEventListener('click', function(e) {
                            e.stopPropagation();
                            var res = parseInt(this.getAttribute('data-res'), 10);
                            var maxQ = (info && info.maxQuality) ? info.maxQuality : 2160;
                            var resToApply = Math.min(res, maxQ);
                            var label = resToApply + 'p';
                            if (qualityVal) qualityVal.textContent = label;
                            advanceDropdown.querySelectorAll('.long-video__resolution-opt').forEach(function(o) { o.classList.remove('long-video__resolution-opt--active'); });
                            this.classList.add('long-video__resolution-opt--active');
                            qualityDropdown.querySelectorAll('.long-video__quality-opt').forEach(function(o) { o.classList.remove('long-video__quality-opt--active'); });
                            if (qualityDropdown) {
                                qualityDropdown.classList.remove('long-video__quality-dropdown--open');
                                qualityDropdown.setAttribute('aria-hidden', 'true');
                            }
                            advanceDropdown.classList.remove('long-video__advance-dropdown--open');
                            advanceDropdown.setAttribute('aria-hidden', 'true');
                            if (videoEl.src && videoEl.src.indexOf('http') === 0) {
                                var wasPlaying = !videoEl.paused;
                                var ct = videoEl.currentTime;
                                var newSrc = videoEl.src.replace(/\d+p/gi, resToApply + 'p');
                                if (newSrc !== videoEl.src) {
                                    videoEl.src = newSrc;
                                    videoEl.currentTime = ct;
                                    if (wasPlaying) videoEl.play();
                                }
                            }
                        });
                    });
                }
                document.getElementById('settings-speed') && document.getElementById('settings-speed').addEventListener('click', function(e) {
                    e.stopPropagation();
                    if (speedDropdown) {
                        var open = speedDropdown.classList.toggle('long-video__speed-control-line--open');
                        speedDropdown.setAttribute('aria-hidden', open ? 'false' : 'true');
                        if (qualityDropdown) {
                            qualityDropdown.classList.remove('long-video__quality-dropdown--open');
                            qualityDropdown.setAttribute('aria-hidden', 'true');
                        }
                        if (advanceDropdown) {
                            advanceDropdown.classList.remove('long-video__advance-dropdown--open');
                            advanceDropdown.setAttribute('aria-hidden', 'true');
                        }
                    }
                });
                var speedSlider = document.getElementById('speed-slider');
                var speedSliderVal = document.getElementById('settings-speed-slider-value');
                if (speedSlider && videoEl && speedVal) {
                    speedSlider.addEventListener('input', function() {
                        var v = parseInt(speedSlider.value, 10) / 100;
                        videoEl.playbackRate = v;
                        speedVal.textContent = v + 'x';
                        if (speedSliderVal) speedSliderVal.textContent = v + 'x';
                    });
                    speedSlider.addEventListener('click', function(e) { e.stopPropagation(); });
                }
                var playerWrap = videoEl && videoEl.parentElement;
                var captionsOn = false;
                var ambientOn = false;
                var stableVolumeOn = false;
                document.getElementById('settings-captions') && document.getElementById('settings-captions').addEventListener('click', function() {
                    captionsOn = !captionsOn;
                    if (captionsVal) captionsVal.textContent = captionsOn ? 'On' : 'Off';
                    if (videoEl && videoEl.textTracks && videoEl.textTracks.length) {
                        for (var i = 0; i < videoEl.textTracks.length; i++) {
                            videoEl.textTracks[i].mode = captionsOn ? 'showing' : 'disabled';
                        }
                    }
                });
                document.getElementById('settings-ambient') && document.getElementById('settings-ambient').addEventListener('click', function() {
                    ambientOn = !ambientOn;
                    if (ambientVal) ambientVal.textContent = ambientOn ? 'On' : 'Off';
                    if (playerWrap) {
                        if (ambientOn) playerWrap.classList.add('long-video__player-wrap--ambient');
                        else playerWrap.classList.remove('long-video__player-wrap--ambient');
                    }
                });
                document.getElementById('settings-stable-volume') && document.getElementById('settings-stable-volume').addEventListener('click', function() {
                    stableVolumeOn = !stableVolumeOn;
                    if (stableVolVal) stableVolVal.textContent = stableVolumeOn ? 'On' : 'Off';
                    if (videoEl && volumeSlider) {
                        if (stableVolumeOn && videoEl.volume > 0.9) {
                            videoEl.volume = 0.9;
                            volumeSlider.value = 90;
                        }
                    }
                });
            }

            if (progressBar && progressWrap) {
                function updateProgress() {
                    var pct = videoEl.duration ? (videoEl.currentTime / videoEl.duration) * 100 : 0;
                    progressBar.style.width = pct + '%';
                    if (progressThumb) progressThumb.style.left = pct + '%';
                }
                videoEl.addEventListener('timeupdate', updateProgress);
                videoEl.addEventListener('loadedmetadata', function() {
                    if (timeDurationEl) timeDurationEl.textContent = fmt(videoEl.duration);
                    updateProgress();
                });
                videoEl.addEventListener('timeupdate', function() {
                    if (timeCurrent) timeCurrent.textContent = fmt(videoEl.currentTime);
                });
                progressWrap.addEventListener('click', function(e) {
                    if (!videoEl.duration) return;
                    var r = progressWrap.getBoundingClientRect();
                    var pct = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
                    videoEl.currentTime = pct * videoEl.duration;
                });
            }
            if (timeDurationEl && videoEl.duration) timeDurationEl.textContent = fmt(videoEl.duration);
        }

        var wantAutoplay = params.get('autoplay') === '1';
        function tryAutoplay() {
            if (!wantAutoplay) return;
            videoEl.play().then(function() {
                playBtn.style.display = 'none';
                if (controlPlayPause) {
                    var iconPlay = controlPlayPause.querySelector('.long-video__icon-play');
                    var iconPause = controlPlayPause.querySelector('.long-video__icon-pause');
                    if (iconPlay) iconPlay.style.display = 'none';
                    if (iconPause) iconPause.style.display = 'block';
                }
                if (window.history && window.history.replaceState) history.replaceState({}, '', 'video.html?id=' + encodeURIComponent(id));
            }).catch(function() {});
        }
        function scheduleAutoplayWhenReady() {
            if (!wantAutoplay) return;
            videoEl.addEventListener('canplay', tryAutoplay, { once: true });
            if (videoEl.readyState >= 2) setTimeout(tryAutoplay, 0);
        }
        /* Always bind play button and controls so video can play once src is set */
        bindPlayback();
        /* Fallback URL when user video missing or external URL fails */
        function setFallbackSrc() {
            if (sampleUrls[0]) {
                videoEl.src = sampleUrls[0];
                videoEl.load();
            }
        }
        videoEl.addEventListener('error', function onVideoError() {
            if (videoEl.src && videoEl.src.indexOf('blob:') !== 0 && !videoEl.src.includes(sampleUrls[0])) setFallbackSrc();
        }, { once: true });
        if (isUser && window.nokVideoDB) {
            nokVideoDB.get(id).then(function(blob) {
                if (blob) {
                    currentBlobUrl = URL.createObjectURL(blob);
                    videoEl.src = currentBlobUrl;
                    scheduleAutoplayWhenReady();
                } else {
                    setFallbackSrc();
                    scheduleAutoplayWhenReady();
                }
            }).catch(function() {
                setFallbackSrc();
                scheduleAutoplayWhenReady();
            });
        } else if (sampleInfo.sampleUrl !== undefined && sampleUrls[sampleInfo.sampleUrl]) {
            videoEl.setAttribute('preload', 'auto');
            videoEl.src = sampleUrls[sampleInfo.sampleUrl];
            videoEl.addEventListener('error', function() { setFallbackSrc(); }, { once: true });
            scheduleAutoplayWhenReady();
        } else {
            /* Unknown id: use default sample so something plays */
            setFallbackSrc();
            scheduleAutoplayWhenReady();
        }
    }

    setupVideo();

    (function seedTestLikeAndComments() {
        if (localStorage.getItem('nokVideoTestSeed')) return;
        try {
            setStoredLike('mountains', true);
            setStoredLike('city', true);
            var comments = getStoredComments();
            if (!comments.waterfall) comments.waterfall = [];
            comments.waterfall.push({ user: 'Tester', avatar: 'T', text: 'Test comment from QA – video logic works.' });
            comments.waterfall.push({ user: 'Demo User', avatar: 'D', text: 'Liked the ocean vibes. 👍' });
            if (!comments.portrait) comments.portrait = [];
            comments.portrait.push({ user: 'Test User', avatar: 'T', text: 'Desert video test – like & comment ok.' });
            localStorage.setItem(STORAGE_COMMENTS_KEY, JSON.stringify(comments));
            localStorage.setItem('nokVideoTestSeed', '1');
        } catch (e) {}
    })();

    if (sessionStorage.getItem('nokResumeFullscreen') === '1') {
        sessionStorage.removeItem('nokResumeFullscreen');
        var wrap = document.querySelector('.long-video__player-wrap');
        if (wrap && wrap.requestFullscreen) {
            setTimeout(function() { wrap.requestFullscreen().catch(function() {}); }, 400);
        }
    }

    document.querySelectorAll('.long-video__tab').forEach(function(tab) {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.long-video__tab').forEach(function(t) { t.classList.remove('long-video__tab--active'); });
            this.classList.add('long-video__tab--active');
        });
    });

    var chatClose = document.querySelector('.long-video__chat-icon[aria-label="Close"]');
    if (chatClose) chatClose.addEventListener('click', function() {
        document.querySelector('.long-video__chat').classList.add('long-video__chat--hidden');
    });

    var neonPlay = document.querySelector('.long-video__neon-play');
    if (neonPlay) neonPlay.addEventListener('click', function() { location.href = 'shorts.html'; });

    // Chat overlay: handled by nok-chat-overlay.js (same card on all pages)

    // Comment card: keep wheel inside comments so only comment list scrolls, not the page
    var commentMessages = document.querySelector('.long-video__chat-messages');
    if (commentMessages) {
        commentMessages.addEventListener('wheel', function(e) { e.stopPropagation(); }, { passive: true });
    }

    // Super: button opens amount modal; Send is always normal comment
    var pendingSuperText = null;
    var superModal = document.getElementById('long-video-super-modal');
    var superBackdrop = document.getElementById('long-video-super-backdrop');
    var superCancel = document.getElementById('long-video-super-cancel');
    var superDisplay = document.getElementById('long-video-super-display');
    var superScrollEl = document.getElementById('long-video-super-scroll');
    var longVideoSuperDisplayInterval = null;
    function showSuperModal() { if (superModal) { superModal.setAttribute('aria-hidden', 'false'); superModal.classList.add('long-video__super-modal--open'); } }
    function hideSuperModal() { if (superModal) { superModal.setAttribute('aria-hidden', 'true'); superModal.classList.remove('long-video__super-modal--open'); pendingSuperText = null; } }
    // Pinned super comments: show all approved at once in a list, auto-scroll so all are visible.
    function updateLongVideoSuperDisplay() {
        var list = (getLongSuperComments()[id] || []).filter(function(s) { return s.status === 'approved' && s.expiresAt > Date.now(); });
        list.sort(function(a, b) { return (a.approvedAt || a.createdAt || 0) - (b.approvedAt || b.createdAt || 0); });
        if (!superDisplay || !superScrollEl) return;
        if (longVideoSuperDisplayInterval) { clearInterval(longVideoSuperDisplayInterval); longVideoSuperDisplayInterval = null; }
        if (list.length > 0) {
            superScrollEl.innerHTML = list.map(function(s) {
                var left = Math.max(0, Math.ceil((s.expiresAt - Date.now()) / 60000));
                var text = escapeHtml((s.text || '').toString());
                var name = escapeHtml((s.name || 'Viewer').toString());
                return '<div class="long-video__super-display__item"><p class="long-video__super-display__text">' + text + '</p><span class="long-video__super-display__name">' + name + '</span><span class="long-video__super-display__meta">$' + (s.amount || '') + ' · ' + (left > 0 ? 'Visible ' + left + ' min' : '') + '</span></div>';
            }).join('');
            superScrollEl.scrollTop = 0;
            superDisplay.setAttribute('aria-hidden', 'false');
            var itemHeight = 72;
            var scrollStep = itemHeight;
            var maxScroll = Math.max(0, superScrollEl.scrollHeight - superScrollEl.clientHeight);
            longVideoSuperDisplayInterval = setInterval(function() {
                var listNow = (getLongSuperComments()[id] || []).filter(function(s) { return s.status === 'approved' && s.expiresAt > Date.now(); });
                if (listNow.length === 0) {
                    superDisplay.setAttribute('aria-hidden', 'true');
                    if (longVideoSuperDisplayInterval) { clearInterval(longVideoSuperDisplayInterval); longVideoSuperDisplayInterval = null; }
                    refreshCommentsDisplay();
                    return;
                }
                var current = superScrollEl.scrollTop;
                var max = Math.max(0, superScrollEl.scrollHeight - superScrollEl.clientHeight);
                if (max <= 0) return;
                if (current >= max - 2) {
                    superScrollEl.scrollTop = 0;
                    listNow.sort(function(a, b) { return (a.approvedAt || a.createdAt || 0) - (b.approvedAt || b.createdAt || 0); });
                    superScrollEl.innerHTML = listNow.map(function(s) {
                        var left = Math.max(0, Math.ceil((s.expiresAt - Date.now()) / 60000));
                        return '<div class="long-video__super-display__item"><p class="long-video__super-display__text">' + escapeHtml((s.text || '').toString()) + '</p><span class="long-video__super-display__name">' + escapeHtml((s.name || 'Viewer').toString()) + '</span><span class="long-video__super-display__meta">$' + (s.amount || '') + ' · ' + (left > 0 ? 'Visible ' + left + ' min' : '') + '</span></div>';
                    }).join('');
                } else {
                    superScrollEl.scrollTop = Math.min(current + scrollStep, max);
                }
            }, 4000);
        } else {
            superDisplay.setAttribute('aria-hidden', 'true');
        }
    }
    document.addEventListener('click', function(e) {
        var btn = e.target && e.target.closest && e.target.closest('.long-video__chat-super-btn[data-type="super"]');
        if (!btn) return;
            e.preventDefault();
        e.stopPropagation();
        showSuperModal();
    });
    [].forEach.call(document.querySelectorAll('#long-video-super-options button'), function(opt) {
        opt.addEventListener('click', function() {
            var text = pendingSuperText;
            if (!text) {
                var inp = document.getElementById('long-video-chat-input');
                text = (inp && inp.value) ? inp.value.trim() : '';
            }
            if (!text) {
                hideSuperModal();
                return;
            }
            var amount = this.getAttribute('data-amount');
            var timeLabel = this.getAttribute('data-time');
            var displayMinutes = parseFloat(this.getAttribute('data-minutes') || '1', 10);
            var sc = getLongSuperComments();
            if (!sc[id]) sc[id] = [];
            var superId = Date.now().toString();
            sc[id].push({ id: superId, name: (localStorage.getItem('nokUserChannel') || sessionStorage.getItem('nokUserEmail') || 'You').toString().slice(0, 20), text: text, status: 'pending', amount: amount, timeLabel: timeLabel, displayMinutes: displayMinutes, expiresAt: 0, createdAt: Date.now() });
            setLongSuperComments(sc);
            hideSuperModal();
            var inp = document.getElementById('long-video-chat-input');
            if (inp) inp.value = '';
            pendingSuperText = null;
            refreshCommentsDisplay();
        });
    });
    if (superBackdrop) superBackdrop.addEventListener('click', hideSuperModal);
    if (superCancel) superCancel.addEventListener('click', hideSuperModal);
    document.addEventListener('click', function(e) {
        var closeBtn = e.target && e.target.closest && e.target.closest('#long-video-super-display-close');
        if (!closeBtn || !superDisplay) return;
        e.preventDefault();
            e.stopPropagation();
        superDisplay.setAttribute('aria-hidden', 'true');
        if (longVideoSuperDisplayInterval) { clearInterval(longVideoSuperDisplayInterval); longVideoSuperDisplayInterval = null; }
    });
    if (chatMessagesEl) {
        chatMessagesEl.addEventListener('click', function(e) {
            var replyBtn = e.target.closest('.long-video__chat-reply-btn');
            if (replyBtn) {
                e.preventDefault();
                var msg = replyBtn.closest('.long-video__chat-msg');
                var commentId = msg && msg.getAttribute('data-comment-id');
                if (!commentId) return;
                var form = chatMessagesEl.querySelector('.long-video__chat-reply-form[data-comment-id="' + commentId + '"]');
                var allForms = chatMessagesEl.querySelectorAll('.long-video__chat-reply-form');
                allForms.forEach(function(f) { f.style.display = 'none'; });
                if (form) {
                    form.style.display = form.style.display === 'none' ? 'flex' : 'none';
                    if (form.style.display === 'flex') {
                        var inp = form.querySelector('.long-video__chat-reply-input');
                        if (inp) { inp.value = ''; inp.focus(); }
                    }
                }
                return;
            }
            var sendBtn = e.target.closest('.long-video__chat-reply-send');
            if (sendBtn) {
                e.preventDefault();
                var form = sendBtn.closest('.long-video__chat-reply-form');
                if (!form) return;
                var commentId = form.getAttribute('data-comment-id');
                var inp = form.querySelector('.long-video__chat-reply-input');
                var text = inp && inp.value && inp.value.trim();
                if (!text || !commentId) return;
                var isLoggedIn = (sessionStorage.getItem('nokAuth') === 'loggedIn') || (localStorage.getItem('nokAuth') === 'loggedIn');
                if (!isLoggedIn) { window.location.href = 'login.html?next=' + encodeURIComponent('video.html?id=' + encodeURIComponent(id)); return; }
                addStoredReply(id, commentId, { user: 'You', avatar: 'Y', text: text });
                refreshCommentsDisplay();
                return;
            }
            var approveBtn = e.target.closest('.long-video__chat-approve');
            if (!approveBtn) return;
            var superId = approveBtn.getAttribute('data-super-id');
            var sc = getLongSuperComments();
            var arr = sc[id] || [];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id === superId && arr[i].status === 'pending') {
                    arr[i].status = 'approved';
                    arr[i].approvedAt = Date.now();
                    arr[i].expiresAt = Date.now() + arr[i].displayMinutes * 60 * 1000;
                    setLongSuperComments(sc);
                    refreshCommentsDisplay();
                    updateLongVideoSuperDisplay();
                    break;
                }
            }
        });
        chatMessagesEl.addEventListener('keydown', function(e) {
            if (e.key !== 'Enter') return;
            var inp = e.target.closest('.long-video__chat-reply-input');
            if (!inp) return;
            var form = inp.closest('.long-video__chat-reply-form');
            var sendBtn = form && form.querySelector('.long-video__chat-reply-send');
            if (sendBtn) { e.preventDefault(); sendBtn.click(); }
        });
    }
    updateLongVideoSuperDisplay();

    // Add comment: same row, placeholder "Log in to comment" + readonly when not logged in
    (function() {
        var chatInput = document.getElementById('long-video-chat-input');
        var chatSend = document.getElementById('long-video-chat-send');
        function isLoggedIn() { return (sessionStorage.getItem('nokAuth') === 'loggedIn') || (localStorage.getItem('nokAuth') === 'loggedIn'); }
        function getNextUrl() {
            var base = 'video.html';
            var params = new URLSearchParams(window.location.search);
            var idParam = params.get('id');
            return idParam ? base + '?id=' + encodeURIComponent(idParam) : base;
        }
        function updateCommentInput() {
            if (!chatInput) return;
            if (isLoggedIn()) {
                chatInput.placeholder = 'Add a comment...';
                chatInput.removeAttribute('readonly');
            } else {
                chatInput.placeholder = 'Log in to comment';
                chatInput.setAttribute('readonly', 'readonly');
            }
        }
        updateCommentInput();
        if (chatInput) {
            chatInput.addEventListener('focus', function() {
                if (!isLoggedIn()) {
                    window.location.href = 'login.html?next=' + encodeURIComponent(getNextUrl());
                }
            });
            chatInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if (chatSend) chatSend.click();
                }
            });
        }
        if (chatSend) {
            chatSend.addEventListener('click', function() {
                if (!isLoggedIn()) {
                    window.location.href = 'login.html?next=' + encodeURIComponent(getNextUrl());
                    return;
                }
                if (!chatInput) return;
                var text = (chatInput.value || '').trim();
                if (!text) return;
                // Send = always normal comment (Super is separate: use Super button for super comments)
                var comment = { user: 'You', avatar: 'Y', text: text };
                saveStoredComment(id, comment);
                chatInput.value = '';
                refreshCommentsDisplay();
            });
        }
    })();

    // Scroll: main video card becomes small and sticks to top
    var scrollWrap = document.querySelector('.long-video__scroll-wrap');
    var featuredCard = document.getElementById('featured-video-card');
    var featuredWrap = document.getElementById('featured-wrap');
    if (scrollWrap && featuredCard && featuredWrap) {
        var minimized = false;
        var threshold = 460;
        var minimizedControlsTimeout = null;
        var MINIMIZED_CONTROLS_HIDE_MS = 3000;

        function scheduleMinimizedControlsHide() {
            if (minimizedControlsTimeout) clearTimeout(minimizedControlsTimeout);
            minimizedControlsTimeout = setTimeout(function() {
                minimizedControlsTimeout = null;
                if (featuredCard.classList.contains('long-video__card--minimized')) {
                    featuredCard.classList.add('long-video__card--minimized-controls-hidden');
                }
            }, MINIMIZED_CONTROLS_HIDE_MS);
        }

        function cancelMinimizedControlsHide() {
            if (minimizedControlsTimeout) {
                clearTimeout(minimizedControlsTimeout);
                minimizedControlsTimeout = null;
            }
            featuredCard.classList.remove('long-video__card--minimized-controls-hidden');
        }

        function getScrollTop() {
            if (scrollWrap) return scrollWrap.scrollTop;
            return window.pageYOffset || document.documentElement.scrollTop || 0;
        }
        function onScroll() {
            var st = getScrollTop();
            if (!minimized && st > threshold) {
                minimized = true;
                featuredWrap.style.minHeight = featuredWrap.offsetHeight + 'px';
                featuredCard.classList.add('long-video__card--minimized');
                featuredCard.classList.remove('long-video__card--minimized-controls-hidden');
                scheduleMinimizedControlsHide();
            } else if (minimized && st <= threshold) {
                minimized = false;
                cancelMinimizedControlsHide();
                featuredCard.classList.remove('long-video__card--minimized');
                featuredCard.classList.remove('long-video__card--minimized-closed');
                featuredWrap.style.minHeight = '';
            }
        }

        featuredCard.addEventListener('mouseenter', function() {
            if (!featuredCard.classList.contains('long-video__card--minimized')) return;
            cancelMinimizedControlsHide();
        });
        featuredCard.addEventListener('mouseleave', function() {
            if (!featuredCard.classList.contains('long-video__card--minimized')) return;
            scheduleMinimizedControlsHide();
        });
        featuredCard.addEventListener('touchstart', function() {
            if (!featuredCard.classList.contains('long-video__card--minimized')) return;
            cancelMinimizedControlsHide();
            if (minimizedControlsTimeout) clearTimeout(minimizedControlsTimeout);
            minimizedControlsTimeout = setTimeout(function() {
                minimizedControlsTimeout = null;
                if (featuredCard.classList.contains('long-video__card--minimized')) {
                    featuredCard.classList.add('long-video__card--minimized-controls-hidden');
                }
            }, MINIMIZED_CONTROLS_HIDE_MS);
        }, { passive: true });

        if (scrollWrap) scrollWrap.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }
})();
