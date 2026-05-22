import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateBookingRef, getVisitorEmailTemplate, getOwnerEmailTemplate } from '@/lib/schedule';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ScheduleRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  plan: 'monthly' | 'daypass';
  day: string;
  time: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ScheduleRequest;

    // Validate required fields
    const { firstName, lastName, email, phone, plan, day, time } = body;

    if (!firstName || !lastName || !email || !phone || !plan || !day || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate booking reference
    const bookingRef = generateBookingRef();

    // Send visitor confirmation email
    if (process.env.RESEND_API_KEY) {
      const visitorTemplate = getVisitorEmailTemplate(firstName, plan, day, time);
      await resend.emails.send({
        from: 'Repz Gym <onboarding@resend.dev>',
        to: email,
        subject: visitorTemplate.subject,
        html: visitorTemplate.html,
      });

      // Send owner notification email
      const ownerEmail = process.env.ADMIN_EMAIL || 'repzgym@example.com';
      const ownerTemplate = getOwnerEmailTemplate(firstName, lastName, email, phone, plan, day, time);
      await resend.emails.send({
        from: 'Repz Gym <onboarding@resend.dev>',
        to: ownerEmail,
        subject: ownerTemplate.subject,
        html: ownerTemplate.html,
      });
    } else {
      console.log('[RESEND] Skipping email (RESEND_API_KEY not set)');
      console.log('[RESEND] Visitor email:', getVisitorEmailTemplate(firstName, plan, day, time).subject);
      console.log('[RESEND] Owner email:', getOwnerEmailTemplate(firstName, lastName, email, phone, plan, day, time).subject);
    }

    return NextResponse.json(
      {
        success: true,
        bookingRef,
        message: 'Appointment scheduled successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Schedule API error:', error);
    return NextResponse.json(
      { error: 'Failed to process appointment' },
      { status: 500 }
    );
  }
}
