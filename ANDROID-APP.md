# NOK Super – Android App বানানোর উপায়

দুইভাবে অ্যান্ড্রয়েডে অ্যাপ পেতে পারবেন:

---

## ১. PWA (Progressive Web App) – সবচেয়ে সহজ

সাইটটাকে অ্যান্ড্রয়েডে **“অ্যাপের মতো”** ইনস্টল করা যায়, কোনো APK বানাতে হয় না।

### কি করা হয়েছে
- **manifest.json** – অ্যাপের নাম, আইকন, রঙ, স্টার্ট URL
- **sw.js** – ছোট Service Worker (ইনস্টল ও অফলাইন সহায়তা)
- **style.css/index.html** ও **style.css/home.html** – manifest লিংক ও Service Worker রেজিস্ট্রেশন

### আপনি কি করবেন

1. **সাইটটা হোস্ট করুন**  
   যেকোনো হোস্টে (Vercel, Netlify, আপনার সার্ভার) HTTPS দিয়ে। লোকালে শুধু টেস্ট করলে `npx serve . -p 3000` দিয়ে চালান।

2. **অ্যান্ড্রয়েড ফোনে Chrome দিয়ে সাইট খুলুন**  
   উদাহরণ: `https://your-site.com` বা লোকাল নেটওয়ার্কে `http://আপনার-আইপি:3000`

3. **ইনস্টল করুন**  
   - Chrome মেনু (⋮) → **“Add to Home screen”** বা **“Install app”**  
   - অথবা address bar-এ যে **ইনস্টল** আইকন/বার্তা আসে সেটা দিয়ে ইনস্টল করুন  

4. **হোম স্ক্রিনে আইকন**  
   ইনস্টল হলে হোম স্ক্রিনে “NOK Super” আইকন চলে আসবে; ট্যাপ করলে ফুলস্ক্রিন অ্যাপের মতো খুলবে (ব্রাউজার UI ছাড়া)।

### আইকন সাইজ (ঐচ্ছিক)
PWA ঠিকমতো দেখাতে চাইলে **১৯২×১৯২** ও **৫১২×৫১২** পিক্সেলের দুটো আইকন বানিয়ে `manifest.json`-এ দিতে পারেন। এখন একই `noksuper.png` ব্যবহার করা হয়েছে।

---

## ২. আসল Android APK (Play Store-এর জন্য)

অ্যাপটা **APK/AAB** বানিয়ে Play Store-এ দিতে চাইলে **Capacitor** দিয়ে ওয়েব প্রজেক্টটাকে অ্যান্ড্রয়েড অ্যাপে প্যাক করবেন।

### ধাপগুলো

#### ১. Node ও Android Studio
- [Node.js](https://nodejs.org) ইনস্টল থাকতে হবে  
- [Android Studio](https://developer.android.com/studio) ইনস্টল করুন (APK বিল্ডের জন্য)

#### ২. প্রজেক্টে Capacitor যোগ করা

প্রজেক্ট রুটে (যেখানে `package.json` আছে) টার্মিনালে:

```bash
npm install @capacitor/core @capacitor/cli
npx cap init "NOK Super" com.nok.super
npm install @capacitor/android
npx cap add android
```

#### ৩. ওয়েব ফাইল Capacitor-কে দেয়া

Capacitor সাধারণত `www` ফোল্ডার থেকে ফাইল নেয়। আপনার ফাইল এখন বিভিন্ন জায়গায় (যেমন `style.css/`, রুটে), তাই দুটো উপায়ের একটা নিন:

**উপায় A – build ফোল্ডার বানিয়ে কপি**  
- একটা `www` ফোল্ডার বানান  
- সব প্রয়োজনীয় ফাইল (index, style.css, js, images ইত্যাদি) `www`-এর ভেতরে সেই স্ট্রাকচারেই কপি করুন যাতে রুটে `index.html` থাকে এবং লিংকগুলো ঠিক কাজ করে  
- তারপর বলুন: `npx cap sync`  

**উপায় B – বর্তমান স্ট্রাকচার ব্যবহার**  
- `capacitor.config.json` (বা `capacitor.config.ts`) এ `webDir` বদলে দিন।  
  উদাহরণ: যদি এন্ট্রি হয় `style.css/index.html`, তাহলে `webDir` কে `"."` রেখে `server.url` দিয়ে লোকাল বা লাইভ সাইট চালাতে পারেন; অথবা একটা single `www` ফোল্ডারে পুরো সাইট কপি করে `webDir: "www"` দিন।  

সবচেয়ে সহজ: **www** ফোল্ডার বানিয়ে ভেতরে পুরো সাইটের কপি দিন (রুটে index.html যেন `style.css/index.html`-এ রিডাইরেক্ট করে বা সরাসরি `style.css/index.html` কে index বানান), তারপর:

```bash
npx cap sync
npx cap open android
```

#### ৪. Android Studio থেকে APK বানানো
- **Build → Build Bundle(s) / APK(s) → Build APK(s)**  
- বিল্ড শেষে APK পাথ দেখাবে; সেটা শেয়ার করেই ইনস্টল করা যায়  
- Play Store-এর জন্য **Build → Generate Signed Bundle / APK** দিয়ে AAB বানাবেন এবং কীস্টোর সেটআপ করবেন

#### ৫. ওয়েবভিউ সেটিং
Capacitor অটোই আপনার ওয়েব ফাইল একটা WebView-এ লোড করবে। লিংক/নেভিগেশন একই থাকবে। কোনো পেজ যদি বাহিরের সাইট খুলে, সেটা ডিফল্টভাবে WebView-ই খুলবে; চাইলে `capacitor.config` এ বা প্লাগইন দিয়ে এক্সটার্নাল লিংক Chrome-এ খোলার নিয়ম দিতে পারবেন।

---

## সংক্ষেপে

| চাই কি | কি করবেন |
|--------|-----------|
| শুধু ফোনে অ্যাপের মতো খোলা (হোম স্ক্রিন আইকন, ফুলস্ক্রিন) | সাইট HTTPS এ হোস্ট করে Chrome দিয়ে **Add to Home screen / Install app** করুন (PWA)। |
| APK বানিয়ে দেয়া বা Play Store-এ দেয়া | Capacitor দিয়ে অ্যান্ড্রয়েড প্রজেক্ট বানান, ওয়েব ফাইল `www` বা `webDir`-এ দিন, `npx cap sync` ও `npx cap open android` দিয়ে Android Studio থেকে APK বিল্ড করুন। |

প্রশ্ন থাকলে জিজ্ঞেস করতে পারেন।
