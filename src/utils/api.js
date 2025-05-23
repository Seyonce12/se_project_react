// api.js - Utility functions for making API calls to the server

const baseUrl = 'http://localhost:3001';

// Check response helper function
export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

// Reusable request function for all API calls
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// Get all clothing items
export const getItems = () => {
  return request(`${baseUrl}/items`);
};

// Add a new clothing item
export const addItem = ({ name, weather, imageUrl }) => {
  const token = localStorage.getItem('jwt');

  return request(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name, weather, imageUrl })
  });
};

// Delete a clothing item
export const deleteItem = (id) => {
  const token = localStorage.getItem('jwt');
  return request(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

export const likeItem = (id) => {
  const token = localStorage.getItem('jwt');
  return request(`${baseUrl}/items/${id}/likes`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

export const unlikeItem = (id) => {
  const token = localStorage.getItem('jwt');
  return request(`${baseUrl}/items/${id}/likes`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};