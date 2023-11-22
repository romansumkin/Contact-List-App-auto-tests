import { test, expect } from '@playwright/test';
import { getToken, deleteUser } from '../../common/user';
import { ContactListPage } from './pages/contact-list-page';

let token: Promise<string>;

test.beforeEach(async () => {
    token = getToken();
})

test.afterEach(async ({page}) =>{
  await deleteUser();
  await page.close();
});

test('Should logout user', async ({ page, browser }) => {
  const contactList = new ContactListPage(page);
  await contactList.goto();
  await contactList.logout();
});