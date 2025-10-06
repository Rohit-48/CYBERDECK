# Cyberdeck Deployment Guide

## Overview
This guide will help you deploy your Cyberdeck application so anyone can access it online.

## Prerequisites
- A GitHub account (recommended for all deployment methods)
- Your project pushed to a GitHub repository

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

Vercel is the easiest way to deploy your Vite React app with zero configuration.

**Steps:**

1. Push your project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/cyberdeck.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite settings
6. Click "Deploy"
7. Your app will be live at: `https://your-project-name.vercel.app`

**Custom Domain (Optional):**
- In Vercel dashboard → Settings → Domains
- Add your custom domain and follow DNS instructions

---

### Option 2: Netlify (Great Alternative)

Netlify is another excellent option with drag-and-drop deployment.

**Steps:**

1. Push your project to GitHub (see Option 1, step 1)

2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Choose GitHub and select your repository
5. Build settings (usually auto-detected):
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"
7. Your app will be live at: `https://random-name.netlify.app`

**OR use Drag & Drop:**
1. Build locally: `npm run build`
2. Go to [netlify.com/drop](https://app.netlify.com/drop)
3. Drag your `dist` folder onto the page
4. Instant deployment!

---

### Option 3: GitHub Pages (Free Hosting)

Host directly on GitHub for free.

**Setup:**

1. Install gh-pages package:
   ```bash
   npm install -D gh-pages
   ```

2. Update `package.json`:
   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/cyberdeck",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Update `vite.config.js`:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/cyberdeck/',  // Add this line
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

5. Enable GitHub Pages:
   - Go to your repo → Settings → Pages
   - Source: Deploy from branch `gh-pages`
   - Save

6. Your app will be live at: `https://YOUR_USERNAME.github.io/cyberdeck`

---

### Option 4: Railway (Full-Stack Ready)

Great if you plan to add a backend later.

**Steps:**

1. Push to GitHub
2. Go to [railway.app](https://railway.app)
3. "Start a New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects and deploys
6. Get your public URL from the project dashboard

---

## Environment Variables

If you need to add environment variables (for API keys, etc.):

**Create `.env` file:**
```
VITE_API_URL=https://api.example.com
```

**Access in code:**
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

**Set in hosting platform:**
- **Vercel:** Project Settings → Environment Variables
- **Netlify:** Site Settings → Build & Deploy → Environment
- **Railway:** Variables tab in project dashboard

---

## Custom Domain Setup

### Vercel / Netlify
1. Purchase domain from Namecheap, GoDaddy, etc.
2. In your hosting dashboard, go to Domains
3. Add your domain
4. Update your domain's DNS:
   - **Vercel:** Add A record pointing to `76.76.21.21`
   - **Netlify:** Add CNAME record pointing to your Netlify subdomain
5. Wait for DNS propagation (up to 48 hours)

---

## Performance Optimization

Your app is already optimized with:
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification
- ✅ Gzip compression

**Optional enhancements:**
1. Add PWA support for offline functionality
2. Enable CDN caching
3. Add analytics (Vercel Analytics, Google Analytics, etc.)

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routing Issues (404 on refresh)
- The config files (`vercel.json`, `netlify.toml`) handle this
- Make sure they're included in your repository

### LocalStorage Not Working
- LocalStorage works across deployments
- Each user's data stays on their device
- To add cloud sync, you'd need a backend (Firebase, Supabase, etc.)

---

## Recommended Deployment Order

1. **Start with Vercel** (easiest, fastest)
2. Get feedback from users
3. Add custom domain if needed
4. Scale up as your user base grows

---

## Monitoring Your Deployment

After deployment, monitor:
- **Uptime:** Use UptimeRobot (free)
- **Analytics:** Vercel Analytics or Google Analytics
- **Errors:** Sentry.io for error tracking
- **Performance:** Lighthouse CI

---

## Next Steps After Deployment

1. Share your live URL
2. Add analytics to track usage
3. Set up error monitoring
4. Consider adding:
   - User authentication
   - Cloud data sync
   - Team collaboration features
   - Export/Import functionality
   - Dark mode toggle (already cyberpunk dark!)

---

## Quick Deploy Commands

```bash
# Build and test locally
npm run build
npm run preview

# Deploy to Vercel (if using Vercel CLI)
npm i -g vercel
vercel

# Deploy to Netlify (if using Netlify CLI)
npm i -g netlify-cli
netlify deploy --prod

# Deploy to GitHub Pages
npm run deploy
```

---

## Support

If you encounter issues:
1. Check the build logs in your hosting dashboard
2. Verify all dependencies are installed
3. Ensure `dist` folder is being created
4. Check browser console for errors

Your Cyberdeck is ready to go live! 🚀

