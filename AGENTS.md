# NOK Super — project focus (team preference)

## Scope

- **Android app only.** Day-to-day work targets the **Capacitor Android app** (`android/`), not the public website as a separate product.
- **Do not change the website for browser users** unless the user explicitly asks. Avoid edits that only exist to tweak the desktop/browser layout.

## How the app is built

- Web assets live in **`www/`**. Capacitor copies them with: `npx cap sync android`.
- The app WebView loads the same HTML as the site; where web vs app must differ, use **Capacitor detection** (e.g. `window.Capacitor` / `document.documentElement.classList.add('android-app-home')`) or app-only CSS, **not** a forked “website” copy.

## Checklist for Android-related UI changes

1. Prefer **app-only** selectors or runtime checks so **browser** `home.html` (and other pages) stay unchanged unless intended.
2. After editing files under `www/`, run: `npx cap sync android`.
3. Rebuild/run the app in Android Studio.

---

*Saved per team request: website work paused; focus Android app.*
