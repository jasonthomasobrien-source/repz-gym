'use client';

import { useMemo, useState } from 'react';
import {
  Mail,
  Send,
  Inbox,
  FileText,
  Search,
  Plus,
  Reply,
  X,
} from 'lucide-react';
import { Avatar } from './Avatar';
import type { Message, MessageTemplate } from '@/lib/demo/messages-data';

type Folder = 'inbox' | 'sent' | 'drafts' | 'templates';

interface MessagesInboxProps {
  messages: Message[];
  templates: MessageTemplate[];
}

const FOLDER_TABS: Array<{ key: Folder; label: string; icon: typeof Inbox }> = [
  { key: 'inbox', label: 'Inbox', icon: Inbox },
  { key: 'sent', label: 'Sent', icon: Send },
  { key: 'drafts', label: 'Drafts', icon: FileText },
  { key: 'templates', label: 'Templates', icon: Mail },
];

export function MessagesInbox({ messages, templates }: MessagesInboxProps) {
  const [folder, setFolder] = useState<Folder>('inbox');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string>(messages[0]?.id ?? '');
  const [composing, setComposing] = useState(false);
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return messages.filter((m) => {
      if (folder === 'templates') return false;
      if (m.folder !== folder) return false;
      if (!q) return true;
      return (
        m.from.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.snippet.toLowerCase().includes(q)
      );
    });
  }, [messages, folder, query]);

  const selected = useMemo(
    () => messages.find((m) => m.id === selectedId) ?? null,
    [messages, selectedId]
  );

  function startCompose() {
    setComposing(true);
    setComposeTo('');
    setComposeSubject('');
    setComposeBody('');
  }

  function useTemplate(t: MessageTemplate) {
    setComposing(true);
    setComposeTo('');
    setComposeSubject(t.title);
    setComposeBody(t.body);
    setFolder('inbox');
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search messages"
            className="w-full bg-surface border border-line rounded-sm pl-10 pr-3 py-2 text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-brand transition-colors"
          />
        </div>
        <button
          type="button"
          onClick={startCompose}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-brand text-ink text-sm uppercase font-display font-semibold tracking-[0.06em] hover:bg-brand-hot transition-colors"
        >
          <Plus className="w-4 h-4" />
          Compose
        </button>
      </div>

      {/* Folder tabs */}
      <div className="flex flex-wrap gap-2 border-b border-line">
        {FOLDER_TABS.map((tab) => {
          const Icon = tab.icon;
          const active = folder === tab.key;
          const count =
            tab.key === 'templates'
              ? templates.length
              : messages.filter((m) => m.folder === tab.key).length;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFolder(tab.key)}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs uppercase font-display font-semibold tracking-[0.08em] border-b-2 -mb-px transition-colors ${
                active
                  ? 'border-brand text-ink'
                  : 'border-transparent text-ink-muted hover:text-ink'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
              <span className="ml-1 text-ink-subtle">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Main two-col layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: list / templates */}
        <div className="lg:col-span-1 bg-surface border border-line rounded-md overflow-hidden">
          {folder === 'templates' ? (
            <ul className="divide-y divide-line">
              {templates.map((t) => (
                <li key={t.id} className="p-4 hover:bg-surface-2/60 transition-colors">
                  <p className="text-ink font-medium">{t.title}</p>
                  <p className="text-xs text-ink-muted mt-1">{t.description}</p>
                  <button
                    type="button"
                    onClick={() => useTemplate(t)}
                    className="mt-3 text-xs uppercase font-display font-semibold tracking-[0.08em] text-brand hover:text-brand-hot"
                  >
                    Use Template →
                  </button>
                </li>
              ))}
            </ul>
          ) : visible.length === 0 ? (
            <p className="text-sm text-ink-muted py-12 text-center px-4">
              No messages in {folder}.
            </p>
          ) : (
            <ul className="divide-y divide-line max-h-[600px] overflow-y-auto">
              {visible.map((m) => {
                const active = selectedId === m.id && !composing;
                return (
                  <li key={m.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedId(m.id);
                        setComposing(false);
                      }}
                      className={`w-full text-left p-4 flex items-start gap-3 transition-colors ${
                        active ? 'bg-surface-2' : 'hover:bg-surface-2/60'
                      }`}
                    >
                      <Avatar name={m.from} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-ink font-medium truncate text-sm">{m.from}</p>
                          <span className="text-[10px] text-ink-subtle shrink-0">{m.time}</span>
                        </div>
                        <p
                          className={`text-sm truncate mt-0.5 ${
                            m.unread ? 'text-ink font-semibold' : 'text-ink-muted'
                          }`}
                        >
                          {m.subject}
                        </p>
                        <p className="text-xs text-ink-subtle truncate mt-1">{m.snippet}</p>
                      </div>
                      {m.unread && (
                        <span
                          className="w-2 h-2 rounded-full bg-brand mt-1 shrink-0"
                          aria-label="Unread"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Right: detail or compose */}
        <div className="lg:col-span-2 bg-surface border border-line rounded-md p-6 min-h-[400px]">
          {composing ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-display uppercase font-bold text-ink tracking-[0.02em]">
                  Compose Message
                </h3>
                <button
                  type="button"
                  onClick={() => setComposing(false)}
                  className="text-ink-muted hover:text-ink p-1"
                  aria-label="Close compose"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div>
                <label className="block text-[11px] uppercase font-display tracking-[0.12em] text-ink-muted font-semibold mb-1">
                  To
                </label>
                <select
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  className="w-full bg-surface-2 border border-line rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-brand"
                >
                  <option value="">Select recipient</option>
                  <option value="all">All Active Members (48)</option>
                  <option value="past_due">Past Due Members (2)</option>
                  <option value="sarah.johnson@gmail.com">Sarah Johnson</option>
                  <option value="mike.chen@yahoo.com">Mike Chen</option>
                  <option value="chris.martinez@outlook.com">Chris Martinez</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] uppercase font-display tracking-[0.12em] text-ink-muted font-semibold mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  className="w-full bg-surface-2 border border-line rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-brand"
                  placeholder="What's it about?"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase font-display tracking-[0.12em] text-ink-muted font-semibold mb-1">
                  Message
                </label>
                <textarea
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  rows={10}
                  className="w-full bg-surface-2 border border-line rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-brand resize-none font-mono"
                  placeholder="Write your message..."
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setComposing(false)}
                  className="px-4 py-2 rounded-sm border border-line text-ink-muted text-sm uppercase font-display font-semibold tracking-[0.06em] hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-brand text-ink text-sm uppercase font-display font-semibold tracking-[0.06em] hover:bg-brand-hot transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </div>
          ) : selected && folder !== 'templates' ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Avatar name={selected.from} size="lg" />
                  <div>
                    <p className="text-ink font-display font-bold text-lg">{selected.from}</p>
                    <p className="text-xs text-ink-muted">{selected.fromEmail}</p>
                    <p className="text-[11px] text-ink-subtle uppercase font-display tracking-[0.12em] mt-1">
                      {selected.time}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-line text-ink-muted text-xs uppercase font-display font-semibold tracking-[0.06em] hover:text-ink hover:border-ink-subtle"
                >
                  <Reply className="w-3.5 h-3.5" />
                  Reply
                </button>
              </div>
              <div className="pt-4 border-t border-line">
                <h4 className="text-xl font-display font-bold uppercase text-ink tracking-[0.02em] mb-3">
                  {selected.subject}
                </h4>
                <p className="text-sm text-ink whitespace-pre-wrap leading-relaxed">
                  {selected.body}
                </p>
              </div>
              <div className="pt-4 border-t border-line">
                <textarea
                  placeholder="Reply..."
                  rows={4}
                  className="w-full bg-surface-2 border border-line rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-brand resize-none"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-brand text-ink text-sm uppercase font-display font-semibold tracking-[0.06em] hover:bg-brand-hot transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <Mail className="w-12 h-12 text-ink-subtle mb-3" />
              <p className="text-ink-muted text-sm">
                {folder === 'templates'
                  ? 'Select a template to use'
                  : 'Select a message to read'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
