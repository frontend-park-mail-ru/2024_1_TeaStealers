import { } from '@modules';
import { events, globalVariables } from '@models';

/**
 * Класс модели страницы объявления
 */
class CsatModel {
  // данные модели

  constructor() {
    this.observers = []; // Массив наблюдателей
  }

  /**
   * Обновление данных
   */
  async updateState(tag) {
    try {

    } catch (error) {
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

export const csatModel = new CsatModel();
