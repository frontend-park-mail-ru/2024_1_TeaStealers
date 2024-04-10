import { getComplexInfo, getComplexAdverts } from '@modules';
import { events, globalVariables } from '@models';

/**
 * Класс модели страницы объявления
 */
class ComplexModel {
  infoComplex; // данные модели

  constructor() {
    this.observers = []; // Массив наблюдателей
  }

  /**
   * Обновление данных
   */
  async updateState(id) {
    try {
      const [statusCode, data] = await getComplexInfo(id);
      if (statusCode === globalVariables.HTTP_STATUS_OK) {
        this.infoComplex = data.payload;
        this.notifyObservers({ name: events.GET_COMPLEX_BY_ID, data: this.infoComplex });
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const [statusCode, data] = await getComplexAdverts(id);
      if (statusCode === globalVariables.HTTP_STATUS_OK) {
        this.complexAdverts = data.payload;
        this.notifyObservers({
          name: events.GET_COMPLEX_ADVERTS_BY_ID,
          data: this.complexAdverts,
        });
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

export const complexModel = new ComplexModel();
