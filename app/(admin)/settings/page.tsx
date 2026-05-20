"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      {/* Gym Info */}
      <div>
        <h3 className="mb-6 font-display font-bold uppercase text-ink">Gym Information</h3>
        <Card variant="dark">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                Gym Name
              </label>
              <p className="text-sm text-ink">Repz Gym</p>
            </div>
            <div>
              <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                Address
              </label>
              <p className="text-sm text-ink">585 10th St A, Plainwell, MI 49080</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                  Phone
                </label>
                <p className="text-sm text-ink">(269) 685-1493</p>
              </div>
              <div>
                <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                  Hours
                </label>
                <p className="text-sm text-ink">Open daily, closes 8:30 PM</p>
              </div>
            </div>
            <div>
              <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                After Hours
              </label>
              <p className="text-sm text-ink">Members 24/7 with key fob</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Pricing */}
      <div>
        <h3 className="mb-6 font-display font-bold uppercase text-ink">Pricing</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Card variant="dark">
            <div>
              <p className="text-xs font-display uppercase tracking-eyebrow text-brand">Monthly Membership</p>
              <p className="mt-3 text-2xl font-bold text-ink">$30<span className="text-sm text-ink-muted">/mo</span></p>
              <ul className="mt-4 space-y-2 text-xs text-ink-muted">
                <li>✓ Full gym floor</li>
                <li>✓ All group classes</li>
                <li>✓ 24/7 key-fob access</li>
                <li>✓ No contract</li>
              </ul>
            </div>
          </Card>
          <Card variant="dark">
            <div>
              <p className="text-xs font-display uppercase tracking-eyebrow text-brand">Day Pass</p>
              <p className="mt-3 text-2xl font-bold text-ink">$10<span className="text-sm text-ink-muted">/day</span></p>
              <ul className="mt-4 space-y-2 text-xs text-ink-muted">
                <li>✓ Full gym floor</li>
                <li>✓ Drop in on classes</li>
                <li>✓ No commitment</li>
                <li>✓ Apply to membership</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>

      {/* Admin Emails */}
      <div>
        <h3 className="mb-6 font-display font-bold uppercase text-ink">Admin Emails</h3>
        <Card variant="dark">
          <div className="space-y-3">
            <p className="text-sm text-ink-muted">Receives business alerts and reports:</p>
            <div className="rounded bg-surface p-3">
              <p className="text-sm text-ink font-mono">jerry@repz-gym.com</p>
            </div>
            <p className="text-xs text-ink-subtle">
              This email receives failed payment alerts, new member notifications, and weekly business reports.
            </p>
          </div>
        </Card>
      </div>

      {/* Notifications */}
      <div>
        <h3 className="mb-6 font-display font-bold uppercase text-ink">Notifications</h3>
        <Card variant="dark">
          <div className="space-y-4">
            {[
              { label: "Failed payments", desc: "Alert when a payment fails" },
              { label: "New members", desc: "Notify when someone signs up" },
              { label: "Weekly report", desc: "Send revenue summary every Monday" },
              { label: "Low inventory", desc: "Alert when day pass inventory is low" },
            ].map((item) => (
              <label
                key={item.label}
                className="flex items-start gap-3 cursor-pointer hover:bg-surface-2 -mx-4 px-4 py-2 rounded"
              >
                <input type="checkbox" defaultChecked className="mt-1" />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-ink">{item.label}</p>
                  <p className="text-xs text-ink-muted">{item.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </Card>
      </div>

      {/* Danger Zone */}
      <div>
        <h3 className="mb-6 font-display font-bold uppercase text-danger">Danger Zone</h3>
        <Card variant="dark">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm text-ink mb-2">Export Data</h4>
              <p className="text-xs text-ink-muted mb-4">
                Download all member, payment, and contact data as JSON.
              </p>
              <Button variant="secondary" size="sm">
                Export as JSON
              </Button>
            </div>
            <div className="border-t border-line pt-4">
              <h4 className="font-semibold text-sm text-danger mb-2">Reset Demo</h4>
              <p className="text-xs text-ink-muted mb-4">
                Clear all demo data and start fresh. This cannot be undone.
              </p>
              <Button variant="danger" size="sm">
                Reset Demo Data
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
