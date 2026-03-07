# Shorts পেজ (shorts.html) — কি ও কিভাবে কাজ করে

এই ডকুমেন্টে shorts ভিডিও পেজের **HTML স্ট্রাকচার** এবং **কিভাবে কাজ করে** সেটা সংক্ষেপে লেখা আছে।

---

## ১. ফাইল ও লিংক

| জিনিস | বিবরণ |
|--------|--------|
| **পেজ** | `style.css/shorts.html` |
| **স্টাইল** | `style.css` (shorts + layout), `video-long.css` (header) |
| **স্ক্রিপ্ট** | `nok-video-db.js` (ভিডিও blob সেভ/লোড), পেজের ভিতরে inline JS |

---

## ২. HTML স্ট্রাকচার (মূল অংশগুলো)

### পেজ লেআউট
```
body.home-body.shorts-body.has-bottom-nav
└── div.home-layout
    ├── div.bg
    ├── header.long-video__header   ← হোমের মতো গ্লাস হেডার (মেনু, লোগো, সার্চ, বেল, আপলোড, প্রোফাইল/লগইন)
    ├── div.shorts-page.shorts-page--scroll
    │   ├── div.shorts-feed-label    ← "Shorts — creator uploads & suggested"
    │   ├── div#shorts-reels         ← কার্ডগুলো যেখানে
    │   │   ├── a.shorts-back        ← বাক বাটন (home.html)
    │   │   └── div#shorts-reels-track  ← JS দিয়ে শর্ট কার্ডগুলো এখানে জেনারেট হয়
    │   ├── div#shorts-video-slot   ← আসল ভিডিও প্লে হয় এখানে (একটা video element)
    │   │   └── video#shorts-video-el
    │   ├── button#shorts-mute-btn  ← মিউট/আনমিউট
    │   └── div#shorts-progress-wrap → shorts-progress-bar
    ├── div#shorts-super-display    ← Super কমেন্ট ওভারলে (অনস্ক্রিন)
    ├── div#shorts-comment-overlay  ← কমেন্ট প্যানেল (তালিকা + ইনপুট + Super বাটন)
    ├── nav.home-bottom-nav         ← বটম ন্যাভ (Home, Shorts, Upload, Chats, Settings)
    └── div.chat-overlay            ← চ্যাট ওভারলে (হোমের মতো)
```

### গুরুত্বপূর্ণ ID গুলো
- **shorts-reels** – স্ক্রল কন্টেইনার (horizontal scroll)
- **shorts-reels-track** – কার্ডগুলোর প্যারেন্ট; JS এখানে `.shorts-slide` এলিমেন্ট এড করে
- **shorts-video-slot** – বর্তমান শর্টের ভিডিও এই স্লটে প্লে হয়
- **shorts-video-el** – একমাত্র `<video>` এলিমেন্ট
- **shorts-mute-btn**, **shorts-progress-wrap** – সাউন্ড ও প্রোগ্রেস বার
- **shorts-comment-overlay** – কমেন্ট প্যানেল ওপেন হলে এটা দৃশ্যমান

### স্ক্রিনে কোথায় কি দেখা যায় (Screen mapping)
পেজ খুলে উপরে–নিচে দেখলে এই এলিমেন্টগুলো এভাবে থাকে:

