# 🔐 OAuth Setup Guide (Google & Apple Sign-In)

This guide will help you enable Google and Apple sign-in for your Cyberdeck app.

---

## 🎯 What You'll Enable

After setup, users can:
- ✅ Sign up with Google (one click!)
- ✅ Sign up with Apple (one click!)
- ✅ No password to remember
- ✅ Faster registration
- ✅ More secure

---

## 🔵 Part 1: Google OAuth Setup

### Step 1: Create Google OAuth Credentials

1. **Go to Google Cloud Console**: https://console.cloud.google.com
2. **Create a new project** (or select existing):
   - Click dropdown at top
   - Click "New Project"
   - Name: `Cyberdeck`
   - Click "Create"

3. **Enable Google+ API**:
   - Search "Google+ API" in search bar
   - Click "Enable"

4. **Configure OAuth Consent Screen**:
   - Go to "APIs & Services" → "OAuth consent screen"
   - Select **"External"** user type
   - Click "Create"
   - Fill in:
     - **App name**: Cyberdeck
     - **User support email**: Your email
     - **Developer contact**: Your email
   - Click "Save and Continue"
   - Skip scopes (click "Save and Continue")
   - Add test users if needed
   - Click "Save and Continue"

5. **Create OAuth Client ID**:
   - Go to "Credentials" tab
   - Click "+ Create Credentials" → "OAuth Client ID"
   - Application type: **"Web application"**
   - Name: `Cyberdeck Web`
   - **Authorized JavaScript origins**:
     ```
     https://cyberchoom.netlify.app
     http://localhost:5173
     ```
   - **Authorized redirect URIs**:
     ```
     https://ldcjmbdluvkirnxxdxxv.supabase.co/auth/v1/callback
     http://localhost:54321/auth/v1/callback
     ```
   - Click "Create"
   - **Copy** the Client ID and Client Secret

### Step 2: Add to Supabase

1. **Go to Supabase Dashboard**
2. **Click "Authentication"** → **"Providers"**
3. **Find "Google"** in the list
4. **Toggle it ON** (enable)
5. **Paste**:
   - **Client ID**: Your Google Client ID
   - **Client Secret**: Your Google Client Secret
6. **Authorized redirect URL** should show:
   ```
   https://ldcjmbdluvkirnxxdxxv.supabase.co/auth/v1/callback
   ```
7. Click **"Save"**

### Step 3: Test Google Sign-In

1. Go to https://cyberchoom.netlify.app/login
2. Click **"Continue with Google"**
3. Google popup appears
4. Select your Google account
5. Redirects back to Cyberdeck
6. You're logged in! ✅

---

## 🍎 Part 2: Apple OAuth Setup

### Step 1: Create Apple App ID

1. **Go to Apple Developer**: https://developer.apple.com/account
   - **Note**: Requires Apple Developer account ($99/year)
   - **OR** skip Apple sign-in (Google is usually enough)

2. **Register an App ID**:
   - Go to "Certificates, Identifiers & Profiles"
   - Click "Identifiers" → "+" button
   - Select "App IDs" → Continue
   - Select "App" → Continue
   - Description: `Cyberdeck`
   - Bundle ID: `com.cyberdeck.app` (or your domain)
   - Check "Sign in with Apple"
   - Click "Continue" → "Register"

3. **Create Service ID**:
   - Click "Identifiers" → "+" button
   - Select "Services IDs" → Continue
   - Description: `Cyberdeck Web`
   - Identifier: `com.cyberdeck.web`
   - Check "Sign in with Apple"
   - Click "Configure"
   - **Primary App ID**: Select the App ID you created
   - **Domains and Subdomains**:
     ```
     cyberchoom.netlify.app
     ldcjmbdluvkirnxxdxxv.supabase.co
     ```
   - **Return URLs**:
     ```
     https://ldcjmbdluvkirnxxdxxv.supabase.co/auth/v1/callback
     ```
   - Click "Save" → "Continue" → "Register"

4. **Create Key**:
   - Go to "Keys" → "+" button
   - Key Name: `Cyberdeck Sign in with Apple`
   - Check "Sign in with Apple"
   - Click "Configure" → Select your App ID
   - Click "Save" → "Continue" → "Register"
   - **Download the .p8 key file** (you can only download once!)
   - **Note the Key ID** (10 characters)

### Step 2: Add to Supabase

1. **Go to Supabase Dashboard**
2. **Click "Authentication"** → **"Providers"**
3. **Find "Apple"** in the list
4. **Toggle it ON** (enable)
5. **Fill in**:
   - **Services ID**: `com.cyberdeck.web` (from Step 1)
   - **Team ID**: Found in Apple Developer → Membership (10 characters)
   - **Key ID**: From the key you created (10 characters)
   - **Secret Key**: Paste contents of the .p8 file
6. Click **"Save"**

