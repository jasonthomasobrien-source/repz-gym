export const metadata = {
  title: 'Messages | Admin Dashboard Demo | Repz Gym',
};

export default function MessagesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h1 font-display uppercase text-ink tracking-display font-bold">Messages</h1>
        <p className="text-body text-ink-muted mt-2">Communicate with members</p>
      </div>

      <div className="bg-surface border border-line rounded-md p-6">
        <h2 className="text-h3 font-display uppercase text-ink tracking-display font-bold mb-4">Member Messages (Coming Soon)</h2>
        <p className="text-body text-ink-muted">Send announcements and member notifications</p>
      </div>
    </div>
  );
}
