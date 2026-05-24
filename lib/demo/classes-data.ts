// lib/demo/classes-data.ts

export interface GymClass {
  id: string;
  name: string;
  instructor: string;
  schedule: string;
  days: Array<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'>;
  time: string; // "09:30"
  durationMin: number;
  maxCapacity: number;
  avgAttendance: number; // percent
  status: 'active' | 'paused';
  colorKey: 'brand' | 'brand-alt' | 'success' | 'warning' | 'danger' | 'info';
}

export interface Instructor {
  id: string;
  name: string;
  classes: string[];
  hoursPerWeek: number;
  rating: number; // 0-5
  specialty: string;
}

export interface ScheduleBlock {
  classId: string;
  className: string;
  instructor: string;
  time: string;
  durationMin: number;
  booked: number;
  capacity: number;
  colorKey: GymClass['colorKey'];
}

const CLASSES: GymClass[] = [
  {
    id: 'mad-fitnez',
    name: 'MAD FITNEZ',
    instructor: 'Katherine Perez',
    schedule: 'Tue & Thu · 9:30am',
    days: ['Tue', 'Thu'],
    time: '09:30',
    durationMin: 45,
    maxCapacity: 12,
    avgAttendance: 83,
    status: 'active',
    colorKey: 'brand',
  },
  {
    id: 'tkd-kids',
    name: 'Taekwondo · Kids',
    instructor: 'Master Kim',
    schedule: 'Mon · Wed · Fri · 5:00pm',
    days: ['Mon', 'Wed', 'Fri'],
    time: '17:00',
    durationMin: 60,
    maxCapacity: 15,
    avgAttendance: 76,
    status: 'active',
    colorKey: 'brand-alt',
  },
  {
    id: 'tkd-adults',
    name: 'Taekwondo · Adults',
    instructor: 'Master Kim',
    schedule: 'Mon · Wed · Fri · 6:30pm',
    days: ['Mon', 'Wed', 'Fri'],
    time: '18:30',
    durationMin: 60,
    maxCapacity: 10,
    avgAttendance: 70,
    status: 'active',
    colorKey: 'brand-alt',
  },
  {
    id: 'hiit-burn',
    name: 'HIIT Burn',
    instructor: 'Devon Walker',
    schedule: 'Mon · Wed · 6:00am',
    days: ['Mon', 'Wed'],
    time: '06:00',
    durationMin: 30,
    maxCapacity: 14,
    avgAttendance: 88,
    status: 'active',
    colorKey: 'danger',
  },
  {
    id: 'power-yoga',
    name: 'Power Yoga',
    instructor: 'Ria Patel',
    schedule: 'Tue & Sat · 8:00am',
    days: ['Tue', 'Sat'],
    time: '08:00',
    durationMin: 50,
    maxCapacity: 16,
    avgAttendance: 72,
    status: 'active',
    colorKey: 'success',
  },
  {
    id: 'boxing-fundamentals',
    name: 'Boxing Fundamentals',
    instructor: 'Marcus Reid',
    schedule: 'Thu & Sat · 7:00pm',
    days: ['Thu', 'Sat'],
    time: '19:00',
    durationMin: 60,
    maxCapacity: 12,
    avgAttendance: 81,
    status: 'active',
    colorKey: 'warning',
  },
  {
    id: 'open-floor',
    name: 'Open Gym Floor',
    instructor: 'Self-directed',
    schedule: 'Always available · 24/7 key fob',
    days: [],
    time: '—',
    durationMin: 0,
    maxCapacity: 999,
    avgAttendance: 100,
    status: 'active',
    colorKey: 'info',
  },
];

const INSTRUCTORS: Instructor[] = [
  {
    id: 'kperez',
    name: 'Katherine Perez',
    classes: ['MAD FITNEZ'],
    hoursPerWeek: 3,
    rating: 4.9,
    specialty: 'High-energy bootcamp',
  },
  {
    id: 'mkim',
    name: 'Master Kim',
    classes: ['Taekwondo · Kids', 'Taekwondo · Adults'],
    hoursPerWeek: 9,
    rating: 5.0,
    specialty: 'Taekwondo · 4th Dan',
  },
  {
    id: 'dwalker',
    name: 'Devon Walker',
    classes: ['HIIT Burn'],
    hoursPerWeek: 2,
    rating: 4.8,
    specialty: 'HIIT & conditioning',
  },
  {
    id: 'rpatel',
    name: 'Ria Patel',
    classes: ['Power Yoga'],
    hoursPerWeek: 2.5,
    rating: 4.7,
    specialty: 'Vinyasa flow',
  },
  {
    id: 'mreid',
    name: 'Marcus Reid',
    classes: ['Boxing Fundamentals'],
    hoursPerWeek: 4,
    rating: 4.9,
    specialty: 'Boxing · ex-amateur',
  },
];

export function getMockClasses(): GymClass[] {
  return CLASSES;
}

export function getMockInstructors(): Instructor[] {
  return INSTRUCTORS;
}

// Build a weekly grid: Mon-Sun, with classes placed by time
export function getWeekSchedule(): {
  days: string[];
  timeSlots: string[];
  blocks: Record<string, Record<string, ScheduleBlock | null>>; // blocks[day][time]
} {
  const days: Array<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'> = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ];
  const timeSlots = ['06:00', '08:00', '09:30', '17:00', '18:30', '19:00'];

  const blocks: Record<string, Record<string, ScheduleBlock | null>> = {};
  for (const day of days) {
    blocks[day] = {};
    for (const slot of timeSlots) {
      blocks[day][slot] = null;
    }
  }

  // Deterministic booked counts so server render matches client
  const bookedSeed: Record<string, number> = {
    'mad-fitnez': 10,
    'tkd-kids': 12,
    'tkd-adults': 7,
    'hiit-burn': 13,
    'power-yoga': 11,
    'boxing-fundamentals': 9,
  };

  for (const cls of CLASSES) {
    if (cls.id === 'open-floor') continue;
    for (const day of cls.days) {
      blocks[day][cls.time] = {
        classId: cls.id,
        className: cls.name,
        instructor: cls.instructor,
        time: cls.time,
        durationMin: cls.durationMin,
        booked: bookedSeed[cls.id] ?? Math.floor(cls.maxCapacity * 0.7),
        capacity: cls.maxCapacity,
        colorKey: cls.colorKey,
      };
    }
  }

  return { days, timeSlots, blocks };
}
