import { expect, test } from '@playwright/test';

test('Import and export', async ({ page }) => {

  await page.locator('input[type="file"]').setInputFiles('e2e-tests/import.json');

  await page.click('mat-select[name="month"]');
  await page.click('//mat-option[contains(.,"Mai")]');

  await page.click('mat-select[name="year"]');
  await page.click('//mat-option[contains(.,"2022")]');

  const dayView = page.locator('app-day-view').nth(0);
  const dayEdit = page.locator('app-day-edit').nth(0);

  await expect(dayEdit.locator('mat-list-item').nth(0)).toContainText('Waypoint 1');
  await expect(dayEdit.locator('mat-list-item').nth(1)).toContainText('Waypoint 2');
  await expect(dayEdit.locator('mat-list-item').nth(2)).toContainText('Waypoint 1');

  await expect(dayView).toContainText('Gesamt: 22.5 km');

  const downloadPromise = page.waitForEvent('download');
  await page.getByTestId('export').click();
  await downloadPromise;

});

test('Export empty', async ({ page }) => {

  const downloadPromise = page.waitForEvent('download');
  await page.getByTestId('export').click();
  await downloadPromise;

});
