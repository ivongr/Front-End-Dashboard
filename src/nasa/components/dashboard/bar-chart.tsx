import { Bar } from 'react-chartjs-2';

import type { IAsteroid } from '../../interface/asteroid';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export function BarChart({ asteroids }: { asteroids: IAsteroid[] }) {
  const labels = asteroids.map((a) => a.name);

  const values = asteroids.map((a) => a.estimated_diameter.kilometers.estimated_diameter_max);

  const data = {
    labels,
    datasets: [
      {
        label: 'Diametro del asteroide(km)',
        data: values,
        backgroundColor: 'rgba(59,130,246,0.5)',
      },
    ],
  };

  return (
    <Bar
      data={data}
      options={{
        plugins: {
          legend: { labels: { color: 'rgba(255,255,255,0.7)' } },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const a = asteroids[ctx.dataIndex];
                return [
                  `Diámetro: ${(ctx.raw as number).toFixed(4)} km`,
                  `Peligroso: ${a.is_potentially_hazardous_asteroid ? 'Sí' : 'No'}`,
                ];
              },
            },
          },
        },
        scales: {
          x: {
            ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 10 } },
            grid: { color: 'rgba(255,255,255,0.05)' },
          },
          y: {
            ticks: { color: 'rgba(255,255,255,0.5)' },
            grid: { color: 'rgba(255,255,255,0.05)' },
          },
        },
      }}
    />
  );
}
