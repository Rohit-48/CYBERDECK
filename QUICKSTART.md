# 🚀 Cyberdeck - Quick Start Guide

## Get Running in 2 Minutes

### 1. Development
```bash
npm install
npm run dev
```
Open http://localhost:5173

### 2. Production Build
```bash
npm run build
npm run preview
```

### 3. Deploy to Vercel (Easiest)
```bash
# Install Vercel CLI (one time)
npm i -g vercel

# Deploy
vercel
```
Follow the prompts and your app will be live in seconds!

### 4. Deploy to Netlify
```bash
# Install Netlify CLI (one time)
npm i -g netlify-cli

# Deploy
npm run deploy:netlify
```

### 5. Or Use GitHub
1. Push to GitHub
2. Go to vercel.com or netlify.com
3. Click "Import Project"
4. Select your repo
5. Deploy! ✨

## Features Overview

### Create Your First Gig
1. Click "Gigs" in sidebar
2. Click "New Gig"
3. Enter title, description, deadline
4. Save!

### Add Jobs to Gig
1. Open a gig
2. Click "New Job"
3. Add:
   - Title & Description
   - Priority (Low → Critical)
   - Status (To Do → Completed)
   - Deadline
4. Save!

### Advanced Features
- **Subtasks**: Break down jobs into smaller tasks
- **Time Tracking**: Start/stop timer or enter manually
- **Attachments**: Add file links and URLs
- **Dashboard**: Monitor everything at a glance

## Data Storage

All data is saved in your browser's localStorage:
- ✅ Automatic saving
- ✅ Works offline
- ✅ Private to your device
- ✅ No server required

## Troubleshooting

**Port already in use?**
```bash
# Kill the process
npx kill-port 5173
npm run dev
```

**Build fails?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Need help?**
- Check README.md for detailed docs
- Check DEPLOYMENT.md for hosting guide
- Review the code - it's well commented!

---

## What's Next?

1. ✅ Start creating gigs and jobs
2. ✅ Deploy to make it accessible
3. ✅ Share the URL with your team
4. 🎯 Stay organized and hit deadlines!

**Happy hacking, choom!** ⚡

