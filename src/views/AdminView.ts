import { getState, updateAllocationStatus, updateWorkingHours } from '@/store/state';
import { getRepStatus, getStatusInfo } from '@/store/utils';

export function AdminView(): HTMLElement {
  const state = getState();
  const el = document.createElement('div');
  el.className = 'grid grid-cols-1 lg:grid-cols-3 gap-8';

  const mainCol = document.createElement('div');
  mainCol.className = 'lg:col-span-2 space-y-8';
  mainCol.appendChild(SimulationSection());
  mainCol.appendChild(AllocationLogSection());
  mainCol.appendChild(WorkingHoursSection());
  mainCol.appendChild(RoutingSection());

  const rightCol = document.createElement('div');
  rightCol.className = 'lg:col-span-1 space-y-8';
  rightCol.appendChild(LiveAllocationQueueSection());

  el.appendChild(mainCol);
  el.appendChild(rightCol);
  return el;

  function SimulationSection(): HTMLElement {
    const el = document.createElement('div');
    el.className = 'glass-card';
    el.innerHTML = `
      <h2 class="text-xl font-semibold text-slate-800 mb-2">🚀 Live Pop-up Simulation</h2>
      <p class="text-sm text-slate-500 mb-6">Test the booking flow to see the allocation queue in action.</p>
      <div class="bg-slate-50/50 p-8 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300/50">
        <h3 class="text-2xl font-bold text-slate-800">Ready to see our product in action?</h3>
        <p class="text-slate-600 mt-2 mb-6">Schedule a free, no-obligation demo with our team.</p>
        <button id="start-simulation-btn" class="bg-violet-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-violet-600 transition shadow-lg shadow-violet-500/20 text-lg">Book a Demo Call</button>
      </div>
    `;
    el.querySelector<HTMLButtonElement>('#start-simulation-btn')!.onclick = () =>
      (window as any).showBookingWidget?.(1);
    return el;
  }

  function LiveAllocationQueueSection(): HTMLElement {
    const el = document.createElement('div');
    el.className = 'glass-card';
    const sections = state.teams
      .map((team) => {
        const lastAssignedIndex = parseInt(localStorage.getItem(`lastIndex_${team.id}`) || '-1');
        let membersInOrder = [...team.members];
        if (lastAssignedIndex !== -1 && membersInOrder.length > 1) {
          const nextIndex = (lastAssignedIndex + 1) % membersInOrder.length;
          membersInOrder = [
            ...membersInOrder.slice(nextIndex),
            ...membersInOrder.slice(0, nextIndex),
          ];
        }
        const rows = membersInOrder
          .map((member, index) => {
            const currentStatus = getRepStatus(member.id);
            const isNextUp = index === 0 && currentStatus === 'Available';
            const statusInfo = getStatusInfo(currentStatus);
            const leadCount = state.allocationLog.filter(
              (l) => l.assignedToId === member.id,
            ).length;
            return `<div class="flex justify-between items-center text-sm p-3 rounded-xl ${isNextUp ? 'bg-violet-500/10' : 'bg-slate-500/10'}"><div><p class="font-medium text-slate-800 flex items-center">${member.name} ${isNextUp ? '<span class="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-violet-500 text-white">Next Up ➡️</span>' : ''}</p><p class="text-slate-500 text-xs">Leads This Week: ${leadCount}</p></div><div class="text-right"><span class="px-2 py-1 text-xs font-medium rounded-full ${statusInfo.color}">${statusInfo.text}</span></div></div>`;
          })
          .join('');
        return `<div class="p-2"><h3 class="font-semibold text-slate-700">${team.name}</h3><div class="mt-4 space-y-2">${rows || '<p class="text-sm text-slate-400">No members in this team.</p>'}</div></div>`;
      })
      .join('<hr class="my-4 border-slate-200/50">');
    el.innerHTML = `<h2 class="text-xl font-semibold text-slate-800 mb-4">📊 Live Allocation Queue</h2><div class="space-y-4">${sections}</div>`;
    return el;
  }

  function AllocationLogSection(): HTMLElement {
    const el = document.createElement('div');
    el.className = 'glass-card';
    const rows = state.allocationLog
      .map((log) => {
        const rep = state.teams.flatMap((t) => t.members).find((m) => m.id === log.assignedToId);
        const statusColor =
          log.status.includes('Spam') || log.status.includes('No-show')
            ? 'bg-red-100 text-red-800'
            : log.status.includes('Qualified')
              ? 'bg-green-100 text-green-800'
              : 'bg-slate-100 text-slate-800';
        return `<tr><td class="px-4 py-3 whitespace-nowrap"><div class="text-sm font-medium text-slate-900">${log.leadName}</div><div class="text-sm text-slate-500">${log.leadEmail}</div></td><td class="px-4 py-3 text-sm text-slate-600 max-w-xs truncate">${log.rationale}</td><td class="px-4 py-3 whitespace-nowrap text-sm text-slate-600">${rep ? rep.name : 'N/A'}</td><td class="px-4 py-3 whitespace-nowrap text-sm"><select data-log-id="${log.id}" class="status-select bg-transparent font-semibold rounded-md border-0 focus:ring-2 focus:ring-violet-500 text-sm ${statusColor.replace('bg-', 'text-')}"><option ${log.status === 'Booked' ? 'selected' : ''}>🗓️ Booked</option><option ${log.status === 'Meeting Held, Qualified' ? 'selected' : ''}>✅ Qualified</option><option ${log.status === 'Meeting Held, Not a Fit' ? 'selected' : ''}>❌ Not a Fit</option><option ${log.status === 'No-show' ? 'selected' : ''}>👻 No-show</option><option ${log.status === 'Spam/Invalid' ? 'selected' : ''}>🗑️ Spam</option></select></td></tr>`;
      })
      .join('');
    el.innerHTML = `<h2 class="text-xl font-semibold text-slate-800 mb-4">📋 Allocation Log</h2><div class="h-96 overflow-y-auto"><table class="min-w-full"><thead><tr><th class="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Lead</th><th class="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Routing Rationale</th><th class="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Assigned To</th><th class="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status & Outcome</th></tr></thead><tbody class="divide-y divide-slate-200/50">${rows}</tbody></table></div>`;
    el.querySelectorAll<HTMLSelectElement>('.status-select').forEach((select) => {
      select.onchange = (e) => {
        const logId = parseInt((e.target as HTMLSelectElement).dataset['logId']!);
        updateAllocationStatus(logId, (e.target as HTMLSelectElement).value);
      };
    });
    return el;
  }

  function WorkingHoursSection(): HTMLElement {
    const el = document.createElement('div');
    el.className = 'glass-card';
    let membersHtml = `<div class="space-y-4">`;
    state.teams
      .flatMap((t) => t.members)
      .forEach((rep) => {
        membersHtml += `
        <div class="grid grid-cols-1 md:grid-cols-3 items-center gap-4 p-2 border-b border-slate-200/50">
          <p class="font-semibold text-slate-800">${rep.name}</p>
          <div class="flex items-center gap-2 col-span-2">
            <input type="time" data-member-id="${rep.id}" data-type="start" value="${rep.workingHours.start}" class="working-hours-input bg-slate-100/80 border-transparent focus:ring-violet-500 focus:border-violet-500 rounded-lg w-full px-3 py-2 text-sm">
            <span class="text-slate-500">-</span>
            <input type="time" data-member-id="${rep.id}" data-type="end" value="${rep.workingHours.end}" class="working-hours-input bg-slate-100/80 border-transparent focus:ring-violet-500 focus:border-violet-500 rounded-lg w-full px-3 py-2 text-sm">
          </div>
        </div>`;
      });
    membersHtml += `</div>
      <div class="flex justify-end mt-6">
        <button id="save-hours-btn" class="bg-violet-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-violet-600 transition shadow-lg shadow-violet-500/20">Save Changes</button>
      </div>`;
    el.innerHTML = `<h2 class="text-xl font-semibold text-slate-800 mb-4">⏰ Team Working Hours</h2>${membersHtml}`;
    el.querySelector<HTMLButtonElement>('#save-hours-btn')!.onclick = () => {
      el.querySelectorAll<HTMLInputElement>('.working-hours-input').forEach((input) => {
        const memberId = parseInt(input.dataset['memberId']!);
        const type = input.dataset['type'] as 'start' | 'end';
        updateWorkingHours(memberId, type, input.value);
      });
      const btn = el.querySelector<HTMLButtonElement>('#save-hours-btn')!;
      btn.textContent = 'Saved!';
      btn.classList.add('bg-green-500', 'hover:bg-green-600');
      btn.classList.remove('bg-violet-500', 'hover:bg-violet-600');
      setTimeout(() => {
        btn.textContent = 'Save Changes';
        btn.classList.remove('bg-green-500', 'hover:bg-green-600');
        btn.classList.add('bg-violet-500', 'hover:bg-violet-600');
      }, 1200);
    };
    return el;
  }

  function RoutingSection(): HTMLElement {
    const el = document.createElement('div');
    el.className = 'glass-card';
    let eventsHtml = '';
    state.eventTypes.forEach((event) => {
      let rulesHtml = event.rules
        .map((ruleGroup) => {
          const team = state.teams.find((t) => t.id === ruleGroup.teamId);
          const conditionsHtml = ruleGroup.conditions
            .map((cond) => {
              const conditionText = { gt: '>', lte: '≤', eq: '=' }[cond.condition];
              const fieldText = { companySize: 'Company Size' }[cond.field] || cond.field;
              return `<span class="font-normal">${fieldText} ${conditionText} ${cond.value}</span>`;
            })
            .join('<span class="font-bold text-slate-500 mx-2">AND</span>');
          return `<div class="p-3 bg-slate-500/10 rounded-xl"><p class="text-sm text-slate-600"><span class="font-semibold text-slate-500">IF</span> ${conditionsHtml} <span class="font-semibold text-slate-500">THEN</span> route to <span class="font-medium text-violet-600">${team ? team.name : 'N/A'}</span></p></div>`;
        })
        .join('<div class="text-center my-2 text-slate-400 font-semibold text-sm">OR</div>');
      const catchAllTeam = state.teams.find((t) => t.id === event.catchAllTeamId);
      const catchAllHtml = `<div class="mt-3 p-3 bg-violet-500/10 border border-violet-500/20 rounded-xl"><p class="text-sm text-violet-700"><span class="font-semibold text-violet-800">Catch-all:</span> If no rules match, route to <span class="font-medium text-violet-600">${catchAllTeam ? catchAllTeam.name : 'None'}</span>.</p></div>`;
      if (rulesHtml === '') {
        rulesHtml = `<p class="text-sm text-slate-400 text-center py-4">No specific routing rules for this event.</p>`;
      }
      eventsHtml += `<div class="border border-slate-200/50 p-4 rounded-2xl"><h3 class="font-semibold text-slate-800">${event.name}</h3><div class="mt-4">${rulesHtml}</div>${catchAllHtml}</div>`;
    });
    el.innerHTML = `<h2 class="text-xl font-semibold text-slate-800 mb-4">🧠 Routing Rules</h2><div class="space-y-6">${eventsHtml}</div>`;
    return el;
  }
}
