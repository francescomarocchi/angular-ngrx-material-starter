import { Page } from '@playwright/test';

export class AboutPage {
  constructor(private page: Page) {}

  async navigateTo() {
    await this.page.goto('/about');
  }

  async getParagraphText() {
    return await this.page.textContent('h1');
  }

  async getGettingStarted() {
    return await this.page.$('.get-started');
  }

  async getActionButton(idx: number) {
    const buttons = await this.page.$$('.actions a');
    return buttons[idx];
  }
}
