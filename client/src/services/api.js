import axios from 'axios';

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const client = axios.create({
  baseURL: API_BASE,
  timeout: 10000, // 10 second timeout
  withCredentials: true
});

// Retry logic for failed requests
const retryRequest = async (fn, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      if (err.response?.status === 429 || !err.response) {
        // Only retry on rate limit or network errors
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      } else {
        throw err; // Don't retry on 401, 403, etc
      }
    }
  }
};

export const login = async (payload) => {
  try {
    const { data } = await retryRequest(() =>
      client.post('/auth/login', payload)
    );
    return data;
  } catch (err) {
    throw {
      message: err.response?.data?.message || 'Login failed',
      status: err.response?.status
    };
  }
};

export const register = async (payload) => {
  try {
    const { data } = await retryRequest(() =>
      client.post('/auth/register', payload)
    );
    return data;
  } catch (err) {
    throw {
      message: err.response?.data?.message || 'Registration failed',
      status: err.response?.status
    };
  }
};

export const fetchTopics = async (token, page = 1, limit = 10) => {
  try {
    const { data } = await retryRequest(() =>
      client.get('/topics', {
        params: { page, limit },
        headers: { Authorization: `Bearer ${token}` }
      })
    );
    return data;
  } catch (err) {
    throw {
      message: err.response?.data?.message || 'Failed to fetch topics',
      status: err.response?.status
    };
  }
};

export const toggleProblem = async (token, problemId) => {
  try {
    const { data } = await retryRequest(() =>
      client.post(
        `/topics/${problemId}/toggle`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
    );
    return data;
  } catch (err) {
    throw {
      message: err.response?.data?.message || 'Failed to update problem',
      status: err.response?.status
    };
  }
};

