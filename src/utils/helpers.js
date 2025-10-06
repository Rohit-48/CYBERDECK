import { format, formatDistanceToNow, isAfter, isBefore, startOfDay } from 'date-fns';

export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const formatDate = (date) => {
  if (!date) return '';
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatDateTime = (date) => {
  if (!date) return '';
  return format(new Date(date), 'MMM dd, yyyy HH:mm');
};

export const formatRelativeTime = (date) => {
  if (!date) return '';
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatDuration = (seconds) => {
  if (!seconds) return '0:00:00';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export const isOverdue = (deadline) => {
  if (!deadline) return false;
  return isBefore(new Date(deadline), startOfDay(new Date()));
};

export const isDueSoon = (deadline, daysThreshold = 3) => {
  if (!deadline) return false;
  const deadlineDate = new Date(deadline);
  const thresholdDate = new Date();
  thresholdDate.setDate(thresholdDate.getDate() + daysThreshold);
  return isAfter(deadlineDate, new Date()) && isBefore(deadlineDate, thresholdDate);
};

export const calculateProgress = (jobs) => {
  if (!jobs || jobs.length === 0) return 0;
  const completed = jobs.filter(job => job.status === 'completed').length;
  return Math.round((completed / jobs.length) * 100);
};

export const getPriorityColor = (priority) => {
  const colors = {
    low: 'priority-low',
    medium: 'priority-medium',
    high: 'priority-high',
    critical: 'priority-critical',
  };
  return colors[priority] || colors.low;
};

export const getStatusColor = (status) => {
  const colors = {
    'todo': 'status-todo',
    'in-progress': 'status-in-progress',
    'blocked': 'status-blocked',
    'completed': 'status-completed',
  };
  return colors[status] || colors.todo;
};

