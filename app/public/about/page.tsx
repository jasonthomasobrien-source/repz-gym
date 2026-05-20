import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getTrainers } from "@/lib/data";

export default async function AboutPage() {
  const trainers = await getTrainers();

  return (
    <div className="space-y-24 bg-bg">
      {/* Hero */}
      <section className="relative min-h-[50vh] bg-gradient-to-br from-bg via-surface to-bg px-6 py-32 pt-32">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 text-xs font-display uppercase tracking-eyebrow text-brand">
            SINCE 1998
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold uppercase leading-tight text-ink">
            NO GLAMOUR. JUST RESULTS.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-ink-muted">
            28 years of serious iron, serious people, and a serious commitment to your fitness.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <SectionTitle eyebrow="OUR STORY" title="THE REPZ GYM STORY" />
          <div className="mt-12 space-y-6 text-ink-muted">
            <p>
              When we opened Repz Gym in 1998, we made a choice: no frills. No shiny chrome machines that nobody uses. No dance music. No "fitness motivation" posters. Just a solid floor, serious equipment, and the kind of people who show up to do the work.
            </p>
            <p>
              Nearly three decades later, that choice is still the same. We're in Plainwell because we're a Plainwell gym. We're here for the people who live here — the ones who want a real workout, not a status symbol. We've got everything you need to build strength, from the full free-weight floor to the best machines money can buy.
            </p>
            <p>
              Our community is our gym. We've trained families, high school athletes, weekend warriors, and lifers. We've seen members hit their first bodyweight pullup, deadlift two plates for the first time, and find the confidence that comes with knowing you're stronger than you were yesterday.
            </p>
            <p>
              That's Repz. That's us. That's why we're still here.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="TEAM" title="MEET THE COACHES" />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {trainers.map((trainer) => (
              <div key={trainer.id} className="flex gap-4">
                <div className="h-48 w-40 rounded-lg bg-gradient-to-b from-brand/10 to-surface flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-display font-bold uppercase text-ink text-lg">
                    {trainer.name}
                  </h3>
                  <p className="mt-1 text-sm text-brand font-semibold">{trainer.tagline}</p>
                  {trainer.bio && (
                    <p className="mt-4 text-sm text-ink-muted">{trainer.bio}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-24 bg-surface">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="REVIEWS" title="WHAT MEMBERS SAY" align="center" />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                text: "Best gym in Plainwell. No fuss, no BS. Just a great place to train.",
                author: "Marcus T.",
                rating: 5,
              },
              {
                text: "Katherine's MAD FITNEZ class is the most intense 45 minutes of my week. Worth every penny.",
                author: "Sarah H.",
                rating: 5,
              },
              {
                text: "Been coming here for 8 years. Never thought about leaving. This place is family.",
                author: "Coach Mike",
                rating: 5,
              },
              {
                text: "The equipment is top-notch and the people are real. No Instagram crowds here.",
                author: "James K.",
                rating: 5,
              },
              {
                text: "24/7 access as a member is huge. I lift at 5am and midnight depending on my schedule.",
                author: "Alex R.",
                rating: 5,
              },
              {
                text: "First gym I've joined where the staff actually knows your name after week one.",
                author: "Nicole D.",
                rating: 5,
              },
            ].map((review, i) => (
              <Card key={i} variant="dark">
                <div className="space-y-3">
                  <div className="flex gap-1">
                    {Array(review.rating)
                      .fill(null)
                      .map((_, j) => (
                        <span key={j} className="text-brand">
                          ★
                        </span>
                      ))}
                  </div>
                  <p className="text-sm italic text-ink-muted">"{review.text}"</p>
                  <p className="text-xs font-semibold text-ink">— {review.author}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visit */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <SectionTitle eyebrow="LOCATION" title="VISIT US" />
              <div className="mt-12 space-y-6">
                <div>
                  <p className="text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                    Address
                  </p>
                  <p className="text-lg font-semibold text-ink">585 10th St A, Plainwell, MI 49080</p>
                </div>
                <div>
                  <p className="text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                    Phone
                  </p>
                  <p className="text-lg font-semibold text-ink">(269) 685-1493</p>
                </div>
                <div>
                  <p className="text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                    Hours
                  </p>
                  <p className="text-lg font-semibold text-ink">Open daily, closes 8:30 PM</p>
                  <p className="text-sm text-ink-muted mt-2">Members: 24/7 key-fob access</p>
                </div>
                <div>
                  <p className="text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                    Parking
                  </p>
                  <p className="text-sm text-ink-muted">Free lot right out front</p>
                </div>
              </div>
              <Button size="lg" variant="primary" className="mt-12 w-full">
                GET DIRECTIONS
              </Button>
            </div>
            <div className="h-96 rounded-lg bg-gradient-to-br from-brand/20 to-surface border border-line flex items-center justify-center">
              <p className="text-ink-muted text-center">Map embed</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-ink mb-6">
            READY TO JOIN?
          </h2>
          <p className="text-lg text-ink-muted mb-8">
            First visit is always free. No credit card. Just come in.
          </p>
          <div className="flex flex-col gap-4 md:flex-row justify-center">
            <Button size="lg" variant="primary">
              START YOUR MEMBERSHIP
            </Button>
            <Button size="lg" variant="secondary">
              CONTACT US
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
