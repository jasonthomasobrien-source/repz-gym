export const metadata = {
  title: 'Members | Admin Dashboard Demo | Repz Gym',
};

export default function MembersPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h1 font-display uppercase text-ink tracking-display font-bold">Members</h1>
        <p className="text-body text-ink-muted mt-2">Manage and view member information</p>
      </div>

      <div className="bg-surface border border-line rounded-md p-6">
        <h2 className="text-h3 font-display uppercase text-ink tracking-display font-bold mb-4">Member Directory (Coming Soon)</h2>
        <p className="text-body text-ink-muted">Searchable member list with payment history and status</p>
      </div>
    </div>
  );
}
