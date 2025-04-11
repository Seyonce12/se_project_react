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
  return request(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, weather, imageUrl })
  });
};

// Delete a clothing item
export const deleteItem = (id) => {
  return request(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
  });
};