import { test, expect, Locator } from '@playwright/test';

test('Verify city filter functionality', async ({ page }) => {
  // Open the page with cards
  await page.goto('http://localhost:5173');

  // Function to check if an element is active
  const isActive = async (locator: Locator) => {
    const classList = await locator.evaluate((el) => [...el.classList]);
    return classList.includes('tabs__item--active');
  };

  // Wait for the city links to appear
  await page.waitForSelector('.locations__item-link');

  // Loop through each city link
  for (const cityLink of await page.locator('.locations__item-link').all()) {
    // Click on the city link
    await cityLink.click();
    const currentCity = await cityLink.textContent();

    // Wait for the cards to re-render after filtering
    await page.waitForSelector('.cities__card', {
      state: 'attached',
      timeout: 5000,
    });

    // Check if the city link is active after clicking
    const hasActiveClass = await isActive(cityLink);
    expect(hasActiveClass).toBeTruthy();

    // Get the text of places found message
    const placesFoundText = await page.locator('.places__found').textContent();

    // Get the last word from the text
    const lastWord = placesFoundText?.split(' ').pop();

    // Verify that the current city matches the last word from the places found message
    expect(currentCity).toBe(lastWord);
  }
});
