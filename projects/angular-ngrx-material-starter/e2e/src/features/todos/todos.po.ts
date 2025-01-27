import { Page } from '@playwright/test';

export class TodosPage {
  constructor(private page: Page) {}

  async navigateTo() {
    await this.page.goto('#/examples/todos');
  }

  async getInput() {
    return this.page.locator('anms-big-input input');
  }

  async getAddTodoButton() {
    return this.page.locator('anms-big-input-action button');
  }

  async getResults() {
    return this.page.locator('mat-card.todo');
  }
}
