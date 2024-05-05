import {
  BaseComponent, Button, Input, Params,
} from '@components';
import {
  checkPhone, checkYear, checkFloor, createFlatAdvert,
  createHouseAdvert, uploadAdvertImage, updateAdvertById, formatInteger, formatFloat,
} from '@modules';
import { events, globalVariables } from '@models';
import editAdvert from './editAdvert.hbs';

/**
 * Класс страницы редактирования объявления
 */
export class EditAdvert extends BaseComponent {
  object;

  files;

  isValidImages;

  changeImages;

  editAdvert;

  /**
    * Создает новый экземпляр страницы редактирования объявления
    * @param {HTMLElement} parent - Родительский элемент
    * @param {Object} [state] - Начальное состояние страницы редактирования объявления
    */
  constructor(parent, state) {
    const template = editAdvert;
    state = { ...state };
    const inputAdress = new Input('inputAdress-container', {
      id: 'inputAdress',
      placeholder: 'Укажите город, улицу и дом',
      label: 'Адрес',
    });
    const inputYear = new Input('aboutBuildIinputContainer', {
      id: 'inputYear',
      placeholder: 'Год постройки',
      label: 'Год постройки здания',
    });
    const inputHeight = new Input('aboutBuildIinputContainer', {
      id: 'inputHeight',
      placeholder: 'Высота потолков',
      label: 'Высота потолков, м',
    });
    const inputGeneralFloor = new Input('aboutBuildIinputContainer', {
      id: 'inputGeneralFloor',
      placeholder: 'Этажей в доме',
      label: 'Этажей в доме',
    });
    const params = new Params('editAdvertParams', {
      title: 'Параметры квартиры',
      flat: true,
    });
    const inputUploadImage = new Input('imageButtons', {
      id: 'inputUploadImage',
      type: 'file',
      file: true,
      multiple: true,
      textInputFile: 'Выберите файл',
    });
    const inputTitle = new Input('descriptionInputsContainer', {
      id: 'inputTitle',
      placeholder: 'Введите заголовок',
      label: 'Заголовок',
      position: 'afterbegin',

    });
    const inputPrice = new Input('descriptionSmallInput', {
      id: 'inputPrice',
      placeholder: 'Введите цену в рублях',
      label: 'Цена',
    });
    const inputPhone = new Input('descriptionSmallInput', {
      id: 'inputPhone',
      placeholder: 'Введите номер телефона',
      label: 'Телефон',
    });
    let stateButtonSave = {
      mode: 'primary',
      text: 'Разместить объявление',
      id: 'btnSave',
    };
    if (state.editAdvert) {
      stateButtonSave = {
        mode: 'primary',
        text: 'Сохранить изменения',
        id: 'btnSaveEdit',
      };
    }
    const btnSave = new Button('buttonSave', { ...stateButtonSave });
    const innerComponents = [
      inputAdress,
      inputYear,
      inputHeight,
      inputGeneralFloor,
      params,
      inputUploadImage,
      inputTitle,
      inputPrice,
      inputPhone,
      btnSave,
    ];
    super({
      parent, template, state, innerComponents,
    });
    [this.inputAdress,
      this.inputYear,
      this.inputHeight,
      this.inputGeneralFloor,
      this.params,
      this.inputUploadImage,
      this.inputTitle,
      this.inputPrice,
      this.inputPhone,
      this.btnSave] = innerComponents;
    this.object = 'Flat';
    this.isValidImages = false;
    this.editADvert = state.editAdvert;
    this.changeImages = false;
  }

