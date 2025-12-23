// src/api/projectsApi.js
import { getToken } from '../utils/auth.js';

const API_BASE = 'http://localhost:4000';

export const getProjects = async () => {
  const res = await fetch(`${API_BASE}/projects`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
};

export const addProject = async (projectData) => {
  const token = getToken();
  if (!token) throw new Error('Not authorized');
  
  const res = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(projectData)
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create project');
  }
  
  return res.json();
};

export const updateProject = async (projectData) => {
  const token = getToken();
  if (!token) throw new Error('Not authorized');
  
  const res = await fetch(`${API_BASE}/projects`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(projectData)
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to update project');
  }
  
  return res.json();
};

export const deleteProject = async (id) => {
  const token = getToken();
  if (!token) throw new Error('Not authorized');
  
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token
    }
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to delete project');
  }
  
  return res.json();
};
