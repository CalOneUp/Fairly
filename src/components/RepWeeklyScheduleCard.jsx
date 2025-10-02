import React from 'react';
import Card from './Card';

const RepWeeklyScheduleCard = ({ rep, myAllocations, currentDate, calendarEvents }) => {
  const today = currentDate;
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));

  const weekDays = Array.from({ length: 5 }).map((_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });

  const startHour = 8;
  const endHour = 18;
  const totalHours = endHour - startHour;

  return (
    <Card>
      <h2 className="text-xl font-semibold text-slate-800 mb-4">🗓️ My Weekly Schedule</h2>
      <div className="grid grid-cols-5 gap-px bg-slate-200/50 border border-slate-200/50 rounded-2xl overflow-hidden mt-4">
        {weekDays.map(day => {
          const isToday = day.toDateString() === today.toDateString();
          const allBlocks = [];
          const { start: startWork, end: endWork } = rep.workingHours;
          const [startWorkHour, startWorkMinute] = startWork.split(':').map(Number);
          const [endWorkHour, endWorkMinute] = endWork.split(':').map(Number);

          allBlocks.push({ start: new Date(day).setHours(0, 0, 0, 0), end: new Date(day).setHours(startWorkHour, startWorkMinute, 0, 0), type: 'blocked' });
          allBlocks.push({ start: new Date(day).setHours(endWorkHour, endWorkMinute, 0, 0), end: new Date(day).setHours(23, 59, 59, 999), type: 'blocked' });

          calendarEvents
            .filter(e => e.memberId === rep.id && !e.allDay && new Date(e.start).toDateString() === day.toDateString())
            .forEach(event => allBlocks.push({ ...event, type: event.gcalStatus === 'free' ? 'available-with-event' : 'blocked' }));

          myAllocations
            .filter(a => a.status === 'Booked' && new Date(a.meetingTime).toDateString() === day.toDateString())
            .forEach(a => allBlocks.push({ title: a.leadName, start: a.meetingTime, end: new Date(a.meetingTime.getTime() + 30 * 60000), type: 'demo' }));

          return (
            <div key={day} className="bg-white/50">
              <div className="p-2 border-b border-slate-200/50 text-center">
                <p className="text-xs text-slate-500">{day.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}</p>
                <p className={`font-semibold text-lg ${isToday ? 'text-violet-600' : 'text-slate-700'}`}>{day.getDate()}</p>
              </div>
              <div className="relative h-[400px]">
                {allBlocks.map((block, index) => {
                  const eventStart = new Date(block.start);
                  const eventEnd = new Date(block.end);
                  const clampedStart = new Date(Math.max(eventStart, new Date(day).setHours(startHour, 0, 0, 0)));
                  const clampedEnd = new Date(Math.min(eventEnd, new Date(day).setHours(endHour, 0, 0, 0)));
                  if (clampedEnd <= clampedStart) return null;
                  const startMinutes = (clampedStart.getHours() - startHour) * 60 + clampedStart.getMinutes();
                  const endMinutes = (clampedEnd.getHours() - startHour) * 60 + clampedEnd.getMinutes();
                  const durationMinutes = endMinutes - startMinutes;
                  const top = (startMinutes / (totalHours * 60)) * 100;
                  const height = (durationMinutes / (totalHours * 60)) * 100;

                  let styleClass = '';
                  let content = '';
                  switch (block.type) {
                    case 'demo':
                      styleClass = 'bg-blue-500/80 border-blue-500/90 text-white';
                      content = <p className="font-semibold truncate">💻 {block.title}</p>;
                      break;
                    case 'blocked':
                      styleClass = `bg-yellow-400/80 ${block.title ? 'border-yellow-500/90 text-yellow-900' : 'border-transparent'}`;
                      content = block.title ? <p className="font-semibold truncate">⛔ {block.title}</p> : '';
                      break;
                    case 'available-with-event':
                      styleClass = 'bg-green-500/20 border-green-500/80 text-green-900 border-dashed';
                      content = <p className="font-semibold truncate">🧠 {block.title}</p>;
                      break;
                  }

                  if (top >= 0 && (top + height) <= 101) {
                    return (
                      <div key={index} className={`absolute w-full px-2 py-1 text-xs leading-tight rounded-lg border ${styleClass}`} style={{ top: `${top}%`, height: `${height}%`, left: '2px', right: '2px', width: 'calc(100% - 4px)' }}>
                        {content}
                      </div>
                    );
                  }
                  return null;
                })}
                {isToday && (
                  <div className="absolute w-full border-t-2 border-red-500" style={{ top: `${( (today.getHours() - startHour) * 60 + today.getMinutes() ) / (totalHours * 60) * 100}%` }}>
                    <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default RepWeeklyScheduleCard;