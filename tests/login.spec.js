const { test, expect } = require('@playwright/test');
const { login } = require('../utils/auth.js');
const { chromium } = require('playwright');
require('dotenv').config(); // Load environment variables from .env file

test('Login with valid credentials', async ({ page }) => {
    // Perform Login action
    await login(page);

    // Verify redirection to the home page
    await page.waitForNavigation();
    expect(page.url()).toBe(process.env.URL);

    // Wait for the logout button to be present
    const logoutButton = await page.waitForSelector('button:text("Logout")');
    
    // Verify user is logged in by checking the presence of the logout button
    expect(logoutButton).not.toBeNull();
});
