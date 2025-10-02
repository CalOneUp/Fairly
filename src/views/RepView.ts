export function RepView(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'grid grid-cols-1 lg:grid-cols-3 gap-8';

  const mainCol = document.createElement('div');
  mainCol.className = 'lg:col-span-2 space-y-8';
  mainCol.appendChild(Card('🗓️ My Weekly Schedule', 'Upcoming meetings and availability.'));
  mainCol.appendChild(Card('📚 My Recent Allocations', 'Recent leads routed to me.'));

  const rightCol = document.createElement('div');
  rightCol.className = 'lg:col-span-1 space-y-8';
  rightCol.appendChild(Card('✨ My Status', 'Availability summary.'));
  rightCol.appendChild(Card('🔗 My Smart Booking Link', 'Share your personal link.'));

  el.appendChild(mainCol);
  el.appendChild(rightCol);
  return el;
}

function Card(title: string, body: string): HTMLElement {
  const el = document.createElement('div');
  el.className = 'glass-card';
  el.innerHTML = `
    <h2 class="text-xl font-semibold text-slate-800 mb-2">${title}</h2>
    <p class="text-sm text-slate-500">${body}</p>
  `;
  return el;
}
