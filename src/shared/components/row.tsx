import type { ReactNode } from 'react';

import { cn } from '../utils/cn';

export function Row({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex flex-row items-center', className)}>{children}</div>;
}
