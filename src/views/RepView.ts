import { getState } from '@/store/state';
import { getRepStatus, getStatusInfo } from '@/store/utils';

export function RepView(): HTMLElement {
  const state = getState();
  const candidates = state.teams.flatMap((t) => t.members);
  const rep = candidates.find((m) => m.id === 101) || candidates[0]!;
  const myAllocations = state.allocationLog
    .filter((log) => log.assignedToId === rep.id)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const el = document.createElement('div');
  el.className = 'grid grid-cols-1 lg:grid-cols-3 gap-8';

  const mainCol = document.createElement('div');
  mainCol.className = 'lg:col-span-2 space-y-8';
  mainCol.appendChild(RepWeeklyScheduleCard(rep, myAllocations));
  mainCol.appendChild(RepMyAllocationsCard(myAllocations));

  const rightCol = document.createElement('div');
  rightCol.className = 'lg:col-span-1 space-y-8';
  rightCol.appendChild(RepAvailabilityCard(rep));
  rightCol.appendChild(RepSmartLinkCard(rep));

  el.appendChild(mainCol);
  el.appendChild(rightCol);
  return el;
}

function RepAvailabilityCard(rep: { id: number; name: string }): HTMLElement {
  const el = document.createElement('div');
  el.className = 'glass-card';
  const repStatus = getRepStatus(rep.id);
  const { text: statusText, bgColor, textColor } = getStatusInfo(repStatus);

  el.innerHTML = `
    <h2 class="text-xl font-semibold text-slate-800 mb-4">✨ My Status</h2>
    <div class="p-4 rounded-xl ${bgColor}">
      <p class="font-medium ${textColor} text-center text-lg">${statusText}</p>
    </div>
  `;
  return el;
}

function RepSmartLinkCard(rep: { name: string }): HTMLElement {
  const el = document.createElement('div');
  el.className = 'glass-card';
  const repLink = `https://your-platform.com/${rep.name.split(' ').join('-').toLowerCase()}`;
  el.innerHTML = `
    <h2 class="text-xl font-semibold text-slate-800 mb-2">🔗 My Smart Booking Link</h2>
    <p class="text-sm text-slate-500 mb-4">Use this link for intelligent scheduling.</p>
    <div class="flex items-center gap-2">
      <input id="smart-link-input" type="text" readonly value="${repLink}" class="bg-slate-100/80 border-transparent focus:ring-violet-500 focus:border-violet-500 rounded-lg w-full px-3 py-2 text-sm">
      <button id="copy-link-btn" class="bg-violet-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-violet-600 transition shadow-lg shadow-violet-500/20 text-sm">📋 Copy</button>
    </div>
    <p id="copy-feedback" class="text-xs text-green-600 mt-2 h-4"></p>
  `;
  el.querySelector<HTMLButtonElement>('#copy-link-btn')!.onclick = () => {
    const input = el.querySelector<HTMLInputElement>('#smart-link-input')!;
    input.select();
    document.execCommand('copy');
    const feedback = el.querySelector<HTMLElement>('#copy-feedback')!;
    feedback.textContent = 'Copied to clipboard!';
    setTimeout(() => (feedback.textContent = ''), 2000);
  };
  return el;
}

