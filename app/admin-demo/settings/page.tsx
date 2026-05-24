import { SettingsPanel } from '@/components/demo/SettingsPanel';

export const metadata = {
  title: 'Settings | Admin Dashboard Demo | Repz Gym',
};

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl lg:text-5xl font-display uppercase text-ink tracking-[0.02em] font-bold">
          Settings
        </h1>
        <p className="text-base text-ink-muted mt-2">Configure your gym</p>
      </div>

      <SettingsPanel />
    </div>
  );
}
