import RepAvailabilityCard from './RepAvailabilityCard';
import { mockTeams, mockCalendarEvents } from '../mockData';

export default {
  title: 'Components/RepDashboard/RepAvailabilityCard',
  component: RepAvailabilityCard,
};

const rep = mockTeams.flatMap(t => t.members).find(m => m.id === 101);

export const Available = {
  args: {
    rep,
    currentDate: new Date('2025-10-02T10:00:00+01:00'),
    calendarEvents: mockCalendarEvents,
  },
};

export const InAMeeting = {
  args: {
    rep,
    currentDate: new Date('2025-10-02T11:30:00+01:00'),
    calendarEvents: mockCalendarEvents,
  },
};

export const OutOfOffice = {
    args: {
      rep: mockTeams.flatMap(t => t.members).find(m => m.id === 102),
      currentDate: new Date('2025-10-02T10:00:00+01:00'),
      calendarEvents: mockCalendarEvents,
    },
  };