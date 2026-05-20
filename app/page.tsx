import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getClasses, getTrainers } from "@/lib/data";

export default async function Home() {
  const classes = await getClasses();
  const trainers = await getTrainers();

  return (
    <div className="space-y-24 bg-bg">
      {/* Hero */}
      <section className="relative min-h-screen bg-gradient-to-br from-bg via-surface to-bg px-6 py-32 pt-32">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 text-xs font-display uppercase tracking-eyebrow text-brand">SHAPE YOUR BODY</div>
          <h1 className="text-5xl md:text-7xl font-display font-bold uppercase leading-tight text-ink">
            BE <span className="text-brand">STRONG</span>. TRAIN HARD.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-ink-muted">
            Plainwell's gym since 1998. No glamour. Just a great workout.
          </p>
          <div className="mt-12 flex flex-col justify-center gap-4 md:flex-row">
            <Button size="lg" variant="primary" href="/signup">
              JOIN NOW
            </Button>
            <Button size="lg" variant="secondary" href="/classes">
              SEE THE SCHEDULE
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionTitle
            eyebrow="WHY CHOOSE US"
            title="PUSH YOUR LIMITS FORWARD"
            subtitle="Full floor. Full community. Full commitment."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "🏋️", title: "MODERN EQUIPMENT", desc: "Full free-weight floor, top-shelf machines." },
              { icon: "🧠", title: "PROVEN PROGRAMS", desc: "MAD FITNEZ, Taekwondo, trainers who know you." },
              { icon: "🔓", title: "24/7 KEY-FOB", desc: "Lift at 5am. Lift at midnight. Always open." },
              { icon: "🎯", title: "MADE FOR YOU", desc: "Beginner to lifer. Everyone trains here." },
            ].map((item) => (
              <div key={item.title} className="space-y-3 text-center">
                <div className="text-4xl">{item.icon}</div>
                <h3 className="font-display font-bold uppercase text-ink">{item.title}</h3>
                <p className="text-sm text-ink-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Classes Preview */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="OUR CLASSES" title="WHAT WE OFFER" subtitle="Walk in, sign in, get to work." />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {classes.filter(c => c.is_active).map((cls) => (
              <div key={cls.id} className="group cursor-pointer overflow-hidden rounded-md bg-surface">
                <div className="relative h-48 bg-gradient-to-b from-brand/20 to-bg">
                  <div className="absolute inset-0 flex items-end p-4">
                    <div>
                      <div className="text-xs font-display uppercase tracking-eyebrow text-brand">CLASS</div>
                      <h3 className="text-xl font-display font-bold uppercase text-ink">{cls.name}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="OUR PLAN" title="CHOOSE YOUR ENTRY POINT" />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="rounded-md border border-line bg-surface p-8">
              <div className="text-xs font-display uppercase tracking-eyebrow text-brand">MOST POPULAR</div>
              <h3 className="mt-4 text-3xl font-display font-bold uppercase text-ink">$30</h3>
              <p className="text-xs uppercase text-ink-muted">/ MONTH</p>
              <ul className="mt-8 space-y-3 text-sm text-ink-muted">
                <li>✓ Full gym floor</li>
                <li>✓ All group classes</li>
                <li>✓ 24/7 key-fob access</li>
                <li>✓ No contract</li>
              </ul>
              <Button size="lg" variant="primary" className="mt-8 w-full">JOIN NOW</Button>
            </div>
            <div className="rounded-md border border-line bg-surface p-8">
              <div className="text-xs font-display uppercase tracking-eyebrow text-ink-muted">ONE-TIME</div>
              <h3 className="mt-4 text-3xl font-display font-bold uppercase text-ink">$10</h3>
              <p className="text-xs uppercase text-ink-muted">/ DAY</p>
              <ul className="mt-8 space-y-3 text-sm text-ink-muted">
                <li>✓ Full gym floor</li>
                <li>✓ Drop in on classes</li>
                <li>✓ No commitment</li>
                <li>✓ Apply to membership</li>
              </ul>
              <Button size="lg" variant="secondary" className="mt-8 w-full">BUY A DAY PASS</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="OUR TEAM" title="TRAIN WITH EXPERTS" />
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {trainers.map((trainer) => (
              <div key={trainer.id} className="text-center">
                <div className="mx-auto h-40 w-32 rounded-md bg-gradient-to-b from-brand/10 to-surface" />
                <h3 className="mt-4 font-display font-bold uppercase text-ink">{trainer.name}</h3>
                <p className="text-xs text-brand">{trainer.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
