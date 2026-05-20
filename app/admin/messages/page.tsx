"use client";

import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getContactMessages } from "@/lib/data";

type Message = Awaited<ReturnType<typeof getContactMessages>>[0];

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [statusFilter, setStatusFilter] = useState<"all" | "unread" | "read">("unread");
  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const m = await getContactMessages();
      setMessages(m);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    let result = messages;
    if (statusFilter === "unread") {
      result = result.filter((m) => !m.read_at);
    } else if (statusFilter === "read") {
      result = result.filter((m) => m.read_at);
    }
    return result.sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [messages, statusFilter]);

  if (loading) {
    return <div className="text-ink-muted">Loading messages...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-2">
        {(["all", "unread", "read"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-2 rounded text-xs font-semibold uppercase ${
              statusFilter === status
                ? "bg-brand text-surface"
                : "border border-line bg-surface text-ink hover:bg-surface-2"
            }`}
          >
            {status === "all" ? "All" : status === "unread" ? "Unread" : "Read"}
          </button>
        ))}
      </div>

      {/* Messages list */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <Card variant="dark">
            <p className="text-sm text-ink-subtle">
              {statusFilter === "unread"
                ? "No unread messages."
                : statusFilter === "read"
                ? "No read messages."
                : "No messages."}
            </p>
          </Card>
        ) : (
          filtered.map((message) => {
            const isExpanded = expandedMessageId === message.id;
            return (
              <div key={message.id}>
                <Card
                  variant="dark"
                  className="cursor-pointer"
                  onClick={() =>
                    setExpandedMessageId(isExpanded ? null : message.id)
                  }
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-ink">
                          {message.first_name} {message.last_name}
                        </h4>
                        {!message.read_at && (
                          <span className="h-2 w-2 rounded-full bg-brand flex-shrink-0" />
                        )}
                      </div>
                      <p className="mt-1 text-sm text-ink-muted">{message.message}</p>
                      <p className="mt-2 text-xs text-ink-subtle">
                        {new Date(message.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 text-right">
                      <p className="text-xs text-ink-muted">{message.email}</p>
                      {message.phone_number && (
                        <p className="text-xs text-ink-muted">{message.phone_number}</p>
                      )}
                    </div>
                  </div>
                </Card>

                {isExpanded && (
                  <Card variant="dark" className="mt-2 bg-surface-2">
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-xs font-display uppercase tracking-eyebrow text-brand mb-1">
                            Name
                          </p>
                          <p className="text-sm text-ink">
                            {message.first_name} {message.last_name}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-display uppercase tracking-eyebrow text-brand mb-1">
                            Email
                          </p>
                          <p className="text-sm text-ink">{message.email}</p>
                        </div>
                        {message.phone_number && (
                          <div>
                            <p className="text-xs font-display uppercase tracking-eyebrow text-brand mb-1">
                              Phone
                            </p>
                            <p className="text-sm text-ink">{message.phone_number}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-display uppercase tracking-eyebrow text-brand mb-1">
                            Date
                          </p>
                          <p className="text-sm text-ink">
                            {new Date(message.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                          Message
                        </p>
                        <p className="text-sm text-ink whitespace-pre-wrap">
                          {message.message}
                        </p>
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-line">
                        <Button variant="secondary" size="sm">
                          Reply via Email
                        </Button>
                        {!message.read_at && (
                          <Button variant="ghost" size="sm">
                            Mark as Read
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
