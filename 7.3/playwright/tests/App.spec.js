const { test, expect } = require('@playwright/test');
const { email, password } = require('../user.js');

test('Successful authorization', async ({ page }) => {
  // Go to https://netology.ru/?modal=sign_in
  await page.goto('https://netology.ru/?modal=sign_in');

  // Fill fields
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Пароль').fill(password);

  // Click "Войти"
  await page.getByTestId('login-submit-btn').click();

  // Check page url
  await expect(page).toHaveURL(new RegExp('^https://netology.ru/profile'));

  // Check header
  await expect(page.getByRole('heading', { name: 'Моё обучение' })).toBeVisible();
});

test('Unsuccessful authorization', async ({ page }) => {
  // Go to https://netology.ru/?modal=sign_in
  await page.goto('https://netology.ru/?modal=sign_in');

  // Fill fields
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Пароль').fill('123456');

  // Click "Войти"
  await page.getByTestId('login-submit-btn').click();

  // Check error message
  await expect(page.getByTestId('login-error-hint')).toHaveText('Вы ввели неправильно логин или пароль');
});
