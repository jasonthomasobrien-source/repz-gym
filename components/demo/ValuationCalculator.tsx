'use client';

import { useState } from 'react';
import { Calculator, TrendingUp } from 'lucide-react';

const SDE_MARGIN = 0.30;
const MIN_MULTIPLE = 2;
const MAX_MULTIPLE = 3;

const recordsMultiplier = (years: number): number => {
  if (years <= 0) return 0.5;
  if (years === 1) return 0.7;
  if (years === 2) return 0.85;
  if (years === 3) return 1.0;
  return 1.1;
};

const formatCurrency = (value: number): string =>
  `$${Math.round(value).toLocaleString('en-US')}`;

const formatCurrencyShort = (value: number): string => {
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return formatCurrency(value);
};

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}

function NumberField({ label, value, onChange, min, max, step, prefix, suffix }: NumberFieldProps) {
  return (
    <div className="bg-surface-2 border border-line rounded-md p-4">
      <label className="block text-xs text-ink-muted uppercase font-display tracking-[0.12em] font-semibold mb-3">
        {label}
      </label>
      <div className="flex items-center gap-2">
        {prefix && <span className="text-2xl font-display text-ink-muted">{prefix}</span>}
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const next = Number(e.target.value);
            if (Number.isFinite(next)) {
              onChange(Math.min(max, Math.max(min, next)));
            }
          }}
          className="w-full bg-transparent text-3xl lg:text-4xl font-display font-bold text-ink leading-none focus:outline-none focus:text-brand transition-colors"
        />
        {suffix && <span className="text-sm font-display text-ink-muted whitespace-nowrap">{suffix}</span>}
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full mt-4 accent-brand"
        aria-label={label}
      />
      <div className="flex justify-between text-xs text-ink-subtle font-display tracking-[0.08em] mt-1">
        <span>{prefix}{min.toLocaleString()}{suffix ?? ''}</span>
        <span>{prefix}{max.toLocaleString()}{suffix ?? ''}</span>
      </div>
    </div>
  );
}

export function ValuationCalculator() {
  const [members, setMembers] = useState<number>(523);
  const [price, setPrice] = useState<number>(30);
  const [years, setYears] = useState<number>(2);

  const annualRevenue = members * price * 12;
  const sde = annualRevenue * SDE_MARGIN;
  const multiplier = recordsMultiplier(years);
  const docLow = sde * MIN_MULTIPLE * multiplier;
  const docHigh = sde * MAX_MULTIPLE * multiplier;

  const cashLow = 30000;
  const cashHigh = 60000;
  const gapLow = Math.max(0, docLow - cashHigh);
  const gapHigh = Math.max(0, docHigh - cashLow);

  return (
    <div className="bg-surface border border-line rounded-md p-6 lg:p-8">
      <header className="mb-6 flex items-start gap-3">
        <Calculator className="w-7 h-7 text-brand-alt shrink-0 mt-1" />
        <div>
          <h3 className="text-xl lg:text-2xl font-display uppercase text-ink tracking-[0.02em] font-bold">
            Try It With Your Own Numbers
          </h3>
          <p className="text-sm text-ink-muted mt-2">
            Adjust the inputs to estimate your gym&apos;s value today vs. with full records.
          </p>
        </div>
      </header>

      {/* Inputs */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <NumberField
          label="Active monthly members"
          value={members}
          onChange={setMembers}
          min={50}
          max={2000}
          step={10}
        />
        <NumberField
          label="Monthly membership price"
          value={price}
          onChange={setPrice}
          min={15}
          max={200}
          step={5}
          prefix="$"
        />
        <NumberField
          label="Years of clean payment records"
          value={years}
          onChange={setYears}
          min={0}
          max={5}
          step={1}
          suffix="yrs"
        />
      </div>

      {/* Derived */}
      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <div className="bg-surface-2 border border-line rounded-md p-5">
          <p className="text-xs text-ink-muted uppercase font-display tracking-[0.12em] font-semibold mb-2">
            Annual Revenue
          </p>
          <p className="text-3xl lg:text-4xl font-display font-bold text-ink leading-none">
            {formatCurrency(annualRevenue)}
          </p>
        </div>
        <div className="bg-surface-2 border border-line rounded-md p-5">
          <p className="text-xs text-ink-muted uppercase font-display tracking-[0.12em] font-semibold mb-2">
            Estimated SDE (~30% of revenue)
          </p>
          <p className="text-3xl lg:text-4xl font-display font-bold text-ink leading-none">
            {formatCurrency(sde)}
          </p>
        </div>
      </div>

      {/* Outcomes */}
      <div className="grid gap-4 lg:grid-cols-2 mb-6">
        <div className="bg-surface-2 border border-line rounded-md p-6">
          <p className="text-xs text-ink-muted uppercase font-display tracking-[0.12em] font-semibold mb-4">
            Without records (cash-only)
          </p>
          <p className="text-4xl lg:text-5xl font-display font-bold text-ink-muted leading-none mb-3">
            $30K – $60K
          </p>
          <p className="text-sm text-ink-muted leading-relaxed">
            Equipment + lease only. Years of records don&apos;t matter here.
          </p>
        </div>

        <div className="bg-surface-2 border-2 border-brand-alt rounded-md p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-brand-alt" />
          <p className="text-xs text-brand-alt uppercase font-display tracking-[0.12em] font-semibold mb-4">
            With clean records
          </p>
          <p className="text-4xl lg:text-5xl font-display font-bold text-brand leading-none mb-3">
            {formatCurrencyShort(docLow)} – {formatCurrencyShort(docHigh)}
          </p>
          <p className="text-sm text-ink-muted leading-relaxed">
            2–3× SDE, adjusted for years of documented history.
          </p>
        </div>
      </div>

      {/* Value gap callout */}
      <div className="bg-surface-2 border-l-4 border-brand-alt rounded-sm p-5 mb-6">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-6 h-6 text-brand-alt mt-0.5 shrink-0" />
          <p className="text-base lg:text-lg text-ink leading-relaxed">
            Your gym is worth approximately{' '}
            <span className="text-brand-alt font-display font-bold">
              {formatCurrencyShort(gapLow)} – {formatCurrencyShort(gapHigh)} more
            </span>{' '}
            with clean records than without.
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-ink-subtle leading-relaxed italic">
        This is an estimate based on common small-business valuation rules — typically{' '}
        <span className="not-italic font-semibold">2–3× SDE</span> (Seller&apos;s Discretionary Earnings) for independent gyms,
        or <span className="not-italic font-semibold">0.5–1.5× annual revenue</span> as a rough alternative. SDE assumes ~30% margin on revenue, which varies by gym (typical range 20–40%). Actual sale price depends on lease terms, equipment age, location, growth trajectory, lease assignment ability, equipment condition, and buyer motivation.{' '}
        <span className="not-italic font-semibold">The &ldquo;8–12× revenue&rdquo; multiple sometimes cited is for SaaS/tech businesses — it does not apply to gyms.</span>{' '}
        For a formal valuation, talk to a business broker.
      </p>
    </div>
  );
}
