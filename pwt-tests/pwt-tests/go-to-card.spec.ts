import { test, expect } from '@playwright/test';

test('To card page transition check', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await page.waitForSelector('.cities__card');

  const firstCardTitle = await page.getByTestId('cardTitle').first().textContent();
  const firstCardPrice = await page.locator('.place-card__price-value').first().textContent();

  await page.locator('.cities__card').first().click();

  await page.waitForSelector('.offer__gallery');

  const cardDetailsTitle = await page.locator('.offer__name').textContent();
  const cardDetailsPrice = await page.locator('.offer__price-value').textContent();

  expect(cardDetailsTitle).toBe(firstCardTitle);
  expect(cardDetailsPrice).toBe(firstCardPrice);

  const offerDetails = await page.locator('.offer__inside-item').all();
  expect(offerDetails.length).toBeGreaterThan(0);
});
