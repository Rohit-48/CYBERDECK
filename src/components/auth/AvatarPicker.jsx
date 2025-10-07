import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { AVATARS } from '../../utils/avatars';
import { cn } from '../../utils/cn';

export const AvatarPicker = ({ open, onClose, currentAvatarId, onSelect }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatarId);

  const handleSave = () => {
    onSelect(selectedAvatar);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onClose={onClose}>
        <DialogHeader>
          <DialogTitle>Choose Your Avatar</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-3 py-4">
          {AVATARS.map((avatar) => (
            <div
              key={avatar.id}
              className={cn(
                'relative p-3 border-2 transition-all duration-200 cursor-pointer',
                'hover:border-cyber-yellow-muted hover:bg-cyber-bg-tertiary',
                selectedAvatar === avatar.id
                  ? 'border-cyber-yellow bg-cyber-bg-tertiary'
                  : 'border-cyber-border'
              )}
              onClick={() => setSelectedAvatar(avatar.id)}
            >
              <div className="flex flex-col items-center gap-2">
                <div
                  className="text-4xl flex items-center justify-center w-16 h-16 rounded-full border-2"
                  style={{ borderColor: avatar.color }}
                >
                  {avatar.emoji}
                </div>
                <span className="text-xs font-mono text-cyber-gray-400 text-center">
                  {avatar.name}
                </span>
              </div>
              {selectedAvatar === avatar.id && (
                <div className="absolute top-1 right-1">
                  <Check size={16} className="text-cyber-yellow" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Avatar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

