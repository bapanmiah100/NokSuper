# Push NOK Super to GitHub

Repo: **https://github.com/bapanmiah100/NOK-Super-Latest.git**

## 1. Install Git (if not installed)

- Download: https://git-scm.com/download/win  
- Run the installer and restart your terminal.

## 2. Open terminal in project folder

- In Cursor/VS Code: **Terminal → New Terminal** (folder: `NOK Super`).  
- Or in File Explorer: open `NOK Super`, type `cmd` in the address bar and press Enter.

## 3. Run these commands one by one

```bash
git init
git remote add origin https://github.com/bapanmiah100/NOK-Super-Latest.git
git add .
git commit -m "Initial commit: NOK Super app"
git branch -M main
git push -u origin main
```

## 4. If GitHub asks for login

- **Username:** your GitHub username (`bapanmiah100`).  
- **Password:** use a **Personal Access Token**, not your GitHub password.  
  - GitHub → Settings → Developer settings → Personal access tokens → Generate new token.  
  - Give it `repo` scope, copy the token, and paste it when Git asks for password.

## 5. If the repo already has files (e.g. README)

```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

After this, your full code will be on: **https://github.com/bapanmiah100/NOK-Super-Latest**
