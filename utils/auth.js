require('dotenv').config(); // Load environment variables from .env file
const { URL, USERNAME, PASSWORD } = process.env;

async function login(page) {
    await page.goto(URL + '/login');
    await page.fill('input[name="email"]', USERNAME);
    await page.fill('input[name="password"]', PASSWORD);
    await page.click('button[type="submit"]');
}

async function logout(page) {
    await page.
    click('button:text("Logout")');
}

module.exports = { login, logout };
