import { test, expect } from '@playwright/test';

test.describe('Comment Form', () => {
  test('Comment Form. Authenticated user', async ({
    page,
  }) => {
    const REVIEW_TEXT =
      '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const RATING = 'good';

    await page.goto('http://localhost:5173/login');

    await page.fill('input[name="email"]', 'user@mail.com');
    await page.fill('input[name="password"]', '1d');

    await page.click('button[type="submit"]');

    await page.waitForSelector('.cities__card');

    await page.locator('.cities__card').first().click();

    await page.waitForSelector('.offer__gallery');
    const isFormVisible = await page.isVisible('.reviews__form');
    expect(isFormVisible).toBeTruthy();

    const commentForm = await page.locator('.reviews__form');
    expect(commentForm).toBeTruthy();
    await page.fill('[name="review"]', REVIEW_TEXT);
    await page.getByTitle(RATING).click();

    await Promise.all([
      page.waitForResponse(
        (resp) => resp.url().includes('/comments') && resp.status() === 201
      ),
      page.click('button[type="submit"]'),
    ]);

    const reviewText = await page.locator('.reviews__text').first().textContent();
    const reviewAuthor = await page.locator('.reviews__user-name').first().textContent();
    const reviewRating = await page.locator('.reviews__stars>span').first().getAttribute('style');

    expect(reviewText).toBe(REVIEW_TEXT);
    expect(reviewAuthor).toBe('user');
    expect(reviewRating).toBe('width: 80%;');
  });

  test('Comment Form. Unauthenticated user', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173');

    await page.waitForSelector('.cities__card');

    await page.locator('.cities__card').first().click();
    await page.waitForSelector('.offer__gallery');

    const isCommentFormVisible = await page.locator('.reviews__form').isVisible();
    expect(isCommentFormVisible).toBeFalsy();
  });
});
