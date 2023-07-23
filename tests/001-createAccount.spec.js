import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/create-account');
});

test('login link is displayed and can be clicked to navigate to login page', async ({
  page,
}) => {
  const loginLink = page.getByRole('link', { name: 'Log in' });
  expect(loginLink).not.toBeNull();

  await loginLink.click();

  await page.waitForURL('http://localhost:5173/login');
  expect(page.url()).toBe('http://localhost:5173/login');
});

test('user can create an account successfully', async ({ page }) => {
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('testusername');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Create Account' }).click();

  await page.waitForTimeout(1000);

  await page.waitForURL('http://localhost:5173/');
  expect(page.url()).toBe('http://localhost:5173/');
});

test("'Username already exists' is displayed when using an email that is already in use", async ({
  page,
}) => {
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('testusername');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Create Account' }).click();

  await page.waitForTimeout(1000);
  const errorMessage = await page.waitForSelector('p');

  expect(await errorMessage.innerText()).toBe('Username already exists');
});
