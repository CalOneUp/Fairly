(function () {
  const s = document.createElement('link').relList;
  if (s && s.supports && s.supports('modulepreload')) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) a(o);
  new MutationObserver((o) => {
    for (const n of o)
      if (n.type === 'childList')
        for (const l of n.addedNodes) l.tagName === 'LINK' && l.rel === 'modulepreload' && a(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(o) {
    const n = {};
    return (
      o.integrity && (n.integrity = o.integrity),
      o.referrerPolicy && (n.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === 'use-credentials'
        ? (n.credentials = 'include')
        : o.crossOrigin === 'anonymous'
          ? (n.credentials = 'omit')
          : (n.credentials = 'same-origin'),
      n
    );
  }
  function a(o) {
    if (o.ep) return;
    o.ep = !0;
    const n = e(o);
    fetch(o.href, n);
  }
})();
let m = {
    teams: [
      {
        id: 1,
        name: 'Sales Team A (Large Enterprise)',
        members: [
          {
            id: 101,
            name: 'Alice Johnson',
            email: 'alice@example.com',
            weight: 8,
            workingHours: { start: '09:00', end: '17:30' },
          },
          {
            id: 102,
            name: 'Bob Williams',
            email: 'bob@example.com',
            weight: 5,
            workingHours: { start: '09:00', end: '17:30' },
          },
        ],
      },
      {
        id: 2,
        name: 'Sales Team B (Mid-Market)',
        members: [
          {
            id: 201,
            name: 'Charlie Brown',
            email: 'charlie@example.com',
            weight: 7,
            workingHours: { start: '08:30', end: '17:00' },
          },
        ],
      },
      {
        id: 3,
        name: 'Support Specialists',
        members: [
          {
            id: 301,
            name: 'Diana Prince',
            email: 'diana@example.com',
            weight: 10,
            workingHours: { start: '09:00', end: '17:00' },
          },
        ],
      },
    ],
    eventTypes: [
      {
        id: 1,
        name: '30-Minute Product Demo',
        duration: 30,
        rules: [
          { teamId: 1, conditions: [{ field: 'companySize', condition: 'gt', value: 500 }] },
          { teamId: 2, conditions: [{ field: 'companySize', condition: 'lte', value: 500 }] },
        ],
        catchAllTeamId: 2,
      },
    ],
    allocationLog: [
      {
        id: 1,
        leadName: 'John Doe',
        leadEmail: 'john.doe@acmetech.com',
        rationale: 'Rule Match: Company Size > 500',
        assignedToId: 101,
        timestamp: new Date(Date.now() - 36e5),
        status: 'Booked',
        meetingTime: new Date('2025-10-02T13:00:00'),
      },
      {
        id: 2,
        leadName: 'Jane Smith',
        leadEmail: 'jane.smith@globalbank.com',
        rationale: 'Catch-all Assignment',
        assignedToId: 201,
        timestamp: new Date(Date.now() - 72e5),
        status: 'Meeting Held, Qualified',
      },
      {
        id: 5,
        leadName: 'Upcoming Demo',
        leadEmail: 'future@demo.com',
        rationale: 'Rule Match: Company Size > 500',
        assignedToId: 101,
        timestamp: new Date(Date.now() - 3e5),
        status: 'Booked',
        meetingTime: new Date('2025-10-03T10:00:00'),
      },
      {
        id: 6,
        leadName: 'Future Prospect',
        leadEmail: 'prospect@new.co',
        rationale: 'Catch-all Assignment',
        assignedToId: 101,
        timestamp: new Date('2025-10-02T10:00:00'),
        status: 'Booked',
        meetingTime: new Date('2025-10-02T15:00:00'),
      },
    ],
    mockCalendarEvents: [
      {
        memberId: 102,
        title: 'Out of Office',
        allDay: !0,
        date: new Date('2025-10-02'),
        gcalStatus: 'busy',
      },
      {
        memberId: 101,
        title: 'Internal Sync',
        start: new Date('2025-10-02T11:00:00'),
        end: new Date('2025-10-02T12:00:00'),
        gcalStatus: 'busy',
      },
      {
        memberId: 101,
        title: 'Focus Time',
        start: new Date('2025-10-02T14:00:00'),
        end: new Date('2025-10-02T15:00:00'),
        gcalStatus: 'free',
      },
      {
        memberId: 201,
        title: 'Dentist Appointment',
        start: new Date('2025-10-02T14:00:00'),
        end: new Date('2025-10-02T15:00:00'),
        gcalStatus: 'busy',
      },
    ],
  },
  u = {
    currentView: 'admin',
    loggedInRepId: 101,
    currentDate: new Date('2025-10-02T13:15:00+01:00'),
  };
const C = document.getElementById('app');
document.getElementById('booking-widget-container');
function b() {
  ((C.innerHTML = ''), C.appendChild(O()));
  const t = document.createElement('div');
  ((t.className = 'flex-1 flex flex-col h-screen overflow-y-auto'), t.appendChild(R()));
  const s = document.createElement('main');
  ((s.className = 'flex-1 p-6 lg:p-8'),
    u.currentView === 'admin' ? s.appendChild(j()) : s.appendChild(W()),
    t.appendChild(s),
    C.appendChild(t));
}
function O() {
  const t = document.createElement('div');
  t.className = 'w-64 glass-sidebar border-r border-slate-200/50 flex-shrink-0 flex flex-col';
  const s = u.currentView === 'admin';
  return (
    (t.innerHTML = `
                <div class="p-4 border-b border-slate-200/50">
                    <div class="flex items-center gap-3">
                         <div class="w-10 h-10 bg-violet-500 rounded-lg flex items-center justify-center text-white font-logo text-2xl shadow-lg shadow-violet-500/30">F</div>
                         <h1 class="text-2xl font-bold text-slate-800 font-logo">Fairly</h1>
                    </div>
                </div>
                <nav class="flex-1 p-4 space-y-2">
                    <a href="#" id="admin-view-btn" class="flex items-center gap-3 px-3 py-2 rounded-lg transition ${s ? 'bg-violet-500/20 text-violet-700' : 'text-slate-600 hover:bg-slate-500/10'}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM4 12a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM4 18a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z"></path></svg>
                        <span class="font-semibold">Admin Dashboard</span>
                    </a>
                     <a href="#" id="rep-view-btn" class="flex items-center gap-3 px-3 py-2 rounded-lg transition ${s ? 'text-slate-600 hover:bg-slate-500/10' : 'bg-violet-500/20 text-violet-700'}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        <span class="font-semibold">My Dashboard</span>
                    </a>
                </nav>
            `),
    (t.querySelector('#admin-view-btn').onclick = (e) => {
      (e.preventDefault(), (u.currentView = 'admin'), b());
    }),
    (t.querySelector('#rep-view-btn').onclick = (e) => {
      (e.preventDefault(), (u.currentView = 'rep'), b());
    }),
    t
  );
}
function R() {
  const t = document.createElement('header');
  t.className =
    'glass-header border-b border-slate-200/50 p-4 sticky top-0 z-10 flex items-center justify-between';
  const s = m.teams.flatMap((a) => a.members).find((a) => a.id === u.loggedInRepId),
    e = u.currentView === 'admin' ? { name: 'Admin User', email: 'admin@example.com' } : s;
  return (
    (t.innerHTML = `
                <div class="relative w-full max-w-xs">
                     <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                     <input type="text" placeholder="Find anything..." class="bg-slate-100/80 border-transparent focus:ring-violet-500 focus:border-violet-500 rounded-lg w-full pl-10">
                </div>
                <div class="flex items-center gap-4">
                     <button class="text-slate-500 hover:text-slate-800"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg></button>
                     <div class="flex items-center gap-2">
                         <img src="https://placehold.co/32x32/E2E8F0/4A5568?text=${e.name.charAt(0)}" class="w-8 h-8 rounded-full" alt="User profile">
                         <div>
                             <p class="font-semibold text-sm text-slate-800">${e.name}</p>
                             <p class="text-xs text-slate-500">${e.email}</p>
                         </div>
                     </div>
                </div>
            `),
    t
  );
}
function j() {
  const t = document.createElement('div');
  t.className = 'grid grid-cols-1 lg:grid-cols-3 gap-8';
  const s = document.createElement('div');
  ((s.className = 'lg:col-span-2 space-y-8'),
    s.appendChild(F()),
    s.appendChild(q()),
    s.appendChild(U()),
    s.appendChild(V()));
  const e = document.createElement('div');
  return (
    (e.className = 'lg:col-span-1 space-y-8'),
    e.appendChild(z()),
    t.appendChild(s),
    t.appendChild(e),
    t
  );
}
function W() {
  const t = m.teams.flatMap((n) => n.members).find((n) => n.id === u.loggedInRepId),
    s = m.allocationLog
      .filter((n) => n.assignedToId === u.loggedInRepId)
      .sort((n, l) => l.timestamp - n.timestamp),
    e = document.createElement('div');
  e.className = 'grid grid-cols-1 lg:grid-cols-3 gap-8';
  const a = document.createElement('div');
  ((a.className = 'lg:col-span-2 space-y-8'), a.appendChild(J(t, s)), a.appendChild(_(s)));
  const o = document.createElement('div');
  return (
    (o.className = 'lg:col-span-1 space-y-8'),
    o.appendChild(P(t)),
    o.appendChild(Q(t)),
    e.appendChild(a),
    e.appendChild(o),
    e
  );
}
function F() {
  const t = document.createElement('div');
  return (
    (t.className = 'glass-card'),
    (t.innerHTML =
      '<h2 class="text-xl font-semibold text-slate-800 mb-2">🚀 Live Pop-up Simulation</h2><p class="text-sm text-slate-500 mb-6">Test the booking flow to see the allocation queue in action.</p><div class="bg-slate-50/50 p-8 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300/50"><h3 class="text-2xl font-bold text-slate-800">Ready to see our product in action?</h3><p class="text-slate-600 mt-2 mb-6">Schedule a free, no-obligation demo with our team.</p><button id="start-simulation-btn" class="bg-violet-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-violet-600 transition shadow-lg shadow-violet-500/20 text-lg">Book a Demo Call</button></div>'),
    (t.querySelector('#start-simulation-btn').onclick = () => window.showBookingWidget(1)),
    t
  );
}
function z() {
  const t = document.createElement('div');
  t.className = 'glass-card';
  let s = m.teams
    .map((e) => {
      const a = parseInt(localStorage.getItem(`lastIndex_${e.id}`) || '-1');
      let o = [...e.members];
      if (a !== -1 && o.length > 1) {
        const n = (a + 1) % o.length;
        o = [...o.slice(n), ...o.slice(0, n)];
      }
      return `<div class="p-2"><h3 class="font-semibold text-slate-700">${e.name}</h3><div class="mt-4 space-y-2">${
        o
          .map((n, l) => {
            const p = $(n.id),
              g = l === 0 && p === 'Available',
              d = T(p),
              c = m.allocationLog.filter((x) => x.assignedToId === n.id).length;
            return `<div class="flex justify-between items-center text-sm p-3 rounded-xl ${g ? 'bg-violet-500/10' : 'bg-slate-500/10'}"><div><p class="font-medium text-slate-800 flex items-center">${n.name} ${g ? '<span class="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-violet-500 text-white">Next Up ➡️</span>' : ''}</p><p class="text-slate-500 text-xs">Leads This Week: ${c}</p></div><div class="text-right"><span class="px-2 py-1 text-xs font-medium rounded-full ${d.color}">${d.text}</span></div></div>`;
          })
          .join('') || '<p class="text-sm text-slate-400">No members in this team.</p>'
      }</div></div>`;
    })
    .join('<hr class="my-4 border-slate-200/50">');
  return (
    (t.innerHTML = `<h2 class="text-xl font-semibold text-slate-800 mb-4">📊 Live Allocation Queue</h2><div class="space-y-4">${s}</div>`),
    t
  );
}
function q() {
  const t = document.createElement('div');
  t.className = 'glass-card';
  const s = `<div class="h-96 overflow-y-auto"><table class="min-w-full"><thead><tr><th class="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Lead</th><th class="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Routing Rationale</th><th class="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Assigned To</th><th class="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status & Outcome</th></tr></thead><tbody class="divide-y divide-slate-200/50">${m.allocationLog
    .map((e) => {
      const a = m.teams.flatMap((n) => n.members).find((n) => n.id === e.assignedToId),
        o =
          e.status.includes('Spam') || e.status.includes('No-show')
            ? 'bg-red-100 text-red-800'
            : e.status.includes('Qualified')
              ? 'bg-green-100 text-green-800'
              : 'bg-slate-100 text-slate-800';
      return `<tr><td class="px-4 py-3 whitespace-nowrap"><div class="text-sm font-medium text-slate-900">${e.leadName}</div><div class="text-sm text-slate-500">${e.leadEmail}</div></td><td class="px-4 py-3 text-sm text-slate-600 max-w-xs truncate">${e.rationale}</td><td class="px-4 py-3 whitespace-nowrap text-sm text-slate-600">${a ? a.name : 'N/A'}</td><td class="px-4 py-3 whitespace-nowrap text-sm"><select data-log-id="${e.id}" class="status-select bg-transparent font-semibold rounded-md border-0 focus:ring-2 focus:ring-violet-500 text-sm ${o.replace('bg-', 'text-')}"><option ${e.status === 'Booked' ? 'selected' : ''}>🗓️ Booked</option><option ${e.status === 'Meeting Held, Qualified' ? 'selected' : ''}>✅ Qualified</option><option ${e.status === 'Meeting Held, Not a Fit' ? 'selected' : ''}>❌ Not a Fit</option><option ${e.status === 'No-show' ? 'selected' : ''}>👻 No-show</option><option ${e.status === 'Spam/Invalid' ? 'selected' : ''}>🗑️ Spam</option></select></td></tr>`;
    })
    .join('')}</tbody></table></div>`;
  return (
    (t.innerHTML = `<h2 class="text-xl font-semibold text-slate-800 mb-4">📋 Allocation Log</h2> ${s}`),
    t.querySelectorAll('.status-select').forEach((e) => {
      e.onchange = (a) => {
        const o = m.allocationLog.find((n) => n.id === parseInt(a.target.dataset.logId));
        o && ((o.status = a.target.value), b());
      };
    }),
    t
  );
}
function U() {
  const t = document.createElement('div');
  t.className = 'glass-card';
  let s = '<div class="space-y-4">';
  return (
    m.teams
      .flatMap((e) => e.members)
      .forEach((e) => {
        s += `
                    <div class="grid grid-cols-1 md:grid-cols-3 items-center gap-4 p-2 border-b border-slate-200/50">
                        <p class="font-semibold text-slate-800">${e.name}</p>
                        <div class="flex items-center gap-2 col-span-2">
                            <input type="time" data-member-id="${e.id}" data-type="start" value="${e.workingHours.start}" class="working-hours-input bg-slate-100/80 border-transparent focus:ring-violet-500 focus:border-violet-500 rounded-lg w-full px-3 py-2 text-sm">
                            <span class="text-slate-500">-</span>
                            <input type="time" data-member-id="${e.id}" data-type="end" value="${e.workingHours.end}" class="working-hours-input bg-slate-100/80 border-transparent focus:ring-violet-500 focus:border-violet-500 rounded-lg w-full px-3 py-2 text-sm">
                        </div>
                    </div>
                `;
      }),
    (s += `</div>
                <div class="flex justify-end mt-6">
                    <button id="save-hours-btn" class="bg-violet-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-violet-600 transition shadow-lg shadow-violet-500/20">Save Changes</button>
                </div>
            `),
    (t.innerHTML = `<h2 class="text-xl font-semibold text-slate-800 mb-4">⏰ Team Working Hours</h2>${s}`),
    (t.querySelector('#save-hours-btn').onclick = () => {
      t.querySelectorAll('.working-hours-input').forEach((a) => {
        const o = parseInt(a.dataset.memberId),
          n = a.dataset.type,
          l = m.teams.flatMap((p) => p.members).find((p) => p.id === o);
        l && (l.workingHours[n] = a.value);
      });
      const e = t.querySelector('#save-hours-btn');
      ((e.textContent = 'Saved!'),
        e.classList.add('bg-green-500', 'hover:bg-green-600'),
        e.classList.remove('bg-violet-500', 'hover:bg-violet-600'),
        setTimeout(() => {
          ((e.textContent = 'Save Changes'),
            e.classList.remove('bg-green-500', 'hover:bg-green-600'),
            e.classList.add('bg-violet-500', 'hover:bg-violet-600'),
            b());
        }, 1500));
    }),
    t
  );
}
function V() {
  const t = document.createElement('div');
  t.className = 'glass-card';
  let s = '';
  return (
    m.eventTypes.forEach((e) => {
      let a = e.rules
        .map((l) => {
          const p = m.teams.find((d) => d.id === l.teamId);
          return `<div class="p-3 bg-slate-500/10 rounded-xl"><p class="text-sm text-slate-600"><span class="font-semibold text-slate-500">IF</span> ${l.conditions
            .map((d) => {
              const c = { gt: '>', lte: '≤', eq: '=' }[d.condition];
              return `<span class="font-normal">${{ companySize: 'Company Size' }[d.field] || d.field} ${c} ${d.value}</span>`;
            })
            .join(
              '<span class="font-bold text-slate-500 mx-2">AND</span>',
            )} <span class="font-semibold text-slate-500">THEN</span> route to <span class="font-medium text-violet-600">${p ? p.name : 'N/A'}</span></p></div>`;
        })
        .join('<div class="text-center my-2 text-slate-400 font-semibold text-sm">OR</div>');
      const o = m.teams.find((l) => l.id === e.catchAllTeamId),
        n = `<div class="mt-3 p-3 bg-violet-500/10 border border-violet-500/20 rounded-xl"><p class="text-sm text-violet-700"><span class="font-semibold text-violet-800">Catch-all:</span> If no rules match, route to <span class="font-medium text-violet-600">${o ? o.name : 'None'}</span>.</p></div>`;
      (a === '' &&
        (a =
          '<p class="text-sm text-slate-400 text-center py-4">No specific routing rules for this event.</p>'),
        (s += `<div class="border border-slate-200/50 p-4 rounded-2xl"><h3 class="font-semibold text-slate-800">${e.name}</h3><div class="mt-4">${a}</div>${n}</div>`));
    }),
    (t.innerHTML = `<h2 class="text-xl font-semibold text-slate-800 mb-4">🧠 Routing Rules</h2><div class="space-y-6">${s}</div>`),
    t
  );
}
function P(t) {
  const s = document.createElement('div');
  s.className = 'glass-card';
  const e = $(t.id),
    { text: a, bgColor: o, textColor: n } = T(e);
  return (
    (s.innerHTML = `
                <h2 class="text-xl font-semibold text-slate-800 mb-4">✨ My Status</h2>
                <div class="p-4 rounded-xl ${o}">
                    <p class="font-medium ${n} text-center text-lg">${a}</p>
                </div>
                <div class="mt-4 p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                    <div class="flex">
                        <div class="flex-shrink-0"><span class="text-xl">🗓️</span></div>
                        <div class="ml-3">
                            <h3 class="text-sm font-medium text-violet-800">How to manage your availability</h3>
                            <div class="mt-2 text-sm text-violet-700">
                                <p>To block out time, add an event to Google Calendar and set its status to "Busy". Events marked "Free" (like focus time) will be ignored.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `),
    s
  );
}
function Q(t) {
  const s = document.createElement('div');
  s.className = 'glass-card';
  const e = `https://your-platform.com/${t.name.split(' ').join('-').toLowerCase()}`;
  return (
    (s.innerHTML = `<h2 class="text-xl font-semibold text-slate-800 mb-2">🔗 My Smart Booking Link</h2><p class="text-sm text-slate-500 mb-4">Use this link for intelligent scheduling.</p><div class="flex items-center gap-2"><input id="smart-link-input" type="text" readonly value="${e}" class="bg-slate-100/80 border-transparent focus:ring-violet-500 focus:border-violet-500 rounded-lg w-full px-3 py-2 text-sm"><button id="copy-link-btn" class="bg-violet-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-violet-600 transition shadow-lg shadow-violet-500/20 text-sm">📋 Copy</button></div><p id="copy-feedback" class="text-xs text-green-600 mt-2 h-4"></p>`),
    (s.querySelector('#copy-link-btn').onclick = () => {
      (document.getElementById('smart-link-input').select(), document.execCommand('copy'));
      const o = document.getElementById('copy-feedback');
      ((o.textContent = 'Copied to clipboard!'), setTimeout(() => (o.textContent = ''), 2e3));
    }),
    s
  );
}
function J(t, s) {
  const e = document.createElement('div');
  e.className = 'glass-card';
  const a = u.currentDate,
    o = new Date(a);
  o.setDate(a.getDate() - a.getDay() + (a.getDay() === 0 ? -6 : 1));
  let n = Array.from({ length: 5 }).map((c, x) => {
    const r = new Date(o);
    return (r.setDate(o.getDate() + x), r);
  });
  const l = 8,
    p = 18,
    g = p - l;
  let d =
    '<div class="grid grid-cols-5 gap-px bg-slate-200/50 border border-slate-200/50 rounded-2xl overflow-hidden mt-4">';
  return (
    n.forEach((c) => {
      const x = c.toDateString() === a.toDateString(),
        r = [],
        { start: H, end: M } = t.workingHours,
        [I, E] = H.split(':').map(Number),
        [N, L] = M.split(':').map(Number);
      if (
        (r.push({
          start: new Date(c).setHours(0, 0, 0, 0),
          end: new Date(c).setHours(I, E, 0, 0),
          type: 'blocked',
        }),
        r.push({
          start: new Date(c).setHours(N, L, 0, 0),
          end: new Date(c).setHours(23, 59, 59, 999),
          type: 'blocked',
        }),
        m.mockCalendarEvents
          .filter(
            (i) =>
              i.memberId === t.id &&
              !i.allDay &&
              new Date(i.start).toDateString() === c.toDateString(),
          )
          .forEach((i) =>
            r.push({ ...i, type: i.gcalStatus === 'free' ? 'available-with-event' : 'blocked' }),
          ),
        s
          .filter(
            (i) =>
              i.status === 'Booked' && new Date(i.meetingTime).toDateString() === c.toDateString(),
          )
          .forEach((i) =>
            r.push({
              title: i.leadName,
              start: i.meetingTime,
              end: new Date(i.meetingTime.getTime() + 30 * 6e4),
              type: 'demo',
            }),
          ),
        (d += `<div class="bg-white/50">
                    <div class="p-2 border-b border-slate-200/50 text-center">
                        <p class="text-xs text-slate-500">${c.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}</p>
                        <p class="font-semibold text-lg ${x ? 'text-violet-600' : 'text-slate-700'}">${c.getDate()}</p>
                    </div>
                    <div class="relative h-[400px]">`),
        r.forEach((i) => {
          const v = new Date(i.start),
            A = new Date(i.end),
            w = new Date(Math.max(v, new Date(c).setHours(l, 0, 0, 0))),
            y = new Date(Math.min(A, new Date(c).setHours(p, 0, 0, 0)));
          if (y <= w) return;
          const D = (w.getHours() - l) * 60 + w.getMinutes(),
            B = (y.getHours() - l) * 60 + y.getMinutes() - D,
            k = (D / (g * 60)) * 100,
            S = (B / (g * 60)) * 100;
          let f = '',
            h = '';
          switch (i.type) {
            case 'demo':
              ((f = 'bg-blue-500/80 border-blue-500/90 text-white'),
                (h = `<p class="font-semibold truncate">💻 ${i.title}</p>`));
              break;
            case 'blocked':
              ((f = `bg-yellow-400/80 ${i.title ? 'border-yellow-500/90 text-yellow-900' : 'border-transparent'}`),
                (h = i.title ? `<p class="font-semibold truncate">⛔ ${i.title}</p>` : ''));
              break;
            case 'available-with-event':
              ((f = 'bg-green-500/20 border-green-500/80 text-green-900 border-dashed'),
                (h = `<p class="font-semibold truncate">🧠 ${i.title}</p>`));
              break;
          }
          k >= 0 &&
            k + S <= 101 &&
            (d += `<div class="absolute w-full px-2 py-1 text-xs leading-tight rounded-lg border ${f}" style="top: ${k}%; height: ${S}%; left: 2px; right: 2px; width: calc(100% - 4px);">${h}</div>`);
        }),
        x)
      ) {
        const v = (((a.getHours() - l) * 60 + a.getMinutes()) / (g * 60)) * 100;
        d += `<div class="absolute w-full border-t-2 border-red-500" style="top: ${v}%;">
                        <div class="absolute -top-1.5 -left-1.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                    </div>`;
      }
      d += '</div></div>';
    }),
    (d += '</div>'),
    (e.innerHTML = `<h2 class="text-xl font-semibold text-slate-800 mb-4">🗓️ My Weekly Schedule</h2>${d}`),
    e
  );
}
function _(t) {
  const s = document.createElement('div');
  s.className = 'glass-card';
  const e = `<div class="h-96 overflow-y-auto"><table class="min-w-full"><thead><tr><th class="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Lead</th><th class="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rationale</th><th class="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th></tr></thead><tbody class="divide-y divide-slate-200/50">${t
    .map((a) => {
      const o =
        a.status.includes('Spam') || a.status.includes('No-show')
          ? 'bg-red-100 text-red-800'
          : a.status.includes('Qualified')
            ? 'bg-green-100 text-green-800'
            : 'bg-slate-100 text-slate-800';
      return `<tr><td class="px-4 py-3 whitespace-nowrap"><div class="text-sm font-medium text-slate-900">${a.leadName}</div><div class="text-sm text-slate-500">${a.leadEmail}</div></td><td class="px-4 py-3 text-sm text-slate-600 max-w-xs truncate">${a.rationale}</td><td class="px-4 py-3 whitespace-nowrap text-sm"><select data-log-id="${a.id}" class="status-select bg-transparent font-semibold rounded-md border-0 focus:ring-2 focus:ring-violet-500 text-sm ${o.replace('bg-', 'text-')}"><option>🗓️ Booked</option><option>✅ Qualified</option><option>❌ Not a Fit</option><option>👻 No-show</option><option>🗑️ Spam</option></select></td></tr>`;
    })
    .join('')}</tbody></table></div>`;
  return (
    (s.innerHTML = `<h2 class="text-xl font-semibold text-slate-800 mb-4">📚 My Recent Allocations</h2> ${e}`),
    s
  );
}
function $(t) {
  const s = m.teams.flatMap((r) => r.members).find((r) => r.id === t);
  if (!s) return 'Unknown';
  const e = u.currentDate,
    a = new Date(e.getFullYear(), e.getMonth(), e.getDate());
  if (
    m.mockCalendarEvents.some(
      (r) => r.memberId === t && r.allDay && r.date.getTime() === a.getTime(),
    )
  )
    return 'Out of Office';
  const [n, l] = s.workingHours.start.split(':').map(Number),
    [p, g] = s.workingHours.end.split(':').map(Number),
    d = new Date(a.getTime()).setHours(n, l, 0, 0),
    c = new Date(a.getTime()).setHours(p, g, 0, 0);
  return e.getTime() < d || e.getTime() > c
    ? 'Outside Hours'
    : m.mockCalendarEvents.some(
          (r) =>
            r.memberId === t && !r.allDay && r.gcalStatus !== 'free' && e >= r.start && e < r.end,
        )
      ? 'In a Meeting'
      : 'Available';
}
function T(t) {
  return (
    {
      Available: {
        text: '✅ Available',
        color: 'bg-green-100 text-green-800',
        bgColor: 'bg-green-500/10',
        textColor: 'text-green-800',
      },
      'Out of Office': {
        text: '🌴 Out of Office',
        color: 'bg-red-100 text-red-800',
        bgColor: 'bg-red-500/10',
        textColor: 'text-red-800',
      },
      'In a Meeting': {
        text: '👨‍💻 In a Meeting',
        color: 'bg-yellow-100 text-yellow-800',
        bgColor: 'bg-yellow-500/10',
        textColor: 'text-yellow-800',
      },
      'Outside Hours': {
        text: '🌙 Outside Hours',
        color: 'bg-slate-200 text-slate-700',
        bgColor: 'bg-slate-500/10',
        textColor: 'text-slate-600',
      },
    }[t] || {
      text: '❓ Unknown',
      color: 'bg-slate-200 text-slate-700',
      bgColor: 'bg-slate-500/10',
      textColor: 'text-slate-600',
    }
  );
}
window.showBookingWidget = () => alert('Simulation started.');
window.onload = () => {
  b();
};
window.addEventListener('DOMContentLoaded', () => {
  const t = window.render;
  typeof t == 'function' && t();
});
//# sourceMappingURL=index-CXaj84x-.js.map
