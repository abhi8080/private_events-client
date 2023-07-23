import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
});

test('a user can attend the event', async ({ page }) => {
  const createAccountLink = page.getByRole('link', { name: 'Create one here' });

  await createAccountLink.click();

  await page.waitForURL('http://localhost:5173/create-account');

  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('testusername2');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Create Account' }).click();

  await page.waitForTimeout(1000);

  await page.waitForURL('http://localhost:5173/');

  await page.getByRole('link', { name: 'View Details' }).click();

  await page.waitForURL('http://localhost:5173/events/1');

  await page.getByText('Attend', { exact: true }).click();

  expect(page.getByText('testusername2')).toBeDefined();
});
