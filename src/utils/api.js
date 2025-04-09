// api.js - Utility functions for making API calls to the server

const baseUrl = 'http://localhost:3001';

// Check response helper function
export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

// Get all clothing items
export const getItems = () => {
  return fetch(`${baseUrl}/items`)
    .then(checkResponse);
};

// Add a new clothing item
export const addItem = ({ name, weather, imageUrl }) => {
  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, weather, imageUrl })
  })
    .then(checkResponse);
};

// Delete a clothing item
export const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
  })
    .then(checkResponse);
};