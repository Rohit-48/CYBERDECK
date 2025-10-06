# 🧪 Testing localStorage Persistence

## Test 1: Create Data and Refresh

1. Open http://localhost:5173
2. Create a new Gig (e.g., "Test Project")
3. Add a Job to it (e.g., "Test Task")
4. **Press F5 or Ctrl+R to refresh**
5. ✅ Your data is still there!

## Test 2: Close and Reopen Browser

1. Create some gigs and jobs
2. Close the entire browser window
3. Open browser again
4. Go to http://localhost:5173
5. ✅ All your data is still there!

## Test 3: View Stored Data

**In Chrome/Edge:**
1. Press F12 (Developer Tools)
2. Go to "Application" tab
3. Left sidebar → Local Storage → http://localhost:5173
4. You'll see:
   - `cyberdeck-gigs`: Array of all your gigs
   - `cyberdeck-jobs`: Array of all your jobs

**In Firefox:**
1. Press F12
2. Go to "Storage" tab
3. Local Storage → http://localhost:5173
4. Same keys as above

## Test 4: Data Survives Restart

1. Create gigs/jobs
2. Restart your computer
3. Open browser and visit the app
4. ✅ Data is still there!

## When Data WILL Be Lost:

### ❌ Clear Browser Data
- Browser Settings → Clear browsing data → Cookies and site data
- This WILL delete localStorage

### ❌ Incognito/Private Mode
- Data only lasts for that session
- Closes when you close the incognito window

### ❌ Different Browser
- Chrome data ≠ Firefox data ≠ Edge data
- Each browser has its own localStorage

### ❌ Different Device
- Laptop data ≠ Phone data ≠ Desktop data
- localStorage is device-specific

### ❌ Different Domain
- http://localhost:5173 ≠ https://your-app.vercel.app
- When you deploy, users start fresh on new domain

## How to Backup Your Data

### Manual Backup (I can add this feature):
```javascript
// Export all data
const backup = {
  gigs: localStorage.getItem('cyberdeck-gigs'),
  jobs: localStorage.getItem('cyberdeck-jobs')
};
// Save to file

// Restore from backup
localStorage.setItem('cyberdeck-gigs', backup.gigs);
localStorage.setItem('cyberdeck-jobs', backup.jobs);
```

## Storage Limits

- **Maximum size**: 5-10 MB per domain
- **Your app's data**: Typically < 1 MB for hundreds of gigs/jobs
- **You're safe**: Even with heavy use, you won't hit the limit

## Want Cloud Sync?

If you want data to sync across:
- ✅ Multiple devices
- ✅ Multiple browsers  
- ✅ Automatic backup
- ✅ Team sharing

Then you need backend (Firebase/Supabase).

But for single device/browser use, localStorage is perfect! ✨

