import { test, expect } from '@playwright/test';

test('Card load check. Main page', async ({ page }) => {

  // Открываем страницу с карточками
  page.waitForResponse(
    (resp) => resp.url().includes('/offers') && resp.status() === 200
  );

  await page.goto('http://localhost:5173');
  await page.waitForSelector('.header__nav-link');

  const titles = await page.getByTestId('cardTitle').allInnerTexts();
  expect(titles.length).toBeGreaterThan(0);
  titles.forEach((title) => title.length > 5);
});
