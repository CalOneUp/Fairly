import React from 'react';
import SimulationSection from './SimulationSection';
import AllocationLogSection from './AllocationLogSection';
import WorkingHoursSection from './WorkingHoursSection';
import RoutingSection from './RoutingSection';
import LiveAllocationQueueSection from './LiveAllocationQueueSection';

const AdminDashboard = ({ currentDate, calendarEvents }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <SimulationSection />
        <AllocationLogSection />
        <WorkingHoursSection />
        <RoutingSection />
      </div>
      <div className="lg:col-span-1 space-y-8">
        <LiveAllocationQueueSection currentDate={currentDate} calendarEvents={calendarEvents} />
      </div>
    </div>
  );
};

export default AdminDashboard;