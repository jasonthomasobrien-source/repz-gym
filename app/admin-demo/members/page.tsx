import { Users } from 'lucide-react';
import { MemberTable } from '@/components/demo/MemberTable';
import { getMockMembers } from '@/lib/demo/mock-data';

export const metadata = {
  title: 'Members | Admin Dashboard Demo | Repz Gym',
};

export default function MembersPage() {
  const members = getMockMembers();
  const activeCount = members.filter((m) => m.status === 'active').length;
  const pastDueCount = members.filter((m) => m.status === 'past_due').length;

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs text-brand uppercase font-display tracking-[0.12em] font-semibold mb-2">Roster</p>
          <h1 className="text-4xl lg:text-5xl font-display uppercase text-ink tracking-[0.02em] font-bold">
            Members
          </h1>
          <p className="text-base text-ink-muted mt-2">
            <span className="text-success font-semibold">{activeCount} active</span>
            <span className="mx-2 text-ink-subtle">·</span>
            <span className="text-danger">{pastDueCount} past due</span>
            <span className="mx-2 text-ink-subtle">·</span>
            <span>{members.length} total</span>
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/15 text-brand text-xs uppercase font-display tracking-[0.12em] font-semibold">
          <Users className="w-3.5 h-3.5" />
          Searchable roster
        </div>
      </div>

      <MemberTable members={members} />
    </div>
  );
}
