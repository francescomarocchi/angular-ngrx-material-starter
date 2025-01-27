import { expect, test } from '@playwright/test';
import { AboutPage } from './about.po';

test.describe('About Page', () => {
  let page: AboutPage;

  test.beforeEach(async ({ page: browserPage }) => {
    page = new AboutPage(browserPage);
    await page.navigateTo();
  });

  test('should display the correct paragraph text', async () => {
    const text = await page.getParagraphText();
    expect(text).toBe('Expected Paragraph Text');
  });

  test('should have a "Getting Started" section', async () => {
    const gettingStarted = await page.getGettingStarted();
    expect(gettingStarted).not.toBeNull();
  });

  test('should have action buttons', async () => {
    const actionButton = await page.getActionButton(0);
    expect(actionButton).not.toBeNull();
  });
});
