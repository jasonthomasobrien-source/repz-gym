import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTrainerBySlug, getTrainers } from '@/lib/data';
import { nameToSlug } from '@/lib/utils/slug';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { TrainerContactForm } from '@/components/public/TrainerContactForm';
import { AnimationWrapper } from '@/components/AnimationWrapper';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const trainers = await getTrainers();
  return trainers.map((t) => ({
    slug: nameToSlug(t.name),
  }));
}

export default async function TrainerPage({ params }: Props) {
  const { slug } = await params;
  const trainer = await getTrainerBySlug(slug);

  if (!trainer) {
    notFound();
  }

  return (
    <div className="bg-bg">
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6" data-bg="dark">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Text */}
          <AnimationWrapper animationType="fade-in">
            <div>
              <div className="text-xs font-display uppercase tracking-eyebrow text-brand-alt mb-4">
                OUR TEAM
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold uppercase text-ink mb-4">
                {trainer.name}
              </h1>
              <p className="text-lg text-brand-alt mb-8">{trainer.tagline}</p>
              <p className="text-base text-ink-muted leading-relaxed max-w-lg">
                {trainer.bio}
              </p>
            </div>
          </AnimationWrapper>

          {/* Photo */}
          <AnimationWrapper animationType="zoom-in">
            <div className="relative h-96 rounded-md overflow-hidden bg-surface">
              <img
                src={trainer.photo_url}
                alt={trainer.name}
                className="h-full w-full object-cover"
              />
            </div>
          </AnimationWrapper>
        </div>
      </section>

      {/* Contact Section */}
      <section data-bg="dark" className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16">
            <SectionTitle
              eyebrow="WORK WITH US"
              title={`START WITH ${trainer.name.toUpperCase().split(' ')[0]}`}
              subtitle="Fill out the form below and we'll be in touch about training sessions and programs tailored to your goals."
            />
          </div>

          <AnimationWrapper animationType="slide-up">
            <div className="bg-surface rounded-md border border-line p-8">
              <TrainerContactForm trainerName={trainer.name} />
            </div>
          </AnimationWrapper>
        </div>
      </section>

      {/* Back Link */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <Link href="/#trainers" className="inline-flex items-center gap-2 text-xs font-display uppercase text-ink-muted hover:text-brand-alt transition">
            ← BACK TO ALL TRAINERS
          </Link>
        </div>
      </section>
    </div>
  );
}
