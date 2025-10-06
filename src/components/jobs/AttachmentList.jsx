import React, { useState } from 'react';
import { Plus, Trash2, Paperclip, Link as LinkIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useData } from '../../contexts/DataContext';

export const AttachmentList = ({ jobId }) => {
  const { getJobById, addAttachment, deleteAttachment } = useData();
  const [newAttachment, setNewAttachment] = useState({ name: '', url: '' });
  const [isAdding, setIsAdding] = useState(false);
  
  const job = getJobById(jobId);
  const attachments = job?.attachments || [];

  const handleAddAttachment = (e) => {
    e.preventDefault();
    if (!newAttachment.name.trim() || !newAttachment.url.trim()) return;
    
    addAttachment(jobId, {
      name: newAttachment.name,
      url: newAttachment.url,
      addedAt: new Date().toISOString(),
    });
    
    setNewAttachment({ name: '', url: '' });
    setIsAdding(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            <Paperclip className="inline mr-2" size={18} />
            Attachments ({attachments.length})
          </CardTitle>
          {!isAdding && (
            <Button variant="ghost" size="sm" onClick={() => setIsAdding(true)}>
              <Plus size={16} />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isAdding && (
          <form onSubmit={handleAddAttachment} className="space-y-2 mb-4 p-3 border border-cyber-border">
            <Input
              value={newAttachment.name}
              onChange={(e) => setNewAttachment(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Attachment name..."
              required
            />
            <Input
              value={newAttachment.url}
              onChange={(e) => setNewAttachment(prev => ({ ...prev, url: e.target.value }))}
              placeholder="URL or file path..."
              required
            />
            <div className="flex gap-2">
              <Button type="submit" variant="primary" size="sm" className="flex-1">
                Add
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setIsAdding(false);
                  setNewAttachment({ name: '', url: '' });
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {attachments.length === 0 ? (
          <p className="text-sm text-cyber-gray-500 font-mono text-center py-4">
            No attachments yet
          </p>
        ) : (
          <div className="space-y-2">
            {attachments.map((attachment, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 border border-cyber-border hover:border-cyber-yellow-muted transition-colors"
              >
                <LinkIcon size={16} className="text-cyber-yellow" />
                
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-mono truncate">{attachment.name}</div>
                  <a
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyber-gray-500 hover:text-cyber-yellow truncate block"
                  >
                    {attachment.url}
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Delete this attachment?')) {
                      deleteAttachment(jobId, index);
                    }
                  }}
                  className="text-cyber-gray-500 hover:text-red-400"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