  /**
     * Добавление обработчиков
     */
  componentDidMount() {
    document.getElementById('flat').addEventListener('change', this.changeObject.bind(this));
    document.getElementById('house').addEventListener('change', this.changeObject.bind(this));
    this.addListener(this.inputYear, 'input', 'blur', this.validateYear.bind(this));
    this.addListener(this.inputGeneralFloor, 'input', 'blur', this.validateFloor.bind(this.inputGeneralFloor));
    this.addListener(this.inputHeight, 'input', 'input', this.formatHeight.bind(this));
    this.addListener(this.inputHeight, 'input', 'blur', this.validateHeight.bind(this));
    this.addClickListener('btnSave', this.saveHandler.bind(this));
    this.addClickListener('btnSaveEdit', this.editHandler.bind(this));
    this.addListener(this.inputPhone, '', 'input', this.formatPhoneNumber.bind(this));
    this.addListener(this.inputUploadImage, 'input', 'input', this.uploadImageHandler.bind(this));
    this.addListener(this.inputYear, 'input', 'input', this.formatYear.bind(this));
    this.addListener(this.inputGeneralFloor, 'input', 'input', this.formatFloor.bind(this));
    this.addListener(this.inputAdress, 'input', 'blur', this.validateAddress.bind(this));
    this.addListener(this.inputTitle, 'input', 'blur', this.validateTitle.bind(this));
    this.addListener(this.inputPrice, 'input', 'input', this.formatPrice.bind(this));
    super.componentDidMount();
  }

  /**
   * Обновление данных
   * @param {Object} event - Пришедшее событие обновления данных
   */
  componentDidUpdate(event) {
    if (event.name === events.GET_ADVERT_BY_ID_FOR_EDIT) {
      this.setValues(event.data);
    }
  }

  /**
     * Удаление обработчиков
     */
  componentWillUnmount() {
    super.componentWillUnmount();
  }

  /**
   * Изменение объектов меню
   */
  changeObject() {
    const flatRadio = document.getElementById('flat');
    const houseRadio = document.getElementById('house');
    let state = {};
    if (flatRadio.checked) {
      state = {
        title: 'Параметры квартиры',
        flat: true,
        house: false,
      };
      this.object = 'Flat';
    } else if (houseRadio.checked) {
      state = {
        title: 'Параметры дома',
        flat: false,
        house: true,
      };
      this.object = 'House';
    }
    this.params.componentDidUpdate({ name: events.CHANGE_OBJECT, data: state });
  }

  /**
   * Валидация года постройки
   * @returns bool - Результат проверки валидности
   */
  validateYear() {
    const year = this.inputYear.self.querySelector('input').value;
    const [textError, isVal] = checkYear(year);
    if (!isVal) {
      this.inputYear.renderError(textError);
      return false;
    }
    this.inputYear.removeError();
    return true;
  }

  formatYear() {
    const year = this.inputYear.self.querySelector('input').value;
    const formatedYear = formatInteger(year, 4);
    this.inputYear.setValue(formatedYear);
  }

  /**
   * Валидация этажа
   * @returns bool - Результат проверки валидности
   */
  validateFloor() {
    const floor = this.self.querySelector('input').value;
    const [textError, isVal] = checkFloor(floor);
    if (!isVal) {
      this.renderError(textError);
      return false;
    }
    this.removeError();
    return true;
  }

  formatFloor() {
    const floor = this.inputGeneralFloor.self.querySelector('input').value;
    const formatedFloor = formatInteger(floor, 3);
    this.inputGeneralFloor.setValue(formatedFloor);
  }

  /**
   * Валидация высоты потолка
   * @returns bool - Результат проверки валидности
   */
  validateHeight() {
    const value = this.inputHeight.getValue();
    const valueFloat = parseFloat(value);
    if (valueFloat < 2.0) {
      this.inputHeight.renderError('Слишком низкие потолки');
      return false;
    }
    if (valueFloat > 20.0) {
      this.inputHeight.renderError('Слишком высокие потолки');
      return false;
    }
    this.inputHeight.removeError();
    return true;
  }

  formatHeight() {
    const { value } = this.inputHeight.self.querySelector('input');
    const formatedHeight = formatFloat(value, 2);
    this.inputHeight.setValue(formatedHeight);
  }

  /**
   * Валидация номера телефона
   * @returns bool - Результат проверки валидности
   */
  formatPhoneNumber() {
    const { value } = this.inputPhone.self.querySelector('input');

    const [formatValue, isValid] = checkPhone(value);

    this.inputPhone.self.querySelector('input').value = formatValue;
    if (isValid) {
      this.inputPhone.removeError();
      return true;
    }
    this.inputPhone.renderError('Неккоректный формат');
    return false;
  }

  validateAddress() {
    const value = this.inputAdress.getValue();
    if (value.length === 0) {
      this.inputAdress.renderError('Адрес не может быть пустым');
      return false;
    }
    if (value.length > 500) {
      this.inputAdress.renderError('Слишком длинный адрес');
      return false;
    }
    this.inputAdress.removeError('');
    return true;
  }

