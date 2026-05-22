'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateDemoPassword } from '@/lib/demo/auth';

export default function DemoGatePage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!validateDemoPassword(password)) {
      setError('Incorrect password');
      setIsLoading(false);
      return;
    }

    // Set session cookie
    document.cookie = `demo-session=${password}; path=/; max-age=86400; SameSite=Lax`;

    // Redirect to dashboard
    router.push('/admin-demo/overview');
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-surface border border-line rounded-md p-8">
          <h1 className="font-display text-4xl font-bold text-ink mb-2 uppercase">Admin Demo</h1>
          <p className="text-sm text-ink-muted mb-8">
            Enter the demo password to view the admin dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 bg-surface-2 border border-line rounded-sm text-ink placeholder-ink-subtle focus:outline-none focus:ring-2 focus:ring-brand-alt"
              disabled={isLoading}
            />

            {error && <p className="text-danger text-sm">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand hover:bg-brand-hot text-white font-display uppercase px-4 py-2 rounded-sm disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Checking...' : 'Enter Demo'}
            </button>
          </form>

          <p className="text-xs text-ink-subtle mt-6 text-center">
            This is a demo with sample data. Sign up to get your own dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
