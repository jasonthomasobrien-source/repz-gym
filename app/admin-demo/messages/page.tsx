import { StatCard } from '@/components/demo/StatCard';
import { MessagesInbox } from '@/components/demo/MessagesInbox';
import { getMockMessages, getMessageTemplates } from '@/lib/demo/messages-data';

export const metadata = {
  title: 'Messages | Admin Dashboard Demo | Repz Gym',
};

export default function MessagesPage() {
  const messages = getMockMessages();
  const templates = getMessageTemplates();
  const unread = messages.filter((m) => m.unread && m.folder === 'inbox').length;
  const sentThisMonth = messages.filter((m) => m.folder === 'sent').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl lg:text-5xl font-display uppercase text-ink tracking-[0.02em] font-bold">
            Messages
          </h1>
          <p className="text-base text-ink-muted mt-2">Communicate with your members</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Unread" value={String(unread)} accent="brand" />
        <StatCard
          label="Sent This Month"
          value={String(sentThisMonth)}
          trend={{ value: '+8 vs last month', direction: 'up' }}
          accent="brand-alt"
        />
        <StatCard
          label="Open Rate"
          value="68%"
          trend={{ value: '+3% vs last month', direction: 'up' }}
          accent="success"
        />
        <StatCard label="Auto-Replies" value="12" accent="success" />
      </div>

      {/* Inbox */}
      <MessagesInbox messages={messages} templates={templates} />
    </div>
  );
}
