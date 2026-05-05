import axios from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token to every request
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or from zustand store
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// global error handling
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // redirect to login, clear store, etc.
    }
    return Promise.reject(error);
  }
);

export default client;