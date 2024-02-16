const { login, logout } = require('../utils/auth.js'); // Import the auth module
const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');


test.beforeEach(async ({ page }) => {
    // Login before each test
    await login(page);
});

test.afterEach(async ({ page }) => {
    // Logout after each test
    await logout(page);
});

test('Check elements are correctly displayed', async ({ page }) => {
    // Wait for the table to be visible
    await page.waitForSelector('table');

    // Verify the presence of table headers
    const headers = await page.$$('table th');
    expect(headers.length).toBeGreaterThan(5); // Assuming there are 5 headers: name, release date, genre, language, rating

    // Verify the presence of movie rows
    const rows = await page.$$('table tr');
    expect(rows.length).toBeGreaterThan(0); // Expecting at least one movie row
});
