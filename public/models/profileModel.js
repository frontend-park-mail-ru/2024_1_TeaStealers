import { getMe } from '@modules';
import { events, globalVariables } from '@models';

class ProfileModel {
  info;

  constructor() {
    this.observers = []; // Массив наблюдателей
    // await this.getMeInfo();
  }

  /**
   * Обновление данных
   */
  async updateState() {
    try {
      this.data = await getMe();
      this.notifyObservers({ name: events.ME, data: this.data });
    } catch (error) {
      console.log(error);
    }
  }

  async getMeInfo() {
    try {
      const [statusCode, data] = await getMe();
      if (statusCode === globalVariables.HTTP_STATUS_OK) {
        this.info = data.payload;
        this.notifyObservers({ name: events.ME, data: this.info });
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

export const profileModel = new ProfileModel();
