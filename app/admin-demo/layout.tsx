import { DashboardNav } from '@/components/demo/DashboardNav';
import { DemoBadge } from '@/components/demo/DemoBadge';

export const metadata = {
  title: 'Admin Dashboard Demo | Repz Gym',
  description: 'Demo admin dashboard showing member management and revenue metrics.',
};

export default function AdminDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row bg-bg text-ink min-h-screen">
      <DashboardNav />
      <DemoBadge />
      <main className="flex-1 pb-24 lg:pb-0 lg:p-8">
        {children}
      </main>
    </div>
  );
}
