import './style.css';

// Mount existing static UI logic when present
window.addEventListener('DOMContentLoaded', () => {
  // If legacy inline script functions exist, call render if available
  const maybeRender = (window as any).render;
  if (typeof maybeRender === 'function') {
    maybeRender();
  }
});
