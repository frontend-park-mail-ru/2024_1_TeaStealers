import { getAdvert } from '@modules';
import { globalVariables } from '@models';

async function getCardData() {
  const [statusCode, data] = await getAdvert();
  if (statusCode !== globalVariables.HTTP_STATUS_OK) {
    return undefined;
  }
  const cardData = data.map((ad) => {
    const characteristics = Object.keys(ad.HouseProperties).map((key) => {
      return {
        characteristicName: key.toString(),
        characteristicDescription: ad.HouseProperties[key].toString(),
      };
    });
    return {
      imgSrc: `/static/room${ad.ID + 1}.jpg`,
      shortDesc: ad.Title,
      fullDescription: ad.Desciption,
      adress: ad.Adress,
      fullprice: ad.Price,
      characteristic: characteristics,
    };
  });
  return cardData;
}
/**
 * Класс модели страницы объявления
 */
class AdvertModel {
  cardData; // данные модели

  constructor(advertId) {
    this.observers = []; // Массив наблюдателей
    this.advertId = advertId;
    this.init();
  }

  /**
   * Инициализация модели
   */
  init() {
    this.updateState();
  }

  /**
   * Обновление данных
   */
  async updateState() {
    try {
      const data = await getCardData();
      this.updateAdvert(data);
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
  updateAdvert(newState) {
    this.cardData = newState;
    this.notifyObservers();
  }

  /**
   * Оповещение всех наблюдателей о изменениях
   */
  notifyObservers() {
    this.observers.forEach((observer) => {
      observer.update(this.cardData);
    });
  }
}

export const advertModel = new AdvertModel();
