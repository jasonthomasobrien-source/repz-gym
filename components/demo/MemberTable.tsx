'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Avatar } from './Avatar';
import { StatusBadge } from './StatusBadge';

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'past_due' | 'paused' | 'canceled';
  joined: string;
  plan: string;
}

type StatusFilter = 'all' | Member['status'];
type SortKey = 'recent' | 'name' | 'mrr';

interface MemberTableProps {
  members: Member[];
}

const FILTERS: { key: StatusFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'past_due', label: 'Past Due' },
  { key: 'paused', label: 'Paused' },
  { key: 'canceled', label: 'Canceled' },
];

function parseJoined(d: string): number {
  const t = Date.parse(d);
  return Number.isFinite(t) ? t : 0;
}

export function MemberTable({ members }: MemberTableProps) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [sort, setSort] = useState<SortKey>('recent');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = members.filter((m) => {
      const matchQ = !q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q);
      const matchF = filter === 'all' || m.status === filter;
      return matchQ && matchF;
    });
    list = [...list].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'mrr') return Number(b.status === 'active') - Number(a.status === 'active');
      return parseJoined(b.joined) - parseJoined(a.joined);
    });
    return list;
  }, [members, query, filter, sort]);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email"
            className="w-full bg-surface border border-line rounded-sm pl-10 pr-3 py-2 text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-brand transition-colors"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="bg-surface border border-line rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-brand"
        >
          <option value="recent">Recently Joined</option>
          <option value="name">Name A–Z</option>
          <option value="mrr">MRR (active first)</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-sm text-xs uppercase font-display font-semibold tracking-[0.08em] border transition-colors ${
                active
                  ? 'bg-brand text-ink border-brand'
                  : 'bg-transparent text-ink-muted border-line hover:text-ink hover:border-ink-subtle'
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-ink-muted uppercase font-display tracking-[0.12em]">
        Showing {filtered.length} of {members.length} members
      </p>

      {/* Table */}
      <div className="bg-surface border border-line rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-2">
              <tr className="text-left text-xs uppercase font-display tracking-[0.08em] text-ink-muted">
                <th className="px-4 py-3">Member</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 hidden md:table-cell">Plan</th>
                <th className="px-4 py-3 hidden lg:table-cell">Joined</th>
                <th className="px-4 py-3 hidden lg:table-cell">MRR</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-surface-2/60 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={m.name} />
                      <div className="min-w-0">
                        <p className="text-ink font-medium truncate">{m.name}</p>
                        <p className="text-xs text-ink-muted truncate">{m.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={m.status} /></td>
                  <td className="px-4 py-3 hidden md:table-cell text-ink-muted">Monthly</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-ink-muted">{m.joined}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-ink">
                    {m.status === 'active' || m.status === 'past_due' ? m.plan : '—'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin-demo/members/${m.id}`}
                      className="text-brand hover:text-brand-hot font-display uppercase text-xs tracking-[0.08em] font-semibold"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-ink-muted">
                    No members match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
