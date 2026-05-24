import { Mail } from 'lucide-react';
import { ComingSoon } from '@/components/demo/ComingSoon';

export const metadata = {
  title: 'Messages | Admin Dashboard Demo | Repz Gym',
};

export default function MessagesPage() {
  return (
    <ComingSoon
      title="Messages"
      subtitle="Email members directly from the dashboard"
      icon={Mail}
      description="Send broadcast emails, individual member messages, and automated payment reminders without leaving the dashboard."
      features={[
        'Broadcast announcements to all active members',
        'One-to-one member messaging with full history',
        'Automated failed-payment reminder sequences',
        'Welcome flow for new signups',
        'Class cancellation alerts',
        'Plain-text templates the owner can edit',
      ]}
    />
  );
}
