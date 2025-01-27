import { test, expect } from '@playwright/test';
import { AppPage } from './app.po';

test.describe('App', () => {
  let page: AppPage;

  test.beforeEach(async ({ page: browserPage }) => {
    page = new AppPage(browserPage);
    await page.navigateTo();
  });

  test('should redirect to "about" route', async ({ page: browserPage }) => {
    await page.navigateTo();
    expect(browserPage.url()).toContain('about');
  });

  test('should display current year in the footer', async () => {
    const currentYear = new Date().getFullYear().toString();
    expect(await page.getCurrentYear()).toBe(currentYear);
  });

  test('should have "About", "Features", "Examples" menus', async () => {
    const menus = await page.getAllMenus();
    expect(menus).toEqual(['About', 'Features', 'Examples']);
  });
});
