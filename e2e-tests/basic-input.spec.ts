import { test, expect, Locator, Page } from '@playwright/test';

async function addWaypoint(page: Page, options: { name: string, address: string, button?: Locator }) {
  const button = options.button ?? page.getByTestId('add-location').nth(0);
  await button.click();

  const dialog = page.locator('mat-dialog-container');
  const name = dialog.locator('input[name="name"]');
  const address = dialog.locator('input[name="address"]');

  await expect(dialog).toContainText('Zielort hinzufügen');

  await name.fill(options.name);
  await address.fill(options.address);

  await dialog.getByRole('button', { name: 'Hinzufügen' }).click();
}


async function enterDistance(page: Page, options: { distance: number, button?: Locator }) {

  const button = options.button ?? page.getByTestId('edit-distance').nth(0);
  await button.click();

  const dialog = page.locator('mat-dialog-container');
  const distance = dialog.locator('input[name="distance"]');

  await expect(dialog).toContainText('Entfernung ändern');

  await distance.fill(options.distance.toString());

  await dialog.getByRole('button', { name: 'Ändern' }).nth(0).click();
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('add new location', async ({ page }) => {

  await page.click('mat-select[name="month"]');
  await page.click('//mat-option[contains(.,"Mai")]');

  await page.click('mat-select[name="year"]');
  await page.click('//mat-option[contains(.,"2022")]');

  const dayView = page.locator('app-day-view').nth(0);
  const dayEdit = page.locator('app-day-edit').nth(0);

  await addWaypoint(page, { name: 'Waypoint 1', address: 'Zwickauer Straße 16, Chemnitz', button: dayEdit.getByTestId('add-location') });
  await expect(dayEdit.locator('mat-list-item').nth(0)).toContainText('Waypoint 1');

  await addWaypoint(page, { name: 'Waypoint 2', address: 'Augustusburger Str. 265, Chemnitz', button: dayEdit.getByTestId('add-location') });
  await expect(dayEdit.locator('mat-list-item').nth(1)).toContainText('Waypoint 2');

  await dayEdit.getByPlaceholder('Zielort auswählen').click();
  await page.click('//mat-option[contains(.,"Waypoint 1")]');
  await expect(dayEdit.locator('mat-list-item').nth(2)).toContainText('Waypoint 1');

  await enterDistance(page, { distance: 10.5, button: dayView.getByTestId('edit-distance').first() });
  await enterDistance(page, { distance: 12, button: dayView.getByTestId('edit-distance').first() });

  await expect(dayView).toContainText('Gesamt: 22.5 km');

});


