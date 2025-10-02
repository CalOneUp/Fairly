import React from 'react';
import Card from './Card';
import Button from './Button';
import Input from './Input';

const BookingWidget = ({ eventType, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-800">Book a Demo</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800">&times;</button>
        </div>
        <div>
          <p className="text-slate-600 mb-6">Please provide your details below to book a {eventType.duration}-minute demo.</p>
          <div className="space-y-4">
            <Input placeholder="Full Name" />
            <Input type="email" placeholder="Email Address" />
            <Input placeholder="Company Name" />
            <Input type="number" placeholder="Company Size" />
          </div>
          <div className="flex justify-end mt-6 gap-2">
            <Button onClick={onClose} variant="secondary">Cancel</Button>
            <Button variant="primary">Find a Time</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BookingWidget;