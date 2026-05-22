'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface TrainerContactFormProps {
  trainerName: string;
}

export function TrainerContactForm({ trainerName }: TrainerContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up to contact API
    console.log('Form submitted:', {
      ...formData,
      trainer: trainerName,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded border border-line bg-surface text-ink placeholder-ink-muted focus:outline-none focus:border-brand"
          placeholder="Your name"
        />
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
          required
          className="w-full px-4 py-3 rounded border border-line bg-surface text-ink placeholder-ink-muted focus:outline-none focus:border-brand"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
          Phone (Optional)
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded border border-line bg-surface text-ink placeholder-ink-muted focus:outline-none focus:border-brand"
          placeholder="(269) 555-1234"
        />
      </div>

      <div>
        <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 rounded border border-line bg-surface text-ink placeholder-ink-muted focus:outline-none focus:border-brand resize-none"
          placeholder="Tell us about your goals and what you'd like to discuss..."
        />
      </div>

      <Button type="submit" size="lg" variant="primary" className="w-full">
        Send Inquiry
      </Button>
    </form>
  );
}
