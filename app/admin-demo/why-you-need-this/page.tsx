import Link from 'next/link';
import {
  TrendingUp,
  UserCheck,
  Clock,
  FileText,
  Shield,
  Activity,
  CheckCircle2,
  Sparkles,
  Building,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Mail,
  Users,
  ClipboardCheck,
} from 'lucide-react';
import { ValuationCalculator } from '@/components/demo/ValuationCalculator';

export const metadata = {
  title: 'Why You Need This | Admin Dashboard Demo | Repz Gym',
};

interface ComparisonRow {
  label: string;
  cash: string;
  spreadsheet: string;
  dashboard: string;
}

const comparisonRows: ComparisonRow[] = [
  {
    label: 'Member roster',
    cash: 'Memory + sign-in sheet',
    spreadsheet: 'One row per member',
    dashboard: 'Searchable, sortable, with payment history',
  },
  {
    label: 'Monthly billing',
    cash: 'Hope they show up',
    spreadsheet: 'Manual check-ins, manual collection',
    dashboard: 'Automatic, card on file, retries failed payments',
  },
  {
    label: 'Failed payments',
    cash: 'You find out when they ghost',
    spreadsheet: 'You find out 30 days late',
    dashboard: 'Same day, with auto-text to member',
  },
  {
    label: 'Reports',
    cash: 'Mental math',
    spreadsheet: 'Build a pivot table',
    dashboard: 'Live dashboard, any time period',
  },
  {
    label: 'Selling the business',
    cash: 'Worth ~$0 to a buyer',
    spreadsheet: 'Worth maybe 1× annual',
    dashboard: 'Worth 2–4× annual revenue',
  },
  {
    label: 'New member signups',
    cash: 'They have to find you',
    spreadsheet: 'They have to find you',
    dashboard: 'Sign up online, 24/7, card already charged',
  },
];

