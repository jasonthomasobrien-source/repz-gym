import { Settings as SettingsIcon } from 'lucide-react';
import { ComingSoon } from '@/components/demo/ComingSoon';

export const metadata = {
  title: 'Settings | Admin Dashboard Demo | Repz Gym',
};

export default function SettingsPage() {
  return (
    <ComingSoon
      title="Settings"
      subtitle="Configure pricing, hours, and access"
      icon={SettingsIcon}
      description="Configure pricing, gym hours, payment methods, and staff access from one place."
      features={[
        'Edit monthly membership and day pass pricing',
        'Update gym hours and holiday closures',
        'Manage staff and admin accounts',
        'Configure Stripe payment methods',
        'Branding: logo, colors, social links',
        'Tax and receipt configuration',
      ]}
    />
  );
}
