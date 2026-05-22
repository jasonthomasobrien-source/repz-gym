interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export function SectionTitle({ eyebrow, title, subtitle, align = "center" }: SectionTitleProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  return (
    <div className={alignClass}>
      {eyebrow && (
        <div className="eyebrow mb-4">
          {eyebrow}
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-ink">
        {title}
      </h2>
      {/* Teal underline accent */}
      <div className="section-title-underline" />
      {subtitle && (
        <p className="mt-4 text-lg text-ink-muted max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
