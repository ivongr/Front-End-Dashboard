import { Scatter } from 'react-chartjs-2';

import type { IAsteroid } from '../../interface/asteroid';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export function ScatterChart({ asteroids }: { asteroids: IAsteroid[] }) {
  const data = {
    datasets: [
      {
        label: 'Velocidad vs Distancia',
        data: asteroids.map((a) => ({
          x: parseFloat(a.close_approach_data[0]?.miss_distance.kilometers ?? '0'),
          y: parseFloat(a.close_approach_data[0]?.relative_velocity.kilometers_per_hour ?? '0'),
        })),
        backgroundColor: asteroids.map((a) =>
          a.is_potentially_hazardous_asteroid ? 'rgba(239,68,68,0.6)' : 'rgba(59,130,246,0.6)'
        ),
      },
    ],
  };

  return (
    <Scatter
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { color: 'rgba(255,255,255,0.7)' } },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const a = asteroids[ctx.dataIndex];
                const date = a.close_approach_data[0]?.close_approach_date ?? 'N/A';

                return [
                  `Fecha: ${date}`,
                  `Nombre: ${a.name}`,
                  `Velocidad: ${Math.round(ctx.parsed.y as number).toLocaleString()} km/h`,
                  `Distancia: ${Math.round(ctx.parsed.x as number).toLocaleString()} km`,
                  `Peligroso: ${(a.is_potentially_hazardous_asteroid as boolean) ? 'Sí' : 'No'}`,
                ];
              },
            },
          },
        },
        scales: {
          x: {
            title: { display: true, text: 'Distancia (km)' },
            ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 10 } },
            grid: { color: 'rgba(255,255,255,0.05)' },
          },
          y: {
            title: { display: true, text: 'Velocidad (km/h)' },
            ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 10 } },
            grid: { color: 'rgba(255,255,255,0.05)' },
          },
        },
      }}
    />
  );
}
