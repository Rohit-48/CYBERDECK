import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateId } from '../utils/helpers';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [gigs, setGigs] = useLocalStorage('cyberdeck-gigs', []);
  const [jobs, setJobs] = useLocalStorage('cyberdeck-jobs', []);

  // Gig operations
  const createGig = (gigData) => {
    const newGig = {
      id: generateId(),
      title: gigData.title,
      description: gigData.description || '',
      status: gigData.status || 'active',
      deadline: gigData.deadline || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setGigs(prev => [...prev, newGig]);
    return newGig;
  };

  const updateGig = (gigId, updates) => {
    setGigs(prev => prev.map(gig => 
      gig.id === gigId 
        ? { ...gig, ...updates, updatedAt: new Date().toISOString() }
        : gig
    ));
  };

  const deleteGig = (gigId) => {
    setGigs(prev => prev.filter(gig => gig.id !== gigId));
    // Also delete all jobs related to this gig
    setJobs(prev => prev.filter(job => job.gigId !== gigId));
  };

  const getGigById = (gigId) => {
    return gigs.find(gig => gig.id === gigId);
  };

  // Job operations
  const createJob = (jobData) => {
    const newJob = {
      id: generateId(),
      gigId: jobData.gigId,
      title: jobData.title,
      description: jobData.description || '',
      info: jobData.info || '',
      status: jobData.status || 'todo',
      priority: jobData.priority || 'medium',
      deadline: jobData.deadline || null,
      attachments: jobData.attachments || [],
      subtasks: jobData.subtasks || [],
      timeTracked: jobData.timeTracked || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setJobs(prev => [...prev, newJob]);
    return newJob;
  };

  const updateJob = (jobId, updates) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, ...updates, updatedAt: new Date().toISOString() }
        : job
    ));
  };

  const deleteJob = (jobId) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
  };

  const getJobById = (jobId) => {
    return jobs.find(job => job.id === jobId);
  };

  const getJobsByGigId = (gigId) => {
    return jobs.filter(job => job.gigId === gigId);
  };

  // Subtask operations
  const addSubtask = (jobId, subtaskText) => {
    const job = getJobById(jobId);
    if (job) {
      const newSubtask = {
        id: generateId(),
        text: subtaskText,
        completed: false,
      };
      updateJob(jobId, {
        subtasks: [...(job.subtasks || []), newSubtask],
      });
    }
  };

  const toggleSubtask = (jobId, subtaskId) => {
    const job = getJobById(jobId);
    if (job) {
      updateJob(jobId, {
        subtasks: job.subtasks.map(st => 
          st.id === subtaskId ? { ...st, completed: !st.completed } : st
        ),
      });
    }
  };

  const deleteSubtask = (jobId, subtaskId) => {
    const job = getJobById(jobId);
    if (job) {
      updateJob(jobId, {
        subtasks: job.subtasks.filter(st => st.id !== subtaskId),
      });
    }
  };

  // Attachment operations
  const addAttachment = (jobId, attachment) => {
    const job = getJobById(jobId);
    if (job) {
      updateJob(jobId, {
        attachments: [...(job.attachments || []), attachment],
      });
    }
  };

  const deleteAttachment = (jobId, attachmentIndex) => {
    const job = getJobById(jobId);
    if (job) {
      updateJob(jobId, {
        attachments: job.attachments.filter((_, idx) => idx !== attachmentIndex),
      });
    }
  };

  const value = {
    gigs,
    jobs,
    createGig,
    updateGig,
    deleteGig,
    getGigById,
    createJob,
    updateJob,
    deleteJob,
    getJobById,
    getJobsByGigId,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    addAttachment,
    deleteAttachment,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

