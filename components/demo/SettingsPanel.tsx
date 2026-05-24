'use client';

import { useState } from 'react';
import {
  Building,
  DollarSign,
  Clock,
  CreditCard,
  Users,
  Bell,
  Edit,
  Plus,
  Check,
} from 'lucide-react';
import { Avatar } from './Avatar';

type Tab = 'gym' | 'pricing' | 'hours' | 'payment' | 'staff' | 'notifications';

const TABS: Array<{ key: Tab; label: string; icon: typeof Building }> = [
  { key: 'gym', label: 'Gym Info', icon: Building },
  { key: 'pricing', label: 'Pricing', icon: DollarSign },
  { key: 'hours', label: 'Hours', icon: Clock },
  { key: 'payment', label: 'Payment', icon: CreditCard },
  { key: 'staff', label: 'Staff', icon: Users },
  { key: 'notifications', label: 'Notifications', icon: Bell },
];

function Toggle({
  on,
  onToggle,
  label,
}: {
  on: boolean;
  onToggle: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      aria-label={label}
      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${
        on ? 'bg-brand' : 'bg-surface-2 border border-line'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-ink transition-transform ${
          on ? 'translate-x-5' : 'translate-x-0.5'
        } mt-0.5`}
      />
    </button>
  );
}

function FieldRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit?: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-line last:border-0">
      <div className="min-w-0">
        <p className="text-[11px] uppercase font-display tracking-[0.12em] text-ink-muted font-semibold">
          {label}
        </p>
        <p className="text-ink mt-1 truncate">{value}</p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="inline-flex items-center gap-1 text-xs uppercase font-display font-semibold tracking-[0.06em] text-ink-muted hover:text-brand"
      >
        <Edit className="w-3.5 h-3.5" />
        Edit
      </button>
    </div>
  );
}

export function SettingsPanel() {
  const [tab, setTab] = useState<Tab>('gym');

  const [keyFobOn, setKeyFobOn] = useState(true);
  const [methods, setMethods] = useState({ visa: true, mc: true, amex: true, discover: true });
  const [autoReceipts, setAutoReceipts] = useState(true);
  const [retries, setRetries] = useState(3);
  const [adminNotifs, setAdminNotifs] = useState({
    signup: true,
    failed: true,
    cancel: true,
    lowAtt: true,
    daily: false,
  });
  const [memberEmails, setMemberEmails] = useState({
    welcome: true,
    receipts: true,
    classReminders: true,
    newsletter: false,
  });

  return (
    <div className="grid lg:grid-cols-[220px_1fr] gap-6">
      {/* Sidebar */}
      <aside className="bg-surface border border-line rounded-md p-2 h-fit lg:sticky lg:top-6">
        <ul className="space-y-1">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.key;
            return (
              <li key={t.key}>
                <button
                  type="button"
                  onClick={() => setTab(t.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm uppercase font-display font-semibold tracking-[0.06em] transition-colors ${
                    active
                      ? 'bg-brand/15 text-brand border-l-2 border-brand'
                      : 'text-ink-muted hover:text-ink hover:bg-surface-2'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Content panel */}
      <div className="bg-surface border border-line rounded-md p-6 space-y-6">
        {tab === 'gym' && <GymInfoTab />}
        {tab === 'pricing' && <PricingTab />}
        {tab === 'hours' && <HoursTab keyFobOn={keyFobOn} setKeyFobOn={setKeyFobOn} />}
        {tab === 'payment' && (
          <PaymentTab
            methods={methods}
            setMethods={setMethods}
            autoReceipts={autoReceipts}
            setAutoReceipts={setAutoReceipts}
            retries={retries}
            setRetries={setRetries}
          />
        )}
        {tab === 'staff' && <StaffTab />}
        {tab === 'notifications' && (
          <NotificationsTab
            adminNotifs={adminNotifs}
            setAdminNotifs={setAdminNotifs}
            memberEmails={memberEmails}
            setMemberEmails={setMemberEmails}
          />
        )}
      </div>
    </div>
  );
}

function GymInfoTab() {
  return (
    <>
      <PanelHeader title="Gym Info" subtitle="Basic info shown on your public site" />
      <div>
        <FieldRow label="Gym Name" value="Repz Gym" />
        <FieldRow label="Address" value="585 10th St A, Plainwell, MI 49080" />
        <FieldRow label="Phone" value="(269) 685-1493" />
        <FieldRow label="Email" value="owner@repzgym.com" />
        <FieldRow label="Tax ID (EIN)" value="••-•••8421" />
        <FieldRow label="Website" value="https://repzgym.com" />
      </div>
      <div className="border border-dashed border-line rounded-sm p-6 text-center">
        <p className="text-[11px] uppercase font-display tracking-[0.12em] text-ink-muted font-semibold mb-2">
          Logo
        </p>
        <p className="text-ink-subtle text-sm">Drop a logo file here or click to upload</p>
      </div>
      <div className="flex justify-end pt-2">
        <button
          type="button"
          className="px-4 py-2 rounded-sm bg-brand text-ink text-sm uppercase font-display font-semibold tracking-[0.06em] hover:bg-brand-hot transition-colors"
        >
          Save Changes
        </button>
      </div>
    </>
  );
}

function PricingTab() {
  const plans = [
    {
      id: 'monthly',
      name: 'Monthly Membership',
      price: '$99.99',
      period: '/mo',
      tag: 'Most popular',
      accent: 'brand',
    },
    {
      id: 'daypass',
      name: 'Day Pass',
      price: '$15',
      period: '/visit',
      tag: 'One-off',
      accent: 'brand-alt',
    },
    {
      id: 'annual',
      name: 'Annual Membership',
      price: '$999',
      period: '/yr',
      tag: 'Save $200',
      accent: 'success',
    },
    {
      id: 'student',
      name: 'Student Discount',
      price: '15% off',
      period: 'any plan',
      tag: 'Valid ID required',
      accent: 'warning',
    },
  ];
  const accentMap: Record<string, string> = {
    brand: 'border-brand/40 bg-brand/5',
    'brand-alt': 'border-brand-alt/40 bg-brand-alt/5',
    success: 'border-success/40 bg-success/5',
    warning: 'border-warning/40 bg-warning/5',
  };
  const accentText: Record<string, string> = {
    brand: 'text-brand',
    'brand-alt': 'text-brand-alt',
    success: 'text-success',
    warning: 'text-warning',
  };

  return (
    <>
      <PanelHeader title="Pricing" subtitle="Plans available on your public site" />
      <div className="grid sm:grid-cols-2 gap-4">
        {plans.map((p) => (
          <div
            key={p.id}
            className={`border rounded-sm p-5 ${accentMap[p.accent]} relative`}
          >
            <p
              className={`text-[10px] uppercase font-display tracking-[0.12em] font-semibold ${accentText[p.accent]} mb-2`}
            >
              {p.tag}
            </p>
            <p className="text-ink font-display font-bold uppercase tracking-[0.04em]">
              {p.name}
            </p>
            <p className="text-3xl font-display font-bold text-ink mt-2">
              {p.price}
              <span className="text-sm text-ink-muted font-normal ml-1">{p.period}</span>
            </p>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-1 text-xs uppercase font-display font-semibold tracking-[0.06em] text-ink-muted hover:text-brand"
            >
              <Edit className="w-3.5 h-3.5" />
              Edit
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-2">
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-line text-ink text-sm uppercase font-display font-semibold tracking-[0.06em] hover:bg-surface-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Plan
        </button>
      </div>
    </>
  );
}

function HoursTab({
  keyFobOn,
  setKeyFobOn,
}: {
  keyFobOn: boolean;
  setKeyFobOn: (b: boolean) => void;
}) {
  const days = [
    { day: 'Monday', open: '5:00 AM', close: '10:00 PM' },
    { day: 'Tuesday', open: '5:00 AM', close: '10:00 PM' },
    { day: 'Wednesday', open: '5:00 AM', close: '10:00 PM' },
    { day: 'Thursday', open: '5:00 AM', close: '10:00 PM' },
    { day: 'Friday', open: '5:00 AM', close: '10:00 PM' },
    { day: 'Saturday', open: '7:00 AM', close: '8:00 PM' },
    { day: 'Sunday', open: '7:00 AM', close: '8:00 PM' },
  ];
  return (
    <>
      <PanelHeader title="Hours" subtitle="When the front desk is staffed" />
      <div className="bg-surface-2 border border-line rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase font-display tracking-[0.08em] text-ink-muted">
              <th className="px-4 py-3">Day</th>
              <th className="px-4 py-3">Open</th>
              <th className="px-4 py-3">Close</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {days.map((d) => (
              <tr key={d.day} className="hover:bg-surface transition-colors">
                <td className="px-4 py-3 text-ink font-medium">{d.day}</td>
                <td className="px-4 py-3 text-ink-muted">{d.open}</td>
                <td className="px-4 py-3 text-ink-muted">{d.close}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    className="text-xs uppercase font-display font-semibold tracking-[0.06em] text-ink-muted hover:text-brand"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between bg-surface-2 border border-line rounded-sm p-4">
        <div>
          <p className="text-ink font-display font-bold uppercase tracking-[0.04em]">
            24/7 Key Fob Access
          </p>
          <p className="text-xs text-ink-muted mt-1">
            Members can enter outside staffed hours using their fob
          </p>
        </div>
        <Toggle on={keyFobOn} onToggle={() => setKeyFobOn(!keyFobOn)} label="Toggle key fob access" />
      </div>

      <div>
        <p className="text-[11px] uppercase font-display tracking-[0.12em] text-ink-muted font-semibold mb-2">
          Holiday Hours
        </p>
        <div className="bg-surface-2 border border-line rounded-sm p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-ink">Memorial Day · May 26</span>
            <span className="text-ink-muted">Close at 4 PM</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-ink">Independence Day · Jul 4</span>
            <span className="text-ink-muted">Closed all day</span>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs uppercase font-display font-semibold tracking-[0.06em] text-brand hover:text-brand-hot mt-2"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Holiday
          </button>
        </div>
      </div>
    </>
  );
}

function PaymentTab({
  methods,
  setMethods,
  autoReceipts,
  setAutoReceipts,
  retries,
  setRetries,
}: {
  methods: { visa: boolean; mc: boolean; amex: boolean; discover: boolean };
  setMethods: (m: { visa: boolean; mc: boolean; amex: boolean; discover: boolean }) => void;
  autoReceipts: boolean;
  setAutoReceipts: (b: boolean) => void;
  retries: number;
  setRetries: (n: number) => void;
}) {
  return (
    <>
      <PanelHeader title="Payment" subtitle="Stripe connection, methods, tax" />

      <div className="flex items-center justify-between bg-surface-2 border border-line rounded-sm p-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <div>
            <p className="text-ink font-display font-bold uppercase tracking-[0.04em]">
              Stripe Connected
            </p>
            <p className="text-xs text-ink-muted mt-1">acct_1NxRq2••••8x21 · since Mar 2026</p>
          </div>
        </div>
        <button
          type="button"
          className="px-3 py-1.5 rounded-sm border border-line text-ink-muted text-xs uppercase font-display font-semibold tracking-[0.06em] hover:text-ink hover:border-ink-subtle"
        >
          Manage
        </button>
      </div>

      <div>
        <p className="text-[11px] uppercase font-display tracking-[0.12em] text-ink-muted font-semibold mb-3">
          Accepted Payment Methods
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(['visa', 'mc', 'amex', 'discover'] as const).map((m) => (
            <label
              key={m}
              className="flex items-center justify-between bg-surface-2 border border-line rounded-sm px-3 py-2 cursor-pointer"
            >
              <span className="text-ink text-sm uppercase font-display font-semibold tracking-[0.06em]">
                {m === 'mc' ? 'MC' : m}
              </span>
              <Toggle
                on={methods[m]}
                onToggle={() => setMethods({ ...methods, [m]: !methods[m] })}
                label={`Toggle ${m}`}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="bg-surface-2 border border-line rounded-sm p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-ink font-display font-bold uppercase tracking-[0.04em]">
            Auto-retry Failed Payments
          </p>
          <span className="text-brand font-display font-bold text-lg">{retries}</span>
        </div>
        <input
          type="range"
          min={0}
          max={5}
          value={retries}
          onChange={(e) => setRetries(parseInt(e.target.value, 10))}
          className="w-full accent-brand"
          aria-label="Number of retry attempts"
        />
        <div className="flex justify-between text-[10px] text-ink-subtle mt-1 uppercase font-display tracking-[0.08em]">
          <span>0</span>
          <span>5 attempts</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-surface-2 border border-line rounded-sm p-4">
          <p className="text-[11px] uppercase font-display tracking-[0.12em] text-ink-muted font-semibold">
            Sales Tax
          </p>
          <p className="text-ink font-display font-bold text-2xl mt-1">6.0%</p>
          <p className="text-xs text-ink-muted mt-1">Michigan state rate</p>
        </div>
        <div className="bg-surface-2 border border-line rounded-sm p-4 flex items-center justify-between">
          <div>
            <p className="text-ink font-display font-bold uppercase tracking-[0.04em]">
              Email Receipts
            </p>
            <p className="text-xs text-ink-muted mt-1">Send after every charge</p>
          </div>
          <Toggle on={autoReceipts} onToggle={() => setAutoReceipts(!autoReceipts)} label="Auto receipts" />
        </div>
      </div>
    </>
  );
}

function StaffTab() {
  const staff = [
    { name: 'Owner', role: 'Owner', email: 'owner@repzgym.com', last: 'Just now', status: 'active' },
    { name: 'Jamie Hall', role: 'Front Desk', email: 'jamie@repzgym.com', last: '2 hr ago', status: 'active' },
    { name: 'Pat Nguyen', role: 'Front Desk', email: 'pat@repzgym.com', last: 'Yesterday', status: 'active' },
    { name: 'Sam Ortega', role: 'Cleaner', email: 'sam@repzgym.com', last: '3 days ago', status: 'invited' },
  ];

  return (
    <>
      <PanelHeader title="Staff" subtitle="Who can sign in to this dashboard" />
      <div className="bg-surface-2 border border-line rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase font-display tracking-[0.08em] text-ink-muted">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3 hidden md:table-cell">Role</th>
              <th className="px-4 py-3 hidden lg:table-cell">Email</th>
              <th className="px-4 py-3 hidden md:table-cell">Last Login</th>
              <th className="px-4 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {staff.map((s) => (
              <tr key={s.email} className="hover:bg-surface transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={s.name} />
                    <p className="text-ink font-medium">{s.name}</p>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-ink-muted">{s.role}</td>
                <td className="px-4 py-3 hidden lg:table-cell text-ink-muted">{s.email}</td>
                <td className="px-4 py-3 hidden md:table-cell text-ink-muted">{s.last}</td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-sm border text-xs uppercase font-display font-semibold tracking-[0.08em] ${
                      s.status === 'active'
                        ? 'bg-success/15 text-success border-success/30'
                        : 'bg-warning/15 text-warning border-warning/30'
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-brand text-ink text-sm uppercase font-display font-semibold tracking-[0.06em] hover:bg-brand-hot transition-colors"
      >
        <Plus className="w-4 h-4" />
        Invite Staff
      </button>

      <div>
        <p className="text-[11px] uppercase font-display tracking-[0.12em] text-ink-muted font-semibold mb-3">
          Permissions Matrix
        </p>
        <div className="bg-surface-2 border border-line rounded-sm p-4 text-xs">
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-ink-muted">
              <Check className="w-3 h-3 text-success" /> Owner — full access
            </li>
            <li className="flex items-center gap-2 text-ink-muted">
              <Check className="w-3 h-3 text-success" /> Front Desk — members, classes, messages
            </li>
            <li className="flex items-center gap-2 text-ink-muted">
              <Check className="w-3 h-3 text-success" /> Cleaner — schedule view only
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

function NotificationsTab({
  adminNotifs,
  setAdminNotifs,
  memberEmails,
  setMemberEmails,
}: {
  adminNotifs: {
    signup: boolean;
    failed: boolean;
    cancel: boolean;
    lowAtt: boolean;
    daily: boolean;
  };
  setAdminNotifs: (n: {
    signup: boolean;
    failed: boolean;
    cancel: boolean;
    lowAtt: boolean;
    daily: boolean;
  }) => void;
  memberEmails: {
    welcome: boolean;
    receipts: boolean;
    classReminders: boolean;
    newsletter: boolean;
  };
  setMemberEmails: (m: {
    welcome: boolean;
    receipts: boolean;
    classReminders: boolean;
    newsletter: boolean;
  }) => void;
}) {
  const adminRows: Array<{ key: keyof typeof adminNotifs; label: string }> = [
    { key: 'signup', label: 'New member signs up' },
    { key: 'failed', label: 'Payment fails' },
    { key: 'cancel', label: 'Member cancels' },
    { key: 'lowAtt', label: 'Class attendance below threshold' },
    { key: 'daily', label: 'Daily revenue summary' },
  ];
  const memberRows: Array<{ key: keyof typeof memberEmails; label: string }> = [
    { key: 'welcome', label: 'Welcome email after signup' },
    { key: 'receipts', label: 'Payment receipts' },
    { key: 'classReminders', label: 'Class reminders (day-of)' },
    { key: 'newsletter', label: 'Monthly newsletter' },
  ];

  return (
    <>
      <PanelHeader title="Notifications" subtitle="Email rules for you and your members" />

      <div>
        <p className="text-[11px] uppercase font-display tracking-[0.12em] text-ink-muted font-semibold mb-3">
          Email Me When...
        </p>
        <div className="bg-surface-2 border border-line rounded-sm divide-y divide-line">
          {adminRows.map((r) => (
            <div key={r.key} className="flex items-center justify-between px-4 py-3">
              <p className="text-ink text-sm">{r.label}</p>
              <Toggle
                on={adminNotifs[r.key]}
                onToggle={() =>
                  setAdminNotifs({ ...adminNotifs, [r.key]: !adminNotifs[r.key] })
                }
                label={r.label}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] uppercase font-display tracking-[0.12em] text-ink-muted font-semibold mb-3">
          Member Email Preferences
        </p>
        <p className="text-xs text-ink-muted mb-3">
          What we automatically send to your members
        </p>
        <div className="bg-surface-2 border border-line rounded-sm divide-y divide-line">
          {memberRows.map((r) => (
            <div key={r.key} className="flex items-center justify-between px-4 py-3">
              <p className="text-ink text-sm">{r.label}</p>
              <Toggle
                on={memberEmails[r.key]}
                onToggle={() =>
                  setMemberEmails({ ...memberEmails, [r.key]: !memberEmails[r.key] })
                }
                label={r.label}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function PanelHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="border-b border-line pb-4">
      <h2 className="text-xl font-display uppercase text-ink tracking-[0.02em] font-bold">
        {title}
      </h2>
      <p className="text-sm text-ink-muted mt-1">{subtitle}</p>
    </div>
  );
}
