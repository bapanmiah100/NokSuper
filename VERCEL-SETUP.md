# Vercel setup for NOK Super

## If you see an error at `/style.css/index.html`

**Option A – You set "Root Directory" to `style.css` in Vercel**  
Then the app is already at the site root. Use:

- **https://nok-super.vercel.app/** (do not add `/style.css/index.html`)

**Option B – Root Directory is empty (default)**  
Then the repo root is deployed. Use:

- **https://nok-super.vercel.app/** (the root will redirect or rewrite to the app)
- Or **https://nok-super.vercel.app/style.css/index.html** (direct link)

## Check in Vercel

1. Project **nok-super** → **Settings** → **General**.
2. **Root Directory**: leave **empty** so the full repo (including the `style.css` folder) is deployed.
3. **Redeploy** after any change.

## If the app still 404s

- Ensure the `style.css` folder (with `index.html`, `home.html`, etc.) is committed and pushed to your Git repo.
- Redeploy: **Deployments** → **⋯** on latest deploy → **Redeploy**.