### Step 3: Test Apple Sign-In

1. Go to https://cyberchoom.netlify.app/login
2. Click **"Continue with Apple"**
3. Apple popup appears
4. Sign in with Apple ID
5. Choose to share or hide email
6. Redirects back to Cyberdeck
7. You're logged in! ✅

---

## ⚡ Quick Setup (Google Only - Recommended)

**Apple requires paid developer account ($99/year)**

Most apps only need Google:
- ✅ Free
- ✅ Most users have Google accounts
- ✅ Easy setup
- ✅ Works everywhere

**Skip Apple if:**
- You don't have Apple Developer account
- Your users aren't primarily iOS users
- You want to launch faster

---

## 🧪 Testing OAuth Locally

**For localhost testing:**

1. **Google**:
   - Add `http://localhost:5173` to authorized origins
   - Add callback URL with your Supabase project ref
   - Works immediately

2. **Apple**:
   - Apple doesn't allow localhost
   - Must test on deployed version only
   - Use https://cyberchoom.netlify.app for testing

---

## 🎨 What I Added to Your App

### Login Page:
```
Email/Password Form
    ↓
─── OR CONTINUE WITH ───
    ↓
[🔵 Continue with Google]
[🍎 Continue with Apple]
```

### Register Page:
```
Registration Form
    ↓
─── OR SIGN UP WITH ───
    ↓
[🔵 Sign up with Google]
[🍎 Sign up with Apple]
```

### Features:
- ✅ Cyberpunk-styled OAuth buttons
- ✅ Google logo with yellow colors
- ✅ Apple logo with yellow color
- ✅ Loading states ("Connecting...")
- ✅ Error handling
- ✅ Disabled states when loading
- ✅ Hover effects (border turns yellow)

---

## 🔄 How OAuth Flow Works

```
1. User clicks "Continue with Google"
   ↓
2. Supabase redirects to Google login
   ↓
3. User logs in with Google
   ↓
4. Google redirects to Supabase callback
   ↓
5. Supabase creates/logs in user
   ↓
6. Redirects back to Cyberdeck
   ↓
7. User is logged in! ✅
```

**What gets stored:**
- User email (from Google/Apple)
- User name (from Google/Apple)
- Profile picture URL (from Google/Apple)
- Random avatar assigned (if first time)

---

## 📋 Setup Checklist

### Google OAuth:
- [ ] Create Google Cloud project
- [ ] Enable Google+ API
- [ ] Configure OAuth consent screen
- [ ] Create OAuth Client ID
- [ ] Copy Client ID & Secret
- [ ] Add to Supabase
- [ ] Test on live site

### Apple OAuth (Optional):
- [ ] Have Apple Developer account ($99/year)
- [ ] Create App ID
- [ ] Create Service ID
- [ ] Create Key and download .p8
- [ ] Add to Supabase
- [ ] Test on live site

---

## 🎯 Recommended Approach

**Phase 1: Google Only (Start Here)**
1. Set up Google OAuth (free, easy)
2. Deploy and test
3. Users can sign in with Google!

**Phase 2: Add Apple (Later)**
1. Get Apple Developer account
2. Set up Apple OAuth
3. Deploy and test
4. Users have both options!

---

## 🚀 Current Status

✅ **Code is ready!** OAuth buttons are in your app  
✅ **UI is designed!** Cyberpunk-themed buttons  
✅ **Deployed!** Live at https://cyberchoom.netlify.app  

**What you need:**
- Set up Google OAuth in Google Cloud Console
- Add credentials to Supabase
- Enable Google provider in Supabase
- Test!

**Time estimate:**
- Google setup: 10-15 minutes
- Apple setup: 30-45 minutes (+ $99/year)

---

## 💡 Pro Tips

### After OAuth is set up:
- Users can sign up **5x faster**
- No password to remember
- More secure (Google/Apple handle security)
- Better conversion rates
- Professional feel

### Common Issues:
- **Redirect mismatch**: Check URLs match exactly
- **localhost not working**: Use deployed URL for testing
- **Apple not working locally**: Normal, test on production
- **Error "invalid_grant"**: Check credentials are correct

---

## 📊 Files Modified

```
src/contexts/AuthContext.jsx           ← Added OAuth methods
src/components/auth/Login.jsx          ← Added OAuth buttons
src/components/auth/Register.jsx       ← Added OAuth buttons
OAUTH_SETUP.md                         ← This guide
```

---

## ✅ Next Step

**Set up Google OAuth first** (easiest):

1. Follow "Part 1: Google OAuth Setup" above
2. Takes 10-15 minutes
3. Test on https://cyberchoom.netlify.app
4. Done! 🎉

**Your app will have:**
- Regular email/password login
- Google one-click sign-in
- Apple sign-in (if you set it up)

All with beautiful cyberpunk styling! ⚡

