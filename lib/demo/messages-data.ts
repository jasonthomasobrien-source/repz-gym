// lib/demo/messages-data.ts

export interface Message {
  id: string;
  folder: 'inbox' | 'sent' | 'drafts';
  from: string;
  fromEmail: string;
  to?: string;
  subject: string;
  snippet: string;
  body: string;
  time: string; // "2h ago"
  unread: boolean;
}

export interface MessageTemplate {
  id: string;
  title: string;
  description: string;
  body: string;
}

const MESSAGES: Message[] = [
  {
    id: 'msg-001',
    folder: 'inbox',
    from: 'Sarah Johnson',
    fromEmail: 'sarah.johnson@gmail.com',
    subject: 'Question about my monthly payment',
    snippet: "Hey, I got an email saying my card was declined but I just updated it last week...",
    body: "Hey,\n\nI got an email saying my card was declined but I just updated it last week. Can you double-check on your end? I don't want to lose my membership.\n\nThanks,\nSarah",
    time: '12 min ago',
    unread: true,
  },
  {
    id: 'msg-002',
    folder: 'inbox',
    from: 'Mike Chen',
    fromEmail: 'mike.chen@yahoo.com',
    subject: 'Signing up for MAD FITNEZ',
    snippet: "Is there still space in Katherine's Thursday class? I'd love to start this week.",
    body: "Is there still space in Katherine's Thursday class? I'd love to start this week if possible. I'm already a member, just haven't done a class before.\n\nMike",
    time: '1 hr ago',
    unread: true,
  },
  {
    id: 'msg-003',
    folder: 'inbox',
    from: 'Chris Martinez',
    fromEmail: 'chris.martinez@outlook.com',
    subject: 'Pausing membership for a month',
    snippet: "Going to be out of town for June. Can I pause and resume in July?",
    body: "Going to be out of town for the entire month of June. Can I pause my membership and resume July 1? Don't want to cancel because I'll be right back.\n\n— Chris",
    time: '3 hr ago',
    unread: true,
  },
  {
    id: 'msg-004',
    folder: 'inbox',
    from: 'Alex Rivera',
    fromEmail: 'alex.rivera@gmail.com',
    subject: 'Thanks for the great gym!',
    snippet: "Just wanted to say I've been a member for 6 months and it's the best gym in Plainwell.",
    body: "Just wanted to say I've been a member for 6 months and it's the best gym in Plainwell. Quiet, real equipment, no posers. Tell the owner thanks.\n\nAlex",
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 'msg-005',
    folder: 'inbox',
    from: 'Jordan Lee',
    fromEmail: 'jordan.lee@example.com',
    subject: 'Key fob not working',
    snippet: "My key fob stopped working last night around 10pm. Couldn't get in.",
    body: "My key fob stopped working last night around 10pm. Couldn't get in. Can someone reset it next time I'm in?\n\nJordan",
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 'msg-006',
    folder: 'inbox',
    from: 'Taylor Smith',
    fromEmail: 'taylor.smith@gmail.com',
    subject: 'Day pass for a friend',
    snippet: "Can I buy a day pass online for a friend visiting this weekend?",
    body: "Can I buy a day pass online for a friend visiting this weekend? Or does he need to come in person?\n\nThanks,\nTaylor",
    time: '2 days ago',
    unread: false,
  },
  {
    id: 'msg-007',
    folder: 'inbox',
    from: 'Casey Williams',
    fromEmail: 'casey.williams@yahoo.com',
    subject: 'Tanning bed broken',
    snippet: 'FYI the back tanning bed gave me an error when I tried to use it tonight.',
    body: "FYI the back tanning bed gave me an error when I tried to use it tonight. Front one was fine.\n\nCasey",
    time: '3 days ago',
    unread: false,
  },
  {
    id: 'msg-008',
    folder: 'sent',
    from: 'You',
    fromEmail: 'owner@repzgym.com',
    to: 'all members',
    subject: 'Holiday hours — Memorial Day weekend',
    snippet: 'Quick heads up: we close at 4pm on Monday May 26 for Memorial Day.',
    body: "Quick heads up: we close at 4pm on Monday May 26 for Memorial Day. 24/7 key fob access still works as usual.\n\n— Repz Gym",
    time: '4 days ago',
    unread: false,
  },
  {
    id: 'msg-009',
    folder: 'sent',
    from: 'You',
    fromEmail: 'owner@repzgym.com',
    to: 'morgan.brown@gmail.com',
    subject: 'Re: Personal training availability',
    snippet: "We don't currently offer 1-on-1 personal training but Devon does HIIT classes Mon/Wed.",
    body: "Hi Morgan, we don't currently offer 1-on-1 personal training but Devon does HIIT classes Mon/Wed at 6am. Might be a good fit. Let me know if you want me to add you.\n\n— Repz Gym",
    time: '5 days ago',
    unread: false,
  },
  {
    id: 'msg-010',
    folder: 'sent',
    from: 'You',
    fromEmail: 'owner@repzgym.com',
    to: 'riley.jones@outlook.com',
    subject: 'Welcome to Repz!',
    snippet: 'Welcome aboard. Your key fob is ready at the front desk anytime this week.',
    body: "Welcome aboard. Your key fob is ready at the front desk anytime this week. After that you can come and go 24/7. Hit reply if you have any questions.\n\n— Repz Gym",
    time: '1 wk ago',
    unread: false,
  },
  {
    id: 'msg-011',
    folder: 'sent',
    from: 'You',
    fromEmail: 'owner@repzgym.com',
    to: 'ashley.garcia@gmail.com',
    subject: 'Payment retry succeeded',
    snippet: "Good news — your payment went through on retry. You're all set.",
    body: "Good news — your payment went through on retry. You're all set, no action needed on your end.\n\n— Repz Gym",
    time: '1 wk ago',
    unread: false,
  },
  {
    id: 'msg-012',
    folder: 'inbox',
    from: 'Morgan Brown',
    fromEmail: 'morgan.brown@gmail.com',
    subject: 'Are kids allowed in the gym?',
    snippet: 'My 14-year-old wants to start lifting. Is there a minimum age?',
    body: "My 14-year-old wants to start lifting. Is there a minimum age? Would he need to be supervised?\n\n— Morgan",
    time: '1 wk ago',
    unread: false,
  },
  {
    id: 'msg-013',
    folder: 'drafts',
    from: 'You',
    fromEmail: 'owner@repzgym.com',
    to: 'all members',
    subject: 'New class: Saturday morning boxing',
    snippet: 'Considering adding a Saturday 10am boxing class with Marcus...',
    body: "Considering adding a Saturday 10am boxing class with Marcus. Reply YES if you'd attend so I can gauge interest.\n\n— Repz Gym",
    time: '2 wk ago',
    unread: false,
  },
];