| এলিমেন্ট (HTML id / JS variable) | স্ক্রিনে কোথায় |
|-----------------------------------|------------------|
| **shorts-reels** (reels) | লেবেল "Shorts — creator uploads & suggested" এর **নিচের পুরো অনুভূমিক জোন** — এখান দিয়েই ছোট শর্ট কার্ডগুলো হরাইজন্টাল স্ক্রল হয়। কার্ড না থাকলে এই জায়গাটাই রিলস কন্টেইনার। |
| **shorts-reels-track** (track) | রিলসের ভিতরে; একই জোনে। ছোট কার্ডগুলো এই ট্র্যাকের ভিতরে একসারিতে থাকে। |
| **shorts-video-slot** (mainVideoSlot) | **পেজের ওপর দিকে মাঝখানে** ছোট উল্লম্ব (৯:১৬) বক্স — যেখানে বর্তমান শর্ট ভিডিও প্লে হয় (ক্যাম্পফায়ার/নদী/চাঁদ যেই ভিডিওই হোক)। |
| **shorts-video-el** (videoEl) | ওই ছোট বক্সের **ভিতরের ভিডিও** — অর্থাৎ আপনি যে ছবি/দৃশ্য দেখছেন সেটাই এই `<video>` এলিমেন্ট। |
| **shorts-mute-btn** (muteBtn) | ছোট ভিডিও বক্সের **ডান দিকে**, স্পিকার আইকন (আনমিউট থাকলে সাউন্ড ওয়েভ সহ)। ট্যাপ করলে মিউট/আনমিউট। |
| **shorts-progress-wrap** (progressWrap) | ছোট ভিডিও বক্সের **নিচের প্রান্তে** একই চওড়ায় থাকা জায়গা। |
| **shorts-progress-bar** (progressBar) | ওই প্রোগ্রেস জোনের ভিতরে **পাতলা নীল লাইন** — ভিডিও কতটা হয়েছে সেটা বোঝায়। |
| **shorts-comment-overlay**, **shorts-comment-list**, **shorts-comment-input** | **ডিফল্টে দেখা যায় না।** কমেন্ট আইকনে ক্লিক করলে একটা প্যানেল/ওভারলে খুলে — সেখানে কমেন্ট লিস্ট, ইনপুট ও Super বাটন থাকে। |

সংক্ষেপে: ভিডিও বক্স = video-slot + video-el; তার ডানে মিউট বাটন; নিচে প্রোগ্রেস; আর তার নিচের পুরো অনুভূমিক অংশ = reels + track (কার্ডের সারি)।

---

## ৩. ডাটা কোথা থেকে আসে

| ডাটা | জগহ |
|------|------|
| ইউজার আপলোড শর্টস (মেটাডাটা) | `localStorage.nokShortsVideos` (array of `{ id, title, channel, thumb, ... }`) |
| ভিডিও ফাইল (blob) | IndexedDB – `nokVideoDB.get(id)` (আপলোড করা শর্টের জন্য) |
| ডেমো শর্টস | পেজের ভিতরে sample IDs: `demo1`, `demo2`, `demo3`, `demo4` – এদের ভিডিও sample URL থেকে |
| লাইক স্টেট | `localStorage.nokShortsLiked`, `nokShortsLikeDelta` |
| কমেন্ট (ইন-মেমরি) | `commentsByShort` (JS object); Super কমেন্ট `localStorage.nokSuperComments` |

শর্ট লিস্ট বানানো হয়: **userShorts** (localStorage) + **sampleShorts** (ডেমো)। এই লিস্ট দিয়েই কার্ড ও প্লে ইনডেক্স ঠিক হয়।

---

## ৪. কিভাবে কাজ করে (ফ্লো)

### ৪.১ পেজ লোড
1. URL থেকে `?id=xxx` নেওয়া হয়; না থাকলে `nokShortsVideos` এর প্রথম শর্টের id অথবা `night` (ডেমো)।
2. `userShorts` = `localStorage.nokShortsVideos`, তার সাথে ডেমো আইটেম যোগ করে `shortsList` বানানো হয়।
3. যদি `id` কোনো লং ভিডিও হয় (nokUserVideos এ আছে, শর্টস লিস্টে নেই) তাহলে রিডাইরেক্ট → `video.html?id=...`।

### ৪.২ কার্ড রেন্ডার
- `shortsList` এর প্রতিটি আইটেমের জন্য একটা **`.shorts-slide`** ডিভ বানিয়ে `#shorts-reels-track` এ অ্যাড করা হয়।
- প্রতিটি স্লাইডে: ব্যাকগ্রাউন্ড/থাম্ব, চ্যানেল অ্যাভাটার, টাইটেল, হ্যাশট্যাগ, লাইক/কমেন্ট/শেয়ার/সেভ বাটন, কমেন্ট ইনপুট, প্রোগ্রেস স্লট।
- কার্ড সাইজ ছোট (৯:১৬ অনুপাত) এবং **অনুভূমিক স্ক্রল** – একসারিতে অনেক কার্ড দেখা যায়।

