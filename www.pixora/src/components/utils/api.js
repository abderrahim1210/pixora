import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || 'https://dodo.tailfffe02.ts.net',
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

api.defaults.xsrfCookieName = 'XSRF-TOKEN';
api.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

let csrfCookieRequest;
const stateChangingMethods = new Set(['post', 'put', 'patch', 'delete']);

api.interceptors.request.use(async (config) => {
  if (stateChangingMethods.has(config.method?.toLowerCase() ?? 'get')) {
    if (!csrfCookieRequest) {
      csrfCookieRequest = api.get('/sanctum/csrf-cookie').catch((error) => {
        csrfCookieRequest = undefined;
        throw error;
      });
    }

    await csrfCookieRequest;
  }

  return config;
});

export const apiUrl = (path) =>
  `${import.meta.env.REACT_APP_API_URL}/${path.replace(/^\/+/, '')}`;
