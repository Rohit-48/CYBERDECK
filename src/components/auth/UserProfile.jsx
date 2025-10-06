import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useHybridData } from '../../contexts/HybridDataContext';
import { LogOut, User, Database, HardDrive } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const UserProfile = () => {
  const navigate = useNavigate();
  const { user, signOut, isConfigured } = useAuth();
  const { mode, gigs, jobs } = useHybridData();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold uppercase tracking-wider text-cyber-yellow mb-2">
          User Profile
        </h1>
        <p className="text-sm font-mono text-cyber-gray-500">
          Manage your account and system settings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Info */}
        <Card>
          <CardHeader>
            <CardTitle>
              <User className="inline mr-2" size={18} />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isConfigured && user ? (
              <>
                <div>
                  <span className="text-sm text-cyber-gray-500 font-mono">Email:</span>
                  <div className="text-cyber-gray-200 font-mono">{user.email}</div>
                </div>
                <div>
                  <span className="text-sm text-cyber-gray-500 font-mono">User ID:</span>
                  <div className="text-cyber-gray-200 font-mono text-xs break-all">{user.id}</div>
                </div>
                <div>
                  <span className="text-sm text-cyber-gray-500 font-mono">Full Name:</span>
                  <div className="text-cyber-gray-200 font-mono">
                    {user.user_metadata?.full_name || 'Not set'}
                  </div>
                </div>
              </>
            ) : (
              <div>
                <span className="text-sm text-cyber-gray-500 font-mono">Mode:</span>
                <div className="text-cyber-gray-200 font-mono">Local Storage (Offline)</div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Storage Info */}
        <Card>
          <CardHeader>
            <CardTitle>
              {mode === 'supabase' ? (
                <Database className="inline mr-2" size={18} />
              ) : (
                <HardDrive className="inline mr-2" size={18} />
              )}
              Storage Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-sm text-cyber-gray-500 font-mono">Mode:</span>
              <div className="mt-1">
                {mode === 'supabase' ? (
                  <Badge variant="success">Cloud Storage (Supabase)</Badge>
                ) : (
                  <Badge variant="info">Local Storage</Badge>
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

        {/* System Info */}
        <Card>
          <CardHeader>
            <CardTitle>System Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm font-mono">
            <div className="flex items-center justify-between">
              <span className="text-cyber-gray-400">Cloud Sync</span>
              <Badge variant={mode === 'supabase' ? 'success' : 'default'}>
                {mode === 'supabase' ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-cyber-gray-400">Multi-Device Access</span>
              <Badge variant={mode === 'supabase' ? 'success' : 'default'}>
                {mode === 'supabase' ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-cyber-gray-400">Team Collaboration</span>
              <Badge variant="default">Coming Soon</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-cyber-gray-400">Offline Mode</span>
              <Badge variant="success">Enabled</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isConfigured && user ? (
              <>
                <Button variant="ghost" className="w-full" onClick={() => navigate('/')}>
                  Back to Dashboard
                </Button>
                <Button variant="destructive" className="w-full" onClick={handleSignOut}>
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <p className="text-sm text-cyber-gray-500 font-mono mb-3">
                  Enable cloud storage for multi-device access and collaboration.
                </p>
                <Button variant="primary" className="w-full" onClick={() => navigate('/login')}>
                  Enable Cloud Storage
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

