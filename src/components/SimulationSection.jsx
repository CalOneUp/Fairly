import React from 'react';
import Card from './Card';
import Button from './Button';

const SimulationSection = () => {
  return (
    <Card>
      <h2 className="text-xl font-semibold text-slate-800 mb-2">🚀 Live Pop-up Simulation</h2>
      <p className="text-sm text-slate-500 mb-6">Test the booking flow to see the allocation queue in action.</p>
      <div className="bg-slate-50/50 p-8 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300/50">
        <h3 className="text-2xl font-bold text-slate-800">Ready to see our product in action?</h3>
        <p className="text-slate-600 mt-2 mb-6">Schedule a free, no-obligation demo with our team.</p>
        <Button variant="primary" size="lg">Book a Demo Call</Button>
      </div>
    </Card>
  );
};

export default SimulationSection;