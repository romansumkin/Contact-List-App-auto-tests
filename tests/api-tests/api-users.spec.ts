import { test, expect } from '@playwright/test';
import { getRequest } from '../../common/user';
import { getToken, deleteUser } from '../../common/user';

let token: Promise<string>;

test.describe.configure({ mode: 'parallel' });

test.beforeEach(async () => {
  token = getToken()
})

test.afterAll(async () => {
  await deleteUser();
})

test('Should Get Contact List', async () => {

  let request = await getRequest();

  const response = await request.get('/contacts', {
    headers: {
      Authorization: await token
    }
  });
  const responseJson = await response.json();
  await expect(response.status()).toEqual(200)

});

test('Should add contact', async () => {
  const request = await getRequest();
  const contactData = {
    firstName: 'John',
    lastName: 'Doe',
    birthdate: '1970-01-01',
    email: 'jdoe@fake.com',
    phone: '8005555555',
    street1: '1 Main St.',
    street2: 'Apartment A',
    city: 'Anytown',
    stateProvince: 'KS',
    postalCode: '12345',
    country: 'USA',
  };
  const response = await request.post('/contacts', {
    headers: {
      Authorization: await token,
    },
    data: contactData,
  });

  await expect(response.status()).toEqual(201);

  const responseBody = await response.json();
  await expect(responseBody).toMatchObject(contactData);
});