  validateTitle() {
    const value = this.inputTitle.getValue();
    if (value.length === 0) {
      this.inputTitle.renderError('Напишите заголовок');
      return false;
    }
    if (value.length > 100) {
      this.inputTitle.renderError('Сократитье до 100 символов');
      return false;
    }
    this.inputTitle.removeError('');
    return true;
  }

  formatPrice() {
    const { value } = this.inputPrice.self.querySelector('input');
    const formatedPrice = formatInteger(value, 10);
    this.inputPrice.setValue(formatedPrice);
  }

  checkMandatoryInput() {
    let ok = true;
    if (this.object === 'Flat') {
      ok = this.params.checkMandatoryInputFlat();
    } else {
      ok = this.params.checkMandatoryInputHouse();
    }
    this.inputAdress.removeError();
    this.inputYear.removeError();
    this.inputHeight.removeError();
    this.inputGeneralFloor.removeError();
    this.inputTitle.removeError();
    this.inputPrice.removeError();
    this.inputPhone.removeError();

    const adress = this.inputAdress.getValue();
    if (adress.length === 0) {
      this.inputAdress.renderError('Обязательное поле');
      ok = false;
    }
    const year = this.inputYear.getValue();
    if (year.length === 0) {
      this.inputYear.renderError('Обязательное поле');
      ok = false;
    }
    const height = this.inputHeight.getValue();
    if (height.length === 0) {
      this.inputHeight.renderError('Обязательное поле');
      ok = false;
    }
    const floor = this.inputGeneralFloor.getValue();
    if (floor.length === 0) {
      this.inputGeneralFloor.renderError('Обязательное поле');
      ok = false;
    }
    const title = this.inputTitle.getValue();
    if (title.length === 0) {
      this.inputTitle.renderError('Обязательное поле');
      ok = false;
    }
    const price = this.inputPrice.getValue();
    if (price.length === 0) {
      this.inputPrice.renderError('Обязательное поле');
      ok = false;
    }
    const phone = this.inputPhone.getValue();
    if (phone.length === 0) {
      this.inputPhone.renderError('Обязательное поле');
      ok = false;
    }
    return ok;
  }

  validateAll() {
    let ok = true;
    if (this.object === 'Flat') {
      ok = this.params.checkValidFlat();
    } else {
      ok = this.params.checkValidHouse();
    }
    const valAdress = this.validateAddress.bind(this);
    const valYear = this.validateYear.bind(this);
    const valHeight = this.validateHeight(this);
    const valFloor = this.validateFloor.bind(this.inputGeneralFloor);
    const valTitle = this.validateTitle(this);
    const valPhone = this.formatPhoneNumber.bind(this);

    if (valAdress && valYear && valHeight && valFloor && valTitle && ok && valPhone) {
      return true;
    }
    return false;
  }

  /**
   * Получение значения в поле
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
   * Задание поля значением
   * @param {string} name - Имя поля
   * @param {string} value - Устанавлеваемое значение поля
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
   * Обработка события добавления фото
   */
  uploadImageHandler() {
    this.changeImages = true;
    document.getElementById('uploadImageError').textContent = '';
    document.getElementById('uploadImageInfo').textContent = '';
    const { files } = this.inputUploadImage.self.querySelector('input');
    for (let i = 0; i < files.length; i += 1) {
      if (!files[i]) {
        this.isValidImages = false;
        return;
      }
      if (!files[i].type.includes('image')) {
        document.getElementById('uploadImageError').textContent = 'Только .png, .jpeg, .jpg';
        this.isValidImages = false;
        return;
      }
      this.files = files;
      this.isValidImages = true;
      document.getElementById('uploadImageInfo').textContent = `Загружено изображений: ${files.length}`;
    }
  }

