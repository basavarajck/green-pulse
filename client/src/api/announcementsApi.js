// src/api/announcementsApi.js
import { getToken } from '../utils/auth.js';

const API_BASE = import.meta.env.VITE_API_URL;

export const getAnnouncements = async () => {
  const res = await fetch(`${API_BASE}/announcements`);
  if (!res.ok) throw new Error('Failed to fetch announcements');
  return res.json();
};

export const addAnnouncement = async (announcementData) => {
  const token = getToken();
  if (!token) throw new Error('Not authorized');
  
  const res = await fetch(`${API_BASE}/announcements`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(announcementData)
  });
  
  if (!res.ok) {
    const error = await res.json();
    // If there are validation errors, format them nicely
    if (error.errors && Array.isArray(error.errors)) {
      const errorMessages = error.errors.map(e => `${e.path || e.param}: ${e.msg}`).join(', ');
      throw new Error(errorMessages);
    }
    throw new Error(error.message || 'Failed to create announcement');
  }
  
  return res.json();
};

export const updateAnnouncement = async (announcementData) => {
  const token = getToken();
  if (!token) throw new Error('Not authorized');
  
  const res = await fetch(`${API_BASE}/announcements/${announcementData._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(announcementData)
  });
  
  if (!res.ok) {
    const error = await res.json();
    // If there are validation errors, format them nicely
    if (error.errors && Array.isArray(error.errors)) {
      const errorMessages = error.errors.map(e => `${e.path || e.param}: ${e.msg}`).join(', ');
      throw new Error(errorMessages);
    }
    throw new Error(error.message || 'Failed to update announcement');
  }
  
  return res.json();
};

export const deleteAnnouncement = async (id) => {
  const token = getToken();
  if (!token) throw new Error('Not authorized');
  
  const res = await fetch(`${API_BASE}/announcements/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token
    }
  });
  
  if (!res.ok) {
    const error = await res.json();
    // If there are validation errors, format them nicely
    if (error.errors && Array.isArray(error.errors)) {
      const errorMessages = error.errors.map(e => `${e.path || e.param}: ${e.msg}`).join(', ');
      throw new Error(errorMessages);
    }
    throw new Error(error.message || 'Failed to delete announcement');
  }
  
  return res.json();
};
