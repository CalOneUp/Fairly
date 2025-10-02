import './style.css';
import { getCurrentRoute, onRouteChange } from '@/router';
import { mountApp } from '@/components/Layout';
import { AdminView } from '@/views/AdminView';
import { RepView } from '@/views/RepView';
import { SettingsView } from '@/views/SettingsView';

function render() {
  const app = document.getElementById('app');
  if (!app) return;
  mountApp(app, () => {
    const route = getCurrentRoute();
    switch (route.name) {
      case 'admin':
        return AdminView();
      case 'rep':
        return RepView();
      case 'settings':
        return SettingsView();
      default:
        return AdminView();
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  render();
  onRouteChange(render);
});