  /**
   * Валидация возможности и сохранение данных
   */
  async saveHandler() {
    document.getElementById('saveInfo').textContent = '';
    if (!this.checkMandatoryInput()) {
      document.getElementById('saveInfo').textContent = 'Заполните обязательные поля!';
      return;
    }
    if (!this.validateAll()) {
      document.getElementById('saveInfo').textContent = 'Введите корректные данные';
      return;
    }
    if (!this.isValidImages) {
      document.getElementById('saveInfo').textContent = 'Загрузите хотя бы одну фотографию';
      return;
    }
    let request;
    if (this.object === 'Flat') {
      request = createFlatAdvert;
    } else {
      request = createHouseAdvert;
    }
    const data = this.getValues();

    try {
      const [statusCode, response] = await request(data);
      if (statusCode !== globalVariables.HTTP_STATUS_CREATED) {
        document.getElementById('saveInfo').textContent = 'Произошла ошибка при создании объявления';
        return;
      }

      const idAdvert = response.payload.id;
      for (let i = 0; i < this.files.length; i += 1) {
        const postData = new FormData();
        postData.append('id', idAdvert);
        postData.append('file', this.files[i]);
        const [statusCodeImage, ,] = await uploadAdvertImage(postData);
        if (statusCodeImage !== globalVariables.HTTP_STATUS_CREATED) {
          document.getElementById('saveInfo').textContent = 'Произошла ошибка при создании объявления';
          return;
        }
      }
      this.redirect(`/adverts/${idAdvert}`);
    } catch (error) {
      document.getElementById('saveInfo').textContent = 'Произошла ошибка при создании объявления';
    }
  }

  /**
   * Валидация возможности и изменение данных
   */
  async editHandler() {
    document.getElementById('saveInfo').textContent = '';
    if (!this.checkMandatoryInput()) {
      document.getElementById('saveInfo').textContent = 'Заполните обяхательные поля!';
      return;
    }
    if (!this.validateAll()) {
      document.getElementById('saveInfo').textContent = 'Введите корректные данные';
      return;
    }
    if (!this.isValidImages && this.changeImages) {
      document.getElementById('saveInfo').textContent = 'Загрузите хотя бы одну фотографию';
      return;
    }

    let requestData;
    const data = this.getValues();
    const idAdvert = window.location.pathname.replace('/edit-advert/', '');
    if (this.object === 'Flat') {
      requestData = {
        typeAdvert: 'Flat',
        typeSale: data.advertTypeSale,
        title: data.title,
        description: data.description,
        price: data.price,
        phone: data.phone,
        isAgent: data.isAgent,
        adress: data.address,
        adressPoint: data.addressPoint,
        flatProperties: {
          floor: data.floor,
          floorGeneral: data.floorGeneral,
          ceilingHeight: data.ceilingHeight,
          roomCount: data.roomCount,
          squareGeneral: data.squareGeneral,
          squareResidential: data.squareResidential,
          apartment: data.apartment,
        },
        yearCreation: data.yearCreation,
        material: data.material,
      };
    } else {
      requestData = {
        typeAdvert: 'House',
        typeSale: data.advertTypeSale,
        title: data.title,
        description: data.description,
        price: data.price,
        phone: data.phone,
        isAgent: data.isAgent,
        adress: data.address,
        adressPoint: data.addressPoint,
        houseProperties: {
          ceilingHeight: data.ceilingHeight,
          squareArea: data.squareArea,
          squareHouse: data.squareHouse,
          bedroomCount: data.bedroomCount,
          statusArea: data.statusArea,
          cottage: data.cottage,
          statusHome: data.statusHome,
          floor: data.floor,
        },
        yearCreation: data.yearCreation,
        material: data.material,

      };
    }

    try {
      const [statusCode, response] = await updateAdvertById(requestData, idAdvert);
      if (statusCode !== globalVariables.HTTP_STATUS_OK) {
        document.getElementById('saveInfo').textContent = 'Произошла ошибка при изменении объявления';
        return;
      }
      if (this.changeImages) {
        for (let i = 0; i < this.files.length; i += 1) {
          const postData = new FormData();
          postData.append('id', idAdvert);
          postData.append('file', this.files[i]);
          const [statusCodeImage, ,] = await uploadAdvertImage(postData);
          if (statusCodeImage !== globalVariables.HTTP_STATUS_CREATED) {
            document.getElementById('saveInfo').textContent = 'Произошла ошибка при создании объявления';
            return;
          }
        }
      }
      this.redirect(`/adverts/${idAdvert}`);
    } catch (error) {
      document.getElementById('saveInfo').textContent = 'Произошла ошибка при создании объявления';
    }
  }