const TEMPLATES: MessageTemplate[] = [
  {
    id: 'tpl-payment-reminder',
    title: 'Payment Reminder',
    description: 'Polite reminder when a card has failed',
    body: "Hi {{name}},\n\nWe weren't able to process your monthly payment of $30.00. No big deal — just update your card here:\n{{link}}\n\nLet us know if you have any trouble.\n\n— Repz Gym",
  },
  {
    id: 'tpl-class-cancel',
    title: 'Class Cancellation',
    description: 'Notify a class roster of a same-day cancellation',
    body: "Heads up — {{class_name}} on {{date}} is canceled. We'll be back on the regular schedule next session. Thanks for understanding.\n\n— Repz Gym",
  },
  {
    id: 'tpl-welcome',
    title: 'Welcome Email',
    description: 'Sent automatically after signup',
    body: "Welcome to Repz, {{name}}!\n\nYour key fob is ready at the front desk. Come grab it anytime this week, then you'll have 24/7 access.\n\nQuestions? Hit reply.\n\n— Repz Gym",
  },
  {
    id: 'tpl-new-class',
    title: 'New Class Announcement',
    description: 'Broadcast a new class to all active members',
    body: "Big news — we just added {{class_name}} on {{days}} at {{time}} with {{instructor}}. First session is {{first_date}}. Reply to reserve a spot.\n\n— Repz Gym",
  },
];

export function getMockMessages(): Message[] {
  return MESSAGES;
}

export function getMessageTemplates(): MessageTemplate[] {
  return TEMPLATES;
}
