# 🚀 Supabase Backend Setup Guide

This guide will help you set up Supabase as the backend for your Cyberdeck application, enabling cloud storage, user authentication, and multi-device access.

## Step 1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub (recommended) or email
4. It's FREE! No credit card required for the free tier

## Step 2: Create New Project

1. Click "New Project"
2. Fill in:
   - **Name**: `cyberdeck` (or any name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your users
3. Click "Create new project"
4. Wait ~2 minutes for setup to complete

## Step 3: Get API Credentials

1. In your project dashboard, go to **Settings** (gear icon in left sidebar)
2. Click on **API** in the settings menu
3. You'll see two important values:
   - **Project URL** (e.g., `https://abc123.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)
4. Copy these values - you'll need them next

## Step 4: Configure Your App

1. In your Cyberdeck project root, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. Save the file

## Step 5: Create Database Tables

1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click "New query"
3. Copy and paste this SQL:

```sql
-- Enable Row Level Security
ALTER TABLE IF EXISTS public.gigs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.jobs ENABLE ROW LEVEL SECURITY;

-- Create gigs table
CREATE TABLE IF NOT EXISTS public.gigs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  deadline TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  gig_id UUID REFERENCES public.gigs(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  info TEXT,
  status TEXT DEFAULT 'todo',
  priority TEXT DEFAULT 'medium',
  deadline TIMESTAMPTZ,
  subtasks JSONB DEFAULT '[]'::jsonb,
  attachments JSONB DEFAULT '[]'::jsonb,
  time_tracked INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS gigs_user_id_idx ON public.gigs(user_id);
CREATE INDEX IF NOT EXISTS gigs_status_idx ON public.gigs(status);
CREATE INDEX IF NOT EXISTS jobs_user_id_idx ON public.jobs(user_id);
CREATE INDEX IF NOT EXISTS jobs_gig_id_idx ON public.jobs(gig_id);
CREATE INDEX IF NOT EXISTS jobs_status_idx ON public.jobs(status);
CREATE INDEX IF NOT EXISTS jobs_priority_idx ON public.jobs(priority);

-- RLS Policies for gigs table
CREATE POLICY "Users can view their own gigs"
  ON public.gigs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own gigs"
  ON public.gigs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own gigs"
  ON public.gigs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own gigs"
  ON public.gigs FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for jobs table
CREATE POLICY "Users can view their own jobs"
  ON public.jobs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own jobs"
  ON public.jobs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own jobs"
  ON public.jobs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own jobs"
  ON public.jobs FOR DELETE
  USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to automatically update updated_at
CREATE TRIGGER update_gigs_updated_at
  BEFORE UPDATE ON public.gigs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

4. Click "Run" (or press Ctrl/Cmd + Enter)
5. You should see "Success. No rows returned"

## Step 6: Configure Email Settings (Optional)

For user registration and password reset:

1. Go to **Authentication** → **Settings** → **Email Templates**
2. Customize email templates if desired
3. For production, set up custom SMTP in **Settings** → **Auth** → **SMTP Settings**

## Step 7: Test Your Setup

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:5173
3. You'll see the **Login** page (because Supabase is now configured!)
4. Click "Register" and create a test account
5. Check your email for verification (if email is configured)
6. Log in and start creating gigs!

## Step 8: Deploy

When deploying to Vercel/Netlify:

1. Add environment variables in your hosting dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

2. Deploy normally - the app will automatically use Supabase

## Features Enabled with Supabase

✅ **User Authentication**
- Email/password registration
- Secure login/logout
- Password reset

✅ **Cloud Storage**
- All data synced to cloud
- Access from any device
- Automatic backups

✅ **Multi-Device Access**
- Same account, multiple devices
- Real-time data sync
- Work from anywhere

✅ **Security**
- Row-level security (users only see their data)
- Encrypted passwords
- Secure API keys

## Switching Between Modes

### Use Supabase (Cloud):
- Add credentials to `.env`
- Restart dev server
- App uses cloud storage + auth

### Use localStorage (Offline):
- Remove credentials from `.env` (or delete `.env`)
- Restart dev server  
- App works offline with localStorage

## Free Tier Limits

Supabase free tier includes:
- ✅ 500 MB database
- ✅ 5 GB bandwidth/month
- ✅ 50,000 monthly active users
- ✅ Unlimited API requests
- ✅ 2 GB file storage

**This is MORE than enough for personal use and small teams!**

## Troubleshooting

### Can't connect to Supabase
- Check your `.env` file has correct values
- Restart dev server after adding `.env`
- Verify project URL and anon key in Supabase dashboard

### Login not working
- Run the SQL script again to ensure tables exist
- Check Supabase Authentication is enabled
- Look for errors in browser console

### Data not showing
- Check RLS policies are created
- Verify you're logged in
- Check browser console for errors

### Still using localStorage
- Make sure `.env` file exists in root directory
- Verify env variables start with `VITE_`
- Restart dev server

## Migration from localStorage

To move existing localStorage data to Supabase:

1. Export your data:
   - Open browser console
   - Run: `JSON.stringify({gigs: localStorage.getItem('cyberdeck-gigs'), jobs: localStorage.getItem('cyberdeck-jobs')})`
   - Copy the output

2. After setting up Supabase and logging in:
   - Manually recreate your gigs and jobs, or
   - Contact for migration script assistance

## Support

- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Supabase Discord**: [discord.supabase.com](https://discord.supabase.com)
- **Project Issues**: Open an issue on GitHub

---

**That's it!** Your Cyberdeck now has a powerful backend! 🎉

