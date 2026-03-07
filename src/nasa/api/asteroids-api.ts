const API_KEY = import.meta.env.VITE_NASA_API_KEY;

export async function fetchAsteroids(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

  if (diffDays < 0) throw new Error('La fecha de inicio no puede ser mayor a la fecha de fin');
  if (diffDays > 7) throw new Error('El rango máximo es de 7 días');

  const response = await fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`
  );

  const data = await response.json();
  const allAsteroids = Object.values(data.near_earth_objects).flat();
  return allAsteroids;
}
