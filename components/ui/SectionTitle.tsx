import { Eyebrow } from "./Eyebrow";

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
  subtitle?: string;
}

export function SectionTitle({ eyebrow, title, align = "center", subtitle }: SectionTitleProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  return (
    <div className={alignClass}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-4xl font-display font-bold uppercase leading-tight tracking-display text-ink">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-lg text-ink-muted">{subtitle}</p>}
    </div>
  );
}
