import { expect, type Locator, type Page } from '@playwright/test';

export class ContactListPage {
  readonly page: Page;
  readonly logoutButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.locator('#logout');
  }

  async goto() {
    await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/contactList');
  }

  async logout() {
    await this.logoutButton.click();
  }
}