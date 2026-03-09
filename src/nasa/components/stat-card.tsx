import type { IAsteroid } from '../interface/asteroid';

interface StatCardProps {
  label: string;
  value: string;
  subtitle: string;
  accent: string;
  index: number;
}

function StatCard({ label, value, subtitle, accent }: StatCardProps) {
  return (
    <div
      className='relative overflow-hidden rounded-xl p-4 flex flex-col gap-2'
      style={{
        background: '#0f1520',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div
        className='absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-10'
        style={{ background: accent }}
      />

      <span className='text-[11px] uppercase tracking-widest font-medium text-gray-400'>
        {label}
      </span>

      <span className='text-3xl font-black tracking-tight' style={{ color: accent }}>
        {value}
      </span>

      <span className='text-[11px] text-gray-500'>{subtitle}</span>
    </div>
  );
}

export function StatsCards({ asteroids }: { asteroids: IAsteroid[] }) {
  const total = asteroids.length;

  const hazardous = asteroids.filter((a) => a.is_potentially_hazardous_asteroid).length;

  const avgVelocity =
    asteroids.reduce(
      (acc, a) =>
        acc + parseFloat(a.close_approach_data[0]?.relative_velocity.kilometers_per_hour ?? '0'),
      0
    ) / (total || 1);

  const closest = Math.min(
    ...asteroids.map((a) =>
      parseFloat(a.close_approach_data[0]?.miss_distance.kilometers ?? 'Infinity')
    )
  );

  const fmt = (n: number) =>
    n >= 1_000_000
      ? `${(n / 1_000_000).toFixed(1)}M`
      : n >= 1000
      ? `${(n / 1000).toFixed(1)}k`
      : n.toFixed(0);

  const stats = [
    {
      label: 'Total asteroides',
      value: total.toString(),
      subtitle: 'en el período seleccionado',
      accent: '#60a5fa',
    },
    {
      label: 'Peligrosos',
      value: hazardous.toString(),
      subtitle: 'potencialmente dañinos',
      accent: '#f87171',
    },
    {
      label: 'Vel. promedio',
      value: `${fmt(avgVelocity)}`,
      subtitle: 'km/h velocidad media',
      accent: '#34d399',
    },
    {
      label: 'Más cercano',
      value: `${fmt(closest)}`,
      subtitle: 'km distancia mínima',
      accent: '#a78bfa',
    },
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
      {stats.map((s, i) => (
        <StatCard key={s.label} {...s} index={i} />
      ))}
    </div>
  );
}
