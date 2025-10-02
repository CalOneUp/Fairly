export const mockTeams = [
  {
    id: 1,
    name: 'Sales Team A (Large Enterprise)',
    members: [
      { id: 101, name: 'Alice Johnson', email: 'alice@example.com', weight: 8, workingHours: { start: '09:00', end: '17:30' } },
      { id: 102, name: 'Bob Williams', email: 'bob@example.com', weight: 5, workingHours: { start: '09:00', end: '17:30' } }
    ]
  },
  {
    id: 2,
    name: 'Sales Team B (Mid-Market)',
    members: [
      { id: 201, name: 'Charlie Brown', email: 'charlie@example.com', weight: 7, workingHours: { start: '08:30', end: '17:00' } }
    ]
  },
  {
    id: 3,
    name: 'Support Specialists',
    members: [
      { id: 301, name: 'Diana Prince', email: 'diana@example.com', weight: 10, workingHours: { start: '09:00', end: '17:00' } }
    ]
  },
];

export const mockAllocationLog = [
    { id: 1, leadName: 'John Doe', leadEmail: 'john.doe@acmetech.com', rationale: "Rule Match: Company Size > 500", assignedToId: 101, timestamp: new Date(Date.now() - 3600000), status: 'Booked', meetingTime: new Date('2025-10-02T13:00:00') },
    { id: 2, leadName: 'Jane Smith', leadEmail: 'jane.smith@globalbank.com', rationale: "Catch-all Assignment", assignedToId: 201, timestamp: new Date(Date.now() - 7200000), status: 'Meeting Held, Qualified' },
    { id: 5, leadName: 'Upcoming Demo', leadEmail: 'future@demo.com', rationale: "Rule Match: Company Size > 500", assignedToId: 101, timestamp: new Date(Date.now() - 300000), status: 'Booked', meetingTime: new Date('2025-10-03T10:00:00') },
    { id: 6, leadName: 'Future Prospect', leadEmail: 'prospect@new.co', rationale: "Catch-all Assignment", assignedToId: 101, timestamp: new Date('2025-10-02T10:00:00'), status: 'Booked', meetingTime: new Date('2025-10-02T15:00:00') }
];

export const mockCalendarEvents = [
    { memberId: 102, title: 'Out of Office', allDay: true, date: new Date('2025-10-02'), gcalStatus: 'busy' },
    { memberId: 101, title: 'Internal Sync', start: new Date('2025-10-02T11:00:00'), end: new Date('2025-10-02T12:00:00'), gcalStatus: 'busy'},
    { memberId: 101, title: 'Focus Time', start: new Date('2025-10-02T14:00:00'), end: new Date('2025-10-02T15:00:00'), gcalStatus: 'free'},
    { memberId: 201, title: 'Dentist Appointment', start: new Date('2025-10-02T14:00:00'), end: new Date('2025-10-02T15:00:00'), gcalStatus: 'busy'},
];

export const mockEventTypes = [
    { id: 1, name: '30-Minute Product Demo', duration: 30, rules: [{ teamId: 1, conditions: [{ field: 'companySize', condition: 'gt', value: 500 }] }, { teamId: 2, conditions: [{ field: 'companySize', condition: 'lte', value: 500 }] }], catchAllTeamId: 2 },
];

export const getRepStatus = (memberId, currentDate, calendarEvents) => {
    const member = mockTeams.flatMap(t => t.members).find(m => m.id === memberId);
    if (!member) return 'Unknown';
    const now = currentDate;
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const isOoo = calendarEvents.some(event => event.memberId === memberId && event.allDay && new Date(event.date).getTime() === today.getTime());
    if (isOoo) return 'Out of Office';
    const [startHour, startMinute] = member.workingHours.start.split(':').map(Number);
    const [endHour, endMinute] = member.workingHours.end.split(':').map(Number);
    const startTime = new Date(today.getTime()).setHours(startHour, startMinute, 0, 0);
    const endTime = new Date(today.getTime()).setHours(endHour, endMinute, 0, 0);
    if (now.getTime() < startTime || now.getTime() > endTime) return 'Outside Hours';
    const isInMeeting = calendarEvents.some(event =>
        event.memberId === memberId &&
        !event.allDay &&
        event.gcalStatus !== 'free' &&
        now >= new Date(event.start) &&
        now < new Date(event.end)
    );
    if (isInMeeting) return 'In a Meeting';
    return 'Available';
}

export const getStatusInfo = (status) => {
    const base = {
        'Available': { text: '✅ Available', color: 'bg-green-100 text-green-800' },
        'Out of Office': { text: '🌴 Out of Office', color: 'bg-red-100 text-red-800' },
        'In a Meeting': { text: '👨‍💻 In a Meeting', color: 'bg-yellow-100 text-yellow-800' },
        'Outside Hours': { text: '🌙 Outside Hours', color: 'bg-slate-200 text-slate-700' },
    };
    return base[status] || { text: '❓ Unknown', color: 'bg-slate-200 text-slate-700' };
}