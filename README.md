# 🎯 Cyberdeck - Project Management System

A Cyberpunk 2077-inspired project management application for managing gigs (projects) and jobs (tasks) with a sleek, muted cyberpunk aesthetic.

![Cyberdeck](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-19.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Vite](https://img.shields.io/badge/Vite-7.1-646cff)

## ✨ Features

### Gigs (Projects)
- Create, edit, and delete project containers
- Track status: Active, On Hold, Completed
- Set deadlines with visual warnings
- Automatic progress calculation based on jobs
- Beautiful card-based interface with angular cyberpunk design

### Jobs (Tasks)
- **Priority Management**: Low, Medium, High, Critical levels
- **Status Tracking**: To Do, In Progress, Blocked, Completed
- **Subtasks**: Nested checklist items with completion tracking
- **Attachments**: Add file links/URLs with descriptions
- **Time Tracking**: 
  - Start/stop timer with real-time tracking
  - Manual time entry (HH:MM:SS format)
  - Automatic save every 10 seconds
- **Deadline Management**: Visual warnings for overdue and upcoming deadlines
- **Rich Details**: Description, additional info, metadata

### Dashboard
- Real-time statistics and analytics
- Active gigs with progress visualization
- Overdue and blocked job alerts
- Upcoming deadlines calendar
- Recent activity feed
- Quick status overview

### Search & Filtering
- Global search from header bar
- Filter jobs by status, priority, and gig
- Multiple sort options
- Filter gigs by status

### UI/UX
- **Cyberpunk 2077 Aesthetic**: Muted dark palette with yellow accents
- **Typography**: Rajdhani display + Share Tech Mono fonts
- **Design Elements**: 
  - Angular clipped corners
  - Technical border effects
  - Scanline overlays
  - Hover animations
- **No Neon**: Professional, clean cyberpunk look
- **Fully Responsive**: Works on all screen sizes
- **Local Storage**: All data persists automatically

## 🚀 Quick Start

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/cyberdeck.git
cd cyberdeck

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
cyberdeck/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components (Button, Input, Card, etc.)
│   │   ├── layout/          # Layout components (Header, Sidebar, MainLayout)
│   │   ├── dashboard/       # Dashboard with statistics and overview
│   │   ├── gigs/            # Gig management components
│   │   └── jobs/            # Job management with subtasks, time tracking, attachments
│   ├── contexts/            # React Context for state management
│   │   └── DataContext.jsx  # Global data store with localStorage
│   ├── hooks/               # Custom React hooks
│   │   ├── useLocalStorage.js
│   │   └── useTimer.js
│   ├── utils/               # Helper functions and utilities
│   │   ├── cn.js            # Class name merging
│   │   └── helpers.js       # Date formatting, calculations, etc.
│   ├── styles/
│   │   └── cyberpunk.css    # Custom cyberpunk theme
│   ├── App.jsx              # Main app with routing
│   └── main.jsx             # Entry point
├── public/
├── index.html
├── vite.config.js
├── tailwind.config.js       # Cyberpunk color palette
├── postcss.config.js
└── package.json
```

## 🎨 Design System

### Colors
- **Background**: `#0a0a0a`, `#1a1a1a`, `#2a2a2a`
- **Borders**: `#3a3a3a`
- **Accent**: `#fcee0a` (Cyberpunk yellow)
- **Secondary**: `#f0a500`
- **Muted**: Grayscale palette

### Typography
- **Display**: Rajdhani (headings, labels)
- **Mono**: Share Tech Mono (data, code-like elements)

### Components
All components follow the cyberpunk aesthetic with:
- Clipped corners (`clip-corner` class)
- Technical borders with hover effects
- Status-based color coding
- Priority indicators

## 📊 Data Management

### Local Storage Structure
```javascript
// Gigs
{
  id: string,
  title: string,
  description: string,
  status: 'active' | 'on-hold' | 'completed',
  deadline: ISO string | null,
  createdAt: ISO string,
  updatedAt: ISO string
}

// Jobs
{
  id: string,
  gigId: string,
  title: string,
  description: string,
  info: string,
  status: 'todo' | 'in-progress' | 'blocked' | 'completed',
  priority: 'low' | 'medium' | 'high' | 'critical',
  deadline: ISO string | null,
  subtasks: Array<{id, text, completed}>,
  attachments: Array<{name, url, addedAt}>,
  timeTracked: number (seconds),
  createdAt: ISO string,
  updatedAt: ISO string
}
```

### State Management
- **React Context API** for global state
- **Custom hooks** for localStorage synchronization
- **Automatic persistence** on every change

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

**Vercel (Recommended):**
```bash
npm i -g vercel
vercel
```

**Netlify:**
```bash
npm i -g netlify-cli
netlify deploy --prod
```

**GitHub Pages:**
```bash
npm install -D gh-pages
# Update package.json and vite.config.js (see DEPLOYMENT.md)
npm run deploy
```

## 🛠️ Technology Stack

- **Framework**: React 19.2
- **Build Tool**: Vite 7.1
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router v7
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **State**: React Context API
- **Storage**: localStorage API

## 📝 Usage Guide

### Getting Started
1. **Create a Gig**: Start by creating a project container
2. **Add Jobs**: Create tasks within each gig
3. **Break It Down**: Use subtasks for detailed breakdowns
4. **Track Time**: Use the built-in timer or add time manually
5. **Attach Resources**: Add links to files, documents, or references
6. **Monitor Progress**: Check the dashboard for overview and alerts

### Keyboard Shortcuts
- `Esc`: Close dialogs
- Search bar: Quick search across all gigs and jobs

### Best Practices
- Set deadlines to get visual warnings
- Use priority levels to organize workload
- Break large jobs into subtasks
- Track time for better project estimation
- Use attachments for quick access to resources

## 🔒 Privacy & Security

- ✅ All data stored locally in your browser
- ✅ No external servers or data collection
- ✅ Works completely offline after initial load
- ✅ Each user's data is isolated to their device

## 🚧 Future Enhancements

Potential features for future versions:
- [ ] User authentication
- [ ] Cloud sync (Firebase/Supabase)
- [ ] Team collaboration
- [ ] Export/Import (JSON, CSV)
- [ ] Advanced analytics and reports
- [ ] Notifications and reminders
- [ ] Mobile app (React Native)
- [ ] Kanban board view
- [ ] Gantt chart timeline
- [ ] API integrations

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Cyberpunk 2077 for design inspiration
- The React and Vite communities
- Tailwind CSS team
- Lucide icons project

## 💬 Support

If you encounter any issues or have questions:
1. Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
2. Review the code comments
3. Open an issue on GitHub

---

**Built with ⚡ by [Your Name]**

*Stay frosty, choom!*

# CYBERDECK
