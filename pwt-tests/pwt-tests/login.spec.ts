import { test, expect } from '@playwright/test';

test.describe('Login Form', () => {
  test('Auth success check', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    await page.fill('input[name="email"]', 'user@mail.com');
    await page.fill('input[name="password"]', '1d');

    await Promise.all([
      page.waitForURL('http://localhost:5173'),
      page.click('button[type="submit"]'),
    ]);
  });

  test('Login fail. Invalid password', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    await page.fill('input[name="email"]', 'user@mail.com');
    await page.fill('input[name="password"]', 'qwe');

    await page.click('button[type="submit"]'); // Клик по кнопке "Sign in"

    await page.isVisible(
      "text='The password must consist of at least one English letter and one symbol without spaces.'"
    );

    expect(page.url()).toBe('http://localhost:5173/login');
  });
});
