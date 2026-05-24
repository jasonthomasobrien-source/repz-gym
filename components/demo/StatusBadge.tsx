type Status = 'active' | 'past_due' | 'paused' | 'canceled';

interface StatusBadgeProps {
  status: Status;
}

const styleMap: Record<Status, { label: string; classes: string }> = {
  active: { label: 'Active', classes: 'bg-success/15 text-success border-success/30' },
  past_due: { label: 'Past Due', classes: 'bg-danger/15 text-danger border-danger/30' },
  paused: { label: 'Paused', classes: 'bg-warning/15 text-warning border-warning/30' },
  canceled: { label: 'Canceled', classes: 'bg-ink-subtle/15 text-ink-muted border-ink-subtle/30' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, classes } = styleMap[status];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-sm border text-xs uppercase font-display font-semibold tracking-[0.08em] ${classes}`}
    >
      {label}
    </span>
  );
}
