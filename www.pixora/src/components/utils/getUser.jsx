import { api } from './api';

export { api };

export const getUser = async () => {
  const res = await api.get('/user');
  return res.data.user;
};