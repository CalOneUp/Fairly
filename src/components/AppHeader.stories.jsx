import AppHeader from './AppHeader';

export default {
  title: 'Components/AppHeader',
  component: AppHeader,
};

const adminUser = {
  name: 'Admin User',
  email: 'admin@example.com',
};

const repUser = {
  name: 'Alice Johnson',
  email: 'alice@example.com',
};

export const AdminHeader = {
  args: {
    user: adminUser,
  },
};

export const RepHeader = {
  args: {
    user: repUser,
  },
};