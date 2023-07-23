import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
});

test('create account link is displayed and can be clicked to navigate to the create account page', async ({
  page,
}) => {
  const createAccountLink = page.getByRole('link', { name: 'Create one here' });
  expect(createAccountLink).not.toBeNull();

  await createAccountLink.click();

  await page.waitForURL('http://localhost:5173/create-account');
  expect(page.url()).toBe('http://localhost:5173/create-account');
});

test('user can log in and out successfully', async ({ page }) => {
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('testusername');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('http://localhost:5173/');
  expect(page.url()).toBe('http://localhost:5173/');

  await page.getByRole('button', { name: 'Log out' }).click();

  await page.waitForURL('http://localhost:5173/login');
  expect(page.url()).toBe('http://localhost:5173/login');
});

test('Error message is displayed if email does not exist', async ({ page }) => {
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('userdoesnotexist');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForTimeout(1000);
  const errorMessage = await page.waitForSelector('p');

  expect(await errorMessage.innerText()).toBe('Invalid login credentials');
});

test('Error message is displayed if password is wrong', async ({ page }) => {
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('testusername');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('wrongpassword');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForTimeout(1000);
  const errorMessage = await page.waitForSelector('p');

  expect(await errorMessage.innerText()).toBe('Invalid login credentials');
});
