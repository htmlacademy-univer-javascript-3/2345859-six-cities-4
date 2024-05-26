import { test, expect } from '@playwright/test';

test.describe('Login Form', () => {
  test('Successful authentication', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:5173/login');

    // Fill in the login form
    await page.fill('input[name="email"]', 'email@example.com');
    await page.fill('input[name="password"]', 'password123');

    // Submit the form and wait for the navigation
    await Promise.all([
      page.waitForURL('http://localhost:5173'), // Wait for navigation after form submission
      page.click('button[type="submit"]'), // Click the "Sign in" button
    ]);
  });

  test('Authentication error (invalid password)', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:5173/login');

    // Fill in the login form with an invalid password
    await page.fill('input[name="email"]', 'example@example.com');
    await page.fill('input[name="password"]', 'ii');

    // Submit the form
    await page.click('button[type="submit"]'); // Click the "Sign in" button

    // Wait for the error message to be visible
    await page.isVisible(
      "text='The password must consist of at least one English letter and one symbol without spaces.'"
    );

    // Verify that the URL remains on the login page
    expect(page.url()).toBe('http://localhost:5173/login');
  });
});
