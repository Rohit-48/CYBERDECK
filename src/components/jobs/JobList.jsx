import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, Filter } from 'lucide-react';
import { JobCard } from './JobCard';
import { JobForm } from './JobForm';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { useHybridData as useData } from '../../contexts/HybridDataContext';

export const JobList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { jobs, createJob, gigs } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterGig, setFilterGig] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');

  // Check if we came from search or have a preselected gig
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    const gigId = params.get('gigId');
    
    if (search) {
      setSearchQuery(search);
    }
    if (gigId) {
      setFilterGig(gigId);
    }
  }, [location.search]);

  const handleCreateJob = (jobData) => {
    createJob(jobData);
  };

  // Filter jobs
  let filteredJobs = jobs;

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredJobs = filteredJobs.filter(job => 
      job.title.toLowerCase().includes(query) ||
      (job.description && job.description.toLowerCase().includes(query)) ||
      (job.info && job.info.toLowerCase().includes(query))
    );
  }

  if (filterStatus !== 'all') {
    filteredJobs = filteredJobs.filter(job => job.status === filterStatus);
  }

  if (filterPriority !== 'all') {
    filteredJobs = filteredJobs.filter(job => job.priority === filterPriority);
  }

  if (filterGig !== 'all') {
    filteredJobs = filteredJobs.filter(job => job.gigId === filterGig);
  }

  // Sort jobs
  filteredJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'deadline':
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      case 'priority':
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      default:
        return 0;
    }
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold uppercase tracking-wider text-cyber-yellow mb-2">
            Jobs
          </h1>
          <p className="text-sm font-mono text-cyber-gray-500">
            Manage your tasks and operations
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsFormOpen(true)}>
          <Plus size={18} className="inline mr-2" />
          New Job
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div>
          <label className="block text-xs font-mono text-cyber-gray-500 uppercase mb-1">
            <Filter size={12} className="inline mr-1" />
            Status
          </label>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="blocked">Blocked</option>
            <option value="completed">Completed</option>
          </Select>
        </div>

        <div>
          <label className="block text-xs font-mono text-cyber-gray-500 uppercase mb-1">
            Priority
          </label>
          <Select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </Select>
        </div>

        <div>
          <label className="block text-xs font-mono text-cyber-gray-500 uppercase mb-1">
            Gig
          </label>
          <Select
            value={filterGig}
            onChange={(e) => setFilterGig(e.target.value)}
          >
            <option value="all">All Gigs</option>
            {gigs.map(gig => (
              <option key={gig.id} value={gig.id}>
                {gig.title}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-xs font-mono text-cyber-gray-500 uppercase mb-1">
            Sort By
          </label>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recent">Most Recent</option>
            <option value="title">Title</option>
            <option value="deadline">Deadline</option>
            <option value="priority">Priority</option>
          </Select>
        </div>

        <div className="flex items-end">
          <Button 
            variant="ghost" 
            className="w-full"
            onClick={() => {
              setFilterStatus('all');
              setFilterPriority('all');
              setFilterGig('all');
              setSearchQuery('');
            }}
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-cyber-gray-500 font-mono">
            {searchQuery 
              ? `No jobs found matching "${searchQuery}"`
              : jobs.length === 0
                ? 'No jobs found. Create your first job to get started.'
                : 'No jobs match the current filters.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      {/* Form Dialog */}
      <JobForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateJob}
        preselectedGigId={filterGig !== 'all' ? filterGig : null}
      />
    </div>
  );
};

