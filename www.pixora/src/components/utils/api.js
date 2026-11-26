import axios from 'axios';

export const api = axios.create({
  baseURL: '/backend',
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

api.defaults.xsrfCookieName = 'XSRF-TOKEN';
api.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

let activeGlobalRequests = 0;
const globalLoadingListeners = new Set();

export const subscribeToGlobalLoading = (listener) => {
  globalLoadingListeners.add(listener);
  return () => globalLoadingListeners.delete(listener);
};

export const getGlobalLoadingCount = () => activeGlobalRequests;

const notifyGlobalLoadingListeners = () => {
  globalLoadingListeners.forEach((listener) => listener());
};

const startGlobalLoading = (config) => {
  if (config.skipGlobalLoading || config.globalLoadingTracked) return;

  config.globalLoadingTracked = true;
  activeGlobalRequests += 1;
  notifyGlobalLoadingListeners();
};

const stopGlobalLoading = (config) => {
  if (!config?.globalLoadingTracked) return;

  config.globalLoadingTracked = false;
  activeGlobalRequests = Math.max(0, activeGlobalRequests - 1);
  notifyGlobalLoadingListeners();
};

let csrfCookieRequest;
const stateChangingMethods = new Set(['post', 'put', 'patch', 'delete']);

api.interceptors.request.use(async (config) => {
  if (stateChangingMethods.has(config.method?.toLowerCase() ?? 'get')) {
    if (!csrfCookieRequest) {
      csrfCookieRequest = api.get('/sanctum/csrf-cookie', { skipGlobalLoading: true }).catch((error) => {
        csrfCookieRequest = undefined;
        throw error;
      });
    }

    await csrfCookieRequest;
  }

  startGlobalLoading(config);
  return config;
});

api.interceptors.response.use(
  (response) => {
    stopGlobalLoading(response.config);
    return response;
  },
  (error) => {
    stopGlobalLoading(error.config);
    return Promise.reject(error);
  }
);

export const apiUrl = (path) =>
  `/backend/${path.replace(/^\/+/, '')}`;
