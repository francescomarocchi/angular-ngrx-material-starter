import { Page } from '@playwright/test';

export class AppPage {
  constructor(private page: Page) {}

  async navigateTo() {
    await this.page.goto('/');
  }

  async getCurrentYear() {
    return await this.page.textContent('.signature .year');
  }

  async getAllMenus() {
    const menuElements = await this.page.$$('mat-toolbar button.nav-button');
    return Promise.all(menuElements.map((elm) => elm.textContent()));
  }
}
