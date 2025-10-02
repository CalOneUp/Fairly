export type TeamMember = {
  id: number;
  name: string;
  email: string;
  weight: number;
  workingHours: { start: string; end: string };
};

export type Team = {
  id: number;
  name: string;
  members: TeamMember[];
};

export type AllocationLogItem = {
  id: number;
  leadName: string;
  leadEmail: string;
  rationale: string;
  assignedToId: number;
  timestamp: Date;
  status: string;
  meetingTime?: Date;
};

export type AppState = {
  teams: Team[];
  eventTypes: Array<{
    id: number;
    name: string;
    duration: number;
    rules: Array<{
      teamId: number;
      conditions: Array<{ field: string; condition: string; value: number }>;
    }>;
    catchAllTeamId?: number;
  }>;
  mockCrm: Array<{ email: string; ownerId: number; name: string }>;
  allocationLog: AllocationLogItem[];
};

const initialState: AppState = {
  teams: [
    {
      id: 1,
      name: 'Sales Team A (Large Enterprise)',
      members: [
        {
          id: 101,
          name: 'Alice Johnson',
          email: 'alice@example.com',
          weight: 8,
          workingHours: { start: '09:00', end: '17:30' },
        },
        {
          id: 102,
          name: 'Bob Williams',
          email: 'bob@example.com',
          weight: 5,
          workingHours: { start: '09:00', end: '17:30' },
        },
      ],
    },
    {
      id: 2,
      name: 'Sales Team B (Mid-Market)',
      members: [
        {
          id: 201,
          name: 'Charlie Brown',
          email: 'charlie@example.com',
          weight: 7,
          workingHours: { start: '08:30', end: '17:00' },
        },
      ],
    },
    {
      id: 3,
      name: 'Support Specialists',
      members: [
        {
          id: 301,
          name: 'Diana Prince',
          email: 'diana@example.com',
          weight: 10,
          workingHours: { start: '09:00', end: '17:00' },
        },
      ],
    },
  ],
  eventTypes: [
    {
      id: 1,
      name: '30-Minute Product Demo',
      duration: 30,
      rules: [
        { teamId: 1, conditions: [{ field: 'companySize', condition: 'gt', value: 500 }] },
        { teamId: 2, conditions: [{ field: 'companySize', condition: 'lte', value: 500 }] },
      ],
      catchAllTeamId: 2,
    },
  ],
  mockCrm: [
    { email: 'existing.customer@example.com', ownerId: 102, name: 'Existing Customer' },
    { email: 'vip.client@example.com', ownerId: 101, name: 'VIP Client' },
  ],
  allocationLog: [
    {
      id: 1,
      leadName: 'John Doe',
      leadEmail: 'john.doe@acmetech.com',
      rationale: 'Rule Match: Company Size > 500',
      assignedToId: 101,
      timestamp: new Date(Date.now() - 3600000),
      status: 'Booked',
      meetingTime: new Date('2025-10-02T13:00:00'),
    },
    {
      id: 2,
      leadName: 'Jane Smith',
      leadEmail: 'jane.smith@globalbank.com',
      rationale: 'Catch-all Assignment',
      assignedToId: 201,
      timestamp: new Date(Date.now() - 7200000),
      status: 'Meeting Held, Qualified',
    },
    {
      id: 5,
      leadName: 'Upcoming Demo',
      leadEmail: 'future@demo.com',
      rationale: 'Rule Match: Company Size > 500',
      assignedToId: 101,
      timestamp: new Date(Date.now() - 300000),
      status: 'Booked',
      meetingTime: new Date('2025-10-03T10:00:00'),
    },
    {
      id: 6,
      leadName: 'Future Prospect',
      leadEmail: 'prospect@new.co',
      rationale: 'Catch-all Assignment',
      assignedToId: 101,
      timestamp: new Date('2025-10-02T10:00:00'),
      status: 'Booked',
      meetingTime: new Date('2025-10-02T15:00:00'),
    },
  ],
};

let state: AppState = initialState;

export function getState(): AppState {
  return state;
}

export function setState(next: AppState) {
  state = next;
  notify();
}

const listeners = new Set<() => void>();
export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
function notify() {
  for (const l of listeners) l();
}
