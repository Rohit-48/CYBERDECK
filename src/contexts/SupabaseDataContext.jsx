import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { generateId } from '../utils/helpers';

const SupabaseDataContext = createContext();

export const useSupabaseData = () => {
  const context = useContext(SupabaseDataContext);
  if (!context) {
    throw new Error('useSupabaseData must be used within a SupabaseDataProvider');
  }
  return context;
};

export const SupabaseDataProvider = ({ children }) => {
  const { user, isConfigured } = useAuth();
  const [gigs, setGigs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's gigs
  const fetchGigs = async () => {
    if (!isConfigured || !user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('gigs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGigs(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching gigs:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's jobs
  const fetchJobs = async () => {
    if (!isConfigured || !user) return;

    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching jobs:', err);
    }
  };

  // Load data when user changes
  useEffect(() => {
    if (user && isConfigured) {
      fetchGigs();
      fetchJobs();
    } else {
      setGigs([]);
      setJobs([]);
      setLoading(false);
    }
  }, [user, isConfigured]);

  // Gig operations
  const createGig = async (gigData) => {
    if (!user) return null;

    const newGig = {
      user_id: user.id,
      title: gigData.title,
      description: gigData.description || '',
      status: gigData.status || 'active',
      deadline: gigData.deadline || null,
    };

    const { data, error } = await supabase
      .from('gigs')
      .insert([newGig])
      .select()
      .single();

    if (error) {
      console.error('Error creating gig:', error);
      return null;
    }

    setGigs(prev => [data, ...prev]);
    return data;
  };

  const updateGig = async (gigId, updates) => {
    const { data, error } = await supabase
      .from('gigs')
      .update(updates)
      .eq('id', gigId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating gig:', error);
      return;
    }

    setGigs(prev => prev.map(gig => (gig.id === gigId ? data : gig)));
  };

  const deleteGig = async (gigId) => {
    const { error } = await supabase
      .from('gigs')
      .delete()
      .eq('id', gigId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting gig:', error);
      return;
    }

    setGigs(prev => prev.filter(gig => gig.id !== gigId));
    setJobs(prev => prev.filter(job => job.gig_id !== gigId));
  };

  const getGigById = (gigId) => {
    return gigs.find(gig => gig.id === gigId);
  };

  // Job operations
  const createJob = async (jobData) => {
    if (!user) return null;

    const newJob = {
      user_id: user.id,
      gig_id: jobData.gigId,
      title: jobData.title,
      description: jobData.description || '',
      info: jobData.info || '',
      status: jobData.status || 'todo',
      priority: jobData.priority || 'medium',
      deadline: jobData.deadline || null,
      attachments: jobData.attachments || [],
      subtasks: jobData.subtasks || [],
      time_tracked: jobData.timeTracked || 0,
    };

    const { data, error } = await supabase
      .from('jobs')
      .insert([newJob])
      .select()
      .single();

    if (error) {
      console.error('Error creating job:', error);
      return null;
    }

    setJobs(prev => [data, ...prev]);
    return data;
  };

  const updateJob = async (jobId, updates) => {
    // Convert camelCase to snake_case for database
    const dbUpdates = {
      ...updates,
      time_tracked: updates.timeTracked !== undefined ? updates.timeTracked : undefined,
      gig_id: updates.gigId !== undefined ? updates.gigId : undefined,
    };
    delete dbUpdates.timeTracked;
    delete dbUpdates.gigId;

    const { data, error } = await supabase
      .from('jobs')
      .update(dbUpdates)
      .eq('id', jobId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating job:', error);
      return;
    }

    setJobs(prev => prev.map(job => (job.id === jobId ? data : job)));
  };

  const deleteJob = async (jobId) => {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', jobId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting job:', error);
      return;
    }

    setJobs(prev => prev.filter(job => job.id !== jobId));
  };

  const getJobById = (jobId) => {
    return jobs.find(job => job.id === jobId);
  };

  const getJobsByGigId = (gigId) => {
    return jobs.filter(job => job.gig_id === gigId);
  };

  // Subtask operations
  const addSubtask = async (jobId, subtaskText) => {
    const job = getJobById(jobId);
    if (!job) return;

    const newSubtask = {
      id: generateId(),
      text: subtaskText,
      completed: false,
    };

    const updatedSubtasks = [...(job.subtasks || []), newSubtask];
    await updateJob(jobId, { subtasks: updatedSubtasks });
  };

  const toggleSubtask = async (jobId, subtaskId) => {
    const job = getJobById(jobId);
    if (!job) return;

    const updatedSubtasks = job.subtasks.map(st =>
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    );

    await updateJob(jobId, { subtasks: updatedSubtasks });
  };

  const deleteSubtask = async (jobId, subtaskId) => {
    const job = getJobById(jobId);
    if (!job) return;

    const updatedSubtasks = job.subtasks.filter(st => st.id !== subtaskId);
    await updateJob(jobId, { subtasks: updatedSubtasks });
  };

  // Attachment operations
  const addAttachment = async (jobId, attachment) => {
    const job = getJobById(jobId);
    if (!job) return;

    const updatedAttachments = [...(job.attachments || []), attachment];
    await updateJob(jobId, { attachments: updatedAttachments });
  };

  const deleteAttachment = async (jobId, attachmentIndex) => {
    const job = getJobById(jobId);
    if (!job) return;

    const updatedAttachments = job.attachments.filter((_, idx) => idx !== attachmentIndex);
    await updateJob(jobId, { attachments: updatedAttachments });
  };

  const value = {
    gigs,
    jobs,
    loading,
    error,
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
    refreshGigs: fetchGigs,
    refreshJobs: fetchJobs,
  };

  return <SupabaseDataContext.Provider value={value}>{children}</SupabaseDataContext.Provider>;
};

