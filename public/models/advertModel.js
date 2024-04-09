import { getAdvertById } from '@modules';
import { events, globalVariables } from '@models';

/**
 * Класс модели страницы объявления
 */
class AdvertModel {
  infoAdvert; // данные модели

  constructor() {
    this.observers = []; // Массив наблюдателей
  }

  async getInfoAdvert(id) {
    try {
      const [statusCode, data] = await getAdvertById(id);
      if (statusCode === globalVariables.HTTP_STATUS_OK) {
        this.infoAdvert = data.payload;
        this.notifyObservers({ name: events.GET_ADVERT_BY_ID, data: this.infoAdvert });
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

export const advertModel = new AdvertModel();
