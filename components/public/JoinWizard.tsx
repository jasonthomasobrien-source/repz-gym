'use client';

import { useState } from 'react';
import { APPOINTMENT_SLOTS, DAYS_OF_WEEK } from '@/lib/schedule';
import { Button } from '@/components/ui/Button';

type Step = 'info' | 'plan' | 'schedule' | 'success';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  plan: 'monthly' | 'daypass' | '';
  day: string;
  time: string;
}

export function JoinWizard() {
  const [step, setStep] = useState<Step>('info');
  const [loading, setLoading] = useState(false);
  const [bookingRef, setBookingRef] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    plan: '',
    day: '',
    time: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectPlan = (plan: 'monthly' | 'daypass') => {
    setFormData((prev) => ({ ...prev, plan }));
  };

  const handleSelectDay = (day: string) => {
    setFormData((prev) => ({ ...prev, day, time: '' }));
  };

  const handleSelectTime = (time: string) => {
    setFormData((prev) => ({ ...prev, time }));
  };

  const canProceedInfo = formData.firstName && formData.lastName && formData.email && formData.phone;
  const canProceedPlan = formData.plan;
  const canProceedSchedule = formData.day && formData.time;

  const handleNext = () => {
    setError('');
    if (step === 'info') {
      setStep('plan');
    } else if (step === 'plan') {
      setStep('schedule');
    } else if (step === 'schedule') {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setError('');
    if (step === 'plan') {
      setStep('info');
    } else if (step === 'schedule') {
      setStep('plan');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          plan: formData.plan,
          day: formData.day,
          time: formData.time,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to schedule appointment');
      }

      const data = await response.json();
      setBookingRef(data.bookingRef);
      setStep('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const progress = step === 'info' ? 25 : step === 'plan' ? 50 : step === 'schedule' ? 75 : 100;

  return (
    <div className="w-full">
      {/* Progress Bar */}
      {step !== 'success' && (
        <div className="mb-8">
          <div className="h-1 bg-line rounded-full overflow-hidden">
            <div
              className="h-full bg-brand transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs font-display uppercase tracking-eyebrow text-ink-muted">
            <span>1. About You</span>
            <span>2. Plan</span>
            <span>3. Schedule</span>
            <span>4. Confirm</span>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Step 1: About You */}
      {step === 'info' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-bold uppercase text-ink">About You</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="w-full px-4 py-3 rounded border border-line bg-surface text-ink placeholder-ink-muted focus:outline-none focus:border-brand"
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
                onChange={handleChange}
                placeholder="Doe"
                className="w-full px-4 py-3 rounded border border-line bg-surface text-ink placeholder-ink-muted focus:outline-none focus:border-brand"
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
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded border border-line bg-surface text-ink placeholder-ink-muted focus:outline-none focus:border-brand"
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
              onChange={handleChange}
              placeholder="(269) 555-1234"
              className="w-full px-4 py-3 rounded border border-line bg-surface text-ink placeholder-ink-muted focus:outline-none focus:border-brand"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              size="lg"
              disabled
              className="opacity-50"
            >
              BACK
            </Button>
            <Button
              variant="primary"
              size="lg"
              disabled={!canProceedInfo}
              onClick={handleNext}
              className="flex-1"
            >
              NEXT
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Choose Plan */}
      {step === 'plan' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-bold uppercase text-ink">Choose Your Plan</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monthly */}
            <button
              onClick={() => handleSelectPlan('monthly')}
              className={`p-6 rounded-lg transition-all text-left relative ${
                formData.plan === 'monthly'
                  ? 'border-3 border-brand bg-brand/10 shadow-lg shadow-brand/20'
                  : 'border-2 border-line opacity-75 hover:opacity-100 hover:border-brand/50'
              }`}
            >
              {formData.plan === 'monthly' && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-brand flex items-center justify-center">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
              )}
              <h3 className="text-xl font-display font-bold uppercase text-ink mb-2">
                Monthly Membership
              </h3>
              <p className="text-brand font-display font-bold text-2xl mb-3">$30/mo</p>
              <ul className="text-sm text-ink-muted space-y-2">
                <li>✓ Unlimited gym access</li>
                <li>✓ 24/7 key-fob entry</li>
                <li>✓ All classes included</li>
                <li>✓ Cancel anytime</li>
              </ul>
            </button>

            {/* Day Pass */}
            <button
              onClick={() => handleSelectPlan('daypass')}
              className={`p-6 rounded-lg transition-all text-left relative ${
                formData.plan === 'daypass'
                  ? 'border-3 border-brand-alt bg-brand-alt/10 shadow-lg shadow-brand-alt/20'
                  : 'border-2 border-line opacity-75 hover:opacity-100 hover:border-brand-alt/50'
              }`}
            >
              {formData.plan === 'daypass' && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-brand-alt flex items-center justify-center">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
              )}
              <h3 className="text-xl font-display font-bold uppercase text-ink mb-2">
                Day Pass
              </h3>
              <p className="text-brand-alt font-display font-bold text-2xl mb-3">$10</p>
              <ul className="text-sm text-ink-muted space-y-2">
                <li>✓ One-time visit</li>
                <li>✓ Full gym access</li>
                <li>✓ Try before you join</li>
                <li>✓ Valid for 24 hours</li>
              </ul>
            </button>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleBack}
            >
              BACK
            </Button>
            <Button
              variant="primary"
              size="lg"
              disabled={!canProceedPlan}
              onClick={handleNext}
              className="flex-1"
            >
              NEXT
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Schedule */}
      {step === 'schedule' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-bold uppercase text-ink">Pick Your Time</h2>

          {/* Day Selection */}
          <div>
            <p className="text-xs font-display uppercase tracking-eyebrow text-brand mb-3">
              Select a Day
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {DAYS_OF_WEEK.map((day) => (
                <button
                  key={day}
                  onClick={() => handleSelectDay(day)}
                  className={`px-4 py-2 rounded text-sm font-display font-bold uppercase transition-all ${
                    formData.day === day
                      ? 'bg-brand text-white'
                      : 'bg-surface border border-line text-ink hover:border-brand'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          {formData.day && (
            <div>
              <p className="text-xs font-display uppercase tracking-eyebrow text-brand mb-3">
                Available Times on {formData.day}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {APPOINTMENT_SLOTS[formData.day]?.map((t) => (
                  <button
                    key={t}
                    onClick={() => handleSelectTime(t)}
                    className={`px-4 py-3 rounded text-sm font-display font-bold uppercase transition-all ${
                      formData.time === t
                        ? 'bg-brand text-white'
                        : 'bg-surface border border-line text-ink hover:border-brand'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Confirmation */}
          {formData.day && formData.time && (
            <div className="p-4 rounded bg-surface border border-line">
              <p className="text-sm text-ink-muted mb-2">Your appointment:</p>
              <p className="text-lg font-display font-bold text-brand">
                {formData.day} at {formData.time}
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleBack}
            >
              BACK
            </Button>
            <Button
              variant="primary"
              size="lg"
              disabled={!canProceedSchedule || loading}
              onClick={handleNext}
              className="flex-1"
            >
              {loading ? 'BOOKING...' : 'CONFIRM'}
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Success */}
      {step === 'success' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">✓</div>

          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold uppercase text-ink mb-2">
              You're Booked!
            </h2>
            <p className="text-brand-alt font-display text-lg font-bold mb-4">
              Booking Reference: {bookingRef}
            </p>
            <p className="text-ink-muted max-w-lg mx-auto">
              A confirmation email has been sent to <strong>{formData.email}</strong>. Save your booking reference.
            </p>
          </div>

          <div className="bg-surface rounded-lg border border-line p-6 text-left max-w-lg mx-auto space-y-3">
            <p className="text-xs font-display uppercase tracking-eyebrow text-brand mb-4">What Happens Next</p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="text-brand font-bold">1.</span>
                <p className="text-sm text-ink-muted">Bring a photo ID to confirm your identity</p>
              </div>
              <div className="flex gap-3">
                <span className="text-brand font-bold">2.</span>
                <p className="text-sm text-ink-muted">Our staff will set you up with key-fob access</p>
              </div>
              <div className="flex gap-3">
                <span className="text-brand font-bold">3.</span>
                <p className="text-sm text-ink-muted">Quick 15-minute orientation to the gym</p>
              </div>
              <div className="flex gap-3">
                <span className="text-brand font-bold">4.</span>
                <p className="text-sm text-ink-muted">You're ready to start training</p>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-lg border border-line p-4 text-left">
            <p className="text-xs font-display uppercase tracking-eyebrow text-brand mb-2">Location</p>
            <p className="text-sm text-ink">585 10th St A, Plainwell, MI 49080</p>
            <p className="text-xs text-ink-muted mt-2">(269) 685-1493</p>
          </div>

          <Button
            variant="primary"
            size="lg"
            href="/"
            className="w-full md:w-auto"
          >
            Back to Home
          </Button>
        </div>
      )}
    </div>
  );
}
