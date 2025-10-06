import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, ListTodo, TrendingUp, Clock, Calendar, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useHybridData as useData } from '../../contexts/HybridDataContext';
import { calculateProgress, formatDate, formatDuration, isOverdue, isDueSoon } from '../../utils/helpers';
import { cn } from '../../utils/cn';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { gigs, jobs, getJobsByGigId } = useData();

  // Calculate stats
  const activeGigs = gigs.filter(g => g.status === 'active');
  const totalJobs = jobs.length;
  const completedJobs = jobs.filter(j => j.status === 'completed').length;
  const inProgressJobs = jobs.filter(j => j.status === 'in-progress').length;
  const blockedJobs = jobs.filter(j => j.status === 'blocked').length;
  
  const totalTimeTracked = jobs.reduce((sum, job) => sum + (job.timeTracked || 0), 0);
  
  // Get overdue and upcoming deadlines
  const jobsWithDeadlines = jobs.filter(j => j.deadline && j.status !== 'completed');
  const overdueJobs = jobsWithDeadlines.filter(j => isOverdue(j.deadline));
  const upcomingJobs = jobsWithDeadlines
    .filter(j => isDueSoon(j.deadline) && !isOverdue(j.deadline))
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5);

  // Get recent jobs
  const recentJobs = [...jobs]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  // Get active gigs with progress
  const activeGigsWithProgress = activeGigs.map(gig => ({
    ...gig,
    progress: calculateProgress(getJobsByGigId(gig.id)),
    jobCount: getJobsByGigId(gig.id).length,
  })).slice(0, 4);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold uppercase tracking-wider text-cyber-yellow mb-2">
          Dashboard
        </h1>
        <p className="text-sm font-mono text-cyber-gray-500">
          Overview of your gigs and jobs
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card hover onClick={() => navigate('/gigs')}>
          <CardContent className="py-4">
            <div className="flex items-center justify-between mb-2">
              <Briefcase className="text-cyber-yellow" size={24} />
              <Badge variant="primary">{activeGigs.length}</Badge>
            </div>
            <div className="text-2xl font-bold text-cyber-yellow">{gigs.length}</div>
            <div className="text-sm font-mono text-cyber-gray-500 uppercase">Total Gigs</div>
          </CardContent>
        </Card>

        <Card hover onClick={() => navigate('/jobs')}>
          <CardContent className="py-4">
            <div className="flex items-center justify-between mb-2">
              <ListTodo className="text-cyber-yellow" size={24} />
              <Badge variant="primary">{inProgressJobs}</Badge>
            </div>
            <div className="text-2xl font-bold text-cyber-yellow">{totalJobs}</div>
            <div className="text-sm font-mono text-cyber-gray-500 uppercase">Total Jobs</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="text-green-400" size={24} />
              <Badge variant="success">{completedJobs}</Badge>
            </div>
            <div className="text-2xl font-bold text-green-400">
              {totalJobs > 0 ? Math.round((completedJobs / totalJobs) * 100) : 0}%
            </div>
            <div className="text-sm font-mono text-cyber-gray-500 uppercase">Completion Rate</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="text-cyber-yellow" size={24} />
              {blockedJobs > 0 && <Badge variant="danger">{blockedJobs}</Badge>}
            </div>
            <div className="text-2xl font-bold text-cyber-yellow font-mono">
              {formatDuration(totalTimeTracked)}
            </div>
            <div className="text-sm font-mono text-cyber-gray-500 uppercase">Time Tracked</div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {(overdueJobs.length > 0 || blockedJobs > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {overdueJobs.length > 0 && (
            <Card className="border-red-700">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <AlertCircle size={18} />
                  Overdue Jobs ({overdueJobs.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {overdueJobs.slice(0, 3).map(job => (
                    <div
                      key={job.id}
                      className="p-2 border border-red-700/50 hover:border-red-700 cursor-pointer transition-colors"
                      onClick={() => navigate(`/jobs/${job.id}`)}
                    >
                      <div className="text-sm font-mono text-red-400">{job.title}</div>
                      <div className="text-xs text-cyber-gray-500 font-mono">
                        Due: {formatDate(job.deadline)}
                      </div>
                    </div>
                  ))}
                  {overdueJobs.length > 3 && (
                    <Button variant="ghost" size="sm" onClick={() => navigate('/jobs')} className="w-full">
                      View all {overdueJobs.length} overdue jobs
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {blockedJobs > 0 && (
            <Card className="border-orange-700">
              <CardHeader>
                <CardTitle className="text-orange-400 flex items-center gap-2">
                  <AlertCircle size={18} />
                  Blocked Jobs ({blockedJobs})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-mono text-cyber-gray-400 mb-3">
                  You have {blockedJobs} job{blockedJobs > 1 ? 's' : ''} that need attention
                </p>
                <Button 
                  variant="warning" 
                  size="sm" 
                  onClick={() => navigate('/jobs?status=blocked')}
                >
                  View Blocked Jobs
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Active Gigs */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Gigs</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate('/gigs')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {activeGigsWithProgress.length === 0 ? (
                <p className="text-sm text-cyber-gray-500 font-mono text-center py-4">
                  No active gigs
                </p>
              ) : (
                <div className="space-y-3">
                  {activeGigsWithProgress.map(gig => (
                    <div
                      key={gig.id}
                      className="p-3 border border-cyber-border hover:border-cyber-yellow-muted cursor-pointer transition-colors"
                      onClick={() => navigate(`/gigs/${gig.id}`)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-mono font-semibold">{gig.title}</div>
                        <Badge variant="info">{gig.jobCount} jobs</Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-cyber-gray-500">Progress</span>
                        <span className="text-cyber-yellow">{gig.progress}%</span>
                      </div>
                      <div className="h-1 bg-cyber-bg-tertiary border border-cyber-border">
                        <div 
                          className="h-full bg-cyber-yellow transition-all duration-300"
                          style={{ width: `${gig.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar size={18} />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingJobs.length === 0 ? (
                <p className="text-sm text-cyber-gray-500 font-mono text-center py-4">
                  No upcoming deadlines
                </p>
              ) : (
                <div className="space-y-2">
                  {upcomingJobs.map(job => (
                    <div
                      key={job.id}
                      className="p-3 border border-cyber-border hover:border-cyber-yellow-muted cursor-pointer transition-colors"
                      onClick={() => navigate(`/jobs/${job.id}`)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-mono">{job.title}</div>
                        <Badge variant={
                          job.priority === 'critical' ? 'danger' :
                          job.priority === 'high' ? 'warning' : 'default'
                        }>
                          {job.priority}
                        </Badge>
                      </div>
                      <div className="text-xs text-orange-400 font-mono">
                        Due: {formatDate(job.deadline)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Jobs</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate('/jobs')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {recentJobs.length === 0 ? (
                <p className="text-sm text-cyber-gray-500 font-mono text-center py-4">
                  No recent jobs
                </p>
              ) : (
                <div className="space-y-2">
                  {recentJobs.map(job => (
                    <div
                      key={job.id}
                      className="p-3 border border-cyber-border hover:border-cyber-yellow-muted cursor-pointer transition-colors"
                      onClick={() => navigate(`/jobs/${job.id}`)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-mono flex-1">{job.title}</div>
                        <Badge variant={
                          job.status === 'completed' ? 'success' :
                          job.status === 'in-progress' ? 'primary' :
                          job.status === 'blocked' ? 'danger' : 'default'
                        }>
                          {job.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <Badge variant={
                          job.priority === 'critical' ? 'danger' :
                          job.priority === 'high' ? 'warning' : 'info'
                        }>
                          {job.priority}
                        </Badge>
                        {job.timeTracked > 0 && (
                          <span className="text-cyber-gray-500 font-mono flex items-center gap-1">
                            <Clock size={12} />
                            {formatDuration(job.timeTracked)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-cyber-gray-400">To Do</span>
                  <Badge variant="default">
                    {jobs.filter(j => j.status === 'todo').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-cyber-gray-400">In Progress</span>
                  <Badge variant="primary">
                    {inProgressJobs}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-cyber-gray-400">Blocked</span>
                  <Badge variant="danger">
                    {blockedJobs}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-cyber-gray-400">Completed</span>
                  <Badge variant="success">
                    {completedJobs}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

