import { test, expect } from '@playwright/test';

test.describe('Favorites', () => {
  test('Verify favorites functionality (unauthenticated user)', async ({
    page,
  }) => {
    // Navigate to the homepage
    await page.goto('http://localhost:5173');

    // Wait for the cards to load on the homepage
    await page.waitForSelector('.cities__card');

    // Click on the bookmark button of the first card
    await page.locator('.bookmark-button').first().click();

    // Wait for the page to navigate to the login page
    await page.waitForURL('http://localhost:5173/login');

    // Navigate back to the homepage
    await page.goto('http://localhost:5173');

    // Wait for the cards to load again
    await page.waitForSelector('.cities__card');

    // Click on the first card to view its details
    await page.locator('.cities__card').first().click();

    // Wait for the offer gallery to load
    await page.waitForSelector('.offer__gallery');

    // Click on the bookmark button on the details page
    await page.locator('.bookmark-button').first().click();

    // Wait for the page to navigate to the login page again
    await page.waitForURL('http://localhost:5173/login');
  });
});
