const { login, logout } = require('../utils/auth.js'); // Import the auth module
const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');

test.describe('Logout', () => {
    test('User can logout successfully', async ({ page }) => {
        // Login before testing logout
        await login(page);

        // Perform logout action
        await logout(page);

        // Verify redirection to the login page after logout
        await page.waitForNavigation();
        const loginPageURL = process.env.URL + 'login';
        expect(page.url()).toBe(loginPageURL);
    });
});
