type SettingsTab = 'general' | 'teams' | 'routing' | 'integrations';

export function SettingsView(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'grid grid-cols-1 lg:grid-cols-4 gap-6';

  const nav = document.createElement('aside');
  nav.className = 'glass-card p-0';
  nav.innerHTML = `
    <div class="p-4 border-b border-slate-200/50">
      <h2 class="text-lg font-semibold text-slate-800">Settings</h2>
      <p class="text-xs text-slate-500">Configure your workspace</p>
    </div>
    <nav class="p-2 space-y-1" id="settings-nav">
      ${makeItem('general', 'General')}
      ${makeItem('teams', 'Teams & Members')}
      ${makeItem('routing', 'Routing Rules')}
      ${makeItem('integrations', 'Integrations')}
    </nav>
  `;

  const content = document.createElement('section');
  content.className = 'lg:col-span-3';

  let active: SettingsTab = 'general';
  renderContent();

  nav.querySelectorAll('[data-tab]')?.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      active = (item as HTMLElement).dataset['tab'] as SettingsTab;
      renderContent();
      nav.querySelectorAll('[data-tab]')?.forEach((i) => i.classList.remove('bg-violet-500/10'));
      (item as HTMLElement).classList.add('bg-violet-500/10');
    });
  });

  function renderContent() {
    const map: Record<SettingsTab, HTMLElement> = {
      general: GeneralForm(),
      teams: TeamsForm(),
      routing: RoutingForm(),
      integrations: IntegrationsForm(),
    };
    content.innerHTML = '';
    content.appendChild(map[active]);
  }

  el.appendChild(nav);
  el.appendChild(content);
  return el;
}

function makeItem(key: SettingsTab, label: string) {
  return `<a href="#" data-tab="${key}" class="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-500/10">${label}</a>`;
}

function GeneralForm(): HTMLElement {
  const card = shell('Workspace', `Basic workspace configuration.`);
  card.querySelector('form')!.innerHTML = `
    <label class="block text-sm font-medium text-slate-700">Workspace Name</label>
    <input class="mt-1 w-full rounded-md bg-slate-100/80 border-0 focus:ring-violet-500" placeholder="Fairly" />
  `;
  return card;
}

function TeamsForm(): HTMLElement {
  const card = shell('Teams & Members', `Manage teams and members.`);
  card.querySelector('form')!.innerHTML = `
    <div class="space-y-2">
      <div class="flex gap-2">
        <input class="flex-1 rounded-md bg-slate-100/80 border-0 focus:ring-violet-500" placeholder="Team name" />
        <button class="rounded-md bg-violet-600 text-white px-3 py-2">Add Team</button>
      </div>
      <p class="text-xs text-slate-500">(Prototype form; no persistence yet)</p>
    </div>
  `;
  return card;
}

function RoutingForm(): HTMLElement {
  const card = shell('Routing Rules', `Define simple rules for allocation.`);
  card.querySelector('form')!.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
      <select class="rounded-md bg-slate-100/80 border-0 focus:ring-violet-500">
        <option>Company Size</option>
      </select>
      <select class="rounded-md bg-slate-100/80 border-0 focus:ring-violet-500">
        <option>&gt;</option>
        <option>&le;</option>
        <option>=</option>
      </select>
      <input type="number" class="rounded-md bg-slate-100/80 border-0 focus:ring-violet-500" placeholder="500" />
    </div>
  `;
  return card;
}

function IntegrationsForm(): HTMLElement {
  const card = shell('Integrations', `Connect calendars and CRMs.`);
  card.querySelector('form')!.innerHTML = `
    <div class="flex items-center justify-between">
      <span>Google Calendar</span>
      <button class="rounded-md bg-slate-200 px-3 py-1 text-sm">Connect</button>
    </div>
  `;
  return card;
}

function shell(title: string, description: string): HTMLElement {
  const el = document.createElement('div');
  el.className = 'glass-card';
  el.innerHTML = `
    <h2 class="text-xl font-semibold text-slate-800 mb-1">${title}</h2>
    <p class="text-sm text-slate-500 mb-4">${description}</p>
    <form class="space-y-3"></form>
  `;
  return el;
}
