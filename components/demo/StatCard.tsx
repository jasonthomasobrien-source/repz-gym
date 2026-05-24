import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  trend?: { value: string; direction: 'up' | 'down' | 'neutral' };
  accent?: 'brand' | 'brand-alt' | 'success' | 'danger';
}

const accentMap: Record<NonNullable<StatCardProps['accent']>, string> = {
  brand: 'bg-brand',
  'brand-alt': 'bg-brand-alt',
  success: 'bg-success',
  danger: 'bg-danger',
};

const trendColorMap = {
  up: 'text-success',
  down: 'text-danger',
  neutral: 'text-ink-muted',
};

export function StatCard({ label, value, trend, accent = 'brand' }: StatCardProps) {
  const TrendIcon = trend?.direction === 'up' ? ArrowUp : trend?.direction === 'down' ? ArrowDown : Minus;
  const trendColor = trend ? trendColorMap[trend.direction] : '';

  return (
    <div className="relative bg-surface border border-line rounded-md p-6 overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-1 ${accentMap[accent]}`} />
      <p className="text-xs text-ink-muted uppercase font-display tracking-[0.12em] font-semibold mb-3">
        {label}
      </p>
      <p className="text-4xl lg:text-5xl font-display font-bold text-ink leading-none mb-3">
        {value}
      </p>
      {trend && (
        <div className={`flex items-center gap-1 text-sm font-medium ${trendColor}`}>
          <TrendIcon className="w-4 h-4" />
          <span>{trend.value}</span>
        </div>
      )}
    </div>
  );
}
