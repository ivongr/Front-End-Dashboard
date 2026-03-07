const API_KEY = import.meta.env.VITE_NASA_API_KEY;

export async function fetchAsteroids(date: string) {
  const response = await fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${API_KEY}`
  );

  const data = await response.json();

  return data.near_earth_objects[date];
}
