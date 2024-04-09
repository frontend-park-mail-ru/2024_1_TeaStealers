// import { getMe } from '@modules';
import { events, globalVariables } from '@models';
import { getMyAdverts } from '@modules/api';

class MyAdvertModel {
  myAdverts;

  constructor() {
    this.observers = [];
  }

  /**
   * Обновление данных
   */
  async updateState() {
    this.getMyAdverts();
  }

  async getMyAdverts() {
    try {
      const [statusCode, data] = await getMyAdverts();
      if (statusCode === globalVariables.HTTP_STATUS_OK) {
        this.myAdverts = data.payload;
        this.notifyObservers({ name: events.GET_MY_ADVERTS, data: this.myAdverts });
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Добавление наблюдателя
   * @param {View} observer
   */
  addObserver(observer) {
    this.observers.push(observer);
  }

  /**
   * Оповещение всех наблюдателей о изменениях
   */
  notifyObservers(event) {
    this.observers.forEach((observer) => {
      observer.update(event);
    });
  }
}

export const myAdvertModel = new MyAdvertModel();
