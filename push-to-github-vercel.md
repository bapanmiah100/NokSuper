# Push to GitHub

Run these commands in **Git Bash** or a terminal where `git` works (same folder as your project):

```bash
cd "c:\Users\miasa\OneDrive\Desktop\NOK Super"

# See what’s changed
git status

# Stage all changes
git add -A

# Commit (edit the message if you like)
git commit -m "Vercel setup: vercel.json, remove Netlify readme, update docs"

# Push to GitHub (main branch)
git push origin main
```

If Git asks for login, use your GitHub username and a **Personal Access Token** (not your password):  
GitHub → Settings → Developer settings → Personal access tokens.

If the branch is not `main`, replace `main` with your branch name (e.g. `master`).
