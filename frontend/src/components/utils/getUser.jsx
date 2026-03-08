import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,});

export const getUser = async () => {
  await api.get('/sanctum/csrf-cookie', {
    withCredentials: true
  });

  const res = await api.get('/user', {
    withCredentials: true
  });

  return res.data.user;
};