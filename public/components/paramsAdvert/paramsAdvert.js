import { BaseComponent, Input } from '@components';
import { events } from '@models';
import paramsAdvert from './paramsAdvert.hbs';

const DEFAULT_STATE = {
  title: '',
  flat: false,
  house: false,
};
/**
 * Класс компонента параметров объяления
 */
export class Params extends BaseComponent {
  /**
   * Создаёт новый экземпляр класса параметры объявления
   * @param {HTMLElement} parent - Родительский элемент, к которому будут
   * добавлены параметры объявления.
   * @param {*} state - Начальное состояние параметров объяления.
   */
  constructor(parent, state) {
    const template = paramsAdvert;
    state = { ...DEFAULT_STATE, ...state };
    const inputFloor = new Input('paramsFlatInputs', {
      placeholder: 'Этаж',
      label: 'Этаж',
      id: 'inputFloor',
    });
    const inputGeneralSquare = new Input('paramsFlatInputs', {
      placeholder: 'Площадь в м2',
      label: 'Общая площадь',
      id: 'inputGeneralSquare',
    });
    const inputLiveSquare = new Input('paramsFlatInputs', {
      placeholder: 'Площаль в м2',
      label: 'Жилая площадь',
      id: 'inputLiveSquare',
    });
    const inputRooms = new Input('paramsFlatInputs', {
      placeholder: 'Количество комнат',
      label: 'Количество комнат',
      id: 'inputRooms',
    });
    const inputSquareHouse = new Input('paramsHouseInputs', {
      placeholder: 'Площадь в м2',
      label: 'Площадь дома',
      id: 'inputSquareHouse',
    });
    const inputSquareArea = new Input('paramsHouseInputs', {
      placeholder: 'Площадь в сот.',
      label: 'Площаль участка',
      id: 'inputSquareArea',
    });
    const inputBedrooms = new Input('paramsHouseInputs', {
      placeholder: 'Количество спален',
      label: 'Количество спален',
      id: 'inputBedrooms',
    });
    const innerComponents = [
      inputFloor,
      inputGeneralSquare,
      inputLiveSquare,
      inputRooms,
      inputSquareHouse,
      inputSquareArea,
      inputBedrooms,
    ];
    super({
      parent, template, state, innerComponents,
    });
    [this.inputFloor,
      this.inputGeneralSquare,
      this.inputLiveSquare,
      this.inputRooms,
      this.inputSquareHouse,
      this.inputSquareArea,
      this.inputBedrooms] = innerComponents;
  }

  /**
   * Обновление компонента по событию
   * @param {Object} event - Событие обновления
   */
  componentDidUpdate(event) {
    if (event.name === events.CHANGE_OBJECT) {
      this.state = event.data;
      this.unmountAndClean();
      this.renderAndDidMount();
    }
  }

  /**
   * Получение значения поля
   * @param {string} name - Название поля
   * @returns {string} - Значение поля
   */
  getValueRadio(name) {
    const radioButtons = document.querySelectorAll(`input[name="${name}"]`);
    let selectedValue = null;

    radioButtons.forEach((radioButton) => {
      if (radioButton.checked) {
        selectedValue = radioButton.value;
      }
    });
    return selectedValue;
  }

  /**
   * Задание значения поля
   * @param {string} name - Название поля
   * @param {string} value - Значение
   */
  setValueRadio(name, value) {
    const radioButtons = document.querySelectorAll(`input[name="${name}"]`);

    radioButtons.forEach((radioButton) => {
      if (radioButton.value === String(value)) {
        radioButton.checked = true;
      }
    });
  }

  /**
   * Получение характеристик квартиры
   * @returns {Array} - Список характеристик
   */
  getFLatParams() {
    const apartament = this.getValueRadio('apartament');
    const floor = this.inputFloor.getValue();
    const generalSquare = this.inputGeneralSquare.getValue();
    const livingSquare = this.inputLiveSquare.getValue();
    const rooms = this.inputRooms.getValue();
    return [apartament, floor, generalSquare, livingSquare, rooms];
  }

  /**
   * Получение характеристик дома
   * @returns {Array} - Список характеристик
   */
  getHouseParams() {
    const cottage = this.getValueRadio('cottage');
    const squareHouse = this.inputSquareHouse.getValue();
    const squareArea = this.inputSquareArea.getValue();
    const bedrooms = this.inputBedrooms.getValue();
    const statusHome = this.getValueRadio('statusHome');
    const statusArea = this.getValueRadio('statusArea');
    return [cottage, squareHouse, squareArea, bedrooms, statusHome, statusArea];
  }

  /**
   * Задание характеристик квартиры
   * @param {string} apartament - Свойство квартира/аппартаменты
   * @param {string} floor - Свойство этаж
   * @param {string} generalSquare - Свойство общая площадь
   * @param {string} livingSquare - Свойство жилая площадь
   * @param {string} rooms - Свойство количество комнат
   */
  setFLatParams(apartament, floor, generalSquare, livingSquare, rooms) {
    this.setValueRadio('apartament', apartament);
    this.inputFloor.setValue(floor);
    this.inputGeneralSquare.setValue(generalSquare);
    this.inputLiveSquare.setValue(livingSquare);
    this.inputRooms.setValue(rooms);
  }

  /**
   * Задание характеристик дома
   * @param {string} cottage - Свойство дом/дача
   * @param {string} squareHouse - Свойство площадь дома
   * @param {string} squareArea - Свойство площадь территории
   * @param {string} bedrooms - Свойство количество спалень
   * @param {string} statusHome - Свойство состояние дома
   * @param {string} statusArea - Свойство статус участка
   */
  setHouseParams(cottage, squareHouse, squareArea, bedrooms, statusHome, statusArea) {
    this.setValueRadio('cottage', cottage);
    this.inputSquareHouse.setValue(squareHouse);
    this.inputSquareArea.setValue(squareArea);
    this.inputBedrooms.setValue(bedrooms);
    this.setValueRadio('statusHome', statusHome);
    this.setValueRadio('statusArea', statusArea);
  }
}
