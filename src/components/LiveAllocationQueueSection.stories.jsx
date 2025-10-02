import LiveAllocationQueueSection from './LiveAllocationQueueSection';
import { mockCalendarEvents } from '../mockData';

export default {
  title: 'Components/AdminDashboard/LiveAllocationQueueSection',
  component: LiveAllocationQueueSection,
};

export const Default = {
  args: {
    currentDate: new Date('2025-10-02T13:15:00+01:00'),
    calendarEvents: mockCalendarEvents,
  },
};