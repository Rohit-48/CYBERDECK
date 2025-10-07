import React from 'react';
import { Terminal, Briefcase, ListTodo, BarChart3, Keyboard } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export const WelcomeModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onClose={onClose} className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <Terminal className="text-cyber-yellow" size={32} />
            <DialogTitle className="text-3xl">Welcome to Cyberdeck!</DialogTitle>
          </div>
          <p className="text-cyber-gray-400 font-mono text-sm">
            Your cyberpunk project management system
          </p>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Quick Start */}
          <div>
            <h3 className="text-lg font-display font-bold text-cyber-yellow mb-3 uppercase">
              Quick Start Guide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Card className="p-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💼</div>
                  <div>
                    <h4 className="font-display font-semibold text-cyber-yellow mb-1">
                      1. Create a Gig
                    </h4>
                    <p className="text-sm text-cyber-gray-400 font-mono">
                      A gig is a project or major goal. Start by creating your first gig!
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">✅</div>
                  <div>
                    <h4 className="font-display font-semibold text-cyber-yellow mb-1">
                      2. Add Jobs
                    </h4>
                    <p className="text-sm text-cyber-gray-400 font-mono">
                      Jobs are tasks within a gig. Break down your work into actionable jobs.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">⏱️</div>
                  <div>
                    <h4 className="font-display font-semibold text-cyber-yellow mb-1">
                      3. Track Time
                    </h4>
                    <p className="text-sm text-cyber-gray-400 font-mono">
                      Use the built-in timer to track how long you work on each job.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📊</div>
                  <div>
                    <h4 className="font-display font-semibold text-cyber-yellow mb-1">
                      4. Check Analytics
                    </h4>
                    <p className="text-sm text-cyber-gray-400 font-mono">
                      View charts and insights about your productivity and progress.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div>
            <h3 className="text-lg font-display font-bold text-cyber-yellow mb-3 uppercase flex items-center gap-2">
              <Keyboard size={20} />
              Keyboard Shortcuts
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm font-mono">
              <div className="flex justify-between items-center bg-cyber-bg-tertiary p-2 border border-cyber-border">
                <span className="text-cyber-gray-400">Dashboard</span>
                <kbd className="px-2 py-1 bg-cyber-bg border border-cyber-yellow text-cyber-yellow">D</kbd>
              </div>
              <div className="flex justify-between items-center bg-cyber-bg-tertiary p-2 border border-cyber-border">
                <span className="text-cyber-gray-400">Gigs</span>
                <kbd className="px-2 py-1 bg-cyber-bg border border-cyber-yellow text-cyber-yellow">G</kbd>
              </div>
              <div className="flex justify-between items-center bg-cyber-bg-tertiary p-2 border border-cyber-border">
                <span className="text-cyber-gray-400">Jobs</span>
                <kbd className="px-2 py-1 bg-cyber-bg border border-cyber-yellow text-cyber-yellow">J</kbd>
              </div>
              <div className="flex justify-between items-center bg-cyber-bg-tertiary p-2 border border-cyber-border">
                <span className="text-cyber-gray-400">Analytics</span>
                <kbd className="px-2 py-1 bg-cyber-bg border border-cyber-yellow text-cyber-yellow">A</kbd>
              </div>
              <div className="flex justify-between items-center bg-cyber-bg-tertiary p-2 border border-cyber-border">
                <span className="text-cyber-gray-400">Settings</span>
                <kbd className="px-2 py-1 bg-cyber-bg border border-cyber-yellow text-cyber-yellow">S</kbd>
              </div>
              <div className="flex justify-between items-center bg-cyber-bg-tertiary p-2 border border-cyber-border">
                <span className="text-cyber-gray-400">Search</span>
                <kbd className="px-2 py-1 bg-cyber-bg border border-cyber-yellow text-cyber-yellow">/</kbd>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-display font-bold text-cyber-yellow mb-3 uppercase">
              Key Features
            </h3>
            <ul className="space-y-2 text-sm font-mono text-cyber-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-cyber-yellow">▸</span>
                <span><strong className="text-cyber-yellow">Subtasks:</strong> Break jobs into smaller checklist items</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyber-yellow">▸</span>
                <span><strong className="text-cyber-yellow">Attachments:</strong> Link files and resources to jobs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyber-yellow">▸</span>
                <span><strong className="text-cyber-yellow">Priorities:</strong> Mark jobs as Low, Medium, High, or Critical</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyber-yellow">▸</span>
                <span><strong className="text-cyber-yellow">Deadlines:</strong> Set due dates with visual warnings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyber-yellow">▸</span>
                <span><strong className="text-cyber-yellow">Cloud Sync:</strong> Access from any device (when logged in)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyber-yellow">▸</span>
                <span><strong className="text-cyber-yellow">Export/Import:</strong> Backup your data anytime</span>
              </li>
            </ul>
          </div>

          {/* Pro Tip */}
          <div className="bg-cyber-yellow/10 border border-cyber-yellow p-4">
            <h4 className="font-display font-bold text-cyber-yellow mb-2 flex items-center gap-2">
              💡 Pro Tip
            </h4>
            <p className="text-sm font-mono text-cyber-gray-300">
              Start with 1-3 gigs maximum. Add jobs as you think of them. Use keyboard shortcuts 
              for faster navigation. Export backups regularly from Settings!
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="primary" onClick={onClose} className="w-full sm:w-auto">
            Let's Go! 🚀
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

