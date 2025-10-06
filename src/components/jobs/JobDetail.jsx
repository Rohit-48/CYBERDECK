import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { useHybridData as useData } from '../../contexts/HybridDataContext';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { JobForm } from './JobForm';
import { SubtaskList } from './SubtaskList';
import { TimeTracker } from './TimeTracker';
import { AttachmentList } from './AttachmentList';
import { formatDate, formatRelativeTime, isOverdue, isDueSoon } from '../../utils/helpers';
import { cn } from '../../utils/cn';

export const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { getJobById, getGigById, updateJob, deleteJob } = useData();
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  
  const job = getJobById(jobId);
  const gig = job ? getGigById(job.gigId) : null;

  if (!job) {
    return (
      <div className="text-center py-16">
        <p className="text-cyber-gray-500 font-mono">Job not found</p>
        <Button onClick={() => navigate('/jobs')} className="mt-4">
          <ArrowLeft size={16} className="inline mr-2" />
          Back to Jobs
        </Button>
      </div>
    );
  }

  const handleUpdateJob = (jobData) => {
    updateJob(jobId, jobData);
  };

  const handleDeleteJob = () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      deleteJob(jobId);
      navigate('/jobs');
    }
  };

  const isDeadlineOverdue = job.deadline && isOverdue(job.deadline);
  const isDeadlineSoon = job.deadline && isDueSoon(job.deadline);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate('/jobs')} className="mb-4">
          <ArrowLeft size={16} className="inline mr-2" />
          Back to Jobs
        </Button>

        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-display font-bold uppercase tracking-wider text-cyber-yellow">
                {job.title}
              </h1>
              <Badge variant={
                job.status === 'completed' ? 'success' :
                job.status === 'in-progress' ? 'primary' :
                job.status === 'blocked' ? 'danger' : 'default'
              }>
                {job.status}
              </Badge>
              <Badge variant={
                job.priority === 'critical' ? 'danger' :
                job.priority === 'high' ? 'warning' :
                job.priority === 'medium' ? 'info' : 'default'
              }>
                {job.priority}
              </Badge>
            </div>
            
            {gig && (
              <p className="text-sm font-mono text-cyber-gray-500 mb-2">
                Gig: <span 
                  className="text-cyber-yellow hover:underline cursor-pointer"
                  onClick={() => navigate(`/gigs/${gig.id}`)}
                >
                  {gig.title}
                </span>
              </p>
            )}

            {job.deadline && (
              <div className={cn(
                "flex items-center gap-2 text-sm font-mono",
                isDeadlineOverdue && "text-red-400",
                isDeadlineSoon && "text-orange-400",
                !isDeadlineOverdue && !isDeadlineSoon && "text-cyber-gray-400"
              )}>
                <Calendar size={16} />
                <span>Deadline: {formatDate(job.deadline)}</span>
                <span className="text-xs">({formatRelativeTime(job.deadline)})</span>
                {(isDeadlineOverdue || isDeadlineSoon) && (
                  <AlertCircle size={16} />
                )}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsEditFormOpen(true)}>
              <Edit size={18} />
            </Button>
            <Button variant="destructive" size="icon" onClick={handleDeleteJob}>
              <Trash2 size={18} />
            </Button>
          </div>
        </div>

        {/* Description */}
        {job.description && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-cyber-gray-300 font-mono whitespace-pre-wrap">
                {job.description}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Additional Info */}
        {job.info && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-cyber-gray-300 font-mono whitespace-pre-wrap">
                {job.info}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <SubtaskList jobId={jobId} />
          <AttachmentList jobId={jobId} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <TimeTracker jobId={jobId} />
          
          {/* Metadata Card */}
          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm font-mono">
              <div>
                <span className="text-cyber-gray-500">Created:</span>{' '}
                <span className="text-cyber-gray-300">{formatDate(job.createdAt)}</span>
              </div>
              <div>
                <span className="text-cyber-gray-500">Updated:</span>{' '}
                <span className="text-cyber-gray-300">{formatRelativeTime(job.updatedAt)}</span>
              </div>
              <div>
                <span className="text-cyber-gray-500">Job ID:</span>{' '}
                <span className="text-cyber-gray-300 text-xs">{job.id}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Form */}
      <JobForm
        open={isEditFormOpen}
        onClose={() => setIsEditFormOpen(false)}
        onSubmit={handleUpdateJob}
        initialData={job}
      />
    </div>
  );
};

