// src/api/researchApi.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getAllResearch = async () => {
  const response = await fetch(`${API_URL}/api/research`);
  if (!response.ok) throw new Error('Failed to fetch research data');
  return response.json();
};

export const getResearchByDomain = async (domain) => {
  const response = await fetch(`${API_URL}/api/research/${domain}`);
  if (!response.ok) throw new Error('Research domain not found');
  return response.json();
};

export const upsertResearch = async (data) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/research`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Failed to update research domain');
  return response.json();
};

export const addProject = async (domain, projectData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/research/${domain}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(projectData)
  });
  if (!response.ok) throw new Error('Failed to add project');
  return response.json();
};

export const deleteProject = async (domain, projectId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/research/${domain}/projects/${projectId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error('Failed to delete project');
  return response.json();
};
