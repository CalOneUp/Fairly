export type RouteName = 'admin' | 'rep' | 'settings';

export interface Route {
  name: RouteName;
}

const listeners = new Set<() => void>();

export function getCurrentRoute(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const name = (hash || 'admin') as RouteName;
  return { name };
}

export function navigate(name: RouteName) {
  const current = getCurrentRoute();
  if (current.name === name) return;
  window.location.hash = name;
}

export function onRouteChange(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

window.addEventListener('hashchange', () => {
  for (const l of listeners) l();
});
