import { test, expect } from '@playwright/test';

test('should complete an auto-scheduling flow', async ({ page }) => {
  // 1. Open the scheduling page
  await page.goto('http://localhost:3001'); // Assuming frontend runs on 3001

  // 2. Fill the form
  await page.fill('input[type="text"]', 'Fulano de Tal');
  await page.fill('input[type="tel"]', '11999999999');
  
  // 3. Submit the form
  await page.click('button[type="submit"]');

  // 4. Verify success message
  await expect(page.locator('h1')).toContainText('Agendamento Realizado!');
});
