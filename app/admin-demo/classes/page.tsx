import { Calendar, Users, Clock, Plus, MoreHorizontal, Star } from 'lucide-react';
import { StatCard } from '@/components/demo/StatCard';
import { Avatar } from '@/components/demo/Avatar';
import { ScheduleGrid } from '@/components/demo/ScheduleGrid';
import {
  getMockClasses,
  getMockInstructors,
  getWeekSchedule,
} from '@/lib/demo/classes-data';

export const metadata = {
  title: 'Classes | Admin Dashboard Demo | Repz Gym',
};

export default function ClassesPage() {
  const classes = getMockClasses();
  const instructors = getMockInstructors();
  const schedule = getWeekSchedule();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl lg:text-5xl font-display uppercase text-ink tracking-[0.02em] font-bold">
            Classes
          </h1>
          <p className="text-base text-ink-muted mt-2">
            Manage your class schedule and instructors
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-brand text-ink text-sm uppercase font-display font-semibold tracking-[0.06em] hover:bg-brand-hot transition-colors">
          <Plus className="w-4 h-4" />
          Add Class
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Classes" value="7" accent="brand" />
        <StatCard label="Active Instructors" value="5" accent="brand-alt" />
        <StatCard
          label="Bookings This Week"
          value="87"
          trend={{ value: '+12 vs last week', direction: 'up' }}
          accent="success"
        />
        <StatCard
          label="Avg Attendance"
          value="78%"
          trend={{ value: '+4% vs last month', direction: 'up' }}
          accent="success"
        />
      </div>

      {/* Schedule */}
      <section className="bg-surface border border-line rounded-md p-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div>
            <h2 className="text-xl font-display uppercase text-ink tracking-[0.02em] font-bold">
              This Week&apos;s Schedule
            </h2>
            <p className="text-sm text-ink-muted mt-1">May 19 – May 25, 2026</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-ink-muted uppercase font-display tracking-[0.12em]">
            <Calendar className="w-4 h-4 text-brand" />
            <span>Weekly view</span>
          </div>
        </div>
        <ScheduleGrid
          days={schedule.days}
          timeSlots={schedule.timeSlots}
          blocks={schedule.blocks}
        />
      </section>

      {/* All Classes + Instructors */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Classes table */}
        <section className="lg:col-span-2 bg-surface border border-line rounded-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display uppercase text-ink tracking-[0.02em] font-bold">
              All Classes
            </h2>
            <span className="text-xs text-ink-muted uppercase font-display tracking-[0.12em]">
              {classes.length} total
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-2">
                <tr className="text-left text-xs uppercase font-display tracking-[0.08em] text-ink-muted">
                  <th className="px-3 py-3">Name</th>
                  <th className="px-3 py-3 hidden md:table-cell">Instructor</th>
                  <th className="px-3 py-3 hidden lg:table-cell">Schedule</th>
                  <th className="px-3 py-3 text-right">Cap</th>
                  <th className="px-3 py-3 text-right">Attend</th>
                  <th className="px-3 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {classes.map((c) => (
                  <tr key={c.id} className="hover:bg-surface-2/60 transition-colors">
                    <td className="px-3 py-3">
                      <p className="text-ink font-medium">{c.name}</p>
                      <p className="text-xs text-ink-muted md:hidden">{c.instructor}</p>
                    </td>
                    <td className="px-3 py-3 hidden md:table-cell text-ink-muted">
                      {c.instructor}
                    </td>
                    <td className="px-3 py-3 hidden lg:table-cell text-xs text-ink-muted">
                      {c.schedule}
                    </td>
                    <td className="px-3 py-3 text-right text-ink-muted">
                      {c.maxCapacity === 999 ? '∞' : c.maxCapacity}
                    </td>
                    <td className="px-3 py-3 text-right">
                      <span
                        className={
                          c.avgAttendance >= 80
                            ? 'text-success font-display font-bold'
                            : c.avgAttendance >= 70
                              ? 'text-brand-alt font-display font-bold'
                              : 'text-warning font-display font-bold'
                        }
                      >
                        {c.avgAttendance}%
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-sm border text-xs uppercase font-display font-semibold tracking-[0.08em] ${
                          c.status === 'active'
                            ? 'bg-success/15 text-success border-success/30'
                            : 'bg-warning/15 text-warning border-warning/30'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Instructors */}
        <section className="bg-surface border border-line rounded-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display uppercase text-ink tracking-[0.02em] font-bold">
              Instructors
            </h2>
            <button
              type="button"
              className="text-ink-muted hover:text-ink p-1"
              aria-label="More options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <ul className="space-y-4">
            {instructors.map((i) => (
              <li
                key={i.id}
                className="flex items-start gap-3 pb-4 border-b border-line last:border-0 last:pb-0"
              >
                <Avatar name={i.name} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-ink font-medium truncate">{i.name}</p>
                  <p className="text-xs text-ink-muted truncate">{i.specialty}</p>
                  <div className="flex items-center gap-3 mt-2 text-[11px] uppercase font-display tracking-[0.08em] text-ink-muted">
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {i.classes.length} {i.classes.length === 1 ? 'class' : 'classes'}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {i.hoursPerWeek}h/wk
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="inline-flex items-center gap-1 text-brand">
                    <Star className="w-3 h-3 fill-brand" />
                    <span className="text-sm font-display font-bold">{i.rating}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
