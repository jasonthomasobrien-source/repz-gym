type Status = 'active' | 'past_due' | 'paused' | 'canceled';

interface StatusBadgeProps {
  status: Status;
}

const styleMap: Record<Status, { label: string; classes: string; dot: string }> = {
  active: {
    label: 'Active',
    classes: 'bg-success/20 text-success border-success/40',
    dot: 'bg-success',
  },
  past_due: {
    label: 'Past Due',
    classes: 'bg-danger/20 text-danger border-danger/40',
    dot: 'bg-danger',
  },
  paused: {
    label: 'Paused',
    classes: 'bg-warning/20 text-warning border-warning/40',
    dot: 'bg-warning',
  },
  canceled: {
    label: 'Canceled',
    classes: 'bg-ink-subtle/15 text-ink-muted border-ink-subtle/30',
    dot: 'bg-ink-subtle',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, classes, dot } = styleMap[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs uppercase font-display font-semibold tracking-[0.08em] ${classes}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} aria-hidden />
      {label}
    </span>
  );
}
