# GitHub এ আপলোড করার ধাপ (bapanmiah100/NOK-Super-Latest)

**আপনার রিপো:** https://github.com/bapanmiah100/NOK-Super-Latest

---

## ১. Git ইনস্টল করুন (একবারই লাগবে)
- এখান থেকে ডাউনলোড করুন: https://git-scm.com/download/win
- ইনস্টল করার পর **Cursor/Terminal বন্ধ করে আবার খুলুন**।

---

## ২. Cursor এ Terminal খুলে এই কমান্ডগুলো একটার পর একটা চালান:

```powershell
cd "c:\Users\miasa\OneDrive\Desktop\NOK Super"
```

```powershell
git init
```

```powershell
git add .
```

```powershell
git commit -m "Update NOK Super project"
```

```powershell
git remote add origin https://github.com/bapanmiah100/NOK-Super-Latest.git
```

```powershell
git branch -M main
```

```powershell
git push -u origin main
```

---

## যদি আগে থেকেই এই ফোল্ডারে Git চালু থাকে:

```powershell
cd "c:\Users\miasa\OneDrive\Desktop\NOK Super"
git remote add origin https://github.com/bapanmiah100/NOK-Super-Latest.git
git add .
git commit -m "Update NOK Super project"
git push -u origin main
```

---

**নোট:** প্রথমবার `git push` করলে GitHub থেকে লগইন চাইতে পারে (ব্রাউজার বা username/password)।
