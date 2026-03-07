import { useEffect, useState } from 'react';

import { fetchAsteroids } from '../api/asteroids-api';
import type { IAsteroid } from '../interface/asteroid';

export function useAsteroids(date: string) {
  const [asteroids, setAsteroids] = useState<IAsteroid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchAsteroids(date);
      setAsteroids(data);
      setLoading(false);
    }

    load();
  }, [date]);

  return { asteroids, loading };
}
