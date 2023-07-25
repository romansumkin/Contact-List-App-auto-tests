import { request } from "@playwright/test";
import { API_URL} from "../utils/constants"

export const getRequest = async () =>
  request.newContext({
    baseURL: API_URL,
    storageState: 'state.json'
  });


export function randomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
export async function createUser(){
  
  let request = await getRequest();

  const randomName = `test${randomString(5)}`;
  const randomLastName = `test${randomString(5)}`;
  const randomEmail = `${randomString(5)}@${randomString(3)}.com`;
  const randomPassword = `${randomString(8)}`;

  const body = {
    firstName: randomName,
    lastName: randomLastName,
    email: randomEmail,
    password: randomPassword 
  }

  const response = await request.post(
  '/users',
  {
      data: body,
  }
  );

  const bodyLogin = {
    email: randomEmail,
    password: randomPassword
  }
  const responseLogin = await request.post(
    '/users/login',
    {
      data:bodyLogin
    }
  )
  await request.storageState({ path: 'state.json' });

}