  /**
   * Получение значений всех полей
   * @returns {Object} - Объект значений полей
   */
  getValues() {
    const isAgent = this.getValueRadio('isAgent');
    const typeDeal = this.getValueRadio('deal');
    const adress = this.inputAdress.getValue();
    const year = this.inputYear.getValue();
    const height = this.inputHeight.getValue();
    const generalFloor = this.inputGeneralFloor.getValue();
    const title = this.inputTitle.getValue();
    const description = document.getElementById('description').value;
    const price = this.inputPrice.getValue();
    const phone = this.inputPhone.getValue();
    const max = 9999999999;
    const min = 1000000000;
    const point = `0101000020E61000007593180456265230172934${Math.floor(Math.random() * (max - min + 1)) + min}`;
    let data;
    if (this.object === 'Flat') {
      const [apartament, floor, generalSquare, livingSquare, rooms] = this.params.getFLatParams();
      data = {
        advertTypeSale: typeDeal,
        advertTypePlacement: 'Flat',
        title,
        description,
        phone,
        isAgent: Boolean(isAgent),
        floor: Number(floor),
        ceilingHeight: Number(height),
        squareGeneral: Number(generalSquare),
        roomCount: Number(rooms),
        squareResidential: Number(livingSquare),
        apartment: Boolean(apartament),
        price: Number(price),
        floorGeneral: Number(generalFloor),
        material: 'Brick',
        address: adress,
        yearCreation: Number(year),
        addressPoint: point,
      };
    } else {
      const [
        cottage,
        squareHouse,
        squareArea,
        bedrooms,
        statusHome,
        statusArea] = this.params.getHouseParams();
      data = {
        advertTypeSale: typeDeal,
        advertTypePlacement: 'House',
        title,
        description,
        phone,
        isAgent: Boolean(isAgent),
        floor: Number(generalFloor),
        ceilingHeight: Number(height),
        squareArea: Number(squareArea),
        squareHouse: Number(squareHouse),
        bedroomCount: Number(bedrooms),
        statusArea,
        cottage: Boolean(cottage),
        statusHome,
        price: Number(price),
        floorGeneral: Number(generalFloor),
        material: 'Brick',
        address: adress,
        yearCreation: Number(year),
        addressPoint: point,
      };
    }
    return data;
  }

  /**
   * Установка всех полей заданными значениями
   * @param {Object} state - Объект задаваемых значений
   */
  setValues(state) {
    const countImages = state.images.length;
    document.getElementById('uploadImageInfo').textContent = `Загружено фотографий: ${countImages}`;
    this.setValueRadio('isAgent', state.isAgent);
    this.setValueRadio('deal', state.typeSale);
    this.inputAdress.setValue(state.adress);
    this.inputYear.setValue(state.yearCreation);
    this.inputTitle.setValue(state.title);
    document.getElementById('description').value = state.description;
    this.inputPrice.setValue(state.price);
    this.inputPhone.setValue(state.phone);
    this.setValueRadio('object', state.advertType);
    this.object = state.advertType;
    if (this.object === 'Flat') {
      this.params.componentDidUpdate({
        name: events.CHANGE_OBJECT,
        data: {
          title: 'Параметры квартиры',
          flat: true,
          house: false,
        },
      });
      this.inputHeight.setValue(state.flatProperties.ceilingHeight);
      this.inputGeneralFloor.setValue(state.flatProperties.floorGeneral);
      this.params.setFLatParams(
        state.flatProperties.apartment,
        state.flatProperties.floor,
        state.flatProperties.squareGeneral,
        state.flatProperties.squareResidential,
        state.flatProperties.roomCount,
      );
    } else {
      this.params.componentDidUpdate({
        name: events.CHANGE_OBJECT,
        data: {
          title: 'Параметры дома',
          flat: false,
          house: true,
        },
      });
      this.inputHeight.setValue(state.houseProperties.ceilingHeight);
      this.inputGeneralFloor.setValue(state.houseProperties.floor);
      this.params.setHouseParams(
        state.houseProperties.cottage,
        state.houseProperties.squareHouse,
        state.houseProperties.squareArea,
        state.houseProperties.bedroomCount,
        state.houseProperties.statusHome,
        state.houseProperties.statusArea,
      );
    }
  }
}
