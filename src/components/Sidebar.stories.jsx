import Sidebar from './Sidebar';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  argTypes: {
    onNavigate: { action: 'navigated' },
  },
};

export const AdminView = {
  args: {
    currentView: 'admin',
  },
};

export const RepView = {
  args: {
    currentView: 'rep',
  },
};