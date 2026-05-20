export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`text-xs font-display uppercase tracking-eyebrow text-brand ${className}`}>
      {children}
    </div>
  );
}
