# Push NOK Super to GitHub

Follow these steps in **Git Bash** or **Command Prompt** (after installing [Git for Windows](https://git-scm.com/download/win) if needed).

## 1. Open terminal in project folder

```bash
cd "c:\Users\miasa\OneDrive\Desktop\NOK Super"
```

## 2. Initialize Git (if not already)

```bash
git init
```

## 3. Add your GitHub repo as remote

```bash
git remote add origin https://github.com/bapanmiah100/NOK-Super-Latest.git
```

If you already have a remote named `origin`, update it:

```bash
git remote set-url origin https://github.com/bapanmiah100/NOK-Super-Latest.git
```

## 4. Add all files

```bash
git add .
```

## 5. First commit

```bash
git commit -m "Initial commit: NOK Super app"
```

## 6. Push to GitHub

**If the repo is empty (first push):**

```bash
git branch -M main
git push -u origin main
```

**If the repo already has commits (e.g. README):**

```bash
git branch -M main
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

### Authentication

- **HTTPS:** When you run `git push`, Git may ask for your GitHub username and **Personal Access Token** (not your password). Create one at: GitHub → Settings → Developer settings → Personal access tokens.
- **SSH:** If you use SSH keys, use this remote instead:  
  `git remote add origin git@github.com:bapanmiah100/NokSuper.git`

### If you get "failed to push" or "rejected"

- Make sure the repo **https://github.com/bapanmiah100/NOK-Super-Latest** exists and you have write access.
- If the repo has content: run `git pull origin main --allow-unrelated-histories` first, then `git push -u origin main`.
