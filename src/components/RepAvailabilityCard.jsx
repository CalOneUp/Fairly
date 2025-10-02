import React from 'react';
import Card from './Card';
import { getRepStatus, getStatusInfo } from '../mockData';

const RepAvailabilityCard = ({ rep, currentDate, calendarEvents }) => {
  const repStatus = getRepStatus(rep.id, currentDate, calendarEvents);
  const { text: statusText, bgColor, textColor } = getStatusInfo(repStatus);

  return (
    <Card>
      <h2 className="text-xl font-semibold text-slate-800 mb-4">✨ My Status</h2>
      <div className={`p-4 rounded-xl ${bgColor}`}>
        <p className={`font-medium ${textColor} text-center text-lg`}>{statusText}</p>
      </div>
      <div className="mt-4 p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl">
        <div className="flex">
          <div className="flex-shrink-0"><span className="text-xl">🗓️</span></div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-violet-800">How to manage your availability</h3>
            <div className="mt-2 text-sm text-violet-700">
              <p>To block out time, add an event to Google Calendar and set its status to "Busy". Events marked "Free" (like focus time) will be ignored.</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RepAvailabilityCard;