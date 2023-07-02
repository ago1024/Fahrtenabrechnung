import { test, expect } from '@playwright/test';

test('select month and year', async ({ page }) => {
  await page.goto('/');

  await page.click('mat-select[name="month"]');
  await page.click('//mat-option[contains(.,"Mai")]');

  await page.click('mat-select[name="year"]');
  await page.click('//mat-option[contains(.,"2022")]');

  await expect(page.locator('app-day-date').nth(0)).toContainText('1. Mai 2022');
  await expect(page.locator('app-day-date').nth(30)).toContainText('31. Mai 2022');
});
