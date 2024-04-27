import { getQuestions } from '@modules';
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
      const [statusCode, data] = await getQuestions(tag);
      if (statusCode === globalVariables.HTTP_STATUS_OK) {
        this.questions = data.payload;
        console.log(tag);
        console.log(data.payload);
        this.notifyObservers({ name: events.GET_QUESTIONS, data: this.questions });
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

export const csatModel = new CsatModel();
