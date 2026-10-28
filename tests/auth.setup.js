
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const authFile = path.join(
    __dirname,
    '../playwright/.auth/user.json'
);

test('authenticate and save state', async ({ page }) => {
    fs.mkdirSync(path.dirname(authFile), { recursive: true });

    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(
        'https://www.saucedemo.com/inventory.html'
    );

    await page.context().storageState({ path: authFile });
});
