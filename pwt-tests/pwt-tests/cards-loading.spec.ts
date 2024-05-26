import { test, expect } from '@playwright/test';

test('Verify card loading on the homepage', async ({ page }) => {
  // Wait for the response that contains the card data
  page.waitForResponse(
    (response) =>
      response.url().includes('/offers') && response.status() === 200
  );

  // Navigate to the homepage
  await page.goto('http://localhost:5173');

  // Wait for the navigation links in the header to appear
  await page.waitForSelector('.header__nav-link');

  // Retrieve all card titles using the data-testid attribute
  const cardTitles = await page.getByTestId('cardTitle').allInnerTexts();

  // Verify that there is at least one card title
  expect(cardTitles.length).toBeGreaterThan(0);

  // Check that each card title has more than 5 characters
  cardTitles.forEach((title) => expect(title.length).toBeGreaterThan(5));
});
