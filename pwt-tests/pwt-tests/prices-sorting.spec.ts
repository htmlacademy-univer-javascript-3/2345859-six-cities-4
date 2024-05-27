import { test, expect } from '@playwright/test';

test('Card sort check. Price and Popular', async ({ page }) => {

  await page.goto('http://localhost:5173');
  await page.waitForSelector('.cities__card');

  const pricesBeforeSort = await page.locator('place-card__price-value').allTextContents();

  await page.click('.places__sorting-type');
  await page.click('text="Price: low to high"');

  await page.waitForSelector('.cities__card', {
    state: 'attached',
    timeout: 5000,
  });

  const pricesSortUp = (
    await page.locator('.place-card__price-value').allTextContents()
  ).map((price) => parseInt(price.replace('€', '').trim()));

  for (let i = 0; i < pricesSortUp.length - 1; i++) {
    expect(pricesSortUp[i + 1]).toBeGreaterThanOrEqual(
      pricesSortUp[i]
    );
  }

  await page.click('.places__sorting-type');
  await page.click('text="Price: high to low"');

  await page.waitForSelector('.cities__card', {
    state: 'attached',
    timeout: 5000,
  });

  const pricesSortDown = (
    await page.locator('.place-card__price-value').allTextContents()
  ).map((price) => parseInt(price.replace('€', '').trim()));

  for (let i = 0; i < pricesSortDown.length - 1; i++) {
    expect(pricesSortDown[i + 1]).toBeLessThanOrEqual(
      pricesSortDown[i]
    );
  }

  await page.click('.places__sorting-type');
  await page.click('text="Popular"');

  await page.waitForSelector('.cities__card', {
    state: 'attached',
    timeout: 5000,
  });

  const pricesSortPopular = await page
    .locator('place-card__price-value')
    .allTextContents();

  for (let i = 0; i < pricesSortPopular.length; i++) {
    pricesSortPopular[i] === pricesBeforeSort[i];
  }
});
