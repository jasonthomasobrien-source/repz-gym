import { JoinWizard } from '@/components/public/JoinWizard';

export const metadata = {
  title: 'Join Repz Gym',
  description: 'Start your membership online. Schedule an appointment and get started with Repz Gym.',
};

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-bg pt-24 pb-16 px-6">
      <div className="mx-auto max-w-2xl">
        {/* Hero */}
        <div className="mb-12 text-center">
          <p className="text-xs font-display uppercase tracking-eyebrow text-brand-alt mb-3">
            MEMBERSHIP
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-bold uppercase text-ink mb-4">
            Book Your First Visit
          </h1>
          <p className="text-lg text-ink-muted max-w-md mx-auto">
            No card, no commitment. Pick a time, walk in, and we'll show you around.
          </p>
        </div>

        {/* Form */}
        <JoinWizard />
      </div>
    </div>
  );
}
