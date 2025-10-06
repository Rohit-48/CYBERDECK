import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Briefcase, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatDate, calculateProgress, isOverdue, isDueSoon } from '../../utils/helpers';
import { useData } from '../../contexts/DataContext';
import { cn } from '../../utils/cn';

export const GigCard = ({ gig }) => {
  const navigate = useNavigate();
  const { getJobsByGigId } = useData();
  const gigJobs = getJobsByGigId(gig.id);
  const progress = calculateProgress(gigJobs);
  
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

  return (
    <Card 
      hover 
      className="tech-border group"
      onClick={() => navigate(`/gigs/${gig.id}`)}
    >
      <CardContent>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Briefcase size={20} className="text-cyber-yellow" />
            <h3 className="text-lg font-display font-semibold uppercase tracking-wide group-hover:text-cyber-yellow transition-colors">
              {gig.title}
            </h3>
          </div>
          <Badge variant={getStatusBadge(gig.status)}>
            {gig.status}
          </Badge>
        </div>

        {gig.description && (
          <p className="text-sm text-cyber-gray-400 mb-4 line-clamp-2 font-mono">
            {gig.description}
          </p>
        )}

        <div className="space-y-3">
          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-1">
              <span className="text-cyber-gray-500 uppercase flex items-center gap-1">
                <TrendingUp size={12} />
                Progress
              </span>
              <span className="text-cyber-yellow">{progress}%</span>
            </div>
            <div className="h-1 bg-cyber-bg-tertiary border border-cyber-border">
              <div 
                className="h-full bg-cyber-yellow transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Footer Info */}
          <div className="flex items-center justify-between text-xs font-mono text-cyber-gray-500">
            <span>{gigJobs.length} {gigJobs.length === 1 ? 'Job' : 'Jobs'}</span>
            {gig.deadline && (
              <div className={cn(
                "flex items-center gap-1",
                isDeadlineOverdue && "text-red-400",
                isDeadlineSoon && "text-orange-400"
              )}>
                <Calendar size={12} />
                <span>{formatDate(gig.deadline)}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

