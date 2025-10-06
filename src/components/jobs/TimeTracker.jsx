import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useHybridData as useData } from '../../contexts/HybridDataContext';
import { useTimer } from '../../hooks/useTimer';
import { formatDuration } from '../../utils/helpers';

export const TimeTracker = ({ jobId }) => {
  const { getJobById, updateJob } = useData();
  const job = getJobById(jobId);
  const { seconds, isRunning, start, pause, reset, setTime } = useTimer(job?.timeTracked || 0);
  const [manualTime, setManualTime] = useState('');

  useEffect(() => {
    if (job) {
      setTime(job.timeTracked || 0);
    }
  }, [job?.timeTracked]);

  useEffect(() => {
    // Save time every 10 seconds when running
    if (isRunning && seconds % 10 === 0) {
      updateJob(jobId, { timeTracked: seconds });
    }
  }, [seconds, isRunning]);

  const handleStop = () => {
    pause();
    updateJob(jobId, { timeTracked: seconds });
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the timer?')) {
      reset();
      updateJob(jobId, { timeTracked: 0 });
    }
  };

  const handleManualEntry = (e) => {
    e.preventDefault();
    const parts = manualTime.split(':').map(p => parseInt(p) || 0);
    let totalSeconds = 0;
    
    if (parts.length === 3) {
      // HH:MM:SS
      totalSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      // MM:SS
      totalSeconds = parts[0] * 60 + parts[1];
    } else if (parts.length === 1) {
      // Just minutes
      totalSeconds = parts[0] * 60;
    }

    if (totalSeconds > 0) {
      setTime(totalSeconds);
      updateJob(jobId, { timeTracked: totalSeconds });
      setManualTime('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Clock className="inline mr-2" size={18} />
          Time Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <div className="text-4xl font-mono font-bold text-cyber-yellow mb-2">
            {formatDuration(seconds)}
          </div>
          <div className="text-xs font-mono text-cyber-gray-500 uppercase">
            Total Time Tracked
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          {!isRunning ? (
            <Button onClick={start} variant="primary" className="flex-1">
              <Play size={16} className="mr-2" />
              Start
            </Button>
          ) : (
            <Button onClick={handleStop} variant="warning" className="flex-1">
              <Pause size={16} className="mr-2" />
              Pause
            </Button>
          )}
          <Button onClick={handleReset} variant="destructive">
            <RotateCcw size={16} />
          </Button>
        </div>

        <div className="border-t border-cyber-border pt-4">
          <p className="text-xs font-mono text-cyber-gray-500 uppercase mb-2">
            Manual Time Entry
          </p>
          <form onSubmit={handleManualEntry} className="flex gap-2">
            <Input
              value={manualTime}
              onChange={(e) => setManualTime(e.target.value)}
              placeholder="HH:MM:SS or MM:SS"
              className="flex-1"
            />
            <Button type="submit" variant="ghost" size="sm">
              Set
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

