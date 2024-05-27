import { test, expect } from '@playwright/test';

test.describe('Favourites', () => {
  test('Favourites check. Unauth user', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173');

    await page.waitForSelector('.cities__card');

    await page.locator('.bookmark-button').first().click();
    await page.waitForURL('http://localhost:5173/login');

    await page.goto('http://localhost:5173');
    await page.waitForSelector('.cities__card');
    await page.locator('.cities__card').first().click();

    await page.waitForSelector('.offer__gallery');
    await page.locator('.bookmark-button').first().click();
    await page.waitForURL('http://localhost:5173/login');

    await page.goto('http://localhost:5173/favorites');
    await page.waitForURL('http://localhost:5173/login');
  });

  test('Favourites check. Auth user', async ({page,}) => {
    const isFavouriteSelected = async () => {
      const favouriteButtonClassList = await page.locator('.bookmark-button').first().evaluate(
        (el) => [...el.classList]
      );
      return favouriteButtonClassList.includes('place-card__bookmark-button--active');
    };

    const getFavouriteCount = async () => parseInt(
        (await page.locator('.header__favorite-count').textContent()) || '0'
      );

    await page.goto('http://localhost:5173/login');

    await page.fill('input[name="email"]', 'user@mail.com');
    await page.fill('input[name="password"]', '1d');

    await Promise.all([
      page.waitForURL('http://localhost:5173'), // Ожидание перехода после отправки формы
      page.click('button[type="submit"]'), // Клик по кнопке "Sign in"
    ]);

    await page.waitForSelector('.cities__card');

    const initialFavouriteCounter = await getFavouriteCount();

    const wasSelected = await isFavouriteSelected();

    await Promise.all([
      page.waitForResponse( (resp) =>
          resp.url().includes('/favorite') && resp.status() === (wasSelected ? 200 : 201)
      ),
      page.locator('.bookmark-button').first().click(),
    ]);

    const isSelected = await isFavouriteSelected();
    const changedFavouriteCounter = await getFavouriteCount();

    if (wasSelected) {
      expect(isSelected).toBeFalsy();
      expect(changedFavouriteCounter).toEqual(initialFavouriteCounter - 1);
    } else {
      expect(isSelected).toBeTruthy();
      expect(changedFavouriteCounter).toEqual(initialFavouriteCounter + 1);
    }
  });
});
