import { globalVariables, events } from '@models';
import { checkAuth } from '@modules';

class AuthModel {
  observers = [];

  constructor() {
    this.isAuth = false;
  }

  async checkAuthentication() {
    const [statusCode, ,] = await checkAuth();
    const curAuth = this.isAuth;
    if (statusCode === globalVariables.HTTP_STATUS_OK) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
    if (this.isAuth !== curAuth) {
      this.notifyObservers();
    }
    return this.isAuth;
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  setAuth() {
    this.isAuth = true;
    this.notifyObservers();
  }

  setNotAutn() {
    this.isAuth = false;
    this.notifyObservers();
  }

  /**
   * Оповещение всех наблюдателей о изменениях
   */
  notifyObservers() {
    this.observers.forEach((observer) => {
      observer.update({ name: events.AUTH, data: this.isAuth });
    });
  }
}

export const authModel = new AuthModel();
