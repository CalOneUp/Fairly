import React from 'react';
import BookingWidget from './BookingWidget';
import { mockEventTypes } from '../mockData';

export default {
  title: 'Components/BookingWidget',
  component: BookingWidget,
  argTypes: {
    onClose: { action: 'closed' },
  },
};

export const Default = {
  args: {
    eventType: mockEventTypes[0],
  },
};