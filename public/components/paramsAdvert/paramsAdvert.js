import { BaseComponent, Input } from '@components';
import { events } from '@models';
import { formatFloat, formatInteger } from '@modules';
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
      label: 'Площадь участка',
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

  componentDidMount() {
    this.addListener(this.inputFloor, 'input', 'input', this.formatInputFloor.bind(this));
    this.addListener(this.inputGeneralSquare, 'input', 'input', this.formatInputGeneralSquare.bind(this));
    this.addListener(this.inputLiveSquare, 'input', 'input', this.formatInputLiveSquare.bind(this));
    this.addListener(this.inputRooms, 'input', 'input', this.formatInputRooms.bind(this));
    this.addListener(this.inputSquareHouse, 'input', 'input', this.formatInputSquareHouse.bind(this));
    this.addListener(this.inputSquareArea, 'input', 'input', this.formatInputSquareArea.bind(this));
    this.addListener(this.inputBedrooms, 'input', 'input', this.formatInputBedrooms.bind(this));
  }

  componentWillUnmount() {
    this.removeListener(this.inputFloor, 'input', 'input', this.formatInputFloor.bind(this));
    this.removeListener(this.inputGeneralSquare, 'input', 'input', this.formatInputGeneralSquare.bind(this));
    this.removeListener(this.inputLiveSquare, 'input', 'input', this.formatInputLiveSquare.bind(this));
    this.removeListener(this.inputRooms, 'input', 'input', this.formatInputRooms.bind(this));
    this.removeListener(this.inputSquareHouse, 'input', 'input', this.formatInputSquareHouse.bind(this));
    this.removeListener(this.inputSquareArea, 'input', 'input', this.formatInputSquareArea.bind(this));
    this.removeListener(this.inputBedrooms, 'input', 'input', this.formatInputBedrooms.bind(this));
  }

  formatInputFloor() {
    const { value } = this.inputFloor.self.querySelector('input');
    let formatedinputFloor = formatFloat(value, 2);
    const regex = /^\d{0,3}$/;
    if (!regex.test(value)) {
      formatedinputFloor = value.slice(0, -1);
    }
    this.inputFloor.setValue(formatedinputFloor);
  }

  formatInputGeneralSquare() {
    const { value } = this.inputGeneralSquare.self.querySelector('input');
    let formatedInputGeneralSquare = formatFloat(value, 2);
    const regex = /^(\d{1,4}([.,]\d{0,2})?)?$/;
    if (!regex.test(value)) {
      formatedInputGeneralSquare = value.slice(0, -1);
    }
    this.inputGeneralSquare.setValue(formatedInputGeneralSquare);
  }

  formatInputLiveSquare() {
    const { value } = this.inputLiveSquare.self.querySelector('input');
    let formatedInputLiveSquare = formatFloat(value, 2);
    const regex = /^(\d{1,4}([.,]\d{0,2})?)?$/;
    if (!regex.test(value)) {
      formatedInputLiveSquare = value.slice(0, -1);
    }
    this.inputLiveSquare.setValue(formatedInputLiveSquare);
  }

  formatInputRooms() {
    const { value } = this.inputRooms.self.querySelector('input');
    let formatedInputRooms = formatFloat(value, 2);
    const regex = /^\d{0,2}$/;
    if (!regex.test(value)) {
      formatedInputRooms = value.slice(0, -1);
    }
    this.inputRooms.setValue(formatedInputRooms);
  }

  formatInputSquareHouse() {
    const { value } = this.inputSquareHouse.self.querySelector('input');
    let formatedInputSquareHouse = formatFloat(value, 2);
    const regex = /^(\d{1,4}([.,]\d{0,2})?)?$/;
    if (!regex.test(value)) {
      formatedInputSquareHouse = value.slice(0, -1);
    }
    this.inputSquareHouse.setValue(formatedInputSquareHouse);
  }

  formatInputSquareArea() {
    const { value } = this.inputSquareArea.self.querySelector('input');
    let formatedInputSquareArea = formatFloat(value, 2);
    const regex = /^(\d{1,4}([.,]\d{0,2})?)?$/;
    if (!regex.test(value)) {
      formatedInputSquareArea = value.slice(0, -1);
    }
    this.inputSquareArea.setValue(formatedInputSquareArea);
  }

  formatInputBedrooms() {
    const { value } = this.inputBedrooms.self.querySelector('input');
    let formatedInputBedrooms = formatFloat(value, 2);
    const regex = /^\d{0,2}$/;
    if (!regex.test(value)) {
      formatedInputBedrooms = value.slice(0, -1);
    }
    this.inputBedrooms.setValue(formatedInputBedrooms);
  }

  formatInteger() {
    const value = this.getValue();
    const formatedValue = formatInteger(value, 3);
    this.setValue(formatedValue);
  }

  formatSquare() {
    const value = this.getValue();
    const formatedValue = formatFloat(value, 2);
    this.setValue(formatedValue);
  }

  validateFloor() {
    const value = this.getValue();
    const valueInt = parseInt(value, 10);
    if (valueInt < 1) {
      this.renderError('Укажите этаж больше 0');
      return false;
    }
    if (valueInt > 100) {
      this.renderError('Укажите этаж меньше 100');
      return false;
    }
    this.removeError();
    return true;
  }

  validateSquare() {
    const value = this.getValue();
    const valueInt = parseFloat(value);
    if (valueInt < 1.01) {
      this.renderError('Укажите площадь больше 1');
      return false;
    }
    if (valueInt > 5000) {
      this.renderError('Укажите площадь меньше 5000');
      return false;
    }
    this.removeError();
    return true;
  }

  validateRoomsCount() {
    const value = this.getValue();
    const valueInt = parseInt(value, 10);
    if (valueInt < 1) {
      this.renderError('Укажите количество больше 0');
      return false;
    }
    if (valueInt > 200) {
      this.renderError('Укажите количество меньше 200');
      return false;
    }
    this.removeError();
    return true;
  }

  checkValidFlat() {
    const valFloor = this.validateFloor.bind(this.inputFloor);
    const valGeneralSquare = this.validateSquare.bind(this.inputGeneralSquare);
    const valLiveSquare = this.validateSquare.bind(this.inputGeneralSquare);
    const valRooms = this.validateRoomsCount.bind(this.inputRooms);

    if (valFloor && valGeneralSquare && valLiveSquare && valRooms) {
      return true;
    }
    return false;

    // this.inputFloor;
    // this.inputGeneralSquare;
    // this.inputLiveSquare;
    // this.inputRooms;
  }

  checkValidHouse() {
    const valHouseSquare = this.validateSquare.bind(this.inputSquareHouse);
    const valAreaSquare = this.validateSquare.bind(this.inputSquareArea);
    const valRooms = this.validateRoomsCount.bind(this.inputBedrooms);

    if (valHouseSquare && valAreaSquare && valRooms) {
      return true;
    }
    return false;
    // this.inputSquareHouse;
    // this.inputSquareArea;
    // this.inputBedrooms;
  }

  checkMandatoryInputFlat() {
    let ok = true;
    this.inputFloor.removeError();
    this.inputGeneralSquare.removeError();
    this.inputLiveSquare.removeError();
    this.inputRooms.removeError();

    const adress = this.inputFloor.getValue();
    if (adress.length === 0) {
      this.inputFloor.renderError('Обязательное поле');
      ok = false;
    }
    const year = this.inputGeneralSquare.getValue();
    if (year.length === 0) {
      this.inputGeneralSquare.renderError('Обязательное поле');
      ok = false;
    }
    const height = this.inputLiveSquare.getValue();
    if (height.length === 0) {
      this.inputLiveSquare.renderError('Обязательное поле');
      ok = false;
    }
    const floor = this.inputRooms.getValue();
    if (floor.length === 0) {
      this.inputRooms.renderError('Обязательное поле');
      ok = false;
    }
    return ok;
  }

  checkMandatoryInputHouse() {
    let ok = true;
    this.inputSquareHouse.removeError();
    this.inputSquareArea.removeError();
    this.inputBedrooms.removeError();

    const adress = this.inputSquareHouse.getValue();
    if (adress.length === 0) {
      this.inputSquareHouse.renderError('Обязательное поле');
      ok = false;
    }
    const year = this.inputSquareArea.getValue();
    if (year.length === 0) {
      this.inputSquareArea.renderError('Обязательное поле');
      ok = false;
    }
    const height = this.inputBedrooms.getValue();
    if (height.length === 0) {
      this.inputBedrooms.renderError('Обязательное поле');
      ok = false;
    }
    return ok;
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
