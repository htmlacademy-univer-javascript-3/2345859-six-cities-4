import { test, expect } from '@playwright/test';

test.describe('Comment Form Tests', () => {
  test('Verify comment form functionality (authenticated user)', async ({
    page,
  }) => {
    // Constants for review text and rating
    const REVIEW_TEXT =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const RATING = 'good';

    // Navigate to the login page
    await page.goto('http://localhost:5173/login');

    // Fill in login credentials and submit the form
    await page.fill('input[name="email"]', 'newUser@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Wait for the card to load on the homepage
    await page.waitForSelector('.cities__card');

    // Click on the first card
    await page.locator('.cities__card').first().click();

    // Wait for the offer gallery to load and check if the comment form exists
    await page.waitForSelector('.offer__gallery');
    const isFormExist = await page.isVisible('.reviews__form');
    expect(isFormExist).toBeTruthy();

    // Fill in the comment form with review text and rating, then submit
    await page.fill('[name="review"]', REVIEW_TEXT);
    await page.getByTitle(RATING).click();
    await page.click('button[type="submit"]');

    // Verify the submitted review details
    const newReviewText = await page
      .locator('.reviews__text')
      .first()
      .textContent();
    const newReviewAuthor = await page
      .locator('.reviews__user-name')
      .first()
      .textContent();
    const newReviewRating = await page
      .locator('.reviews__stars>span')
      .first()
      .getAttribute('style');

    // Perform assertions on the submitted review details
    expect(newReviewText).toBe(REVIEW_TEXT);
    expect(newReviewAuthor).toBe('newUser');
    expect(newReviewRating).toBe('width: 80%;');
  });

  test('Verify comment form functionality (unauthenticated user)', async ({
    page,
  }) => {
    // Navigate to the homepage
    await page.goto('http://localhost:5173');

    // Wait for the card to load on the homepage
    await page.waitForSelector('.cities__card');

    // Click on the first card
    await page.locator('.cities__card').first().click();

    // Wait for the offer gallery to load and check if the comment form exists
    await page.waitForSelector('.offer__gallery');

    // Check if the comment form exists for an unauthenticated user
    const isCommentFormExist = await page.locator('.reviews__form').isVisible();
    expect(isCommentFormExist).toBeFalsy();
  });
});
