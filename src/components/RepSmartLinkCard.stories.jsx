import RepSmartLinkCard from './RepSmartLinkCard';
import { mockTeams } from '../mockData';

export default {
  title: 'Components/RepDashboard/RepSmartLinkCard',
  component: RepSmartLinkCard,
};

const rep = mockTeams.flatMap(t => t.members).find(m => m.id === 101);

export const Default = {
  args: {
    rep,
  },
};