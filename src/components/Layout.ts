import { getCurrentRoute, navigate } from '@/router';

export function mountApp(container: HTMLElement, renderView: () => HTMLElement) {
  container.innerHTML = '';
  container.appendChild(Sidebar());
  const mainWrapper = document.createElement('div');
  mainWrapper.className = 'flex-1 flex flex-col h-screen overflow-y-auto';
  mainWrapper.appendChild(AppHeader());
  const content = document.createElement('main');
  content.className = 'flex-1 p-6 lg:p-8';
  content.appendChild(renderView());
  mainWrapper.appendChild(content);
  container.appendChild(mainWrapper);
}

export function Sidebar(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'w-64 glass-sidebar border-r border-slate-200/50 flex-shrink-0 flex flex-col';
  const isAdmin = getCurrentRoute().name === 'admin';
  const isRep = getCurrentRoute().name === 'rep';
  const isSettings = getCurrentRoute().name === 'settings';
  el.innerHTML = `
    <div class="p-4 border-b border-slate-200/50">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-violet-500 rounded-lg flex items-center justify-center text-white font-logo text-2xl shadow-lg shadow-violet-500/30">F</div>
        <h1 class="text-2xl font-bold text-slate-800 font-logo">Fairly</h1>
      </div>
    </div>
    <nav class="flex-1 p-4 space-y-2">
      <a href="#admin" id="nav-admin" class="flex items-center gap-3 px-3 py-2 rounded-lg transition ${isAdmin ? 'bg-violet-500/20 text-violet-700' : 'text-slate-600 hover:bg-slate-500/10'}">
        <span class="font-semibold">Admin Dashboard</span>
      </a>
      <a href="#rep" id="nav-rep" class="flex items-center gap-3 px-3 py-2 rounded-lg transition ${isRep ? 'bg-violet-500/20 text-violet-700' : 'text-slate-600 hover:bg-slate-500/10'}">
        <span class="font-semibold">My Dashboard</span>
      </a>
      <a href="#settings" id="nav-settings" class="flex items-center gap-3 px-3 py-2 rounded-lg transition ${isSettings ? 'bg-violet-500/20 text-violet-700' : 'text-slate-600 hover:bg-slate-500/10'}">
        <span class="font-semibold">Settings</span>
      </a>
    </nav>
  `;
  el.querySelector('#nav-admin')?.addEventListener('click', () => navigate('admin'));
  el.querySelector('#nav-rep')?.addEventListener('click', () => navigate('rep'));
  el.querySelector('#nav-settings')?.addEventListener('click', () => navigate('settings'));
  return el;
}

export function AppHeader(): HTMLElement {
  const el = document.createElement('header');
  el.className =
    'glass-header border-b border-slate-200/50 p-4 sticky top-0 z-10 flex items-center justify-between';
  el.innerHTML = `
    <div class="relative w-full max-w-xs">
      <input type="text" placeholder="Find anything..." class="bg-slate-100/80 border-transparent focus:ring-violet-500 focus:border-violet-500 rounded-lg w-full pl-3 pr-2 py-1.5">
    </div>
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-full bg-slate-300" aria-hidden="true"></div>
        <div>
          <p class="font-semibold text-sm text-slate-800">Admin User</p>
          <p class="text-xs text-slate-500">admin@example.com</p>
        </div>
      </div>
    </div>
  `;
  return el;
}
