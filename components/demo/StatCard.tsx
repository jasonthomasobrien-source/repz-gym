import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  trend?: { value: string; direction: 'up' | 'down' | 'neutral' };
  accent?: 'brand' | 'brand-alt' | 'success' | 'danger';
}

interface AccentStyles {
  card: string;
  stripe: string;
  value: string;
  glow: string;
  trendBg: Record<'up' | 'down' | 'neutral', string>;
}

const accentStyles: Record<NonNullable<StatCardProps['accent']>, AccentStyles> = {
  brand: {
    card: 'bg-gradient-to-br from-brand/15 via-surface to-surface border-brand/30 shadow-2xl shadow-black/40 hover:shadow-brand/20',
    stripe: 'bg-gradient-to-r from-brand to-brand-hot',
    value: 'text-brand',
    glow: 'bg-brand/10',
    trendBg: {
      up: 'bg-success/15 text-success',
      down: 'bg-danger/15 text-danger',
      neutral: 'bg-ink-subtle/15 text-ink-muted',
    },
  },
  'brand-alt': {
    card: 'bg-gradient-to-br from-brand-alt/15 via-surface to-surface border-brand-alt/30 shadow-2xl shadow-black/40 hover:shadow-brand-alt/20',
    stripe: 'bg-gradient-to-r from-brand-alt to-brand-alt-light',
    value: 'text-brand-alt',
    glow: 'bg-brand-alt/10',
    trendBg: {
      up: 'bg-success/15 text-success',
      down: 'bg-danger/15 text-danger',
      neutral: 'bg-ink-subtle/15 text-ink-muted',
    },
  },
  success: {
    card: 'bg-gradient-to-br from-success/15 via-surface to-surface border-success/30 shadow-2xl shadow-black/40 hover:shadow-success/20',
    stripe: 'bg-gradient-to-r from-success to-success/70',
    value: 'text-success',
    glow: 'bg-success/10',
    trendBg: {
      up: 'bg-success/15 text-success',
      down: 'bg-danger/15 text-danger',
      neutral: 'bg-ink-subtle/15 text-ink-muted',
    },
  },
  danger: {
    card: 'bg-gradient-to-br from-danger/15 via-surface to-surface border-danger/30 shadow-2xl shadow-black/40 hover:shadow-danger/20',
    stripe: 'bg-gradient-to-r from-danger to-danger/70',
    value: 'text-danger',
    glow: 'bg-danger/10',
    trendBg: {
      up: 'bg-success/15 text-success',
      down: 'bg-danger/15 text-danger',
      neutral: 'bg-ink-subtle/15 text-ink-muted',
    },
  },
};

export function StatCard({ label, value, trend, accent = 'brand' }: StatCardProps) {
  const TrendIcon = trend?.direction === 'up' ? ArrowUp : trend?.direction === 'down' ? ArrowDown : Minus;
  const styles = accentStyles[accent];

  return (
    <div className={`group relative rounded-2xl border p-6 overflow-hidden transition-all duration-300 ${styles.card}`}>
      <div className={`absolute top-0 left-0 right-0 h-1 ${styles.stripe}`} />
      <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-60 ${styles.glow}`} aria-hidden />
      <div className="relative">
        <p className="text-xs text-ink-muted uppercase font-display tracking-[0.12em] font-semibold mb-3">
          {label}
        </p>
        <p className={`text-4xl lg:text-5xl font-display font-bold leading-none tracking-tight mb-4 ${styles.value}`}>
          {value}
        </p>
        {trend && (
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${styles.trendBg[trend.direction]}`}>
            <TrendIcon className="w-3.5 h-3.5" />
            <span>{trend.value}</span>
          </div>
        )}
      </div>
    </div>
  );
}
