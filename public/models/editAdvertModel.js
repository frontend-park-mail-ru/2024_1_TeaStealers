import { events, globalVariables } from '@models';
import { getAdvertById } from '@modules/api';

class EditAdvertModel {
  constructor() {
    this.observers = []; // Массив наблюдателей
  }

  /**
   * Обновление данных
   */
  async updateState(advertId) {
    try {
      const [statusCode, response] = await getAdvertById(advertId);
      if (statusCode === globalVariables.HTTP_STATUS_OK) {
        this.advertData = response.payload;
        this.notifyObservers({ name: events.GET_ADVERT_BY_ID_FOR_EDIT, data: this.advertData });
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

export const editAdvertModel = new EditAdvertModel();
