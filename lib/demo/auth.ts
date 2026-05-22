// lib/demo/auth.ts
const DEMO_PASSWORD = 'gym';
const DEMO_SESSION_KEY = 'demo-session';

export function validateDemoPassword(password: string): boolean {
  return password === DEMO_PASSWORD;
}

export function createDemoSession(): { token: string; expiresAt: number } {
  const token = Buffer.from(DEMO_PASSWORD + Date.now()).toString('base64');
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  return { token, expiresAt };
}

export function isDemoSessionValid(token: string | undefined, expiresAt: number | undefined): boolean {
  if (!token || !expiresAt) return false;
  return Date.now() < expiresAt;
}
