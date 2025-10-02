import RepMyAllocationsCard from './RepMyAllocationsCard';
import { mockAllocationLog } from '../mockData';

export default {
  title: 'Components/RepDashboard/RepMyAllocationsCard',
  component: RepMyAllocationsCard,
};

const myAllocations = mockAllocationLog.filter(log => log.assignedToId === 101);

export const Default = {
  args: {
    myAllocations,
  },
};