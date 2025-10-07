# 🎮 Cyberdeck User Guide

Welcome to **Cyberdeck** - your cyberpunk-themed project management system! This guide will help you get started in minutes.

---

## 📋 Table of Contents

1. [Getting Started](#getting-started)
2. [Your First Gig](#your-first-gig)
3. [Adding Jobs](#adding-jobs)
4. [Managing Tasks](#managing-tasks)
5. [Time Tracking](#time-tracking)
6. [Using Analytics](#using-analytics)
7. [Keyboard Shortcuts](#keyboard-shortcuts)
8. [Tips & Tricks](#tips--tricks)

---

## 🚀 Getting Started

### Step 1: Create an Account

1. Visit **https://cyberchoom.netlify.app**
2. Click **"Register"**
3. Fill in:
   - **Full Name**: Your name
   - **Email**: Your email address
   - **Password**: At least 6 characters
   - **Confirm Password**: Same password
4. Click **"Create Account"**
5. You'll get a **random avatar** assigned (you can change it later!)
6. Check your email for verification (optional)

### Step 2: Login

1. Enter your email and password
2. Click **"Access System"**
3. You're in! 🎉

### Step 3: Understand the Interface

**Sidebar (Left):**
- 📊 **Dashboard** - Overview of everything
- 💼 **Gigs** - Your projects
- ✅ **Jobs** - Your tasks
- 📈 **Analytics** - Charts and insights
- ⚙️ **Settings** - Account and preferences

**Header (Top):**
- 🔍 **Search Bar** - Find gigs and jobs quickly
- 📅 **Current Date** - Today's date

**Bottom of Sidebar:**
- 👤 **Your Avatar** - Click to go to profile
- 📧 **Your Email**
- 🟢 **System Status**

---

## 💼 Your First Gig

**What's a Gig?** A gig is a project or a major goal (like "Build Website" or "Learn React")

### Creating a Gig

1. Click **"Gigs"** in sidebar (or press `G`)
2. Click **"+ New Gig"** button
3. Fill in:
   - **Title** *(required)*: Name of your project
     - Example: "Build Portfolio Website"
   - **Description**: What's this project about?
     - Example: "Create a personal portfolio to showcase my work"
   - **Status**: Choose one:
     - 🟢 **Active** - Currently working on it
     - ⏸️ **On Hold** - Paused for now
     - ✅ **Completed** - Finished!
   - **Deadline**: When should it be done? (optional)
4. Click **"Create Gig"**
5. 🎉 **Toast notification** appears: "Gig created successfully!"

### Viewing Your Gigs

- **Card View**: Each gig shows as a card with:
  - Title and description
  - Status badge
  - Progress bar (% of jobs completed)
  - Number of jobs
  - Deadline (if set)
- **Click a gig card** to see all its jobs

### Editing a Gig

1. Click on a gig card to open it
2. Click **"Edit" icon** (pencil) at top right
3. Update any field
4. Click **"Update Gig"**

### Filtering & Sorting

**Filters:**
- Status: All / Active / On Hold / Completed

**Sort By:**
- Most Recent
- Title (A-Z)
- Deadline (soonest first)

---

## ✅ Adding Jobs

**What's a Job?** A job is a task within a gig (like "Design homepage" or "Write about page")

### Creating a Job

1. **Option A**: From Gigs page
   - Open a gig
   - Click **"+ New Job"**

2. **Option B**: From Jobs page
   - Click **"Jobs"** in sidebar (or press `J`)
   - Click **"+ New Job"**

3. Fill in the form:
   - **Gig** *(required)*: Which project does this belong to?
   - **Title** *(required)*: What's the task?
     - Example: "Design homepage mockup"
   - **Description**: More details about the task
   - **Additional Info**: Extra notes, links, references
   - **Status**:
     - 📝 **To Do** - Not started
     - 🔄 **In Progress** - Currently working
     - 🚫 **Blocked** - Waiting on something
     - ✅ **Completed** - Done!
   - **Priority**:
     - ⚪ **Low** - Nice to have
     - 🔵 **Medium** - Normal priority
     - 🟠 **High** - Important
     - 🔴 **Critical** - Urgent!
   - **Deadline**: When is this due?

4. Click **"Create Job"**

### Job Detail View

Click any job card to see full details:

**Left Side:**
- 📋 **Description & Info** - Full text
- ☑️ **Subtasks** - Checklist items
- 📎 **Attachments** - File links

**Right Side:**
- ⏱️ **Time Tracker** - Start/stop timer
- 📊 **Metadata** - Created/updated dates

---

## 📝 Managing Tasks

### Adding Subtasks

Break down jobs into smaller steps:

1. Open a job
2. Find **"Subtasks"** section
3. Type in the input box: "Create wireframe"
4. Click **+** button
5. Repeat for more subtasks

**Checking off subtasks:**
- Click the checkbox ☑️ to mark complete
- Click again to uncheck
- Delete with trash icon 🗑️

**Example Subtasks:**
```
Job: "Design homepage mockup"
  ☐ Research competitor websites
  ☑ Create wireframe sketch
  ☐ Design in Figma
  ☐ Get feedback
```

### Adding Attachments

Link files, documents, or resources:

1. Open a job
2. Find **"Attachments"** section
3. Click **+** button
4. Enter:
   - **Name**: "Design mockup"
   - **URL**: "https://figma.com/file/..."
5. Click **"Add"**

**What to attach:**
- Design files (Figma, Sketch)
- Documents (Google Docs, Notion)
- Code repositories (GitHub)
- Reference links
- Screenshots

### Changing Status & Priority

**Quick update:**
1. Click **"Edit"** on the job
2. Change **Status** or **Priority**
3. Click **"Update Job"**

**Visual indicators:**
- Jobs are color-coded by priority
- Status badges show current state
- Overdue jobs show in red

---

## ⏱️ Time Tracking

Track how long you work on each job:

### Using the Timer

1. Open a job
2. Find **"Time Tracking"** section
3. Click **"Start"** ▶️ when you begin work
4. Timer counts up in real-time
5. Click **"Pause"** ⏸️ when you take a break
6. Time auto-saves every 10 seconds

### Manual Time Entry

Already worked on something?

1. Find **"Manual Time Entry"**
2. Enter time:
   - `1:30:00` = 1 hour 30 minutes
   - `45:00` = 45 minutes
   - `30` = 30 minutes
3. Click **"Set"**

### Viewing Total Time

- Each job card shows total time tracked
- Dashboard shows total time across all jobs
- Format: `HH:MM:SS` (Hours:Minutes:Seconds)

---

## 📊 Using Analytics

Press `A` or click **"Analytics"** to see insights:

### Available Charts

**1. Job Status Distribution (Pie Chart)**
- See breakdown of To Do / In Progress / Blocked / Completed
- Identify bottlenecks

**2. Priority Distribution (Bar Chart)**
- How many jobs at each priority level
- Balance your workload

**3. Top Gigs by Job Count**
- Which projects have most tasks
- Focus your efforts

### Reading Your Analytics

**High number of Blocked jobs?** 
→ Figure out what's blocking you

**Too many High/Critical priorities?**
→ Reassess what's truly urgent

**One gig has way more jobs?**
→ Maybe break it into multiple gigs

---

## ⌨️ Keyboard Shortcuts

Navigate faster without your mouse:

| Key | Action |
|-----|--------|
| `D` | Go to **Dashboard** |
| `G` | Go to **Gigs** |
| `J` | Go to **Jobs** |
| `A` | Go to **Analytics** |
| `S` | Go to **Settings** |
| `/` | Focus search bar |
| `ESC` | Close any dialog/modal |

**Pro tip:** These work from anywhere in the app (except when typing in forms)!

---

## 🎯 Tips & Tricks

### 1. Start Small
- Don't create 50 gigs on day 1
- Start with 1-3 active gigs
- Add jobs as you think of them

### 2. Use Deadlines Wisely
- Set realistic deadlines
- Yellow warning = due soon
- Red warning = overdue
- No deadline = no pressure (sometimes good!)

### 3. Priority Best Practices
- **Critical** = Drop everything
- **High** = Do this week
- **Medium** = Do this month
- **Low** = Someday/maybe

### 4. Subtasks are Powerful
- Break big jobs into 5-10 subtasks
- Check them off for motivation
- See real progress

### 5. Track Time Consistently
- Start timer when you begin
- Builds accurate time estimates
- See where time actually goes

### 6. Use Search
- Type `/` to focus search
- Search works across all gigs and jobs
- Filter by status/priority after searching

### 7. Regular Reviews
- Check Dashboard daily
- Review Analytics weekly
- Archive completed gigs monthly

### 8. Export Backups
- Go to Settings
- Click "Export Backup"
- Save the JSON file
- Do this weekly or monthly

### 9. Customize Your Avatar
- Go to Profile
- Click "Change Avatar"
- Pick one that represents you
- 16 cyberpunk options!

### 10. Mobile Works Too
- Responsive design
- Works on phone/tablet
- Access anywhere

---

## 🎨 Understanding the UI

### Color Coding

**Priority Colors:**
- ⚪ Low = Gray
- 🔵 Medium = Blue
- 🟠 High = Orange
- 🔴 Critical = Red

**Status Colors:**
- 📝 To Do = Gray
- 🔄 In Progress = Yellow
- 🚫 Blocked = Red
- ✅ Completed = Green

**Deadline Warnings:**
- 🟢 Normal = Gray text
- 🟡 Due Soon (3 days) = Orange
- 🔴 Overdue = Red

### Card Components

**Gig Card shows:**
- Title & description
- Status badge
- Progress percentage
- Progress bar (visual)
- Number of jobs
- Deadline (if set)

**Job Card shows:**
- Title
- Gig it belongs to
- Priority badge
- Status badge
- Subtasks count (if any)
- Attachments count (if any)
- Time tracked (if any)
- Deadline (if set)

---

## 📱 Using on Mobile

**Responsive Design:**
- Sidebar collapses to hamburger menu
- Cards stack vertically
- Touch-friendly buttons
- Swipe to navigate

**Best Practices:**
- Use search more (easier than scrolling)
- Quick status updates on the go
- Time tracking works great
- Full editing on desktop later

---

## 🔒 Privacy & Data

### Cloud Mode (Supabase)
- ✅ Data syncs across devices
- ✅ Access from anywhere
- ✅ Automatic backups
- ✅ Secure encryption
- ✅ Only YOU see your data
- 🔒 Row-level security enabled

### Local Mode (No Login)
- 💾 Data in browser only
- 📱 This device only
- 🔓 No account needed
- ⚠️ Clear browser data = lose data
- 💡 Export backups regularly!

### What We Store
- Gigs (title, description, status, deadline)
- Jobs (all fields, subtasks, attachments, time)
- User profile (name, email, avatar choice)
- Nothing else!

### What We DON'T Store
- Passwords (hashed by Supabase)
- Payment info (no payments!)
- Tracking/analytics (privacy first)
- Third-party cookies

---

## 🆘 Troubleshooting

### "I can't find my gig/job"
- Check filters (set to "All")
- Try searching with `/`
- Check if accidentally deleted

### "My timer didn't save"
- Timer auto-saves every 10 seconds
- Click "Pause" to force save
- Check internet connection (cloud mode)

### "I lost my data"
- Cloud mode: Still in database
- Local mode: Check browser didn't clear data
- Restore from export backup

### "Page won't load"
- Refresh the page
- Clear browser cache
- Check internet connection
- Try different browser

### "I forgot my password"
- Click "Forgot password?" on login
- Enter email
- Check email for reset link
- Follow instructions

---

## 🎓 Common Workflows

### Workflow 1: Personal Projects

```
1. Create Gig: "Learn JavaScript"
2. Add Jobs:
   - "Complete FreeCodeCamp course"
   - "Build 3 practice projects"
   - "Read 'You Don't Know JS' book"
3. Add subtasks to each job
4. Track time daily
5. Check progress weekly
```

### Workflow 2: Freelance Work

```
1. Create Gig: "Client Website Project"
2. Add Jobs by phase:
   - "Discovery & Planning"
   - "Design mockups"
   - "Frontend development"
   - "Backend integration"
   - "Testing & deployment"
3. Set deadlines for each phase
4. Track billable hours
5. Export time reports monthly
```

### Workflow 3: Daily Task Management

```
1. Morning: Press 'D' → Check dashboard
2. See overdue/upcoming items
3. Press 'J' → Filter "In Progress"
4. Pick 2-3 jobs for today
5. Start timer on first job
6. Work through subtasks
7. Evening: Update statuses
```

---

## 🏆 Power User Tips

### Master Keyboard Navigation
- Never touch mouse
- `D` `G` `J` `A` `S` = instant nav
- `/` = search anything
- `ESC` = close everything

### Organize with Naming
- Prefix gigs: "[Work] Project X"
- Date stamps: "Q4 2024 Goals"
- Emoji prefixes: "🎨 Design Projects"

### Use Analytics Weekly
- Sunday review ritual
- Check what got done
- Identify blockers
- Plan next week

### Batch Similar Tasks
- All "Design" jobs together
- All "Research" jobs together
- Switch contexts less
- More flow state

### Time Blocking
- High priority = morning (fresh mind)
- Low priority = afternoon (low energy OK)
- Use time tracking to find patterns

---

## 🎁 Hidden Features

### Dashboard Alerts
- Red alerts = Overdue jobs
- Orange alerts = Blocked jobs
- Click to go directly there

### Gig Progress
- Auto-calculates from jobs
- Updates in real-time
- 100% = all jobs done

### Click Anywhere
- Gig card = open gig
- Job card = open job
- Avatar = go to profile
- Email in sidebar = go to profile

### Smart Defaults
- New gig = Status "Active"
- New job = Priority "Medium"
- New job = Status "To Do"

---

## 📚 Next Steps

**After reading this guide:**

1. ✅ Create your first gig
2. ✅ Add 3-5 jobs to it
3. ✅ Break one job into subtasks
4. ✅ Try the time tracker
5. ✅ Check the dashboard
6. ✅ Change your avatar
7. ✅ Export a backup
8. ✅ Try keyboard shortcuts

**Enjoy Cyberdeck! 🚀**

---

## 💬 Need Help?

- 📖 Read **FEATURES.md** for technical details
- 🔧 Check **SUPABASE_SETUP.md** for backend info
- 🚀 See **DEPLOYMENT.md** for hosting guide
- 💻 Review **README.md** for overview

**Stay frosty, choom!** ⚡

