import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'https://api.pixora.test';

if (!apiBaseUrl) {
  throw new Error('VITE_API_URL must be configured before the app starts.');
}

export const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

api.defaults.xsrfCookieName = 'XSRF-TOKEN';
api.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

export const apiUrl = (path) =>
  `${apiBaseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
