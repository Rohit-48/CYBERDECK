import React, { useState } from 'react';
import { Plus, Trash2, CheckSquare, Square } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useHybridData as useData } from '../../contexts/HybridDataContext';
import { cn } from '../../utils/cn';

export const SubtaskList = ({ jobId }) => {
  const { getJobById, addSubtask, toggleSubtask, deleteSubtask } = useData();
  const [newSubtaskText, setNewSubtaskText] = useState('');
  
  const job = getJobById(jobId);
  const subtasks = job?.subtasks || [];

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newSubtaskText.trim()) return;
    
    addSubtask(jobId, newSubtaskText);
    setNewSubtaskText('');
  };

  const completedCount = subtasks.filter(st => st.completed).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Subtasks ({completedCount}/{subtasks.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddSubtask} className="flex gap-2 mb-4">
          <Input
            value={newSubtaskText}
            onChange={(e) => setNewSubtaskText(e.target.value)}
            placeholder="Add a subtask..."
            className="flex-1"
          />
          <Button type="submit" variant="primary" size="sm">
            <Plus size={16} />
          </Button>
        </form>

        {subtasks.length === 0 ? (
          <p className="text-sm text-cyber-gray-500 font-mono text-center py-4">
            No subtasks yet
          </p>
        ) : (
          <div className="space-y-2">
            {subtasks.map(subtask => (
              <div
                key={subtask.id}
                className={cn(
                  "flex items-center gap-3 p-2 border border-cyber-border hover:border-cyber-yellow-muted transition-colors",
                  subtask.completed && "opacity-60"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleSubtask(jobId, subtask.id)}
                  className="text-cyber-yellow hover:text-cyber-yellow-dark"
                >
                  {subtask.completed ? (
                    <CheckSquare size={18} />
                  ) : (
                    <Square size={18} />
                  )}
                </button>
                
                <span
                  className={cn(
                    "flex-1 text-sm font-mono",
                    subtask.completed && "line-through text-cyber-gray-500"
                  )}
                >
                  {subtask.text}
                </span>

                <button
                  type="button"
                  onClick={() => deleteSubtask(jobId, subtask.id)}
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