function RepWeeklyScheduleCard(
  rep: { id: number; workingHours: { start: string; end: string } },
  myAllocations: Array<{ status: string; meetingTime?: Date; leadName: string }>,
): HTMLElement {
  const el = document.createElement('div');
  el.className = 'glass-card';
  const today = new Date('2025-10-02T13:15:00+01:00');
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));

  let weekDays = Array.from({ length: 5 }).map((_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });

  const startHour = 8;
  const endHour = 18;
  const totalHours = endHour - startHour;

  let calendarHtml = `<div class="grid grid-cols-5 gap-px bg-slate-200/50 border border-slate-200/50 rounded-2xl overflow-hidden mt-4">`;

  const state = getState();
  weekDays.forEach((day) => {
    const isToday = day.toDateString() === today.toDateString();
    const blocks: Array<any> = [];
    const { start: startWork, end: endWork } = rep.workingHours;
    const [startWorkHourStr, startWorkMinuteStr] = startWork.split(':');
    const [endWorkHourStr, endWorkMinuteStr] = endWork.split(':');
    const startWorkHour = Number(startWorkHourStr);
    const startWorkMinute = Number(startWorkMinuteStr ?? 0);
    const endWorkHour = Number(endWorkHourStr);
    const endWorkMinute = Number(endWorkMinuteStr ?? 0);

    blocks.push({
      start: new Date(day).setHours(0, 0, 0, 0),
      end: new Date(day).setHours(startWorkHour, startWorkMinute, 0, 0),
      type: 'blocked',
    });
    blocks.push({
      start: new Date(day).setHours(endWorkHour, endWorkMinute, 0, 0),
      end: new Date(day).setHours(23, 59, 59, 999),
      type: 'blocked',
    });

    state.mockCalendarEvents
      .filter(
        (e: any) =>
          e.memberId === rep.id &&
          !e.allDay &&
          new Date(e.start).toDateString() === day.toDateString(),
      )
      .forEach((event: any) =>
        blocks.push({
          ...event,
          type: event.gcalStatus === 'free' ? 'available-with-event' : 'blocked',
        }),
      );

    myAllocations
      .filter(
        (a) =>
          a.status === 'Booked' &&
          a.meetingTime &&
          new Date(a.meetingTime).toDateString() === day.toDateString(),
      )
      .forEach((a) =>
        blocks.push({
          title: a.leadName,
          start: a.meetingTime,
          end: new Date((a.meetingTime as Date).getTime() + 30 * 60000),
          type: 'demo',
        }),
      );

    calendarHtml += `<div class="bg-white/50">
      <div class="p-2 border-b border-slate-200/50 text-center">
        <p class="text-xs text-slate-500">${day.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}</p>
        <p class="font-semibold text-lg ${isToday ? 'text-violet-600' : 'text-slate-700'}">${day.getDate()}</p>
      </div>
      <div class="relative h-[400px]">`;

    blocks.forEach((block) => {
      const eventStart = new Date(block.start);
      const eventEnd = new Date(block.end);
      const clampedStart = new Date(
        Math.max(eventStart.getTime(), new Date(day).setHours(startHour, 0, 0, 0)),
      );
      const clampedEnd = new Date(
        Math.min(eventEnd.getTime(), new Date(day).setHours(endHour, 0, 0, 0)),
      );
      if (clampedEnd <= clampedStart) return;
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
          content = `<p class="font-semibold truncate">💻 ${block.title}</p>`;
          break;
        case 'blocked':
          styleClass = `bg-yellow-400/80 ${block.title ? 'border-yellow-500/90 text-yellow-900' : 'border-transparent'}`;
          content = block.title ? `<p class="font-semibold truncate">⛔ ${block.title}</p>` : '';
          break;
        case 'available-with-event':
          styleClass = 'bg-green-500/20 border-green-500/80 text-green-900 border-dashed';
          content = `<p class="font-semibold truncate">🧠 ${block.title}</p>`;
          break;
      }

      if (top >= 0 && top + height <= 101) {
        calendarHtml += `<div class="absolute w-full px-2 py-1 text-xs leading-tight rounded-lg border ${styleClass}" style="top: ${top}%; height: ${height}%; left: 2px; right: 2px; width: calc(100% - 4px);">${content}</div>`;
      }
    });

    if (isToday) {
      const minutesFromStart = (today.getHours() - startHour) * 60 + today.getMinutes();
      const currentTimePosition = (minutesFromStart / (totalHours * 60)) * 100;
      calendarHtml += `<div class="absolute w-full border-t-2 border-red-500" style="top: ${currentTimePosition}%;"><div class="absolute -top-1.5 -left-1.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div></div>`;
    }

    calendarHtml += `</div></div>`;
  });

  calendarHtml += '</div>';
  el.innerHTML = `<h2 class="text-xl font-semibold text-slate-800 mb-4">🗓️ My Weekly Schedule</h2>${calendarHtml}`;
  return el;
}

function RepMyAllocationsCard(
  myAllocations: Array<{
    leadName: string;
    leadEmail: string;
    rationale: string;
    status: string;
    id: number;
  }>,
) {
  const el = document.createElement('div');
  el.className = 'glass-card';
  const rows = myAllocations
    .map((log) => {
      const statusColor =
        log.status.includes('Spam') || log.status.includes('No-show')
          ? 'bg-red-100 text-red-800'
          : log.status.includes('Qualified')
            ? 'bg-green-100 text-green-800'
            : 'bg-slate-100 text-slate-800';
      return `<tr><td class="px-4 py-3 whitespace-nowrap"><div class="text-sm font-medium text-slate-900">${log.leadName}</div><div class="text-sm text-slate-500">${log.leadEmail}</div></td><td class="px-4 py-3 text-sm text-slate-600 max-w-xs truncate">${log.rationale}</td><td class="px-4 py-3 whitespace-nowrap text-sm"><span class="px-2 py-1 rounded-md ${statusColor}">${log.status}</span></td></tr>`;
    })
    .join('');
  el.innerHTML = `<h2 class="text-xl font-semibold text-slate-800 mb-4">📚 My Recent Allocations</h2><div class="h-96 overflow-y-auto"><table class="min-w-full"><thead><tr><th class="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Lead</th><th class="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rationale</th><th class="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th></tr></thead><tbody class="divide-y divide-slate-200/50">${rows}</tbody></table></div>`;
  return el;
}
