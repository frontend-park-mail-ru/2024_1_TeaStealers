import { getGridAdverts, updateAdvertById } from '@modules';
import { events, globalVariables } from '@models';

class MainModel {
  cardsData; // данные модели

  constructor() {
    this.observers = []; // Массив наблюдателей
  }

  /**
   * Обновление данных с query параметрами
   * @param {string} queryParametersURL - query параметры
   */
  async updateWithParameters(queryParametersURL) {
    try {
      const [statusCode, response] = await getGridAdverts(queryParametersURL);
      if (statusCode === globalVariables.HTTP_STATUS_OK) {
        this.cardsData = response.payload;
        this.updateAdverts();
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
   * Обновления данных модели и оповещения наблюдателей
   * @param {state} newState
   */
  updateAdverts() {
    this.notifyObservers({ name: events.GET_ADVERTS_MAIN, data: this.cardsData });
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

export const mainModel = new MainModel();
