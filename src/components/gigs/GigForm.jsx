import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/Dialog';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

export const GigForm = ({ open, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'active',
    deadline: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        status: initialData.status || 'active',
        deadline: initialData.deadline ? initialData.deadline.split('T')[0] : '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'active',
        deadline: '',
      });
    }
  }, [initialData, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

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
          <DialogTitle>{initialData ? 'Edit Gig' : 'New Gig'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-mono uppercase text-cyber-gray-400 mb-2">
              Title *
            </label>
            <Input
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter gig title..."
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
              placeholder="Enter gig description..."
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
                <option value="active">Active</option>
                <option value="on-hold">On Hold</option>
                <option value="completed">Completed</option>
              </Select>
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
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {initialData ? 'Update Gig' : 'Create Gig'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

