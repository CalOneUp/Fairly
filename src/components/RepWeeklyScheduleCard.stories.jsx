import RepWeeklyScheduleCard from './RepWeeklyScheduleCard';
import { mockTeams, mockAllocationLog, mockCalendarEvents } from '../mockData';

export default {
  title: 'Components/RepDashboard/RepWeeklyScheduleCard',
  component: RepWeeklyScheduleCard,
};

const rep = mockTeams.flatMap(t => t.members).find(m => m.id === 101);
const myAllocations = mockAllocationLog.filter(log => log.assignedToId === rep.id);

export const Default = {
  args: {
    rep,
    myAllocations,
    currentDate: new Date('2025-10-02T13:15:00+01:00'),
    calendarEvents: mockCalendarEvents,
  },
};