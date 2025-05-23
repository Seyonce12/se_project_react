const baseUrl = 'http://localhost:3001';



const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const signup = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, avatar, email, password })
  }).then(checkResponse);
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('jwt');
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(checkResponse);
};

export const signin = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(checkResponse);
};

export const updateUser = ({ name, avatar }) => {
  const token = localStorage.getItem('jwt');
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name, avatar })
  }).then(checkResponse);
};