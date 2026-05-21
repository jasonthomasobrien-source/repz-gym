import { HeroVideo } from '@/components/public/HeroVideo';
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getClasses, getTrainers } from "@/lib/data";
import { AnimationWrapper } from "@/components/AnimationWrapper";

export default async function Home() {
  const classes = await getClasses();
  const trainers = await getTrainers();

  return (
    <div className="bg-bg">
      {/* Hero */}
      <HeroVideo />

      <div className="space-y-24">
        {/* Why Choose Us */}
        <section data-bg="dark" className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <AnimationWrapper animationType="fade-in">
              <SectionTitle
                eyebrow="WHY CHOOSE US"
                title="PUSH YOUR LIMITS FORWARD"
                subtitle="Full floor. Full community. Full commitment."
              />
            </AnimationWrapper>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: "🏋️", title: "MODERN EQUIPMENT", desc: "Full free-weight floor, top-shelf machines." },
                { icon: "🧠", title: "PROVEN PROGRAMS", desc: "MAD FITNEZ, Taekwondo, trainers who know you." },
                { icon: "🔓", title: "24/7 KEY-FOB", desc: "Lift at 5am. Lift at midnight. Always open." },
                { icon: "🎯", title: "MADE FOR YOU", desc: "Beginner to lifer. Everyone trains here." },
              ].map((item, idx) => (
                <AnimationWrapper key={item.title} animationType="slide-up" index={idx}>
                  <div className="space-y-3 text-center">
                    <div className="text-4xl">{item.icon}</div>
                    <h3 className="font-display font-bold uppercase text-ink">{item.title}</h3>
                    <p className="text-sm text-ink-muted">{item.desc}</p>
                  </div>
                </AnimationWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* Classes Preview */}
        <section data-bg="light" className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <AnimationWrapper animationType="fade-in">
              <SectionTitle eyebrow="OUR CLASSES" title="WHAT WE OFFER" subtitle="Walk in, sign in, get to work." />
            </AnimationWrapper>
            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {classes.filter(c => c.is_active).map((cls, idx) => (
                <AnimationWrapper key={cls.id} animationType="slide-up" index={idx}>
                  <div className="group cursor-pointer overflow-hidden rounded-md bg-surface border-t-2 border-brand-alt">
                    <div className="relative h-48 bg-gradient-to-b from-brand-alt/20 to-bg">
                      <div className="absolute inset-0 flex items-end p-4">
                        <div>
                          <div className="eyebrow">CLASS</div>
                          <h3 className="text-xl font-display font-bold uppercase text-ink">{cls.name}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimationWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section data-bg="dark" className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <AnimationWrapper animationType="fade-in">
              <SectionTitle eyebrow="OUR PLAN" title="CHOOSE YOUR ENTRY POINT" />
            </AnimationWrapper>
            <div className="mt-16 grid gap-8 md:grid-cols-2">
              <AnimationWrapper animationType="slide-up" index={0}>
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
              </AnimationWrapper>
              <AnimationWrapper animationType="slide-up" index={1}>
                <div className="rounded-md border-2 border-brand-alt bg-surface p-8">
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
              </AnimationWrapper>
            </div>
          </div>
        </section>

        {/* Trainers */}
        <section data-bg="light" className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <AnimationWrapper animationType="fade-in">
              <SectionTitle eyebrow="OUR TEAM" title="TRAIN WITH EXPERTS" />
            </AnimationWrapper>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {trainers.map((trainer, idx) => (
                <AnimationWrapper key={trainer.id} animationType="slide-up" index={idx}>
                  <div className="text-center">
                    <div className={`mx-auto h-40 w-32 rounded-md bg-gradient-to-b ${idx % 2 === 0 ? "from-brand/10" : "from-brand-alt/10"} to-surface`} />
                    <h3 className="mt-4 font-display font-bold uppercase text-ink">{trainer.name}</h3>
                    <p className="text-xs text-brand-alt">{trainer.tagline}</p>
                  </div>
                </AnimationWrapper>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
