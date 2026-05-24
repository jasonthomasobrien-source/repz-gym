import type { ScheduleBlock } from '@/lib/demo/classes-data';

interface ScheduleGridProps {
  days: string[];
  timeSlots: string[];
  blocks: Record<string, Record<string, ScheduleBlock | null>>;
}

const colorClasses: Record<ScheduleBlock['colorKey'], string> = {
  brand: 'bg-brand/15 border-brand/40 text-brand',
  'brand-alt': 'bg-brand-alt/15 border-brand-alt/40 text-brand-alt',
  success: 'bg-success/15 border-success/40 text-success',
  warning: 'bg-warning/15 border-warning/40 text-warning',
  danger: 'bg-danger/15 border-danger/40 text-danger',
  info: 'bg-ink-subtle/15 border-ink-subtle/40 text-ink-muted',
};

function formatTime(t: string): string {
  if (!t || t === '—') return t;
  const [hStr, m] = t.split(':');
  const h = parseInt(hStr, 10);
  const suffix = h >= 12 ? 'pm' : 'am';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m}${suffix}`;
}

export function ScheduleGrid({ days, timeSlots, blocks }: ScheduleGridProps) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[840px]">
        {/* Header row */}
        <div className="grid grid-cols-[80px_repeat(7,1fr)] gap-2 mb-2">
          <div className="text-xs uppercase font-display tracking-[0.12em] text-ink-muted font-semibold px-2 py-2">
            Time
          </div>
          {days.map((d) => (
            <div
              key={d}
              className="text-xs uppercase font-display tracking-[0.12em] text-ink-muted font-semibold text-center px-2 py-2"
            >
              {d}
            </div>
          ))}
        </div>
        {/* Body rows */}
        <div className="space-y-2">
          {timeSlots.map((slot) => (
            <div key={slot} className="grid grid-cols-[80px_repeat(7,1fr)] gap-2">
              <div className="text-xs font-display font-bold text-ink-muted px-2 py-3 flex items-center">
                {formatTime(slot)}
              </div>
              {days.map((d) => {
                const block = blocks[d]?.[slot];
                if (!block) {
                  return (
                    <div
                      key={d + slot}
                      className="min-h-[72px] border border-dashed border-line/60 rounded-sm"
                    />
                  );
                }
                const cls = colorClasses[block.colorKey];
                return (
                  <div
                    key={d + slot}
                    className={`min-h-[72px] border ${cls} rounded-sm p-2 flex flex-col justify-between`}
                  >
                    <div>
                      <p className="text-[11px] font-display font-bold uppercase tracking-[0.06em] leading-tight">
                        {block.className}
                      </p>
                      <p className="text-[10px] text-ink-muted mt-1 truncate">
                        {block.instructor}
                      </p>
                    </div>
                    <p className="text-[10px] font-display font-bold uppercase tracking-[0.08em]">
                      {block.booked}/{block.capacity}
                    </p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
