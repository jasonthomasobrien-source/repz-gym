import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { getClasses, getClassSessions, getTrainers } from "@/lib/data";

export default async function ClassesPage() {
  const classes = await getClasses();
  const sessions = await getClassSessions();
  const trainers = await getTrainers();

  const activeClasses = classes.filter((c) => c.is_active);
  const dayOrder: Record<number, number> = {
    1: 1, // Monday
    2: 2, // Tuesday
    3: 3, // Wednesday
    4: 4, // Thursday
    5: 5, // Friday
    6: 6, // Saturday
    0: 7, // Sunday
  };

  const sortedSessions = sessions
    .slice()
    .sort((a, b) => {
      const aDay = dayOrder[a.day_of_week] ?? 0;
      const bDay = dayOrder[b.day_of_week] ?? 0;
      const dayDiff = aDay - bDay;
      if (dayDiff !== 0) return dayDiff;
      return a.start_time.localeCompare(b.start_time);
    });

  return (
    <div className="space-y-24 bg-bg">
      {/* Hero */}
      <section className="relative min-h-[50vh] bg-gradient-to-br from-bg via-surface to-bg px-6 py-32 pt-32">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 text-xs font-display uppercase tracking-eyebrow text-brand">
            GROUP TRAINING
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold uppercase leading-tight text-ink">
            PUSH HARDER TOGETHER
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-ink-muted">
            From high-intensity bootcamp to martial arts. Find your crew.
          </p>
        </div>
      </section>

      {/* Our Classes */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="OUR CLASSES" title="WHAT WE OFFER" />
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {activeClasses.map((cls) => (
              <div
                key={cls.id}
                className="group overflow-hidden rounded-lg border border-line bg-surface hover:border-brand hover:bg-surface-2 transition"
              >
                <div className="relative h-48 bg-gradient-to-b from-brand/20 to-bg" />
                <div className="p-6">
                  <div className="text-xs font-display uppercase tracking-eyebrow text-brand">
                    Class
                  </div>
                  <h3 className="mt-2 text-xl font-display font-bold uppercase text-ink">
                    {cls.name}
                  </h3>
                  <p className="mt-3 text-sm text-ink-muted">{cls.description}</p>
                  <p className="mt-4 text-xs text-brand">Learn more →</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="SCHEDULE" title="WHEN WE MEET" subtitle="All times displayed in America/Detroit timezone." />
          <div className="mt-16">
            <Card variant="dark">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-line">
                      <th className="px-4 py-3 text-left font-semibold text-ink-muted">DAY</th>
                      <th className="px-4 py-3 text-left font-semibold text-ink-muted">TIME</th>
                      <th className="px-4 py-3 text-left font-semibold text-ink-muted">CLASS</th>
                      <th className="px-4 py-3 text-left font-semibold text-ink-muted">TRAINER</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedSessions.map((session) => {
                      const cls = classes.find((c) => c.id === session.class_id);
                      const trainer = cls?.instructor_id ? trainers.find((t) => t.id === cls.instructor_id) : undefined;
                      return (
                        <tr key={session.id} className="border-b border-line hover:bg-surface-2">
                          <td className="px-4 py-3 font-semibold text-ink">
                            {session.day_of_week}
                          </td>
                          <td className="px-4 py-3 text-ink-muted">
                            {session.start_time} ({session.duration_min} min)
                          </td>
                          <td className="px-4 py-3 font-semibold text-ink">{cls?.name}</td>
                          <td className="px-4 py-3 text-ink-muted">
                            {trainer?.name || "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {sortedSessions.length > 0 &&
                sortedSessions.some((s) => s.notes) && (
                  <div className="mt-4 pt-4 border-t border-line text-xs text-ink-muted">
                    {sortedSessions
                      .filter((s) => s.notes)
                      .map((session) => (
                        <p key={session.id} className="mb-2">
                          <span className="text-brand font-semibold">
                            {session.day_of_week} {session.start_time}:
                          </span>{" "}
                          {session.notes}
                        </p>
                      ))}
                  </div>
                )}
            </Card>
          </div>
        </div>
      </section>

      {/* Meet the Trainers */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="OUR TEAM" title="MEET THE TRAINERS" />
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {trainers.map((trainer) => (
              <div key={trainer.id} className="text-center">
                <div className="mx-auto mb-4 h-40 w-32 rounded-md bg-gradient-to-b from-brand/10 to-surface" />
                <h3 className="font-display font-bold uppercase text-ink">{trainer.name}</h3>
                <p className="mt-1 text-xs text-brand">{trainer.tagline}</p>
                {trainer.bio && (
                  <p className="mt-3 text-xs text-ink-muted">{trainer.bio}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-ink mb-6">
            TRY YOUR FIRST CLASS FREE
          </h2>
          <p className="text-lg text-ink-muted mb-8">
            No sign-up, no credit card. Just show up and lift with us.
          </p>
        </div>
      </section>
    </div>
  );
}
