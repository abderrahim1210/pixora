import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,});

export const getUser = async () => {
  // await api.get('/sanctum/csrf-cookie', {
  //   withCredentials: true
  // });

  const res = await api.get('/user');

  return res.data.user;
};