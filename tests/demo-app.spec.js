import { test, expect } from "@playwright/test";
const testData = require("../resources/test-data.json");
const scenarios1and2 = require('../resources/scenarios1-2.json');
const scenarios4through6 = require('../resources/scenarios4-6.json')

test.beforeEach(async ({ page }) => {
  await page.goto(testData.demoApp);
  await page.getByLabel("Username").fill(testData.credentials.email);
  await page.getByLabel("Password").fill(testData.credentials.password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByText('Projects')).toBeVisible();
});

test.describe("Mobile & WebApplication Displayed Correctly", () => {
    // tests scenarios 1 & 2
 scenarios1and2.forEach(({ tagsExpected, toDoExpected }) => {
        test(`should check that"${toDoExpected}" is in the "To Do" column & confirm tag(s): ${tagsExpected}`, async ({page}) => {
        await page.getByRole('button', { name: testData.projects.webApp }).click();
        const toDoColumn = page.getByRole( 'heading', {name: 'To Do'}).locator('..');

        expect(toDoColumn.filter({ has: page.getByRole('heading', { name: toDoExpected }) })).toBeVisible();
        for (const tag of tagsExpected) {
                expect(toDoColumn.getByText(tag, {exact: true})).toBeVisible();
        }
        });
    });

  // tests scenario 3
  test('should check that "Design system updates" is in the "In Progress" column', async({page}) => {
      await page.getByRole('button', {name: testData.projects.webApp}).click();
      const inProgressColumn = page.getByRole('heading', {name: 'In Progress'}).locator('..');
      expect(inProgressColumn.filter({ has: page.getByRole('heading', { name: 'Design system updates' }) })).toBeVisible();
      
  });

  //test scenarios 4-6
  scenarios4through6.forEach(({column, expected, tagsExpected}) => {
    test(`should check ${column} column and tag(s): ${tagsExpected}`, async({page}) => {
        await page.getByRole('button', {name: testData.projects.mobileApp}).click();
        const columnLocator = page.getByRole('heading', { name: column }).locator('..');
        
        expect(columnLocator.filter({ has: page.getByRole('heading', { name: expected }) })).toBeVisible();
        for (const tag of tagsExpected) {
                expect(columnLocator.getByText(tag, {exact: true})).toBeVisible();
        }
    });
  });

});
