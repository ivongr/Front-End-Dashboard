import { useEffect, useState } from 'react';
import { fetchAsteroids } from '../api/asteroids-api';
import type { IAsteroid } from '../interface/asteroid';

export function useAsteroids(startDate: string, endDate: string) {
  const [asteroids, setAsteroids] = useState<IAsteroid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!startDate || !endDate) return;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAsteroids(startDate, endDate);
        setAsteroids(data as IAsteroid[]);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [startDate, endDate]);

  return { asteroids, loading, error };
}
