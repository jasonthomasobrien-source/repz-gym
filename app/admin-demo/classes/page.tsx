import { Calendar } from 'lucide-react';
import { ComingSoon } from '@/components/demo/ComingSoon';

export const metadata = {
  title: 'Classes | Admin Dashboard Demo | Repz Gym',
};

export default function ClassesPage() {
  return (
    <ComingSoon
      title="Classes"
      subtitle="Manage class schedules, instructors, and attendance"
      icon={Calendar}
      description="Schedule classes, manage instructor assignments, and track attendance for MAD FITNEZ, Taekwondo, and future programs."
      features={[
        'Weekly schedule builder',
        'Instructor assignments and pay tracking',
        'Class capacity limits and waitlists',
        'Member check-in and attendance history',
        'Drop-in pass redemption',
        'Cancellation and reschedule flow',
      ]}
    />
  );
}
