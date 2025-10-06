import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Paperclip, CheckSquare } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatDate, formatDuration, getPriorityColor, getStatusColor, isOverdue, isDueSoon } from '../../utils/helpers';
import { useData } from '../../contexts/DataContext';
import { cn } from '../../utils/cn';

export const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const { getGigById } = useData();
  const gig = getGigById(job.gigId);
  
  const completedSubtasks = (job.subtasks || []).filter(st => st.completed).length;
  const totalSubtasks = (job.subtasks || []).length;
  
  const isDeadlineOverdue = job.deadline && isOverdue(job.deadline);
  const isDeadlineSoon = job.deadline && isDueSoon(job.deadline);

  return (
    <Card 
      hover 
      className="tech-border group"
      onClick={() => navigate(`/jobs/${job.id}`)}
    >
      <CardContent>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-base font-display font-semibold uppercase tracking-wide group-hover:text-cyber-yellow transition-colors mb-1">
              {job.title}
            </h3>
            {gig && (
              <p className="text-xs font-mono text-cyber-gray-500">
                Gig: {gig.title}
              </p>
            )}
          </div>
          <Badge variant={
            job.priority === 'critical' ? 'danger' :
            job.priority === 'high' ? 'warning' :
            job.priority === 'medium' ? 'info' : 'default'
          }>
            {job.priority}
          </Badge>
        </div>

        {job.description && (
          <p className="text-sm text-cyber-gray-400 mb-3 line-clamp-2 font-mono">
            {job.description}
          </p>
        )}

        <div className="flex items-center gap-3 text-xs font-mono text-cyber-gray-500 mb-3">
          {totalSubtasks > 0 && (
            <div className="flex items-center gap-1">
              <CheckSquare size={12} />
              <span>{completedSubtasks}/{totalSubtasks}</span>
            </div>
          )}
          
          {(job.attachments || []).length > 0 && (
            <div className="flex items-center gap-1">
              <Paperclip size={12} />
              <span>{job.attachments.length}</span>
            </div>
          )}
          
          {job.timeTracked > 0 && (
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{formatDuration(job.timeTracked)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Badge variant={
            job.status === 'completed' ? 'success' :
            job.status === 'in-progress' ? 'primary' :
            job.status === 'blocked' ? 'danger' : 'default'
          }>
            {job.status}
          </Badge>
          
          {job.deadline && (
            <div className={cn(
              "flex items-center gap-1 text-xs font-mono",
              isDeadlineOverdue && "text-red-400",
              isDeadlineSoon && "text-orange-400",
              !isDeadlineOverdue && !isDeadlineSoon && "text-cyber-gray-500"
            )}>
              <Calendar size={12} />
              <span>{formatDate(job.deadline)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

