import axios from 'axios';

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const client = axios.create({
  baseURL: API_BASE,
});

export const login = async (payload) => {
  const { data } = await client.post('/auth/login', payload);
  return data;
};

export const register = async (payload) => {
  const { data } = await client.post('/auth/register', payload);
  return data;
};

export const fetchTopics = async (token) => {
  const { data } = await client.get('/topics', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const toggleProblem = async (token, problemId) => {
  const { data } = await client.post(
    `/topics/${problemId}/toggle`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};

