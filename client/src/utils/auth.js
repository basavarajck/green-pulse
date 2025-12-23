// src/utils/auth.js
export const getToken = () => localStorage.getItem('token');

export const getUserRole = () => {
  try {
    const token = getToken();
    if (!token) return null;
    
    // Decode JWT payload (no verification needed for role check)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || 'user';
  } catch {
    return null;
  }
};

export const isAdmin = () => getUserRole() === 'admin';

export const isLoggedIn = () => !!getToken();
