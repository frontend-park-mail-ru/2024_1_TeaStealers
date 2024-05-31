import {
  BaseComponent, Button, Dropdown, Input, MapGeocoder, Params,
} from '@components';
import {
  checkPhone, checkYear, checkFloor, createFlatAdvert,
  createHouseAdvert, uploadAdvertImage, updateAdvertById, getSagests, formatInteger, formatFloat, getBuildingInfo,
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

  prevSearchAddress;

  currentAddress;

  currentObjectAddress;

  sagestData;

  dropdown;

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
      placeholder: 'Введите адрес вручную или передвиньте маркер на карте',
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
    const geocoder = new MapGeocoder('inputAdress-container', {});
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
      geocoder,
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
      this.btnSave,
      this.geocoder] = innerComponents;
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
    this.addListener(this.inputAdress, 'input', 'input', this.sadgestAddress.bind(this));
    this.addClickListener('newadvert-page', this.closeSaggest.bind(this));
    this.addClickListener('editadvert-page', this.closeSaggest.bind(this));
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
    if (event.name === events.SET_ADDRESS_EDIT_ADVERT) {
      this.inputAdress.removeError();
      this.inputAdress.setValue(event.data.address);
      this.currentAddress = event.data.address;
      this.currentObjectAddress = event.data.object;
      setTimeout(async () => {
        await this.responseBuilding();
      }, 200);
    }
    if (event.name === events.SET_ADDRESS_EDIT_ADVERT_ERROR) {
      this.inputAdress.setValue('');
      this.currentAddress = '';
      this.currentObjectAddress = null;
      this.inputAdress.renderError('Укажите корректный адрес');
    }
  }

  /**
     * Удаление обработчиков
     */
  componentWillUnmount() {
    document.getElementById('flat').removeEventListener('change', this.changeObject.bind(this));
    document.getElementById('house').removeEventListener('change', this.changeObject.bind(this));
    this.removeListener(this.inputYear, 'input', 'blur', this.validateYear.bind(this));
    this.removeListener(this.inputGeneralFloor, 'input', 'blur', this.validateFloor.bind(this.inputGeneralFloor));
    this.removeListener(this.inputHeight, 'input', 'input', this.formatHeight.bind(this));
    this.removeListener(this.inputHeight, 'input', 'blur', this.validateHeight.bind(this));
    this.removeClickListener('btnSave', this.saveHandler.bind(this));
    this.removeClickListener('btnSaveEdit', this.editHandler.bind(this));
    this.removeListener(this.inputPhone, '', 'input', this.formatPhoneNumber.bind(this));
    this.removeListener(this.inputUploadImage, 'input', 'input', this.uploadImageHandler.bind(this));
    this.removeListener(this.inputYear, 'input', 'input', this.formatYear.bind(this));
    this.removeListener(this.inputGeneralFloor, 'input', 'input', this.formatFloor.bind(this));
    this.removeListener(this.inputAdress, 'input', 'blur', this.validateAddress.bind(this));
    this.removeListener(this.inputTitle, 'input', 'blur', this.validateTitle.bind(this));
    this.removeListener(this.inputPrice, 'input', 'input', this.formatPrice.bind(this));
    this.removeListener(this.inputAdress, 'input', 'input', this.sadgestAddress.bind(this));
    this.removeClickListener('newadvert-page', this.closeSaggest.bind(this));
    this.removeClickListener('editadvert-page', this.closeSaggest.bind(this));
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

  async sadgestAddress() {
    setTimeout(async () => {
      const addressInput = this.inputAdress.getValue().trim();
      if (this.prevSearchAddress === undefined) {
        this.prevSearchAddress = addressInput;
      } else if (this.prevSearchAddress === addressInput) {
        return;
      }
      this.prevSearchAddress = addressInput;
      this.currentAddress = '';
      if (addressInput === '') {
        this.dropdown.unmountAndClean();
        return;
      }
      // const response = await fetch(`https://suggest-maps.yandex.ru/v1/suggest?text=${addressInput}&lang=ru&type=province,locality,street,metro,province&apikey=f7cb9ad6-83ff-41aa-9000-55578209c95c`);
      const response = await fetch(`https://suggest-maps.yandex.ru/v1/suggest?apikey=f7cb9ad6-83ff-41aa-9000-55578209c95c&text=${addressInput}&print_address=1&attrs=uri&lang=ru&type=locality,street`);
      if (!response.ok) {
        return;
      }

      this.sagestData = await response.json();
      if (this.dropdown === undefined) {
        this.dropdown = new Dropdown('inputAdress', { items: this.sagestData.results, id: 'dropdownAddress' });
        this.dropdown.renderAndDidMount();
      } else {
        this.dropdown.unmountAndClean();
        this.dropdown = new Dropdown('inputAdress', { items: this.sagestData.results, id: 'dropdownAddress' });
        this.dropdown.renderAndDidMount();
      }
      const itemsSagest = document.querySelectorAll('.dropdown__item');
      itemsSagest.forEach((item) => {
        item.addEventListener('click', this.setAddress.bind(this));
      });
    }, 400);
  }

  async setAddress(event) {
    this.inputAdress.removeError();
    event.preventDefault();
    if (event.target.classList.contains('dropdown__item')) {
      return false;
    }
    const idItem = event.target.parentNode.id.replace('dropdownItem-', '');
    const id = parseInt(idItem, 10);
    this.currentObjectAddress = this.sagestData.results[id];
    const element = event.target;
    this.inputAdress.setValue(element.textContent);
    this.currentAddress = element.textContent;
    this.inputAdress.self.querySelector('input').focus();
    this.inputAdress.self.querySelector('input').setSelectionRange(this.inputAdress.getValue().length, this.inputAdress.getValue().length);
    if (this.currentObjectAddress.tags.includes('business') || this.currentObjectAddress.tags.includes('house')) {
      await this.addressToCoordinate(this.currentAddress);
      return true;
    }
    this.inputAdress.renderError('Обязательно укажите улицу и номер дома! Если у дома нет номера - укажите ближайший');
    return false;
  }

  async responseBuilding() {
    const address = this.parseAddress();
    const data = {
      province: address.province,
      town: address.town,
      street: address.street,
      house: address.house,
      metro: '',
      addressPoint: address.pos,
    };
    try {
      const [statusCode, response] = await getBuildingInfo(data);
      if (statusCode !== globalVariables.HTTP_STATUS_OK) {
        return;
      }
      if (response.payload === null) {
        return;
      }
      const info = response.payload;
      if (info.floor) {
        this.inputGeneralFloor.setValue(info.floor);
      } else {
        this.inputGeneralFloor.setValue('');
      }
      if (info.yearCreation) {
        this.inputYear.setValue(info.yearCreation);
      } else {
        this.inputYear.setValue('');
      }

      if (info.complexName !== '') {
        const complex = document.createElement('span');
        complex.style.marginTop = '-25px';
        complex.textContent = `Дом принадлежит ЖК "${info.complexName}`; // Устанавливаем текстовое содержимое span
        this.inputAdress.self.insertAdjacentHTML('beforeend', complex.outerHTML); // Вставляем span в элемент
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addressToCoordinate(address) {
    const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=4df46c00-ebef-47d8-9642-9e3d7773eef0&geocode=${address}&format=json`);
    if (!response.ok) {
      return;
    }

    const coord = await response.json();
    const { pos } = coord.response.GeoObjectCollection.featureMember[0].GeoObject.Point;
    const [long, lat] = pos.split(' ');
    this.geocoder.addMarker(long, lat);
    this.geocoder.coordinateToAdress(pos);
  }

  closeSaggest(event) {
    if (event.target.closest('.inputAdress')) {
      return;
    }
    if (this.dropdown !== undefined) {
      this.inputAdress.setValue(this.currentAddress);
      this.dropdown.unmountAndClean();
    }
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
    const dim = this.object === 'Flat' ? 3 : 1;
    const formatedFloor = formatInteger(floor, dim);
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
    let formatedHeight = formatFloat(value, 2);
    const regex = /^(\d{1,2}([.,]\d{0,2})?)?$/;
    if (!regex.test(value)) {
      formatedHeight = value.slice(0, -1);
    }
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
    let formatedPrice = formatInteger(value, 10);
    if (formatedPrice === '') {
      this.inputPrice.setValue('');
      return;
    }
    formatedPrice = parseInt(formatedPrice, 10).toLocaleString('ru-RU').toString();
    if (formatedPrice) {
      this.inputPrice.setValue(formatedPrice);
    }
    // this.inputPrice.setValue(formatedPrice);
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

  validateNumberParams() {
    if (this.object === 'Flat') {
      const [apartament, floor, generalSquare, livingSquare, rooms] = this.params.getFLatParams();
      console.log(Number(floor), Number(this.inputGeneralFloor.getValue()));
      if (Number(floor) > Number(this.inputGeneralFloor.getValue())) {
        document.getElementById('saveInfo').textContent = 'Этаж выше этажности дома';
        return false;
      }
      if (generalSquare < livingSquare) {
        document.getElementById('saveInfo').textContent = 'Жилая площадь больше общей площади';
        return false;
      }
      return true;
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
    if (!this.validateNumberParams()) {
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
        document.getElementById('saveInfo').textContent = 'Произошла неизвестная ошибка. Попробуйте позже';
        return;
      }

      const idAdvert = response.payload.id;
      for (let i = 0; i < this.files.length; i += 1) {
        const postData = new FormData();
        postData.append('id', idAdvert);
        postData.append('file', this.files[i]);
        const [statusCodeImage, ,] = await uploadAdvertImage(postData);
        if (statusCodeImage !== globalVariables.HTTP_STATUS_CREATED) {
          document.getElementById('saveInfo').textContent = 'Произошла неизвестная ошибка. Попробуйте позже';
          return;
        }
      }
      this.redirect(`/adverts/${idAdvert}`);
    } catch (error) {
      document.getElementById('saveInfo').textContent = 'Произошла неизвестная ошибка. Попробуйте позже';
    }
  }

  /**
   * Обработчик кнопки изменить объявление
   */
  async editHandler() {
    document.getElementById('saveInfo').textContent = '';
    if (!this.checkMandatoryInput()) {
      document.getElementById('saveInfo').textContent = 'Заполните обязательные поля!';
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
    const address = this.parseAddress();
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
        address: {
          province: address.province,
          town: address.town,
          street: address.street,
          house: address.house,
          metro: '',
          addressPoint: `POINT(${address.pos})`,
        },
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
        address: {
          province: address.province,
          town: address.town,
          street: address.street,
          house: address.house,
          metro: '',
          addressPoint: `POINT(${address.pos})`,
        },

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
    const year = this.inputYear.getValue();
    const height = this.inputHeight.getValue();
    const generalFloor = this.inputGeneralFloor.getValue();
    const title = this.inputTitle.getValue();
    const description = document.getElementById('description').value;
    const price = this.inputPrice.getValue().replace(/\s+/g, '');
    const phone = this.inputPhone.getValue();
    let data;
    if (this.object === 'Flat') {
      const [apartament, floor, generalSquare, livingSquare, rooms] = this.params.getFLatParams();
      const address = this.parseAddress();

      data = {
        advertTypeSale: typeDeal,
        // advertTypePlacement: 'Flat',
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
        // address: adress,
        yearCreation: Number(year),
        // addressPoint: point,
        address: {
          province: address.province,
          town: address.town,
          street: address.street,
          house: address.house,
          metro: '',
          addressPoint: `POINT(${address.pos})`,
        },
      };
    } else {
      const [
        cottage,
        squareHouse,
        squareArea,
        bedrooms,
        statusHome,
        statusArea] = this.params.getHouseParams();
      const address = this.parseAddress();

      data = {
        advertTypeSale: typeDeal,
        // advertTypePlacement: 'House',
        title,
        description,
        phone,
        isAgent: Boolean(isAgent),
        // floor: Number(generalFloor),
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
        yearCreation: Number(year),
        address: {
          province: address.province,
          town: address.town,
          street: address.street,
          house: address.house,
          metro: '',
          addressPoint: `POINT(${address.pos})`,
        },
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
    console.log(state.yearCreation);
    this.inputYear.setValue(state.yearCreation);
    this.inputTitle.setValue(state.title);
    document.getElementById('description').value = state.description;
    this.inputPrice.setValue(state.price);
    this.inputPhone.setValue(state.phone);
    this.setValueRadio('object', state.advertType);
    this.object = state.advertType;
    const [long, lat] = this.parsePoint(state.adressPoint);
    this.geocoder.coordinateToAdress(`${long} ${lat}`);
    setTimeout(() => {
      this.geocoder.addMarker(long, lat);
    }, 200);
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

  parseAddress() {
    const { Components } = this.currentObjectAddress.response.GeoObjectCollection.featureMember[0]
      .GeoObject.metaDataProperty.GeocoderMetaData.Address;
    let province = 'Область'; let town; let street; let
      house;
    Components.forEach((component) => {
      switch (component.kind) {
        case 'province':
          province = component.name;
          // province = component.name;
          break;
        case 'locality':
          if (!town) town = component.name;
          break;
        case 'street':
          if (!street) street = component.name;
          break;
        case 'house':
          if (!house) house = component.name;
          break;
        default:
          break;
      }
    });

    const { pos } = this.currentObjectAddress.response.GeoObjectCollection.featureMember[0]
      .GeoObject.Point;

    return {
      province, town, street, house, pos,
    };
  }

  parsePoint(point) {
    const coordinates = point.replace('POINT(', '').replace(')', '').split(' ');
    const long = parseFloat(coordinates[0]);
    const lat = parseFloat(coordinates[1]);
    return [long, lat];
  }
}
