import {
  BaseComponent, Button, Input, Params,
} from '@components';
import {
  checkLogin, checkPassword, checkPhone, checkEmail, checkDateDirthday, uploadAvatar,
  updateUserInfo, updateUserPassword, checkYear, checkFloor, createFlatAdvert, createHouseAdvert, uploadAdvertImage, updateAdvertById,
} from '@modules';
import { events, globalVariables } from '@models';
import editAdvert from './editAdvert.hbs';

export class EditAdvert extends BaseComponent {
  object;

  files;

  isValidImages;

  changeImages;

  editAdvert;

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
      type: 'number',
    });
    const inputHeight = new Input('aboutBuildIinputContainer', {
      id: 'inputHeight',
      placeholder: 'Высота потолков',
      label: 'Высота потолков, м',
      type: 'number',
    });
    const inputGeneralFloor = new Input('aboutBuildIinputContainer', {
      id: 'inputGeneralFloor',
      placeholder: 'Этажей в доме',
      label: 'Этажей в доме',
      type: 'number',
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
      type: 'number',
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
     * Добавление листенеров
     */
  componentDidMount() {
    document.getElementById('flat').addEventListener('change', this.changeObject.bind(this));
    document.getElementById('house').addEventListener('change', this.changeObject.bind(this));
    this.addListener(this.inputYear, 'input', 'blur', this.validateYear.bind(this));
    this.addListener(this.inputGeneralFloor, 'input', 'blur', this.validateFloor.bind(this.inputGeneralFloor));
    this.addListener(this.inputHeight, 'input', 'input', this.validateHeight.bind(this));
    this.addClickListener('btnSave', this.saveHandler.bind(this));
    this.addClickListener('btnSaveEdit', this.editHandler.bind(this));
    this.addListener(this.inputPhone, '', 'input', this.formatPhoneNumber.bind(this));
    this.addListener(this.inputUploadImage, 'input', 'input', this.uploadImageHandler.bind(this));
    super.componentDidMount();
  }

  componentDidUpdate(event) {
    if (event.name === events.GET_ADVERT_BY_ID_FOR_EDIT) {
      this.setValues(event.data);
    }
  }

  /**
     * Удаление листенеров
     */
  componentWillUnmount() {
    super.componentWillUnmount();
  }

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

  validateHeight() {
    const { value } = this.inputHeight.self.querySelector('input');
    let formatedValue = '';
    for (let i = 0; i < 4; i += 1) {
      const char = value.charAt(i);
      formatedValue += char;
    }
    this.inputHeight.self.querySelector('input').value = formatedValue;
  }

  /**
 * Валидирует номер телефона
 */
  formatPhoneNumber() {
    const { value } = this.inputPhone.self.querySelector('input');

    const [formatValue, isValid] = checkPhone(value);

    this.inputPhone.self.querySelector('input').value = formatValue;
    if (isValid) {
      this.inputPhone.removeError();
      return true;
    }
    return false;
  }

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

  setValueRadio(name, value) {
    const radioButtons = document.querySelectorAll(`input[name="${name}"]`);
    radioButtons.forEach((radioButton) => {
      if (radioButton.value === String(value)) {
        radioButton.checked = true;
      }
    });
  }

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

  async saveHandler() {
    document.getElementById('saveInfo').textContent = '';
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

  async editHandler() {
    document.getElementById('saveInfo').textContent = '';
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
