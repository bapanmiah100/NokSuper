# দ্বিতীয় ব্রাঞ্চ তৈরি (Netlify / GitHub এর জন্য)

টার্মিনাল বা Git Bash এ প্রজেক্ট ফোল্ডারে গিয়ে নিচের কমান্ড চালান:

## ১. প্রজেক্ট ফোল্ডারে যান
```
cd "C:\Users\miasa\OneDrive\Desktop\NOK Super"
```

## ২. বর্তমান ব্রাঞ্চ চেক করুন
```
git branch
```

## ৩. নতুন ব্রাঞ্চ তৈরি করুন (নাম: develop)
```
git checkout -b develop
```

## ৪. GitHub এ নতুন ব্রাঞ্চ পুশ করুন
```
git push -u origin develop
```

## ৫. আবার main এ ফিরে যান (প্রয়োজন হলে)
```
git checkout main
```

এখন রিপোজিটরিতে ২টা ব্রাঞ্চ থাকবে: main ও develop। তারপর Netlify/GitHub এ আবার চেষ্টা করুন।
