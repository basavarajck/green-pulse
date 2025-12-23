// src/api/blogsApi.js
import { getToken } from '../utils/auth.js';

const API_BASE = 'http://localhost:4000';

export const getBlogs = async () => {
  const res = await fetch(`${API_BASE}/blogs`);
  if (!res.ok) throw new Error('Failed to fetch blogs');
  return res.json();
};

export const getBlogById = async (id) => {
  const res = await fetch(`${API_BASE}/blogs/${id}`);
  if (!res.ok) throw new Error('Failed to fetch blog');
  return res.json();
};

export const addBlog = async (blogData) => {
  const token = getToken();
  if (!token) throw new Error('Not authorized');
  
  const res = await fetch(`${API_BASE}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(blogData)
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create blog');
  }
  
  return res.json();
};

export const updateBlog = async (blogData) => {
  const token = getToken();
  if (!token) throw new Error('Not authorized');
  
  const res = await fetch(`${API_BASE}/blogs`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(blogData)
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to update blog');
  }
  
  return res.json();
};

export const deleteBlog = async (id) => {
  const token = getToken();
  if (!token) throw new Error('Not authorized');
  
  const res = await fetch(`${API_BASE}/blogs/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token
    }
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to delete blog');
  }
  
  return res.json();
};
