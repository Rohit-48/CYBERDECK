# 📧 Custom Email Templates Setup

## How to Add Custom Email Templates to Supabase

### Step 1: Access Email Templates

1. Go to **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your **Cyberdeck project**
3. Click **"Authentication"** (shield icon in left sidebar)
4. Click **"Email Templates"** in the submenu

---

### Step 2: Update Site URL (IMPORTANT!)

Before setting up templates:

1. In Authentication, click **"URL Configuration"**
2. Set **"Site URL"** to:
   ```
   https://cyberchoom.netlify.app
   ```
3. Add to **"Redirect URLs"**:
   ```
   https://cyberchoom.netlify.app/**
   http://localhost:5173/**
   ```
4. Click **"Save"**

---

### Step 3: Customize Email Templates

You'll see these templates in Supabase:

#### 1. **Confirm Signup** ✉️

- Click **"Confirm signup"** template
- Replace ALL content with code from:
  - `email-templates/confirmation-email.html`
- Click **"Save"**

#### 2. **Reset Password** 🔒

- Click **"Reset password"** template  
- Replace ALL content with code from:
  - `email-templates/password-reset-email.html`
- Click **"Save"**

#### 3. **Magic Link** ⚡ (Optional)

- Click **"Magic Link"** template
- Replace with code from:
  - `email-templates/magic-link-email.html`
- Click **"Save"**

#### 4. **Confirm Email Change** 📧

- Click **"Change email address"** template
- Replace with code from:
  - `email-templates/email-change-confirmation.html`
- Click **"Save"**

#### 5. **Confirm Reauthentication** 🔐

- Click **"Confirm reauthentication"** template
- Replace with code from:
  - `email-templates/reauthentication-email.html`
- Click **"Save"**

#### 6. **Invite User** 🎯 (Optional)

- Click **"Invite user"** template
- Replace with code from:
  - `email-templates/invite-user-email.html`
- Click **"Save"**

---

### Step 4: Preview & Test

**Preview in Supabase:**
1. Each template has a **"Preview"** button
2. Check how it looks

**Send Test Email:**
1. Go to **SQL Editor**
2. Run this query (replace with your email):
   ```sql
   SELECT auth.send_confirmation_email('your@email.com');
   ```
3. Check your inbox!

---

## 🎨 Email Design Features

### **Cyberpunk Styling:**
- ✅ Dark background (#0a0a0a, #1a1a1a)
- ✅ Yellow accent color (#fcee0a)
- ✅ Monospace font (Share Tech Mono)
- ✅ Angular clipped corners on button
- ✅ Technical borders
- ✅ Scanline separator

### **Professional Elements:**
- ✅ Responsive (works on mobile)
- ✅ Security tips included
- ✅ Clear call-to-action button
- ✅ Fallback copy-paste link
- ✅ Expiry warnings
- ✅ Feature teaser (confirmation email)
- ✅ Brand consistency

### **Email Variables:**

Supabase provides these variables:
- `{{ .Email }}` - User's email address
- `{{ .ConfirmationURL }}` - The action link
- `{{ .Token }}` - Verification token
- `{{ .TokenHash }}` - Hashed token
- `{{ .SiteURL }}` - Your site URL

---

## 📋 Quick Setup Checklist

- [ ] Update Site URL in Supabase
- [ ] Add Redirect URLs
- [ ] Copy confirmation email HTML
- [ ] Copy password reset email HTML
- [ ] Copy magic link email HTML (optional)
- [ ] Save all templates
- [ ] Send test email
- [ ] Check inbox
- [ ] Test on mobile email client

---

## 🧪 Testing Your Emails

### Test Confirmation Email:
1. Register a new account
2. Check email
3. Click "CONFIRM EMAIL" button
4. Should redirect to https://cyberchoom.netlify.app

### Test Password Reset:
1. Go to login page
2. Click "Forgot password?"
3. Enter email
4. Check email
5. Click "RESET PASSWORD" button
6. Should redirect to password reset page

---

## 🎯 Email Best Practices

### Keep It Simple:
- ✅ Clear subject line
- ✅ Single call-to-action button
- ✅ Fallback text link
- ✅ Mobile-friendly design

### Security:
- ✅ Explain why email was sent
- ✅ Show expiry time
- ✅ Warn about suspicious requests
- ✅ Include sender info

### Branding:
- ✅ Match app design (cyberpunk theme)
- ✅ Consistent colors
- ✅ Same fonts
- ✅ Logo/emoji icon

---

## 🎨 Customization Options

Want to modify the emails?

### Change Colors:
```html
<!-- Background -->
background-color: #0a0a0a  → Your color

<!-- Accent -->
color: #fcee0a  → Your color

<!-- Button -->
background-color: #fcee0a  → Your color
```

### Change Button Text:
```html
<a href="...">
  CONFIRM EMAIL  → YOUR TEXT HERE
</a>
```

### Add Your Logo:
```html
<!-- Replace emoji with image -->
<img src="https://your-cdn.com/logo.png" 
     alt="Cyberdeck" 
     width="64" 
     height="64">
```

---

## 🚀 Advanced: Custom SMTP (Optional)

For production, use custom email service:

1. Supabase Dashboard → **Authentication** → **Settings**
2. Find **"SMTP Settings"**
3. Add your SMTP provider:
   - **SendGrid** (Free tier: 100 emails/day)
   - **Mailgun** (Free tier: 1000 emails/month)
   - **AWS SES** (Cheapest for volume)
4. Configure:
   - Host: `smtp.sendgrid.net`
   - Port: `587`
   - User: Your username
   - Password: Your API key
5. Test and save

**Benefits:**
- ✅ Custom sender name
- ✅ Better deliverability
- ✅ No "via Supabase" in email
- ✅ Higher sending limits

---

## 📊 Default Supabase Templates

If you don't customize, Supabase uses plain templates:
- Plain text
- Basic styling
- Works but boring
- Not branded

**Your custom templates:**
- 🎨 Branded
- 🎯 Professional
- 🚀 Cyberpunk themed
- ✨ Memorable

---

## 🔍 Troubleshooting

### Email not received?
- Check spam folder
- Verify email address is correct
- Check Supabase logs (Authentication → Logs)
- Ensure Site URL is correct

### Wrong redirect URL?
- Update Site URL in Supabase
- Add to Redirect URLs list
- Save and try again

### Email looks broken?
- Some email clients don't support CSS
- Test in Gmail, Outlook, Apple Mail
- Our templates work in 99% of clients

---

## 📧 Template Files in Your Project

```
email-templates/
├── confirmation-email.html      ← For email verification
├── password-reset-email.html    ← For password reset
└── magic-link-email.html        ← For passwordless login
```

**Each includes:**
- Full HTML structure
- Inline CSS (email-safe)
- Responsive design
- Cyberpunk theme
- Supabase variables

---

## ✅ Final Steps

1. **Copy template HTML** from files
2. **Paste into Supabase** email templates
3. **Update Site URL** to your Netlify URL
4. **Save everything**
5. **Test with real registration**
6. **Emails look amazing!** ✨

Your custom cyberpunk emails will make a great first impression! 🚀

