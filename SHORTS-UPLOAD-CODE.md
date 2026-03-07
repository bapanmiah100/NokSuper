# Short video file লোকানো – কোড মার্ক (কোথায় কী আছে)

শর্ট ভিডিও আপলোড/সেভ করার জন্য যে কোডগুলো ব্যবহার হয় সেগুলোর জায়গা নিচে দেয়া আছে।

---

## ১. ভিডিও ফাইল সেভ (IndexedDB) – `nok-video-db.js`

| লাইন | কি করা হয় |
|------|-------------|
| **14–23** | `nokVideoDB.save(id, blob)` – শর্ট ভিডিওর **blob** IndexedDB তে সেভ করা |
| **25–32** | `nokVideoDB.get(id)` – সেভ করা ভিডিও **blob** আবার পড়া |
| **35–42** | `nokVideoDB.delete(id)` – একটা শর্ট ভিডিও ডিলিট করা |

ডাটাবেজ নাম: `NOKVideoDB`, স্টোর: `videos`, key: `id`।

---

## ২. আপলোড পেজ – শর্ট হিসেবে পাবলিশ ও ফাইল লোকানো (`style.css/upload.html`)

### শর্ট টাইপ চেক
| লাইন | কি করা হয় |
|------|-------------|
| **377** | রেডিও: `value="shorts"` – “Shorts (&lt;60 sec)” সিলেক্ট করা |
| **379** | নোট: “This video is under 60 seconds and will be published as a Short.” |
| **555–556** | ভিডিও ডুরেশন দেখে শর্ট নোট দেখানো |
| **870–871** | টাইপ “shorts” বা অটোতে &lt;60 sec হলে শর্ট নোট দেখানো |
| **879** | `getVideoType()` – অটো হলে ডুরেশন &lt;60 সেকেন্ড হলে `'shorts'` রিটার্ন |

### পাবলিশ বাটনে সাবমিট – শর্টের মেটাডাটা + ফাইল সেভ
| লাইন | কি করা হয় |
|------|-------------|
| **1019** | `var asShorts = getVideoType() === 'shorts';` – শর্ট হিসেবে পাবলিশ কিনা চেক |
| **1021–1025** | **শর্ট হলে:** `allShorts` = `localStorage.nokShortsVideos`, নতুন আইটেম `unshift`, তারপর `localStorage.setItem('nokShortsVideos', ...)` – শর্টের **মেটাডাটা লোকানো** |
| **1036** | **ভিডিও ফাইল লোকানো:** `nokVideoDB.save(id, vfile)` – আপলোড করা ফাইল (blob) IndexedDB তে সেভ, তারপর রিডাইরেক্ট `shorts.html?id=...` |

অর্থাৎ শর্ট ভিডিও **লোকানো** এর মূল কোড: **upload.html এর 1021–1026 (মেটাডাটা) এবং 1036 (ফাইল সেভ)**।

### শর্ট লিস্ট পড়া / এডিট / ডিলিট (upload পেজে)
| লাইন | কি করা হয় |
|------|-------------|
| **885** | `allShorts = localStorage.getItem('nokShortsVideos')` – শর্ট লিস্ট পড়া |
| **892** | টাইটেল এডিট করে `nokShortsVideos` আবার সেভ |
| **898–899** | একটা শর্ট ডিলিট: array থেকে বাদ, `localStorage` আপডেট, `nokVideoDB.delete(v.id)` |
| **904** | ভিজিবিলিটি বদল করে `nokShortsVideos` সেভ |
| **921** | ডিলিটের সময় `nokVideoDB.delete(v.id)` |
| **938** | আপলোড লিস্টে শর্টগুলো দেখানোর জন্য `nokShortsVideos` পড়া |
| **978–979** | শর্ট কার্ডে থাম্ব/প্রিভিউ: `nokVideoDB.get(v.id)` দিয়ে blob নিয়ে ব্যবহার |

---

## ৩. Shorts পেজ – সেভ করা শর্ট লোড ও চালানো (`style.css/shorts.html`)

| লাইন | কি করা হয় |
|------|-------------|
| **243** | `userShorts = localStorage.getItem('nokShortsVideos')` – ইউজারের সেভ করা শর্ট লিস্ট পড়া |
| **724, 737** | বর্তমান শর্ট ইউজার আপলোড করা হলে `nokVideoDB.get(s.id)` দিয়ে blob নিয়ে ভিডিও সোর্স সেট করা |

---

## ৪. অন্যান্য পেজ – শর্ট লিস্ট/ব্লব ব্যবহার

| ফাইল | লাইন | কি করা হয় |
|------|------|-------------|
| **home.html** | 423–424 | `nokShortsVideos` পড়ে শর্ট আইডি সেট, ইউজার শর্ট কার্ড বানানো |
| **home.html** | 467–469 | শর্ট কার্ডে হোভারে প্রিভিউ: `nokVideoDB.get(vId)` দিয়ে blob নিয়ে ভিডিও সোর্স |
| **trending.html** | 121, 146 | `nokShortsVideos` পড়া |
| **trending.html** | 137–139 | শর্ট কার্ড প্রিভিউ: `nokVideoDB.get` |
| **video-long.js** | 26–28 | `nokShortsVideos` দিয়ে শর্ট আইডি সেট |
| **video-long.js** | 474–475, 986–987 | শর্ট ভিডিও প্লে: `nokVideoDB.get(id)` দিয়ে blob নিয়ে চালানো |

---

## সংক্ষেপ

- **শর্ট ভিডিও ফাইল লোকানো (সেভ):**
  - **মেটাডাটা:** `upload.html` → `localStorage.setItem('nokShortsVideos', JSON.stringify(allShorts))` (লাইন 1024–1026)
  - **ভিডিও ফাইল (blob):** `upload.html` → `nokVideoDB.save(id, vfile)` (লাইন 1036), ইমপ্লিমেন্টেশন `nok-video-db.js` (লাইন 14–23)
- **পড়া:** সব জায়গায় `localStorage.getItem('nokShortsVideos')` এবং ভিডিও চালানোর জন্য `nokVideoDB.get(id)`।
