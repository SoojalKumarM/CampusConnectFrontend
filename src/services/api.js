const API_BASE_URL = 'http://localhost:8080/api';

async function handleResponse(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'API request failed');
  }
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

export const api = {
  // Authentication Endpoints
  register: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(response);
  },

  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(response);
  },

  // Profile Management Endpoints
  getProfiles: async () => {
    const response = await fetch(`${API_BASE_URL}/profiles`);
    return handleResponse(response);
  },

  getProfileByUser: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/profiles/user/${userId}`);
    if (response.status === 404) return null;
    return handleResponse(response);
  },

  saveProfile: async (userId, profileData) => {
    const response = await fetch(`${API_BASE_URL}/profiles/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    });
    return handleResponse(response);
  },

  updateProfile: async (profileId, profileData) => {
    const response = await fetch(`${API_BASE_URL}/profiles/${profileId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    });
    return handleResponse(response);
  },

  deleteProfile: async (profileId) => {
    const response = await fetch(`${API_BASE_URL}/profiles/${profileId}`, {
      method: 'DELETE'
    });
    return handleResponse(response);
  }
};