### ৪.৩ ভিডিও প্লে
- **একটা মাত্র** `<video>` এলিমেন্ট (`#shorts-video-el`) আছে; বর্তমান শর্টের সোর্স এখানে সেট করা হয়।
- `loadVideoForIdx(idx)`:
  - ইউজার আপলোড শর্ট হলে → `nokVideoDB.get(id)` দিয়ে blob নিয়ে `videoEl.src = URL.createObjectURL(blob)`।
  - ডেমো শর্ট হলে → sample ভিডিও URL সেট করা হয়।
- স্ক্রল বা নেক্সট করলে যে স্লাইড সবচেয়ে ভিউপোর্টে থাকে সেই ইন্ডেক্স দিয়ে আবার `loadVideoForIdx` কল হয়; ভিডিও স্লটে সেই শর্টই প্লে হয়।

### ৪.৪ স্ক্রল (হরাইজন্টাল)
- কার্ড চওড়া ≤ 120px হলে **horizontal** মোড: `reels.scrollLeft` ও স্লাইডের width + gap দিয়ে ইন্ডেক্স বের করা হয়।
- `getScrollPos()` = `reels.scrollLeft`, `setScrollPos(val)` = `reels.scrollLeft = val`, `getScrollStep()` = এক স্লাইডের width + gap।
- স্ক্রল ইভেন্টে `currentIdx` আপডেট হয় এবং `loadVideoForIdx(currentIdx)` কল হয়।
- কীবোর্ড: বাম/ডান অ্যারো দিয়ে আগের/পরের শর্ট।

### ৪.৫ মিউট ও প্রোগ্রেস
- মিউট বাটনে ক্লিক করলে ভিডিও মিউট/আনমিউট টগল।
- ভিডিওর `timeupdate` দিয়ে প্রোগ্রেস বার আপডেট; ভিডিও শেষ হলে পরের শর্টে স্ক্রল (নেক্সট)।

### ৪.৬ কমেন্ট ও Super
- কার্ডের কমেন্ট বাটন বা ইনলাইন কমেন্ট সাবমিট করলে কমেন্ট `commentsByShort[shortId]` এ জমা হয়; কাউন্ট আপডেট হয়।
- "Comments" ক্লিক করলে `#shorts-comment-overlay` ওপেন হয় – সেখানে লিস্ট + নতুন কমেন্ট ইনপুট + Super বাটন।
- Super বাটন দিয়ে অনস্ক্রিনে Super কমেন্ট দেখানো হয়; ডাটা `nokSuperComments` এ সেভ হয়।

### ৪.৭ শেয়ার
- শেয়ার বাটনে ক্লিক করলে `shorts.html?id=<shortId>` লিংক কপি অথবা `navigator.share` (যদি থাকে)।

---

## ৫. সংক্ষেপ

| কাজ | কিভাবে |
|-----|--------|
| শর্ট লিস্ট | localStorage (user) + ডেমো আইটেম → `shortsList` |
| ভিডিও সোর্স | ইউজার আপলোড → IndexedDB blob; ডেমো → sample URL |
| প্লে | একটা video element; স্ক্রল/নেক্সটে ইন্ডেক্স বদল → `loadVideoForIdx(idx)` |
| স্ক্রল | Horizontal; scrollLeft + স্লাইড width দিয়ে current index |
| লাইক/কমেন্ট | localStorage + ইন-পেজ অবজেক্ট; কমেন্ট প্যানেল আলাদা overlay |

এই পেজটা সম্পূর্ণ ক্লায়েন্ট-সাইড: ডাটা ব্রাউজারের localStorage ও IndexedDB থেকে; কোনো ব্যাকএন্ড API ব্যবহার হয় না। ব্যাকএন্ড যোগ করলে শর্ট লিস্ট ও ভিডিও URL/স্ট্রিম API থেকে লোড করার পর এই একই HTML/JS স্ট্রাকচার দিয়েই চালানো যাবে।