export default function WhyYouNeedThisPage() {
  return (
    <div className="space-y-10">
      {/* Top back link */}
      <Link
        href="/admin-demo/overview"
        className="inline-flex items-center gap-2 text-sm text-ink-muted uppercase font-display tracking-[0.08em] font-semibold hover:text-brand-alt transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Overview
      </Link>

      {/* Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs text-brand uppercase font-display tracking-[0.12em] font-semibold">
          <Sparkles className="w-4 h-4" />
          The Case For Modernizing
        </div>
        <h1 className="text-4xl lg:text-6xl font-display uppercase text-ink tracking-[0.02em] font-bold leading-tight">
          Why You Need This
        </h1>
        <p className="text-lg text-ink-muted max-w-3xl leading-relaxed">
          You&apos;ve got a spreadsheet. That was a real step up from cash-only. Here&apos;s what you&apos;re still missing — and what each gap costs.
        </p>
      </header>

      {/* Section 1: Comparison */}
      <section className="bg-surface border border-line rounded-md p-6 lg:p-8">
        <header className="mb-6">
          <h2 className="text-2xl lg:text-3xl font-display uppercase text-ink tracking-[0.02em] font-bold">
            From Cash → Spreadsheet → Real System
          </h2>
          <p className="text-sm text-ink-muted mt-2">Each row is a feature of running a gym. Where do you sit today?</p>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[720px]">
            <thead>
              <tr className="border-b border-line">
                <th className="text-left py-3 pr-4 text-xs text-ink-muted uppercase font-display tracking-[0.12em] font-semibold">Feature</th>
                <th className="text-left py-3 px-4 text-xs text-ink-muted uppercase font-display tracking-[0.12em] font-semibold">Cash-Only</th>
                <th className="text-left py-3 px-4 text-xs text-ink-muted uppercase font-display tracking-[0.12em] font-semibold">Spreadsheet</th>
                <th className="text-left py-3 pl-4 text-xs text-brand uppercase font-display tracking-[0.12em] font-semibold">This Dashboard</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? 'bg-surface-2' : ''}>
                  <td className="py-4 pr-4 text-sm text-ink font-semibold align-top">{row.label}</td>
                  <td className="py-4 px-4 text-sm text-ink-muted align-top">{row.cash}</td>
                  <td className="py-4 px-4 text-sm text-ink-muted align-top">{row.spreadsheet}</td>
                  <td className="py-4 pl-4 text-sm text-brand font-medium align-top border-l-2 border-brand">{row.dashboard}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: Sale value math */}
      <section className="bg-surface-2 border border-line rounded-md p-6 lg:p-8">
        <header className="mb-6">
          <h2 className="text-2xl lg:text-3xl font-display uppercase text-ink tracking-[0.02em] font-bold">
            Your Business Is Worth What You Can Prove
          </h2>
          <p className="text-sm text-ink-muted mt-2">Sale value math — same gym, two very different price tags.</p>
        </header>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* Cash-only */}
          <div className="bg-surface border border-line rounded-md p-6">
            <p className="text-xs text-ink-muted uppercase font-display tracking-[0.12em] font-semibold mb-2">Cash-only gym</p>
            <p className="text-4xl lg:text-5xl font-display font-bold text-ink-muted leading-none mb-2">$30K – $60K</p>
            <p className="text-sm text-ink-muted mb-5">Hard assets only — equipment + lease value</p>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-danger mt-0.5 shrink-0" /> No verifiable revenue stream</li>
              <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-danger mt-0.5 shrink-0" /> Buyers can&apos;t confirm member count</li>
              <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-danger mt-0.5 shrink-0" /> Sale only on equipment + leasehold</li>
            </ul>
          </div>

          {/* Documented */}
          <div className="bg-surface border-2 border-brand-alt rounded-md p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-brand-alt" />
            <p className="text-xs text-brand-alt uppercase font-display tracking-[0.12em] font-semibold mb-2">Documented gym (this system)</p>
            <p className="text-4xl lg:text-5xl font-display font-bold text-brand leading-none mb-2">$85K – $170K</p>
            <p className="text-sm text-ink-muted mb-5">2–3× SDE OR 0.5–1.5× annual revenue (documented)</p>
            <ul className="space-y-2 text-sm text-ink">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" /> Verifiable $142K annual revenue</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" /> Provable 380 active monthly subscribers</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" /> Recurring revenue commands a premium</li>
            </ul>
          </div>
        </div>

        <p className="text-base text-ink-muted mt-6 max-w-3xl leading-relaxed">
          <span className="text-brand font-semibold">The difference is $25K – $140K</span> for the same gym — same members, same building. The only variable is what you can put on paper.
        </p>
        <p className="text-xs text-ink-subtle mt-3 max-w-3xl leading-relaxed italic">
          These ranges reflect typical small-gym sales (BizBuySell data, business broker rules of thumb). Final sale price depends on lease, equipment, location, growth, and buyer type. This isn&apos;t a formal appraisal.
        </p>
      </section>

      {/* Section 3: Valuation Calculator */}
      <section className="bg-surface-2 border border-line rounded-md p-6 lg:p-8">
        <header className="mb-6">
          <h2 className="text-2xl lg:text-3xl font-display uppercase text-ink tracking-[0.02em] font-bold">
            Estimate Your Gym&apos;s Value
          </h2>
          <p className="text-sm text-ink-muted mt-2">Plug in your real numbers. See what the gap looks like for you.</p>
        </header>
        <ValuationCalculator />
      </section>

      {/* Section 4: Revenue You're Leaving on the Table */}
      <section className="bg-surface border border-line rounded-md p-6 lg:p-8">
        <header className="mb-6">
          <h2 className="text-2xl lg:text-3xl font-display uppercase text-ink tracking-[0.02em] font-bold">
            Revenue You&apos;re Leaving on the Table
          </h2>
          <p className="text-sm text-ink-muted mt-2">Money you&apos;re losing right now that this system would capture.</p>
        </header>

        <p className="text-base text-ink-muted leading-relaxed mb-6 max-w-3xl">
          Some of the biggest wins aren&apos;t from new members — they&apos;re from plugging leaks in what you already have. Here&apos;s what a system like this captures that an honor system or spreadsheet can&apos;t see.
        </p>

        <div className="grid gap-4 md:grid-cols-2 mb-6">
          {[
            {
              icon: TrendingUp,
              color: 'text-brand',
              amount: '$2,000 – $5,000/yr',
              title: 'Missed Annual Upgrades',
              sub: 'Lost to lack of upgrade prompts',
              body: "Monthly members renew month by month. Annual members commit a full year. Of your 380 members, conservatively 30% would prepay for a 10% discount — but you'd have to ask. This system asks automatically.",
            },
            {
              icon: UserCheck,
              color: 'text-brand-alt',
              amount: '$2,500 – $4,500/yr',
              title: 'Day-Pass No Follow-Up',
              sub: 'Walk-ins who liked it but never heard from you again',
              body: "When a day-pass buyer leaves, they're considering joining. An auto-text 48 hours later — ‘How was your workout? First month 50% off if you join this week’ — converts roughly 15%. Right now, zero get that text.",
            },
            {
              icon: AlertTriangle,
              color: 'text-danger',
              amount: '$1,500 – $3,000/yr',
              title: 'Ghost Members',
              sub: 'Failed payments and lapsed members the spreadsheet missed',
              body: "Failed credit cards, switched cards, expired cards, members who quietly stopped paying — they show up as ‘active’ on a manual roster but aren't paying. This system reconciles automatically every month.",
            },
            {
              icon: Activity,
              color: 'text-success',
              amount: '$1,000 – $2,500/yr',
              title: 'Class Capacity',
              sub: 'Classes running below capacity',
              body: "If you could see — at a glance — that Tuesday morning MAD FITNEZ runs 8/12 every week, you'd promote it or change the time. Capacity reports turn empty seats into revenue.",
            },
          ].map((leak) => {
            const Icon = leak.icon;
            return (
              <div key={leak.title} className="bg-surface-2 border border-line rounded-md p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Icon className={`w-6 h-6 ${leak.color}`} />
                  <h3 className="text-lg font-display uppercase text-ink tracking-[0.02em] font-bold">{leak.title}</h3>
                </div>
                <p className={`text-3xl lg:text-4xl font-display font-bold leading-none mb-2 ${leak.color}`}>{leak.amount}</p>
                <p className="text-xs text-ink-muted uppercase font-display tracking-[0.08em] font-semibold mb-3">{leak.sub}</p>
                <p className="text-sm text-ink-muted leading-relaxed">{leak.body}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-danger/10 border border-danger/30 rounded-md p-6">
          <p className="text-xs text-danger uppercase font-display tracking-[0.12em] font-semibold mb-2">Total estimated leakage</p>
          <p className="text-3xl lg:text-4xl font-display font-bold text-ink leading-tight mb-3">
            <span className="text-danger">$7,000 – $15,000</span> per year
          </p>
          <p className="text-sm text-ink-muted leading-relaxed mb-3 max-w-3xl">
            Conservative. Some independent gyms recover more than this in the first 90 days of switching from cash/spreadsheet to a real system.
          </p>
          <p className="text-xs text-ink-subtle italic leading-relaxed max-w-3xl">
            Estimates based on typical small-gym industry benchmarks. Your actual leakage depends on current process — could be lower if you&apos;re already diligent, higher if you&apos;re not.
          </p>
        </div>
      </section>

      {/* Section 3: At-risk */}
      <section className="bg-surface border border-line rounded-md p-6 lg:p-8">
        <header className="mb-6 flex items-start gap-3">
          <UserCheck className="w-7 h-7 text-brand shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl lg:text-3xl font-display uppercase text-ink tracking-[0.02em] font-bold">
              Catch Members Before They Quit
            </h2>
            <p className="text-sm text-ink-muted mt-2">Failed payments are a 10-day window. Use it.</p>
          </div>
        </header>

        <div className="bg-surface-2 border-l-4 border-danger rounded-sm p-5 mb-6">
          <p className="text-xs text-danger uppercase font-display tracking-[0.12em] font-semibold mb-2">Right now</p>
          <p className="text-2xl lg:text-3xl font-display font-bold text-ink leading-tight">
            9 at-risk members → <span className="text-danger">$270/mo at stake</span>
          </p>
        </div>

        <p className="text-base text-ink-muted leading-relaxed mb-4 max-w-3xl">
          When someone&apos;s card fails, you have ~10 days to recover them before they&apos;re gone. A spreadsheet can&apos;t text them at 9 AM the morning the payment fails. This system does it automatically — with a one-click &ldquo;update your card&rdquo; link. Industry data: automatic recovery saves 30–40% of failed payments.
        </p>
        <p className="text-base text-ink leading-relaxed max-w-3xl">
          If we save 10 cancellations/year × $30/mo × 12 months = <span className="text-brand font-display font-bold text-xl">$3,600 retained</span>.
        </p>
      </section>

      {/* Section 4: Predictable revenue */}
      <section className="bg-surface-2 border border-line rounded-md p-6 lg:p-8">
        <header className="mb-6">
          <h2 className="text-2xl lg:text-3xl font-display uppercase text-ink tracking-[0.02em] font-bold">
            Predictable Revenue Beats Lumpy Cash
          </h2>
          <p className="text-sm text-ink-muted mt-2">You can&apos;t plan a business on weeks that go from $400 to $1,200.</p>
        </header>

        <div className="space-y-3 mb-6 max-w-3xl">
          <p className="text-base text-ink-muted leading-relaxed">
            Cash is unpredictable. Some weeks $400. Some weeks $1,200. You can&apos;t plan equipment purchases or hire decisions on lumpy cash.
          </p>
          <ul className="space-y-2 text-sm text-ink">
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" /> Subscriptions = same amount, same day, every month. <span className="text-brand font-semibold ml-1">$11,400 hits your account on the 1st</span>, every month.</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" /> Banks understand subscriptions. They don&apos;t understand &ldquo;I have a gym, trust me.&rdquo;</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" /> Investors and buyers look at MRR. Cash businesses don&apos;t have MRR.</li>
          </ul>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Cash collection */}
          <div className="bg-surface border border-line rounded-md p-5">
            <p className="text-xs text-ink-muted uppercase font-display tracking-[0.12em] font-semibold mb-4">Cash Collection</p>
            <ul className="space-y-2 text-sm text-ink-muted mb-4">
              <li className="flex justify-between"><span>Week 1</span><span className="font-display">$480</span></li>
              <li className="flex justify-between"><span>Week 2</span><span className="font-display">$1,150</span></li>
              <li className="flex justify-between"><span>Week 3</span><span className="font-display">$620</span></li>
              <li className="flex justify-between"><span>Week 4</span><span className="font-display">$890</span></li>
            </ul>
            <div className="pt-3 border-t border-line">
              <p className="text-sm text-ink-muted">Total: <span className="text-ink font-display font-bold">$3,140</span> — best guess</p>
            </div>
          </div>

          {/* Subscription */}
          <div className="bg-surface border-2 border-brand rounded-md p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-brand" />
            <p className="text-xs text-brand uppercase font-display tracking-[0.12em] font-semibold mb-4">Subscription</p>
            <p className="text-3xl lg:text-4xl font-display font-bold text-brand leading-none mb-2">$11,400.00</p>
            <p className="text-sm text-ink-muted">every 1st of the month, on the dot</p>
          </div>
        </div>
      </section>

      {/* Section 5: Get found online */}
      <section className="bg-surface border border-line rounded-md p-6 lg:p-8">
        <header className="mb-6">
          <h2 className="text-2xl lg:text-3xl font-display uppercase text-ink tracking-[0.02em] font-bold">
            Get Found Online
          </h2>
          <p className="text-sm text-ink-muted mt-2">If you&apos;re not online, you&apos;re losing members to Planet Fitness in Kalamazoo.</p>
        </header>

        <p className="text-base text-ink-muted leading-relaxed mb-6 max-w-3xl">
          70% of Plainwell residents Google &ldquo;gym near me&rdquo; before they ever drive past your sign. If you&apos;re not online with hours, classes, photos, and one-click signup, they end up at a Planet Fitness in Kalamazoo.
        </p>

        <ul className="space-y-3 mb-6 max-w-3xl">
          <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" /><span className="text-ink"><span className="font-semibold">Local SEO</span> — &ldquo;gym in Plainwell MI&rdquo; lands on you</span></li>
          <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" /><span className="text-ink"><span className="font-semibold">Real Google review embeds</span> — your 4.8★/107 reviews working for you 24/7</span></li>
          <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" /><span className="text-ink"><span className="font-semibold">Online signup at 11 PM Tuesday</span> — you get a new member while you&apos;re asleep</span></li>
          <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" /><span className="text-ink"><span className="font-semibold">Class schedule visible</span> — Taekwondo parents schedule their kids without calling</span></li>
        </ul>

        <div className="bg-surface-2 border-l-4 border-brand-alt rounded-sm p-5">
          <p className="text-xs text-brand-alt uppercase font-display tracking-[0.12em] font-semibold mb-2">Estimated impact</p>
          <p className="text-base text-ink leading-relaxed">
            Conservative: 3–5 new members/month from online = <span className="text-brand font-display font-bold text-xl">$90–$150 new MRR</span> every month. Compounds fast.
          </p>
        </div>
      </section>

      {/* Section 6: Loans, taxes, insurance, liability */}
      <section className="bg-surface-2 border border-line rounded-md p-6 lg:p-8">
        <header className="mb-6">
          <h2 className="text-2xl lg:text-3xl font-display uppercase text-ink tracking-[0.02em] font-bold">
            Loans, Taxes, Insurance, Liability
          </h2>
          <p className="text-sm text-ink-muted mt-2">All the boring grown-up business stuff gets easier.</p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            { icon: Building, color: 'text-brand-alt', title: 'Bank loans', body: 'Need to expand or buy new equipment? Banks lend against documented revenue. They don’t lend against cash deposits.' },
            { icon: FileText, color: 'text-brand', title: 'Tax season', body: 'Every transaction categorized, exportable in one click. CPA bill drops by hours.' },
            { icon: Shield, color: 'text-success', title: 'Insurance audits', body: 'Insurance carriers want to see member rosters and traffic data. Now you can hand it to them.' },
            { icon: Activity, color: 'text-danger', title: 'Liability tracking', body: 'If someone claims they were hurt at the gym on March 14th — were they actually checked in that day? Now you know.' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-surface border border-line rounded-md p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Icon className={`w-6 h-6 ${item.color}`} />
                  <h3 className="text-lg font-display uppercase text-ink tracking-[0.02em] font-bold">{item.title}</h3>
                </div>
                <p className="text-sm text-ink-muted leading-relaxed">{item.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 7: Know Who's In The Building */}
      <section className="bg-surface-2 border border-line rounded-md p-6 lg:p-8">
        <header className="mb-6">
          <h2 className="text-2xl lg:text-3xl font-display uppercase text-ink tracking-[0.02em] font-bold">
            Know Who&apos;s In The Building (The QR Piece)
          </h2>
          <p className="text-sm text-ink-muted mt-2">
            A $30 barcode scanner at the front desk turns every check-in into data.
          </p>
        </header>

        <p className="text-base text-ink-muted leading-relaxed mb-6 max-w-3xl">
          Members scan a QR code on their phone (or a printed card) as they walk in. Day-pass buyers get a single-use code at purchase. Takes 1 second per person. What you get in return:
        </p>

        <div className="grid gap-4 md:grid-cols-2 mb-6">
          {[
            {
              icon: Users,
              color: 'text-brand-alt',
              title: 'Real-time occupancy',
              body: "See who's in the building right now. Helps with staff scheduling, busy-hour planning, and 'is it crowded?' answers for new members calling in.",
            },
            {
              icon: AlertTriangle,
              color: 'text-danger',
              title: 'Churn prediction',
              body: "Members who haven't checked in for 14+ days are 4× more likely to cancel. Auto-email them a 'we miss you' note before they're gone.",
            },
            {
              icon: Shield,
              color: 'text-success',
              title: 'Liability shield',
              body: 'Someone claims they slipped on March 14th? You have a timestamped scan log proving who was in and when. Insurance companies care a lot about this.',
            },
            {
              icon: ClipboardCheck,
              color: 'text-brand',
              title: 'Class attendance',
              body: 'Stop guessing how many people actually show up to Taekwondo. Verify your $30 MAD FITNEZ payment is producing $30 of class attendance.',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-surface border border-line rounded-md p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Icon className={`w-6 h-6 ${item.color}`} />
                  <h3 className="text-lg font-display uppercase text-ink tracking-[0.02em] font-bold">{item.title}</h3>
                </div>
                <p className="text-sm text-ink-muted leading-relaxed">{item.body}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-surface border-l-4 border-brand rounded-sm p-5 mb-4">
          <p className="text-base text-ink font-display font-bold mb-1">
            Hardware cost: ~$30 one-time for a USB scanner, or use any tablet camera.
          </p>
          <p className="text-sm text-ink-muted leading-relaxed">
            Setup is plug-and-play. The scanner sends the QR code to the dashboard automatically. Members install the Repz Pass on their phone once, then scan as they enter.
          </p>
        </div>

        <Link
          href="/admin-demo/check-ins"
          className="inline-flex items-center gap-2 text-sm text-brand uppercase font-display tracking-[0.08em] font-semibold hover:text-brand-alt transition-colors"
        >
          See the live check-in dashboard
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Section 8: Step back */}
      <section className="bg-surface border border-line rounded-md p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-brand-alt" />
        <header className="mb-4">
          <h2 className="text-2xl lg:text-3xl font-display uppercase text-ink tracking-[0.02em] font-bold">
            What If You Want to Step Back?
          </h2>
        </header>
        <div className="space-y-4 max-w-3xl">
          <p className="text-base text-ink-muted leading-relaxed">
            Right now, the gym runs because YOU run it. If you take 2 weeks off, who collects payments? Who knows who&apos;s paid? Who decides if Bob&apos;s complaint is real?
          </p>
          <p className="text-base text-ink leading-relaxed">
            A documented business runs without you. Hire a manager → hand them the dashboard → they have everything they need. <span className="text-brand-alt font-semibold">Take a real vacation. Eventually, sell.</span>
          </p>
        </div>
      </section>

      {/* Section 9: Bottom CTA */}
      <section className="bg-surface-2 border-2 border-brand rounded-md p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-brand" />
        <header className="mb-6">
          <p className="text-xs text-brand uppercase font-display tracking-[0.12em] font-semibold mb-2">The Bottom Line</p>
          <h2 className="text-3xl lg:text-4xl font-display uppercase text-ink tracking-[0.02em] font-bold">
            What&apos;s the Cost of NOT Doing This?
          </h2>
        </header>

        <ul className="space-y-3 mb-8 max-w-3xl">
          <li className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-danger mt-1 shrink-0" />
            <span className="text-base text-ink">Lost members from payment failures: <span className="text-danger font-display font-bold">~$3,600/year</span></span>
          </li>
          <li className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-danger mt-1 shrink-0" />
            <span className="text-base text-ink">Cash &ldquo;fall through cracks&rdquo;: industry estimate 5–10% of revenue = <span className="text-danger font-display font-bold">$7,100 – $14,200/year</span></span>
          </li>
          <li className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-danger mt-1 shrink-0" />
            <span className="text-base text-ink">Lower sale value when you&apos;re ready to retire: <span className="text-danger font-display font-bold">$25K – $140K</span></span>
          </li>
        </ul>

        <p className="text-lg lg:text-xl text-ink leading-relaxed mb-8 max-w-3xl">
          This dashboard pays for itself in the first month of catching one failed payment. <span className="text-brand font-display font-bold uppercase">Everything after that is pure upside.</span>
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:jason@example.com?subject=Repz%20Gym%20Dashboard%20-%20Let%27s%20talk"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-brand text-bg text-sm uppercase font-display font-bold tracking-[0.08em] hover:bg-brand/90 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Talk to Me About Getting This Set Up
          </a>
          <Link
            href="/admin-demo/overview"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-sm border border-line text-ink text-sm uppercase font-display font-semibold tracking-[0.08em] hover:bg-surface transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Overview
          </Link>
        </div>
      </section>

      {/* Bottom nav helper */}
      <div className="flex justify-between items-center pt-6 border-t border-line">
        <Link
          href="/admin-demo/overview"
          className="inline-flex items-center gap-2 text-sm text-ink-muted uppercase font-display tracking-[0.08em] font-semibold hover:text-brand-alt transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Overview
        </Link>
        <Link
          href="/admin-demo/members"
          className="inline-flex items-center gap-2 text-sm text-ink-muted uppercase font-display tracking-[0.08em] font-semibold hover:text-brand-alt transition-colors"
        >
          Members
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
