import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function StyleGuide() {
  return (
    <main className="min-h-screen bg-bg px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-16">
        <SectionTitle eyebrow="Design System" title="Repz Style Guide" subtitle="Core components and tokens" />

        <section>
          <h3 className="mb-6 text-2xl font-display font-bold uppercase text-ink">Colors</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { name: "bg", hex: "#0a0a0a" },
              { name: "surface", hex: "#141414" },
              { name: "brand", hex: "#f26522" },
              { name: "ember", hex: "#8c1f0e" },
              { name: "success", hex: "#3dba6b" },
              { name: "danger", hex: "#e84a4a" },
              { name: "warning", hex: "#e8b53a" },
              { name: "ink", hex: "#ffffff" },
            ].map((color) => (
              <Card key={color.name} variant="dark">
                <div className="mb-3 h-12 rounded" style={{ backgroundColor: color.hex }} />
                <p className="font-mono text-sm text-ink-muted">{color.name}</p>
                <p className="font-mono text-xs text-ink-subtle">{color.hex}</p>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-6 text-2xl font-display font-bold uppercase text-ink">Buttons</h3>
          <div className="space-y-6">
            {["primary", "secondary", "ghost", "danger"].map((variant) => (
              <div key={variant}>
                <p className="mb-3 text-sm font-display font-bold uppercase text-ink-muted">{variant}</p>
                <div className="flex flex-wrap gap-3">
                  {["sm", "md", "lg"].map((size) => (
                    <Button key={size} variant={variant as any} size={size as any}>
                      Button {size}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-6 text-2xl font-display font-bold uppercase text-ink">Cards</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <Card variant="dark">
              <Eyebrow>Dark Card</Eyebrow>
              <p className="mt-4 text-ink">This is a dark card on dark background.</p>
            </Card>
            <Card variant="paper">
              <Eyebrow className="text-brand">Paper Card</Eyebrow>
              <p className="mt-4 text-paper-ink">This is a paper card for light content.</p>
            </Card>
          </div>
        </section>

        <section>
          <h3 className="mb-6 text-2xl font-display font-bold uppercase text-ink">Typography</h3>
          <div className="space-y-6">
            <div>
              <p className="text-xs font-display uppercase tracking-eyebrow text-brand">Display XL</p>
              <p className="text-5xl font-display font-bold uppercase text-ink">BE STRONG. TRAIN HARD.</p>
            </div>
            <div>
              <p className="text-xs font-display uppercase tracking-eyebrow text-brand">Display MD</p>
              <p className="text-3xl font-display font-bold uppercase text-ink">PUSH YOUR LIMITS</p>
            </div>
            <div>
              <p className="text-xs font-display uppercase tracking-eyebrow text-brand">Body</p>
              <p className="text-base text-ink">The majority of traffic is a phone in someone's hand in the parking lot. Mobile-first.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
