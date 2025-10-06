import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/Dialog';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useData } from '../../contexts/DataContext';

export const JobForm = ({ open, onClose, onSubmit, initialData = null, preselectedGigId = null }) => {
  const { gigs } = useData();
  const [formData, setFormData] = useState({
    gigId: '',
    title: '',
    description: '',
    info: '',
    status: 'todo',
    priority: 'medium',
    deadline: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        gigId: initialData.gigId || '',
        title: initialData.title || '',
        description: initialData.description || '',
        info: initialData.info || '',
        status: initialData.status || 'todo',
        priority: initialData.priority || 'medium',
        deadline: initialData.deadline ? initialData.deadline.split('T')[0] : '',
      });
    } else {
      setFormData({
        gigId: preselectedGigId || '',
        title: '',
        description: '',
        info: '',
        status: 'todo',
        priority: 'medium',
        deadline: '',
      });
    }
  }, [initialData, preselectedGigId, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.gigId) return;

    const submitData = {
      ...formData,
      deadline: formData.deadline ? new Date(formData.deadline).toISOString() : null,
    };

    onSubmit(submitData);
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onClose={onClose}>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Job' : 'New Job'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-mono uppercase text-cyber-gray-400 mb-2">
              Gig *
            </label>
            <Select
              value={formData.gigId}
              onChange={(e) => handleChange('gigId', e.target.value)}
              required
            >
              <option value="">Select a gig...</option>
              {gigs.map(gig => (
                <option key={gig.id} value={gig.id}>
                  {gig.title}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-mono uppercase text-cyber-gray-400 mb-2">
              Title *
            </label>
            <Input
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter job title..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-mono uppercase text-cyber-gray-400 mb-2">
              Description
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter job description..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-mono uppercase text-cyber-gray-400 mb-2">
              Additional Info
            </label>
            <Textarea
              value={formData.info}
              onChange={(e) => handleChange('info', e.target.value)}
              placeholder="Additional information or notes..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono uppercase text-cyber-gray-400 mb-2">
                Status
              </label>
              <Select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="blocked">Blocked</option>
                <option value="completed">Completed</option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-mono uppercase text-cyber-gray-400 mb-2">
                Priority
              </label>
              <Select
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-mono uppercase text-cyber-gray-400 mb-2">
              Deadline
            </label>
            <Input
              type="date"
              value={formData.deadline}
              onChange={(e) => handleChange('deadline', e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {initialData ? 'Update Job' : 'Create Job'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

