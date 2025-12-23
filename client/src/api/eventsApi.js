// src/api/eventsApi.js - FIXED Authorization header
import { getToken } from '../utils/auth.js';

const API_BASE = 'http://localhost:4000';

export const getEvents = async () => {
  const res = await fetch(`${API_BASE}/events`);
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
};

export const addEvent = async (eventData) => {
  const token = getToken();
  if (!token) throw new Error('Not authorized');
  
  const res = await fetch(`${API_BASE}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token  // 👈 FIXED: Just token, no "Bearer "
    },
    body: JSON.stringify(eventData)
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create event');
  }
  
  return res.json();
};

export const updateEvent = async (eventData) => {
  const token = getToken();
  if (!token) throw new Error('Not authorized');
  
  const res = await fetch(`${API_BASE}/events`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token  // 👈 FIXED: Just token
    },
    body: JSON.stringify(eventData)
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to update event');
  }
  
  return res.json();
};

export const deleteEvent = async (id) => {
  const token = getToken();
  if (!token) throw new Error('Not authorized');
  
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token  // 👈 FIXED: Just token
    }
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to delete event');
  }
  
  return res.json();
};
