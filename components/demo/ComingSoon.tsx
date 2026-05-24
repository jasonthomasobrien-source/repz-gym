import type { LucideIcon } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  description: string;
  features: string[];
}

export function ComingSoon({ title, subtitle, icon: Icon, description, features }: ComingSoonProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl lg:text-5xl font-display uppercase text-ink tracking-[0.02em] font-bold">
          {title}
        </h1>
        <p className="text-base text-ink-muted mt-2">{subtitle}</p>
      </div>

      <div className="bg-surface border border-line rounded-md p-10 lg:p-16 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand/10 border border-brand/30 mb-6">
          <Icon className="w-10 h-10 text-brand" />
        </div>

        <span className="inline-block px-3 py-1 bg-brand-alt/15 text-brand-alt border border-brand-alt/30 rounded-sm text-xs uppercase font-display font-semibold tracking-[0.12em] mb-4">
          Coming Soon
        </span>

        <p className="text-lg text-ink max-w-xl mx-auto mb-8">{description}</p>

        <ul className="grid gap-3 sm:grid-cols-2 max-w-2xl mx-auto text-left">
          {features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-3 bg-surface-2 border border-line rounded-sm p-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" aria-hidden />
              <span className="text-sm text-ink-muted">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
