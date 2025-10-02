import React from 'react';
import Card from './Card';
import { mockTeams, mockAllocationLog, getRepStatus, getStatusInfo } from '../mockData';

const LiveAllocationQueueSection = ({ currentDate, calendarEvents }) => {
  return (
    <Card>
      <h2 className="text-xl font-semibold text-slate-800 mb-4">📊 Live Allocation Queue</h2>
      <div className="space-y-4">
        {mockTeams.map((team, teamIndex) => {
          const lastAssignedIndex = -1; // Simplified for now
          let membersInOrder = [...team.members];
          if (lastAssignedIndex !== -1 && membersInOrder.length > 1) {
            const nextIndex = (lastAssignedIndex + 1) % membersInOrder.length;
            membersInOrder = [...membersInOrder.slice(nextIndex), ...membersInOrder.slice(0, nextIndex)];
          }

          return (
            <div key={team.id}>
              <h3 className="font-semibold text-slate-700">{team.name}</h3>
              <div className="mt-4 space-y-2">
                {membersInOrder.map((member, memberIndex) => {
                  const currentStatus = getRepStatus(member.id, currentDate, calendarEvents);
                  const isNextUp = memberIndex === 0 && currentStatus === 'Available';
                  const statusInfo = getStatusInfo(currentStatus);
                  const leadCount = mockAllocationLog.filter(l => l.assignedToId === member.id).length;

                  return (
                    <div key={member.id} className={`flex justify-between items-center text-sm p-3 rounded-xl ${isNextUp ? 'bg-violet-500/10' : 'bg-slate-500/10'}`}>
                      <div>
                        <p className="font-medium text-slate-800 flex items-center">
                          {member.name}
                          {isNextUp && <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-violet-500 text-white">Next Up ➡️</span>}
                        </p>
                        <p className="text-slate-500 text-xs">Leads This Week: {leadCount}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}>
                          {statusInfo.text}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {teamIndex < mockTeams.length - 1 && <hr className="my-4 border-slate-200/50" />}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default LiveAllocationQueueSection;