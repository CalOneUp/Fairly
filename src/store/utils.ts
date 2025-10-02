import { getState } from './state';

export function getRepStatus(
  memberId: number,
  now = new Date(),
): 'Available' | 'Out of Office' | 'In a Meeting' | 'Outside Hours' | 'Unknown' {
  const state = getState();
  const member = state.teams.flatMap((t) => t.members).find((m) => m.id === memberId);
  if (!member) return 'Unknown';

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const isOoo = state.mockCalendarEvents.some(
    (event: any) =>
      event.memberId === memberId && event.allDay && event.date.getTime() === today.getTime(),
  );
  if (isOoo) return 'Out of Office';

  const [startHourStr, startMinuteStr] = member.workingHours.start.split(':');
  const [endHourStr, endMinuteStr] = member.workingHours.end.split(':');
  const startHour = Number(startHourStr);
  const startMinute = Number(startMinuteStr ?? 0);
  const endHour = Number(endHourStr);
  const endMinute = Number(endMinuteStr ?? 0);
  const startTime = new Date(today.getTime()).setHours(startHour, startMinute, 0, 0);
  const endTime = new Date(today.getTime()).setHours(endHour, endMinute, 0, 0);
  if (now.getTime() < startTime || now.getTime() > endTime) return 'Outside Hours';

  const isInMeeting = state.mockCalendarEvents.some((event: any) => {
    if (event.memberId !== memberId || event.allDay) return false;
    if (event.gcalStatus === 'free') return false;
    const start = event.start as Date | undefined;
    const end = event.end as Date | undefined;
    if (!start || !end) return false;
    return now >= start && now < end;
  });
  if (isInMeeting) return 'In a Meeting';

  return 'Available';
}

export function getStatusInfo(status: ReturnType<typeof getRepStatus>) {
  const base = {
    Available: {
      text: '✅ Available',
      color: 'bg-green-100 text-green-800',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-800',
    },
    'Out of Office': {
      text: '🌴 Out of Office',
      color: 'bg-red-100 text-red-800',
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-800',
    },
    'In a Meeting': {
      text: '👨‍💻 In a Meeting',
      color: 'bg-yellow-100 text-yellow-800',
      bgColor: 'bg-yellow-500/10',
      textColor: 'text-yellow-800',
    },
    'Outside Hours': {
      text: '🌙 Outside Hours',
      color: 'bg-slate-200 text-slate-700',
      bgColor: 'bg-slate-500/10',
      textColor: 'text-slate-600',
    },
  } as const;
  return (
    (base as any)[status] || {
      text: '❓ Unknown',
      color: 'bg-slate-200 text-slate-700',
      bgColor: 'bg-slate-500/10',
      textColor: 'text-slate-600',
    }
  );
}
