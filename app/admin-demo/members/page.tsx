import { MemberTable } from '@/components/demo/MemberTable';
import { getMockMembers } from '@/lib/demo/mock-data';

export const metadata = {
  title: 'Members | Admin Dashboard Demo | Repz Gym',
};

export default function MembersPage() {
  const members = getMockMembers();
  const activeCount = members.filter((m) => m.status === 'active').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl lg:text-5xl font-display uppercase text-ink tracking-[0.02em] font-bold">
          Members
        </h1>
        <p className="text-base text-ink-muted mt-2">
          {activeCount} active · {members.length} total
        </p>
      </div>

      <MemberTable members={members} />
    </div>
  );
}
