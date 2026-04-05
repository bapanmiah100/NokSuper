# NOK Super — project focus (team preference)

## Scope (current)

- **Website / browser first.** Day-to-day work targets the **site** served from **`www/`** (especially `www/style.css/` HTML, CSS, JS).
- **Android app work is paused** unless someone explicitly asks to resume it. Do not block web improvements for app-only constraints.

## Shared codebase

- The same **`www/`** tree can still be bundled into the Capacitor app later. If a change must stay app-only when app work resumes, scope it with `window.Capacitor`, `html.android-webview`, `html.android-app-home`, etc.

## Local dev (website)

- Example: `npx serve www -p 8080` → `http://localhost:8080/` (or use VS Code **Launch Chrome against localhost** on port 8080).

## When Android work resumes

- After `www/` edits for the app: `npx cap sync android`, then rebuild in Android Studio.

---

*Updated per request: website work active; Android app work on hold.*
