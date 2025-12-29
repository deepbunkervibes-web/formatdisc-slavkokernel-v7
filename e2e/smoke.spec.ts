import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/SlavkoKernel/);
});

test('check input field presence', async ({ page }) => {
    await page.goto('/');
    // Check if the main idea input exists
    const input = page.getByPlaceholder(/Example: I'm building a tool/i);
    await expect(input).toBeVisible();
});
