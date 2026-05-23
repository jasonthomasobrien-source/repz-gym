import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { AnimationWrapper } from "@/components/AnimationWrapper";
import { CountUpStat } from "@/components/ui/CountUpStat";

export default function PricingPage() {
  return (
    <div className="space-y-24 bg-bg">
      {/* Hero */}
      <section className="relative min-h-[50vh] overflow-hidden px-6 py-32 pt-32">
        <img
          src="/hero/Weights Photo from Pexels.jpg"
          alt="Pricing"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative mx-auto max-w-5xl text-center">
          <AnimationWrapper animationType="fade-in">
            <div className="mb-6 text-xs font-display uppercase tracking-eyebrow text-brand-alt">
              MEMBERSHIP
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold uppercase leading-tight text-white">
              SIMPLE PRICING. NO TRICKS.
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-white/80">
              Pay for what you use. Cancel anytime. No contracts, no hidden fees.
            </p>
          </AnimationWrapper>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 mb-12">
            {/* Monthly */}
            <AnimationWrapper animationType="slide-left">
              <div className="relative rounded-md border border-line bg-surface p-8 hover:border-brand/50 transition">
                <div className="absolute -top-4 left-8 text-xs font-display uppercase tracking-eyebrow text-brand bg-bg px-2">
                  MOST POPULAR
                </div>
                <h3 className="mt-4 text-3xl font-display font-bold uppercase text-ink">$30</h3>
                <p className="text-xs uppercase text-ink-muted">/MONTH</p>
                <ul className="mt-8 space-y-4 text-sm text-ink-muted">
                  <li className="flex gap-3">
                    <span className="text-brand flex-shrink-0">✓</span>
                    <span>Full gym floor</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand flex-shrink-0">✓</span>
                    <span>All group classes</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand flex-shrink-0">✓</span>
                    <span>24/7 key-fob access</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand flex-shrink-0">✓</span>
                    <span>Cancel anytime</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand flex-shrink-0">✓</span>
                    <span>Pause up to 3 months</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand flex-shrink-0">✓</span>
                    <span>Member directory</span>
                  </li>
                </ul>
                <Button size="lg" variant="primary" className="mt-8 w-full" href="/join">
                  JOIN NOW
                </Button>
              </div>
            </AnimationWrapper>

            {/* Day Pass */}
            <AnimationWrapper animationType="slide-right">
              <div className="rounded-md border border-line bg-surface p-8">
                <h3 className="text-3xl font-display font-bold uppercase text-ink">$10</h3>
                <p className="text-xs uppercase text-ink-muted">/DAY</p>
                <ul className="mt-8 space-y-4 text-sm text-ink-muted">
                  <li className="flex gap-3">
                    <span className="text-brand flex-shrink-0">✓</span>
                    <span>Full gym floor</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand flex-shrink-0">✓</span>
                    <span>Drop in on classes</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand flex-shrink-0">✓</span>
                    <span>No commitment</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand flex-shrink-0">✓</span>
                    <span>Apply toward membership</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand flex-shrink-0">✓</span>
                    <span>Valid for 24 hours</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-ink-subtle/50 flex-shrink-0">—</span>
                    <span className="text-ink-subtle">Member directory</span>
                  </li>
                </ul>
                <Button size="lg" variant="secondary" className="mt-8 w-full" href="/join">
                  BUY A DAY PASS
                </Button>
              </div>
            </AnimationWrapper>
          </div>

          <p className="text-center text-sm text-ink-muted">
            🏷️ Bring a friend and both get your first month 50% off.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <SectionTitle eyebrow="QUESTIONS?" title="FREQUENTLY ASKED" />
          <div className="mt-16 space-y-4">
            {[
              {
                q: "Can I pause my membership?",
                a: "Yes. You can pause your membership for up to 3 months per year at no charge. Perfect if you're traveling or need a break.",
              },
              {
                q: "What if I want to cancel?",
                a: "No problem. Cancel anytime from your account or call us at (269) 685-1493. No questions, no fees.",
              },
              {
                q: "Do you offer student discounts?",
                a: "Yes! Students get 20% off. Just bring a valid student ID when you sign up.",
              },
              {
                q: "Is there a contract?",
                a: "Nope. Month-to-month only. You're not locked in.",
              },
              {
                q: "Do day passes apply toward membership?",
                a: "Yes. If you buy a day pass and decide to sign up within 30 days, we'll credit the full $10 toward your first month.",
              },
              {
                q: "What are the hours?",
                a: "We're open daily and close at 8:30 PM. Members can use their key fob anytime, 24/7.",
              },
            ].map((item, i) => (
              <AnimationWrapper key={i} animationType="fade-in" index={i}>
                <details
                  className="group border-b border-line last:border-b-0 cursor-pointer"
                >
                  <summary className="flex items-center justify-between py-4 text-ink font-semibold hover:text-brand transition">
                    <span>{item.q}</span>
                    <span className="text-brand group-open:rotate-180 transition duration-200">
                      ▼
                    </span>
                  </summary>
                  <p className="pb-4 text-ink-muted text-sm">{item.a}</p>
                </details>
              </AnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="px-6 py-16 bg-surface">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-display uppercase tracking-eyebrow text-brand mb-6">
            TRUSTED BY THE COMMUNITY
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div>
              <CountUpStat value={107} suffix="+" />
              <p className="text-xs text-ink-muted uppercase">Google reviews</p>
            </div>
            <div>
              <CountUpStat value={4.8} suffix="★" />
              <p className="text-xs text-ink-muted uppercase">Average rating</p>
            </div>
            <div>
              <CountUpStat value={28} suffix=" yrs" />
              <p className="text-xs text-ink-muted uppercase">In business</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-ink mb-6">
            READY TO TRAIN?
          </h2>
          <p className="text-lg text-ink-muted mb-8">
            First visit is always free. No credit card, no commitment. Just come in and lift.
          </p>
          <AnimationWrapper animationType="slide-up">
            <div className="flex flex-col gap-4 md:flex-row justify-center">
              <Button size="lg" variant="primary" href="/join">
                JOIN NOW
              </Button>
              <Button size="lg" variant="secondary" href="/contact">
                CONTACT US
              </Button>
            </div>
          </AnimationWrapper>
        </div>
      </section>
    </div>
  );
}
