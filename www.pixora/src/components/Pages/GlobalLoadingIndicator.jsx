import { useSyncExternalStore } from 'react';
import { getGlobalLoadingCount, subscribeToGlobalLoading } from '../utils/api';

const GlobalLoadingIndicator = () => {
  const activeRequests = useSyncExternalStore(
    subscribeToGlobalLoading,
    getGlobalLoadingCount,
    () => 0
  );

  if (activeRequests === 0) return null;

  return (
    <div
      className="global-loading-indicator"
      role="progressbar"
      aria-label="Loading requests"
      aria-live="polite"
    />
  );
};

export default GlobalLoadingIndicator;
