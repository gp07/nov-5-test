const { login, logout } = require('../utils/auth.js'); // Import the auth module
const { getSelectAllKey } = require('../utils/os.js'); // Import the os module
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

// This test case assumes there are no reviews for the first record
test('Add a new review with rating', async ({ page }) => {
    // Wait for the table to be visible
    await page.waitForSelector('table');

    // Wait for the "Add Review" button to be visible and click it
    await page.click('button:text("Open Reviews")');

    // Wait for the review form to be visible
    await page.waitForSelector('div textarea');

    // Fill out the review form
    await page.fill('textarea[placeholder="Your review"]', 'This is a test review.');

    // Set the rating by clicking on the star icons (assuming there are 5 stars)
    await page.locator('//h6[text()="Rating:"]/following-sibling::span/label[5]').click();

    // Click the submit button
    await page.click('button:text("Submit")');

    // Verify that the new review is displayed on the page
    await expect(page.getByText("This is a test review.")).toBeVisible();

    // Clicks outside of the container in order to be able to click the logout button.
    await page.keyboard.press('Escape');
    
});

test('View a review', async ({ page }) => {
    // Wait for the table to be visible
    await page.waitForSelector('table');

    // Wait for the "Add Review" button to be visible and click it
    await page.click('button:text("Open Reviews")');

    // Verify that the new review is displayed on the page
    await expect(page.getByText("This is a test review.")).toBeVisible();

    // Clicks outside of the container in order to be able to click the logout button.
    await page.keyboard.press('Escape');
    
});

// Skipping for now, since it will give a false positive.
test.skip('Edit a review',async ({ page })=> {
    // Wait for the "Add Review" button to be visible and click it
    await page.click('button:text("Open Reviews")');

    // Clicks on the edit button
    await page.locator('//p[normalize-space()="This is a test review."]/parent::div/div/div/button[1]').click();

    // Fill out the review form
    const selectAllKey = getSelectAllKey();
    await page.keyboard.press(selectAllKey);
    await page.keyboard.press('Delete');
    await page.fill('textarea[placeholder="Your review"]', 'This is a edited test review.');

    // Click the submit button
    await page.click('button:text("Submit")');

    // Verify that the new review is displayed on the page
    await expect(page.getByText("This is a edited test review.")).toBeVisible();

    // Clicks outside of the container in order to be able to click the logout button.
    await page.keyboard.press('Escape');

});

test('Delete a review',async ({ page })=> {
    // Wait for the "Add Review" button to be visible and click it
    await page.click('button:text("Open Reviews")');

    // Clicks on the edit button
    await page.locator('//p[normalize-space()="This is a test review."]/parent::div/div/div/button[2]').click();

    // Verify that the new review is displayed on the page
    await expect(page.getByText("No reviews found")).toBeVisible();

    // Clicks outside of the container in order to be able to click the logout button.
    await page.keyboard.press('Escape');

});
