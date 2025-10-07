import React, { useState } from 'react';
import { Download, Upload, Trash2, Database, HardDrive, User, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { WelcomeModal } from '../common/WelcomeModal';
import { useHybridData } from '../../contexts/HybridDataContext';
import { useAuth } from '../../contexts/AuthContext';
import { exportData, importData } from '../../utils/exportImport';

export const Settings = () => {
  const { gigs, jobs, mode } = useHybridData();
  const { user, isConfigured } = useAuth();
  const [importing, setImporting] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const handleExport = () => {
    try {
      exportData(gigs, jobs);
      toast.success(`Exported ${gigs.length} gigs and ${jobs.length} jobs!`);
    } catch (error) {
      toast.error('Failed to export data');
      console.error(error);
    }
  };

  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setImporting(true);
      try {
        const data = await importData(file);
        toast.success(`Found ${data.gigs.length} gigs and ${data.jobs.length} jobs in backup!`);
        toast('Import feature coming soon - for now, manual migration required', {
          icon: 'ℹ️',
        });
      } catch (error) {
        toast.error(error.message);
      } finally {
        setImporting(false);
      }
    };
    input.click();
  };

  const handleClearData = () => {
    if (window.confirm('⚠️ Are you sure? This will delete ALL your gigs and jobs! This cannot be undone.')) {
      if (window.confirm('Really? This is permanent!')) {
        localStorage.removeItem('cyberdeck-gigs');
        localStorage.removeItem('cyberdeck-jobs');
        toast.success('All data cleared');
        window.location.reload();
      }
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold uppercase tracking-wider text-cyber-yellow mb-2">
          Settings
        </h1>
        <p className="text-sm font-mono text-cyber-gray-500">
          Manage your account and application settings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Storage Info */}
        <Card>
          <CardHeader>
            <CardTitle>
              {mode === 'supabase' ? (
                <Database className="inline mr-2" size={18} />
              ) : (
                <HardDrive className="inline mr-2" size={18} />
              )}
              Storage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm text-cyber-gray-500 font-mono">Mode:</span>
              <div className="mt-1">
                {mode === 'supabase' ? (
                  <Badge variant="success">Cloud Storage (Supabase)</Badge>
                ) : (
                  <Badge variant="info">Local Storage (Browser)</Badge>
                )}
              </div>
            </div>
            <div>
              <span className="text-sm text-cyber-gray-500 font-mono">Total Gigs:</span>
              <div className="text-cyber-yellow font-mono text-2xl">{gigs.length}</div>
            </div>
            <div>
              <span className="text-sm text-cyber-gray-500 font-mono">Total Jobs:</span>
              <div className="text-cyber-yellow font-mono text-2xl">{jobs.length}</div>
            </div>
          </CardContent>
        </Card>

        {/* User Info */}
        {isConfigured && user && (
          <Card>
            <CardHeader>
              <CardTitle>
                <User className="inline mr-2" size={18} />
                Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-sm text-cyber-gray-500 font-mono">Email:</span>
                <div className="text-cyber-gray-200 font-mono text-sm">{user.email}</div>
              </div>
              <div>
                <span className="text-sm text-cyber-gray-500 font-mono">Full Name:</span>
                <div className="text-cyber-gray-200 font-mono text-sm">
                  {user.user_metadata?.full_name || 'Not set'}
                </div>
              </div>
              <div>
                <span className="text-sm text-cyber-gray-500 font-mono">User ID:</span>
                <div className="text-cyber-gray-400 font-mono text-xs break-all">{user.id}</div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Data Management */}
        <Card className={isConfigured && user ? '' : 'md:col-span-2'}>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="primary" 
              className="w-full" 
              onClick={handleExport}
              disabled={gigs.length === 0 && jobs.length === 0}
            >
              <Download size={16} className="mr-2" />
              Export Backup (JSON)
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full" 
              onClick={handleImportClick}
              disabled={importing}
            >
              <Upload size={16} className="mr-2" />
              {importing ? 'Importing...' : 'Import Backup'}
            </Button>

            <div className="border-t border-cyber-border pt-3 mt-3">
              <p className="text-xs text-cyber-gray-500 font-mono mb-2">
                ⚠️ Danger Zone
              </p>
              <Button 
                variant="destructive" 
                className="w-full" 
                onClick={handleClearData}
              >
                <Trash2 size={16} className="mr-2" />
                Clear All Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help & Guides */}
        <Card>
          <CardHeader>
            <CardTitle>
              <HelpCircle className="inline mr-2" size={18} />
              Help & Guides
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-cyber-gray-400 font-mono">
              Need help getting started or learning features?
            </p>
            <Button 
              variant="primary" 
              className="w-full"
              onClick={() => {
                localStorage.removeItem('cyberdeck-tutorial-completed');
                window.location.href = '/';
              }}
            >
              🎮 Restart Cinematic Tutorial
            </Button>
            <Button 
              variant="ghost" 
              className="w-full"
              onClick={() => setShowWelcome(true)}
            >
              <HelpCircle size={16} className="mr-2" />
              Open Quick Start Guide
            </Button>
            <div className="text-xs text-cyber-gray-500 font-mono space-y-1">
              <div>🎬 Immersive game-style tutorial</div>
              <div>⌨️ Press D/G/J/A/S for quick navigation</div>
              <div>🔍 Press / to search anything</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Welcome Modal */}
      <WelcomeModal open={showWelcome} onClose={() => setShowWelcome(false)} />
    </div>
  );
};

