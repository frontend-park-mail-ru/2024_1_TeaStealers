import { events, globalVariables } from '@models';
import { getStatistic } from '@modules';

/**
 * Класс модели страницы статистики
 */
class StatisticModel {
  statistic; // данные модели

  constructor() {
    this.observers = []; // Массив наблюдателей
  }

  async updateState() {
    try {
      const [statusCode, data] = await getStatistic();
      if (statusCode === globalVariables.HTTP_STATUS_OK) {
        this.statistic = data.payload;
        this.notifyObservers({
          name: events.GET_STATISTIC,
          data: this.statistic,
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

export const statisticModel = new StatisticModel();
