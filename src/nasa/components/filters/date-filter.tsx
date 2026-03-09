import { Card, CardContent } from '../../../shared/components/card';
import { Row } from '../../../shared/components/row';
import { IconFilter } from '../../../shared/utils/icons';

interface Props {
  startDate: string;
  endDate: string;
  onChange: (type: 'startDate' | 'endDate', value: string) => void;
}

export function DateFilter({ startDate, endDate, onChange }: Props) {
  const handleReset = () => {
    onChange('startDate', new Date().toISOString().split('T')[0]);
    onChange('endDate', new Date().toISOString().split('T')[0]);
  };
  return (
    <Card
      className='border-border/50 bg-card/80'
      style={{ background: '#0f1520', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <CardContent>
        <Row className='grid grid-cols-2 gap-4 sm:flex'>
          <Row className='gap-2'>
            <IconFilter className='size-6 shrink-0' />
            <span className='text-sm text-white'>Filtro</span>
          </Row>
          <input
            type='date'
            aria-label='Fecha de inicio'
            value={startDate}
            onChange={(e) => onChange('startDate', e.target.value)}
            className='border rounded px-3 py-2 text-white'
          />
          <span className='text-muted-foreground text-white'>hasta</span>
          <input
            type='date'
            aria-label='Fecha de fin'
            value={endDate}
            onChange={(e) => onChange('endDate', e.target.value)}
            className='border rounded px-3 py-2 text-white'
          />
          <button
            onClick={handleReset}
            className='text-xs text-white border border-white-700 hover:bg-gray-400 bg-gray-800 hover:border-gray-500 px-3 py-2 rounded transition-colors'
          >
            Restablecer
          </button>
        </Row>
      </CardContent>
    </Card>
  );
}
