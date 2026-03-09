import { cn } from '../utils/cn';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse rounded-md', className)}
      style={{ background: 'rgba(255,255,255,0.06)' }}
    />
  );
}
