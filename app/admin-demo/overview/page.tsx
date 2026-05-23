export const metadata = {
  title: 'Overview | Admin Dashboard Demo | Repz Gym',
};

export default function OverviewPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h1 font-display uppercase text-ink tracking-display font-bold">Overview</h1>
        <p className="text-body text-ink-muted mt-2">Dashboard overview and key metrics</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4 mb-8">
        {/* Key Metrics Placeholder */}
        <div className="bg-surface border border-line rounded-md p-6">
          <p className="text-body-sm text-ink-muted uppercase font-display tracking-button mb-2">Active Members</p>
          <p className="text-h2 font-display font-bold">128</p>
        </div>
        <div className="bg-surface border border-line rounded-md p-6">
          <p className="text-body-sm text-ink-muted uppercase font-display tracking-button mb-2">Monthly Revenue</p>
          <p className="text-h2 font-display font-bold">$4,864</p>
        </div>
        <div className="bg-surface border border-line rounded-md p-6">
          <p className="text-body-sm text-ink-muted uppercase font-display tracking-button mb-2">Churn Rate</p>
          <p className="text-h2 font-display font-bold">4.7%</p>
        </div>
        <div className="bg-surface border border-line rounded-md p-6">
          <p className="text-body-sm text-ink-muted uppercase font-display tracking-button mb-2">New Signups</p>
          <p className="text-h2 font-display font-bold">12</p>
        </div>
      </div>

      <div className="bg-surface border border-line rounded-md p-6">
        <h2 className="text-h3 font-display uppercase text-ink tracking-display font-bold mb-4">Revenue Chart (Coming Soon)</h2>
        <p className="text-body text-ink-muted">Chart visualization will display monthly revenue trends</p>
      </div>
    </div>
  );
}
