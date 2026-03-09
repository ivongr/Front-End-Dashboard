import { Skeleton } from '../../../shared/components/skeleton';

export function DashboardSkeleton() {
  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className='relative overflow-hidden rounded-xl p-5 flex flex-col gap-3'
            style={{ background: '#0f1520', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <Skeleton className='h-3 w-24' />
            <Skeleton className='h-10 w-16' />
            <Skeleton className='h-3 w-32' />
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className='rounded-xl p-4 h-80 flex flex-col gap-3'
            style={{ background: '#0f1520', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <Skeleton className='h-4 w-40' />
            <Skeleton className='flex-1 w-full' />
          </div>
        ))}
      </div>
    </div>
  );
}
