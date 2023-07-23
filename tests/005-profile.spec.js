import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
});

test('a creator can see their created events on their profile', async ({
  page,
}) => {
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('testusername');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('http://localhost:5173/');
  expect(page.url()).toBe('http://localhost:5173/');

  await page.getByRole('link', { name: 'Profile' }).click();

  await page.waitForTimeout(1000);

  const creatorElement = await page.$('p:has-text("Creator: testusername")');

  expect(creatorElement).toBeNull();
});

test('an attendee can see their attended events on their profile', async ({
  page,
}) => {
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('testusername2');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('http://localhost:5173/');
  expect(page.url()).toBe('http://localhost:5173/');

  await page.getByRole('link', { name: 'Profile' }).click();

  await page.waitForTimeout(1000);

  const createdEvents = await page.$('p:has-text("No created events")');

  expect(createdEvents).not.toBeNull();
  expect(page.getByRole('button', { name: 'View Details' })).toBeDefined();
});

test('an attendee can unattend an event', async ({ page }) => {
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('testusername2');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('http://localhost:5173/');
  expect(page.url()).toBe('http://localhost:5173/');

  await page.getByRole('link', { name: 'Profile' }).click();

  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'View Details' }).click();

  await page.waitForURL('http://localhost:5173/events/1');

  await page.getByRole('button', { name: 'Unattend' }).click();

  await page.getByRole('button', { name: 'Back' }).click();

  const futureAttendedEvents = await page.$(
    'p:has-text("No future attended events")',
  );
  expect(futureAttendedEvents).not.toBeNull();
});

test('a creator can edit a created event', async ({ page }) => {
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('testusername');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('http://localhost:5173/');
  expect(page.url()).toBe('http://localhost:5173/');

  await page.getByRole('link', { name: 'Profile' }).click();

  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'View Details' }).click();

  await page.waitForURL('http://localhost:5173/events/1');

  await page.getByRole('button', { name: 'Edit' }).click();

  await page.getByLabel('Name').fill('Edited Test Event');
  await page.getByRole('button', { name: 'Submit' }).click();

  await page.getByLabel('Close').click();

  const editedName = await page.$('h3:has-text("Edited Test Event")');
  expect(editedName).not.toBeNull();
});

test('a creator can delete a created event', async ({ page }) => {
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('testusername');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('http://localhost:5173/');
  expect(page.url()).toBe('http://localhost:5173/');

  await page.getByRole('link', { name: 'Profile' }).click();

  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'View Details' }).click();

  await page.waitForURL('http://localhost:5173/events/1');

  await page.getByRole('button', { name: 'Delete Event' }).click();

  await page.waitForTimeout(1000);

  const event = await page.$('h3:has-text("Edited Test Event")');
  expect(event).toBeNull();
});
