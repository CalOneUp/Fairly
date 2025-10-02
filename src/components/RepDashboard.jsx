import React from 'react';
import RepWeeklyScheduleCard from './RepWeeklyScheduleCard';
import RepMyAllocationsCard from './RepMyAllocationsCard';
import RepAvailabilityCard from './RepAvailabilityCard';
import RepSmartLinkCard from './RepSmartLinkCard';

const RepDashboard = ({ rep, myAllocations, currentDate, calendarEvents }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <RepWeeklyScheduleCard
          rep={rep}
          myAllocations={myAllocations}
          currentDate={currentDate}
          calendarEvents={calendarEvents}
        />
        <RepMyAllocationsCard myAllocations={myAllocations} />
      </div>
      <div className="lg:col-span-1 space-y-8">
        <RepAvailabilityCard
          rep={rep}
          currentDate={currentDate}
          calendarEvents={calendarEvents}
        />
        <RepSmartLinkCard rep={rep} />
      </div>
    </div>
  );
};

export default RepDashboard;