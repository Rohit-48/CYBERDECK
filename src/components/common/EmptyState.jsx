import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

export const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action, 
  actionLabel 
}) => {
  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="py-12 text-center">
        {Icon && (
          <div className="flex justify-center mb-4">
            <Icon size={64} className="text-cyber-gray-600" />
          </div>
        )}
        <h3 className="text-xl font-display font-bold uppercase tracking-wide text-cyber-yellow mb-2">
          {title}
        </h3>
        <p className="text-cyber-gray-500 font-mono text-sm mb-6">
          {description}
        </p>
        {action && actionLabel && (
          <Button variant="primary" onClick={action}>
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

