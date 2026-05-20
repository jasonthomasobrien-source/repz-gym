import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <div className="space-y-24 bg-bg">
      {/* Hero */}
      <section className="relative min-h-[50vh] bg-gradient-to-br from-bg via-surface to-bg px-6 py-32 pt-32">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 text-xs font-display uppercase tracking-eyebrow text-brand">
            GET IN TOUCH
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold uppercase leading-tight text-ink">
            LET'S TALK
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-ink-muted">
            Questions? Ready to join? Have feedback? We're here to listen.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Form */}
            <div>
              <SectionTitle
                eyebrow="CONTACT"
                title="SEND US A MESSAGE"
                subtitle="We'll get back to you within 24 hours."
              />
              <form className="mt-8 space-y-4">
                <div>
                  <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded border border-line bg-surface text-ink placeholder-ink-muted focus:outline-none focus:border-brand"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded border border-line bg-surface text-ink placeholder-ink-muted focus:outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="(269) 555-0000"
                      className="w-full px-4 py-3 rounded border border-line bg-surface text-ink placeholder-ink-muted focus:outline-none focus:border-brand"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                    What's this about?
                  </label>
                  <select className="w-full px-4 py-3 rounded border border-line bg-surface text-ink focus:outline-none focus:border-brand">
                    <option>Pricing & membership</option>
                    <option>Classes & schedule</option>
                    <option>Personal training</option>
                    <option>Feedback</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    className="w-full px-4 py-3 rounded border border-line bg-surface text-ink placeholder-ink-muted focus:outline-none focus:border-brand resize-none"
                  />
                </div>
                <Button variant="primary" size="lg" className="w-full">
                  SEND MESSAGE
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <p className="text-xs font-display uppercase tracking-eyebrow text-brand mb-4">
                  DIRECT CONTACT
                </p>
                <Card variant="dark">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-ink-muted uppercase mb-1">Phone</p>
                      <p className="text-lg font-semibold text-ink">(269) 685-1493</p>
                    </div>
                    <div>
                      <p className="text-xs text-ink-muted uppercase mb-1">Address</p>
                      <p className="text-sm text-ink">585 10th St A</p>
                      <p className="text-sm text-ink">Plainwell, MI 49080</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <p className="text-xs font-display uppercase tracking-eyebrow text-brand mb-4">
                  HOURS
                </p>
                <Card variant="dark">
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-semibold text-ink">Monday–Friday:</span>
                      <span className="text-ink-muted ml-2">Open – 8:30 PM</span>
                    </p>
                    <p>
                      <span className="font-semibold text-ink">Saturday:</span>
                      <span className="text-ink-muted ml-2">Open – 8:30 PM</span>
                    </p>
                    <p>
                      <span className="font-semibold text-ink">Sunday:</span>
                      <span className="text-ink-muted ml-2">Open – 8:30 PM</span>
                    </p>
                    <p className="pt-3 border-t border-line text-xs text-brand">
                      Members: 24/7 key-fob access anytime
                    </p>
                  </div>
                </Card>
              </div>

              <div>
                <p className="text-xs font-display uppercase tracking-eyebrow text-brand mb-4">
                  SOCIALS
                </p>
                <Card variant="dark">
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="flex-1 px-3 py-2 rounded border border-line text-center text-sm font-semibold text-ink hover:bg-surface-2 transition"
                    >
                      Facebook
                    </a>
                    <a
                      href="#"
                      className="flex-1 px-3 py-2 rounded border border-line text-center text-sm font-semibold text-ink hover:bg-surface-2 transition"
                    >
                      Yelp
                    </a>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="px-6 py-24 bg-surface">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-display font-bold uppercase text-ink mb-12 text-center">
            QUICK ANSWERS
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card variant="dark">
              <h4 className="font-semibold text-ink mb-2">First Time?</h4>
              <p className="text-sm text-ink-muted">
                First visit is completely free. No credit card, no commitment. Just come in, say hi, and we'll show you around.
              </p>
            </Card>
            <Card variant="dark">
              <h4 className="font-semibold text-ink mb-2">When Can I Start?</h4>
              <p className="text-sm text-ink-muted">
                Now! Sign up anytime. Your membership starts immediately. Come in that same day if you want.
              </p>
            </Card>
            <Card variant="dark">
              <h4 className="font-semibold text-ink mb-2">Can I Pause?</h4>
              <p className="text-sm text-ink-muted">
                Yes. Pause up to 3 months per year at no charge. Life happens — we've got your back.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-ink mb-6">
            NO QUESTION TOO SMALL
          </h2>
          <p className="text-lg text-ink-muted mb-8">
            We're real people. We answer real questions. Get in touch.
          </p>
          <Button size="lg" variant="primary">
            SEND A MESSAGE
          </Button>
        </div>
      </section>
    </div>
  );
}
