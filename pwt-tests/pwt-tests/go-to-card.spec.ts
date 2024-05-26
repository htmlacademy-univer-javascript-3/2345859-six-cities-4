import { test, expect } from '@playwright/test';

test('Verify transition to card details page', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('http://localhost:5173');

  // Wait for the cards to load
  await page.waitForSelector('.cities__card');

  // Find the first card and retrieve its name and price
  const firstCardName = await page
    .getByTestId('cardTitle')
    .first()
    .textContent();
  const firstCardPrice = await page
    .locator('.place-card__price-value')
    .first()
    .textContent();

  // Click on the first card
  await page.locator('.cities__card').first().click();

  // Wait for the transition to the new page
  await page.waitForSelector('.offer__gallery');

  // Verify that the name and price of the first card match those on the details page
  const cardDetailsName = await page.locator('.offer__name').textContent();
  const cardDetailsPrice = await page
    .locator('.offer__price-value')
    .textContent();

  expect(cardDetailsName).toBe(firstCardName);
  expect(cardDetailsPrice).toBe(firstCardPrice);

  // Ensure that there are offer details displayed on the details page
  const offerDetails = await page.locator('.offer__inside-item').all();
  expect(offerDetails.length).toBeGreaterThan(0);
});
