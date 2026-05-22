import { v4 as uuidv4 } from 'uuid';

export const APPOINTMENT_SLOTS: Record<string, string[]> = {
  Monday: ['10:00 AM', '1:00 PM', '4:00 PM', '6:00 PM'],
  Tuesday: ['10:00 AM', '1:00 PM', '4:00 PM', '6:00 PM'],
  Wednesday: ['10:00 AM', '1:00 PM', '4:00 PM', '6:00 PM'],
  Thursday: ['10:00 AM', '1:00 PM', '4:00 PM', '6:00 PM'],
  Friday: ['10:00 AM', '1:00 PM', '4:00 PM'],
  Saturday: ['10:00 AM', '12:00 PM', '2:00 PM'],
};

export const DAYS_OF_WEEK = Object.keys(APPOINTMENT_SLOTS);

export function generateBookingRef(): string {
  return uuidv4().slice(0, 8).toUpperCase();
}

export function getVisitorEmailTemplate(
  firstName: string,
  plan: string,
  day: string,
  time: string,
) {
  const planName = plan === 'monthly' ? 'Monthly Membership ($30/mo)' : 'Day Pass ($10)';
  const gymAddress = '585 10th St A, Plainwell, MI 49080';
  const gymPhone = '(269) 685-1493';

  return {
    subject: `Your Repz Gym Appointment Confirmed`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a; color: #ffffff;">
        <h1 style="color: #f26522;">Welcome to Repz Gym, ${firstName}!</h1>

        <p style="font-size: 16px; line-height: 1.6;">Your appointment is confirmed. Here are your details:</p>

        <div style="background-color: #1a1a1a; padding: 20px; border-left: 4px solid #20b2aa; margin: 20px 0;">
          <p style="margin: 8px 0;"><strong>Plan:</strong> ${planName}</p>
          <p style="margin: 8px 0;"><strong>Appointment:</strong> ${day} at ${time}</p>
          <p style="margin: 8px 0;"><strong>Location:</strong> ${gymAddress}</p>
        </div>

        <h2 style="color: #f26522; margin-top: 30px;">What Happens Next</h2>
        <ul style="line-height: 1.8;">
          <li>Bring a photo ID to confirm your info</li>
          <li>Our staff will set you up with key-fob access</li>
          <li>Quick 15-minute onboarding walkthrough</li>
          <li>You're ready to start working out!</li>
        </ul>

        <p style="color: #999; margin-top: 30px; font-size: 14px;">
          Questions? Call us at ${gymPhone}
        </p>

        <p style="color: #999; font-size: 12px; margin-top: 20px;">
          No glamour. Just results. — Repz Gym
        </p>
      </div>
    `,
  };
}

export function getOwnerEmailTemplate(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  plan: string,
  day: string,
  time: string,
) {
  const planName = plan === 'monthly' ? 'Monthly ($30/mo)' : 'Day Pass ($10)';

  return {
    subject: `New Repz Gym Appointment: ${firstName} ${lastName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a; color: #ffffff;">
        <h1 style="color: #f26522;">New Appointment Scheduled</h1>

        <div style="background-color: #1a1a1a; padding: 20px; border-left: 4px solid #20b2aa; margin: 20px 0;">
          <p style="margin: 8px 0;"><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 8px 0;"><strong>Phone:</strong> ${phone}</p>
          <p style="margin: 8px 0;"><strong>Plan:</strong> ${planName}</p>
          <p style="margin: 8px 0;"><strong>Appointment:</strong> ${day} at ${time}</p>
        </div>

        <p style="margin-top: 30px;">Remember to have their ID ready and set up their key-fob access.</p>
      </div>
    `,
  };
}
