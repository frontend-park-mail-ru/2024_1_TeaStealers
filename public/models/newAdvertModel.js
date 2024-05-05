// import { getMe } from '@modules';
import { events, globalVariables } from '@models';

class NewAdvertModel {
  constructor() {
    this.observers = []; // Массив наблюдателей
  }

  /**
   * Обновление данных
   */
  async updateState() {
  }

  setAddress(address, object) {
    this.notifyObservers({ name: events.SET_ADDRESS_EDIT_ADVERT, data: { address, object } });
  }

  setAddressError() {
    this.notifyObservers({ name: events.SET_ADDRESS_EDIT_ADVERT_ERROR });
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

export const newAdvertModel = new NewAdvertModel();
