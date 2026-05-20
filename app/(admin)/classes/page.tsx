"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { getClasses, getClassSessions, getTrainers } from "@/lib/data";

type Class = Awaited<ReturnType<typeof getClasses>>[0];
type ClassSession = Awaited<ReturnType<typeof getClassSessions>>[0];
type Trainer = Awaited<ReturnType<typeof getTrainers>>[0];

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [sessions, setSessions] = useState<ClassSession[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [tab, setTab] = useState<"classes" | "schedule" | "trainers">("classes");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [c, s, t] = await Promise.all([
        getClasses(),
        getClassSessions(),
        getTrainers(),
      ]);
      setClasses(c);
      setSessions(s);
      setTrainers(t);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="text-ink-muted">Loading classes...</div>;
  }

  const dayOrder = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 0,
  };

  const sortedSessions = sessions
    .slice()
    .sort((a, b) => {
      const dayDiff =
        (dayOrder[a.day_of_week as keyof typeof dayOrder] || 0) -
        (dayOrder[b.day_of_week as keyof typeof dayOrder] || 0);
      if (dayDiff !== 0) return dayDiff;
      return a.start_time.localeCompare(b.start_time);
    });

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-line">
        {(["classes", "schedule", "trainers"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 border-b-2 font-display uppercase text-xs tracking-eyebrow ${
              tab === t
                ? "border-brand text-brand"
                : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            {t === "classes"
              ? "Classes"
              : t === "schedule"
              ? "Schedule"
              : "Trainers"}
          </button>
        ))}
      </div>

      {/* Classes Tab */}
      {tab === "classes" && (
        <div className="space-y-4">
          {classes.map((cls) => (
            <Card key={cls.id} variant="dark">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold uppercase text-ink">{cls.name}</h4>
                  <p className="mt-1 text-xs text-ink-muted">{cls.description}</p>
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded text-xs font-semibold uppercase ${
                    cls.is_active
                      ? "bg-success/20 text-success"
                      : "bg-ink-subtle/20 text-ink-subtle"
                  }`}
                >
                  {cls.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Schedule Tab */}
      {tab === "schedule" && (
        <Card variant="dark">
          <div className="space-y-4">
            {sortedSessions.map((session) => {
              const cls = classes.find((c) => c.id === session.class_id);
              const trainer = trainers.find((t) => t.id === session.trainer_id);
              return (
                <div
                  key={session.id}
                  className="flex items-center justify-between border-b border-line pb-4 last:border-b-0 last:pb-0"
                >
                  <div>
                    <p className="font-semibold text-ink">{cls?.name}</p>
                    <p className="mt-1 text-xs text-ink-muted">
                      {session.day_of_week} {session.start_time} – {session.end_time}
                    </p>
                    {trainer && (
                      <p className="text-xs text-ink-muted">with {trainer.name}</p>
                    )}
                    {session.notes && (
                      <p className="mt-2 text-xs italic text-brand">"{session.notes}"</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Trainers Tab */}
      {tab === "trainers" && (
        <div className="grid gap-6 md:grid-cols-2">
          {trainers.map((trainer) => (
            <Card key={trainer.id} variant="dark">
              <div className="flex gap-4">
                <div className="h-16 w-16 rounded bg-gradient-to-b from-brand/10 to-surface flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-display font-bold uppercase text-ink">{trainer.name}</h4>
                  <p className="mt-1 text-xs text-brand">{trainer.tagline}</p>
                  {trainer.bio && (
                    <p className="mt-2 text-xs text-ink-muted">{trainer.bio}</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
