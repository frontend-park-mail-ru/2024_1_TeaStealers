import { getAdvertList } from '@modules';
import { globalVariables } from '@models';

async function getAdverts() {
  const [statusCode, data] = await getAdvertList();
  if (statusCode !== globalVariables.HTTP_STATUS_OK) {
    return undefined;
  }
  const cardsData = data.map((ad, index) => {
    return {
      imgSrc: `/static/room${index + 1}.jpg`,
      shortDesc: ad.description,
      likeSrc: '/static/save.svg',
      adress: ad.location,
      fullprice: ad.price,
    };
  });
  return cardsData;
}

class MainModel {
  cardsData; // данные модели

  constructor() {
    this.observers = []; // Массив наблюдателей
    this.init();
  }

  init() {
    this.updateState();
  }

  /**
   * Обновление данных
   */
  async updateState() {
    try {
      this.cardsData = await getAdverts();
      this.updateAdverts(this.cardsData);
    } catch (error) {
      this.updateState();
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
  updateAdverts(newState) {
    this.adverts = newState;
    this.notifyObservers();
  }

  /**
   * Оповещение всех наблюдателей о изменениях
   */
  notifyObservers() {
    this.observers.forEach((observer) => {
      observer.update(this.adverts);
    });
  }
}

export const mainModel = new MainModel();
