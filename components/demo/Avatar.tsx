interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

// Deterministic gradient pick based on name
const gradients = [
  'from-brand to-brand-hot',
  'from-brand-alt to-brand-alt-light',
  'from-brand-hot to-ember',
  'from-brand-alt-light to-brand',
  'from-warning to-brand',
  'from-brand-alt to-success',
];

function hashName(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return h;
}

function initials(name: string): string {
  const parts = name.split(' ').filter(Boolean);
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase();
}

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-16 h-16 text-xl',
};

export function Avatar({ name, size = 'md' }: AvatarProps) {
  const gradient = gradients[hashName(name) % gradients.length];
  return (
    <div
      className={`${sizeMap[size]} rounded-full flex items-center justify-center font-display font-bold text-ink bg-gradient-to-br ${gradient} shrink-0`}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  );
}
