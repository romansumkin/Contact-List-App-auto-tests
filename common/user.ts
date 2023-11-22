import { request } from "@playwright/test";
import { API_URL } from "../utils/constants"
import { randomString } from "./utils";


export const getRequest = async () =>
  request.newContext({
    baseURL: API_URL,
  });

export async function getToken() {

  let request = await getRequest();

  const randomName = `test${randomString(5)}`;
  const randomLastName = `test${randomString(5)}`;
  const randomEmail = `${randomString(5)}@${randomString(3)}.com`;
  const randomPassword = `${randomString(8)}`;

  const body = {
    firstName: randomName,
    lastName: randomLastName,
    email: randomEmail,
    password: randomPassword,
  };

  const response = await request.post('/users', {
    data: body,
  });
  const responseJson = await response.json();
  return responseJson.token;
}

export async function deleteUser() {

  let request = await getRequest();

  const response = await request.delete('/users/me')
}