// src/api/teamApi.js
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const getAuthHeaders = () => ({
  Authorization: localStorage.getItem('token'),
  // Note: do NOT set Content-Type here when using FormData (browser sets it with boundary)
});

export const getTeamMembers = async () => {
  const res = await fetch(`${BASE_URL}/members`);
  if (!res.ok) throw new Error('Failed to fetch team members');
  return res.json();
};

export const addTeamMember = async (formData) => {
  const res = await fetch(`${BASE_URL}/members`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formData, // FormData for multipart/form-data (image upload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to add team member');
  return data;
};

export const updateTeamMember = async (id, formData) => {
  const res = await fetch(`${BASE_URL}/members/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update team member');
  return data;
};

export const deleteTeamMember = async (id) => {
  const res = await fetch(`${BASE_URL}/members/${id}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete team member');
  return data;
};