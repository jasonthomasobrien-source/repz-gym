"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function SignupPage() {
  const [step, setStep] = useState<"plan" | "details" | "payment" | "success">("plan");
  const [plan, setPlan] = useState<"monthly" | "daypass" | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-12 bg-bg min-h-screen pt-32 pb-24 px-6">
      <div className="mx-auto max-w-2xl">
        <SectionTitle
          eyebrow="JOIN NOW"
          title="START YOUR MEMBERSHIP"
          subtitle="No contract. Cancel anytime."
          align="center"
        />

        {/* Step 1: Choose Plan */}
        {step === "plan" && (
          <div className="mt-16 space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <button
                onClick={() => {
                  setPlan("monthly");
                  setStep("details");
                }}
                className={`p-6 rounded border-2 transition text-left ${
                  plan === "monthly"
                    ? "border-brand bg-surface-2"
                    : "border-line hover:border-brand"
                }`}
              >
                <h3 className="font-display font-bold uppercase text-ink">$30 Monthly</h3>
                <p className="mt-2 text-sm text-ink-muted">Most popular</p>
                <ul className="mt-4 space-y-2 text-xs text-ink-muted">
                  <li>✓ Full gym floor</li>
                  <li>✓ All classes</li>
                  <li>✓ 24/7 key-fob</li>
                  <li>✓ Cancel anytime</li>
                </ul>
              </button>

              <button
                onClick={() => {
                  setPlan("daypass");
                  setStep("details");
                }}
                className={`p-6 rounded border-2 transition text-left ${
                  plan === "daypass"
                    ? "border-brand bg-surface-2"
                    : "border-line hover:border-brand"
                }`}
              >
                <h3 className="font-display font-bold uppercase text-ink">$10 Day Pass</h3>
                <p className="mt-2 text-sm text-ink-muted">One-time</p>
                <ul className="mt-4 space-y-2 text-xs text-ink-muted">
                  <li>✓ Full gym floor</li>
                  <li>✓ Drop in classes</li>
                  <li>✓ Valid 24 hours</li>
                  <li>✓ No commitment</li>
                </ul>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Enter Details */}
        {step === "details" && plan && (
          <div className="mt-16">
            <Card variant="dark">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep("payment");
                }}
                className="space-y-4"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 rounded border border-line bg-surface text-ink focus:outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 rounded border border-line bg-surface text-ink focus:outline-none focus:border-brand"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded border border-line bg-surface text-ink focus:outline-none focus:border-brand"
                  />
                </div>

                <div>
                  <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded border border-line bg-surface text-ink focus:outline-none focus:border-brand"
                  />
                </div>

                <div>
                  <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded border border-line bg-surface text-ink focus:outline-none focus:border-brand"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="lg"
                    onClick={() => setStep("plan")}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button type="submit" variant="primary" size="lg" className="flex-1">
                    Next
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === "payment" && plan && (
          <div className="mt-16">
            <Card variant="dark">
              <div className="space-y-6">
                <div className="border-b border-line pb-4">
                  <p className="text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                    Order Summary
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-ink">
                      {plan === "monthly" ? "Monthly Membership" : "Day Pass"}
                    </span>
                    <span className="text-2xl font-bold text-brand">
                      ${plan === "monthly" ? "30.00" : "10.00"}
                    </span>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep("success");
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      className="w-full px-3 py-2 rounded border border-line bg-surface text-ink focus:outline-none focus:border-brand font-mono"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                        Expiry
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 rounded border border-line bg-surface text-ink focus:outline-none focus:border-brand"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-3 py-2 rounded border border-line bg-surface text-ink focus:outline-none focus:border-brand"
                      />
                    </div>
                  </div>

                  <p className="text-xs text-ink-muted">
                    This is a demo. No real charge will be made.
                  </p>

                  <div className="flex gap-2 pt-4">
                    <Button
                      type="button"
                      variant="ghost"
                      size="lg"
                      onClick={() => setStep("details")}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button type="submit" variant="primary" size="lg" className="flex-1">
                      Complete Signup
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        )}

        {/* Step 4: Success */}
        {step === "success" && (
          <div className="mt-16">
            <Card variant="dark">
              <div className="text-center space-y-6">
                <div className="text-6xl">🎉</div>
                <h2 className="text-3xl font-display font-bold uppercase text-ink">
                  Welcome to Repz
                </h2>
                <p className="text-ink-muted">
                  {formData.firstName}, your {plan === "monthly" ? "membership" : "day pass"} is
                  active!
                </p>

                <div className="bg-surface rounded p-4 space-y-3">
                  <p className="text-xs font-display uppercase tracking-eyebrow text-brand">
                    What's Next
                  </p>
                  <ul className="text-sm text-ink-muted space-y-2 text-left">
                    <li>✓ Visit the gym anytime</li>
                    <li>✓ Check out classes on the schedule</li>
                    {plan === "monthly" && <li>✓ Pickup your key fob (ask at desk)</li>}
                    <li>✓ Download the app for check-ins</li>
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="lg" className="flex-1" onClick={() => {
                    setStep("plan");
                    setPlan(null);
                    setFormData({ firstName: "", lastName: "", email: "", phone: "", password: "" });
                  }}>
                    Go Home
                  </Button>
                  <Button variant="primary" size="lg" className="flex-1" href="/admin">
                    View Dashboard
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
