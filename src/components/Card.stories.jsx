import Card from './Card';

export default {
  title: 'Components/Card',
  component: Card,
};

export const Default = {
  args: {
    children: 'This is a simple card.',
  },
};

export const WithCustomClass = {
  args: {
    children: 'This card has an extra CSS class.',
    className: 'p-8',
  },
};