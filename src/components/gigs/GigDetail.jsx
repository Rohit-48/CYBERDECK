import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Plus, Calendar, TrendingUp } from 'lucide-react';
import { useHybridData as useData } from '../../contexts/HybridDataContext';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { GigForm } from './GigForm';
import { formatDate, calculateProgress, isOverdue, isDueSoon } from '../../utils/helpers';
import { cn } from '../../utils/cn';

export const GigDetail = () => {
  const { gigId } = useParams();
  const navigate = useNavigate();
  const { getGigById, updateGig, deleteGig, getJobsByGigId } = useData();
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  
  const gig = getGigById(gigId);
  const gigJobs = getJobsByGigId(gigId);
  const progress = calculateProgress(gigJobs);

  if (!gig) {
    return (
      <div className="text-center py-16">
        <p className="text-cyber-gray-500 font-mono">Gig not found</p>
        <Button onClick={() => navigate('/gigs')} className="mt-4">
          <ArrowLeft size={16} className="inline mr-2" />
          Back to Gigs
        </Button>
      </div>
    );
  }

  const handleUpdateGig = (gigData) => {
    updateGig(gigId, gigData);
  };

  const handleDeleteGig = () => {
    if (window.confirm('Are you sure you want to delete this gig? All associated jobs will also be deleted.')) {
      deleteGig(gigId);
      navigate('/gigs');
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      'active': 'primary',
      'on-hold': 'warning',
      'completed': 'success',
    };
    return variants[status] || 'default';
  };

  const isDeadlineOverdue = gig.deadline && isOverdue(gig.deadline);
  const isDeadlineSoon = gig.deadline && isDueSoon(gig.deadline);

  const jobsByStatus = {
    'todo': gigJobs.filter(j => j.status === 'todo'),
    'in-progress': gigJobs.filter(j => j.status === 'in-progress'),
    'blocked': gigJobs.filter(j => j.status === 'blocked'),
    'completed': gigJobs.filter(j => j.status === 'completed'),
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate('/gigs')} className="mb-4">
          <ArrowLeft size={16} className="inline mr-2" />
          Back to Gigs
        </Button>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-display font-bold uppercase tracking-wider text-cyber-yellow">
                {gig.title}
              </h1>
              <Badge variant={getStatusBadge(gig.status)}>
                {gig.status}
              </Badge>
            </div>
            {gig.description && (
              <p className="text-cyber-gray-400 font-mono">{gig.description}</p>
            )}
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsEditFormOpen(true)}>
              <Edit size={18} />
            </Button>
            <Button variant="destructive" size="icon" onClick={handleDeleteGig}>
              <Trash2 size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="py-4">
            <div className="text-2xl font-bold text-cyber-yellow">{gigJobs.length}</div>
            <div className="text-sm font-mono text-cyber-gray-500 uppercase">Total Jobs</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={20} className="text-cyber-yellow" />
              <div className="text-2xl font-bold text-cyber-yellow">{progress}%</div>
            </div>
            <div className="text-sm font-mono text-cyber-gray-500 uppercase">Progress</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-4">
            <div className="text-2xl font-bold text-green-400">{jobsByStatus.completed.length}</div>
            <div className="text-sm font-mono text-cyber-gray-500 uppercase">Completed</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-4">
            {gig.deadline ? (
              <>
                <div className={cn(
                  "text-2xl font-bold font-mono",
                  isDeadlineOverdue && "text-red-400",
                  isDeadlineSoon && "text-orange-400",
                  !isDeadlineOverdue && !isDeadlineSoon && "text-cyber-yellow"
                )}>
                  {formatDate(gig.deadline)}
                </div>
                <div className="text-sm font-mono text-cyber-gray-500 uppercase">Deadline</div>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-cyber-gray-500">--</div>
                <div className="text-sm font-mono text-cyber-gray-500 uppercase">No Deadline</div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex items-center justify-between text-sm font-mono mb-2">
            <span className="text-cyber-gray-400 uppercase">Overall Progress</span>
            <span className="text-cyber-yellow">{progress}%</span>
          </div>
          <div className="h-2 bg-cyber-bg-tertiary border border-cyber-border">
            <div 
              className="h-full bg-cyber-yellow transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Jobs Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-display font-bold uppercase tracking-wide text-cyber-gray-200">
          Jobs ({gigJobs.length})
        </h2>
        <Button variant="primary" onClick={() => navigate(`/jobs/new?gigId=${gigId}`)}>
          <Plus size={18} className="inline mr-2" />
          New Job
        </Button>
      </div>

      {gigJobs.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-cyber-gray-500 font-mono">
              No jobs found for this gig. Create your first job to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(jobsByStatus).map(([status, jobs]) => (
            <div key={status}>
              <h3 className="text-sm font-mono uppercase text-cyber-gray-500 mb-3">
                {status.replace('-', ' ')} ({jobs.length})
              </h3>
              <div className="space-y-2">
                {jobs.map(job => (
                  <Card 
                    key={job.id} 
                    hover
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    className="cursor-pointer"
                  >
                    <CardContent className="py-3">
                      <div className="font-mono text-sm mb-1">{job.title}</div>
                      <div className="flex items-center gap-2 text-xs">
                        <Badge variant={
                          job.priority === 'critical' ? 'danger' :
                          job.priority === 'high' ? 'warning' :
                          job.priority === 'medium' ? 'info' : 'default'
                        }>
                          {job.priority}
                        </Badge>
                        {job.deadline && (
                          <span className="text-cyber-gray-500 font-mono">
                            {formatDate(job.deadline)}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Form */}
      <GigForm
        open={isEditFormOpen}
        onClose={() => setIsEditFormOpen(false)}
        onSubmit={handleUpdateGig}
        initialData={gig}
      />
    </div>
  );
};

