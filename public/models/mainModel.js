import { getAdvertList, checkAuth } from '@modules';
import { MainPage } from '@pages';

let cardsData;

async function getAdverts() {
    const [statusCode, data] = await getAdvertList();
    if (statusCode !== 200) {
      return;
    }
    cardsData = data.map((ad, index) => ({
      imgSrc: `/static/room${index + 1}.jpg`,
      shortDesc: ad.description,
      likeSrc: '/static/save.svg',
      adress: ad.location,
      fullprice: ad.price,
    }));
}

class MainModel extends MainPage {
  constructor() {
      this.observers = []; // Массив наблюдателей
      this.adverts = cardsData; // Данные модели
      this.init();
  }

  init() {
    this.updateAdverts(this.adverts);
    this.updateState();
  }

  /**
   * Обновление данных
   */
  updateState () {
    getAdverts();
    this.updateAdverts(cardsData);
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
      this.observers.forEach(observer => {
          observer.update(this.adverts);
      });
  }
}

export const mainModel = new MainModel();