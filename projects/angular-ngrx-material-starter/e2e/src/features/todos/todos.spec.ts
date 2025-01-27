import { expect, test } from '@playwright/test';
import { TodosPage } from './todos.po';

test.describe('Todos Page', () => {
  let page: TodosPage;

  test.beforeEach(async ({ page: browserPage }) => {
    page = new TodosPage(browserPage);
    await page.navigateTo();
  });

  test('adds todo', async () => {
    const input = await page.getInput();
    await input.fill('Run e2e tests!');

    const addButton = await page.getAddTodoButton();
    await addButton.click();

    const results = await page.getResults();
    await results.nth(3).waitFor();

    expect(await results.count()).toBe(4);
    expect(await results.nth(0).textContent()).toBe('Run e2e tests!');
  });
});
