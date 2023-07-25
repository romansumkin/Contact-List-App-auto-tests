import { test, expect } from '@playwright/test';
import { getRequest } from '../../common/user';
import { randomString } from '../../common/user';
import { createUser } from '../../common/user';


test.beforeEach(async() => {
  await createUser();
})

test('Should create a user', async () => {
  let request = await getRequest();

  const response = await request.get('/contacts');
  const answer = response.body();
  await expect(response.status()).toEqual(200)



});
