import React, { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { GigCard } from './GigCard';
import { GigForm } from './GigForm';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { useData } from '../../contexts/DataContext';

export const GigList = () => {
  const { gigs, createGig } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const handleCreateGig = (gigData) => {
    createGig(gigData);
  };

  // Filter gigs
  let filteredGigs = gigs;
  if (filterStatus !== 'all') {
    filteredGigs = filteredGigs.filter(gig => gig.status === filterStatus);
  }

  // Sort gigs
  filteredGigs = [...filteredGigs].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'deadline':
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      default:
        return 0;
    }
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold uppercase tracking-wider text-cyber-yellow mb-2">
            Gigs
          </h1>
          <p className="text-sm font-mono text-cyber-gray-500">
            Manage your active projects and contracts
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsFormOpen(true)}>
          <Plus size={18} className="inline mr-2" />
          New Gig
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-cyber-gray-500" />
          <span className="text-sm font-mono text-cyber-gray-500 uppercase">Status:</span>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-40"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="on-hold">On Hold</option>
            <option value="completed">Completed</option>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-mono text-cyber-gray-500 uppercase">Sort:</span>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-40"
          >
            <option value="recent">Most Recent</option>
            <option value="title">Title</option>
            <option value="deadline">Deadline</option>
          </Select>
        </div>
      </div>

      {/* Gigs Grid */}
      {filteredGigs.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-cyber-gray-500 font-mono">
            {filterStatus === 'all' 
              ? 'No gigs found. Create your first gig to get started.'
              : `No ${filterStatus} gigs found.`
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGigs.map(gig => (
            <GigCard key={gig.id} gig={gig} />
          ))}
        </div>
      )}

      {/* Form Dialog */}
      <GigForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateGig}
      />
    </div>
  );
};

