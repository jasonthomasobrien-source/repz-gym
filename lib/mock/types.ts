export type MemberStatus = "active" | "past_due" | "paused" | "canceled" | "prospect";
export type PaymentStatus = "succeeded" | "failed" | "refunded" | "pending";
export type PaymentKind = "membership" | "day_pass";

export interface Member {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  date_of_birth?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  photo_url?: string;
  joined_at: string;
  notes?: string;
  is_admin: boolean;
  stripe_customer_id: string;
  status: MemberStatus;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  member_id: string;
  status: "active" | "past_due" | "canceled";
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  canceled_at?: string;
  price_id: string;
  amount_cents: number;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  member_id: string;
  subscription_id?: string;
  kind: PaymentKind;
  amount_cents: number;
  currency: string;
  status: PaymentStatus;
  failure_reason?: string;
  paid_at?: string;
  created_at: string;
}

export interface Class {
  id: string;
  slug: string;
  name: string;
  description: string;
  instructor_id?: string;
  image_url: string;
  is_active: boolean;
}

export interface ClassSession {
  id: string;
  class_id: string;
  day_of_week: number;
  start_time: string;
  duration_min: number;
  notes?: string;
}

export interface Trainer {
  id: string;
  name: string;
  tagline: string;
  bio: string;
  photo_url: string;
  is_active: boolean;
  sort_order: number;
}

export interface CheckIn {
  id: number;
  member_id: string;
  checked_in_at: string;
  source: "keyfob" | "manual" | "seed";
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: "new" | "read" | "replied";
  created_at: string;
}
