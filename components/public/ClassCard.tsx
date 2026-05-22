import type { Class, Trainer } from "@/lib/mock/types";

interface ClassCardProps {
  cls: Class;
  trainer?: Trainer;
  variant?: "home" | "classes";
}

export function ClassCard({ cls, trainer, variant = "home" }: ClassCardProps) {
  const imageHeight = variant === "home" ? "h-72" : "h-48";

  return (
    <div className="group cursor-pointer">
      <div className={`relative ${imageHeight} overflow-hidden rounded-md bg-surface`}>
        {cls.image_url && (
          <img
            src={cls.image_url}
            alt={cls.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>
      <div className="mt-6">
        <h3 className="font-display text-lg font-bold uppercase text-ink">{cls.name}</h3>
        <p className="mt-2 text-sm text-ink-muted">{cls.description}</p>
        {trainer && (
          <div className="mt-4 pt-4 border-t border-line flex items-center gap-3">
            <img
              src={trainer.photo_url}
              alt={trainer.name}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover shrink-0 ring-1 ring-brand/30"
            />
            <span className="text-xs font-display uppercase tracking-eyebrow text-ink-muted">
              {trainer.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
