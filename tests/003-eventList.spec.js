import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
});

test('user can create an event successfully', async ({ page }) => {
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('testusername');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('http://localhost:5173/');
  expect(page.url()).toBe('http://localhost:5173/');

  await page.getByRole('button', { name: 'Add Event' }).click();

  await page.getByLabel('Name').fill('Test Event');
  await page.getByLabel('Date').fill('2029-07-22');
  await page.getByLabel('Location').fill('Test Location');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByLabel('Close').click();

  expect(page.getByRole('button', { name: 'View Details' })).toBeDefined();
});
