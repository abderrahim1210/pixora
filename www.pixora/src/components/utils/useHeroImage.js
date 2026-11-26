import { useEffect, useState } from 'react';
import { api } from './api';

export const useHeroImage = () => {
  const [heroImage, setHeroImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchHeroImage = async () => {
      try {
        const res = await api.get('/get_hero_images', {
          withCredentials: true,
          skipGlobalLoading: true,
          signal: controller.signal,
        });

        if (!res.data.success) {
          throw new Error(res.data.message || 'Unable to load the hero image.');
        }

        setHeroImage(res.data.photo || null);
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(
            requestError.response?.data?.message ||
            requestError.message ||
            'Unable to load the hero image.'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchHeroImage();
    return () => controller.abort();
  }, []);

  return { heroImage, loading, error };
};
