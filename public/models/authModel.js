import { globalVariables } from '@models';
import { checkAuth } from '@modules';

async function checkAuthentication() {
  const [statusCode, ,] = await checkAuth();
  if (statusCode === globalVariables.HTTP_STATUS_OK) {
    return true;
  }
  return false;
}

class AuthModel {
  constructor() {
    this.isAuth = false;
  }

  checkAuthentication() {
    this.isAuth = checkAuthentication();
  }
}

export const authModel = new AuthModel();
