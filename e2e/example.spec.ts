import { test, expect } from '@playwright/test';

// Basic E2E to ensure page loads and shows UI containers
// Netlify will build with "vite build" and publish "dist".

test('homepage renders core containers', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#app')).toBeVisible();
  await expect(page.locator('#booking-widget-container')).toBeVisible();
});
