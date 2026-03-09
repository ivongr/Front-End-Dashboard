import { useState } from 'react';

import { Row } from '../shared/components/row';
import { BarChart } from './components/dashboard/bar-chart';
import { DashboardSkeleton } from './components/dashboard/dashboard-skeleton';
import { ScatterChart } from './components/dashboard/scatter-chart';
import { DateFilter } from './components/filters/date-filter';
import { StatsCards } from './components/stat-card';
import { useAsteroids } from './hooks/use-asteroids';

export function DashboardPage() {
  const [startDate, setStartDate] = useState('2025-09-07');
  const [endDate, setEndDate] = useState('2025-09-14');

  const { asteroids, loading, error } = useAsteroids(startDate, endDate);

  const handleDateChange = (type: 'startDate' | 'endDate', value: string) => {
    if (type === 'startDate') setStartDate(value);
    else setEndDate(value);
  };

  return (
    <div className='p-6 space-y-6'>
      {!loading && asteroids.length === 0 && (
        <p className='text-center text-gray-400'>
          No se encontraron asteroides en este rango de fechas.
        </p>
      )}
      <Row>
        <h1 className='text-2xl font-bold text-white'>Dashboard de asteroides de la NASA</h1>{' '}
        <img
          className='w-24 inline-block ml-2 rounded-full'
          src='https://graffica.info/wp-content/uploads/2017/08/LogoNasaSpotB-1200x799.jpg'
        />
      </Row>

      <DateFilter startDate={startDate} endDate={endDate} onChange={handleDateChange} />

      {error && <p className='text-red-500 text-sm bg-red-50 px-4 py-2 rounded'>{error}</p>}
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <div className='space-y-6'>
          <StatsCards asteroids={asteroids || []} />
          <div
            className='p-4 rounded-xl h-80'
            style={{ background: '#0f1520', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <BarChart asteroids={asteroids} />
          </div>
          <div
            className='p-4 rounded-xl h-80'
            style={{ background: '#0f1520', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <ScatterChart asteroids={asteroids} />
          </div>
        </div>
      )}
    </div>
  );
}
