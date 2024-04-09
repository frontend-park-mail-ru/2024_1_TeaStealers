import {
  Button, Input, BaseComponent, DropMenu,
} from '@components';
import { checkPriceFilter } from '@modules';
import { mainControler } from '@controllers';
import search from './search.hbs';

const DEFAULT_SEARCH = {
  title: '',
  firstFilterLinkStatus: '',
  secondFilterLinkStatus: '',
  firstFilterLinkDesc: '',
  secondFilterLinkDesc: '',
  homeType: '',
  roomNumber: '',
  price: '',
};

const DEFAULT_DROP_HOMETYPE_MENU = {
  homeType: true,
  flatTypes: [
    {
      value: 'Flat',
      label: 'Квартира',
    },
  ],
  homeTypes: [
    {
      value: 'House',
      label: 'Дом',
    },
  ],
  id: 'homeTypeMenu',
};

const DEFAULT_DROP_ROOMNUMBER_MENU = {
  roomNumber: true,
  roomCount: [
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 5,
      label: '5',
    },
  ],
  id: 'roomNumberMenu',
};

const DEFAULT_DROP_PRICE_MENU = {
  priceRange: true,
  id: 'priceRange',
};

const buttonPattern = {
  blockClass: 'string_menu-button',
};

/**
 * Класс компонента блока поиска
 */
export class Search extends BaseComponent {
  /**
     * Создает новый экземпляр блока поиска
     * @param {HTMLElement} parent - Родительский элемент
     * @param {Object} [state = SEARCH_DEFAULT] - Начальное состояние блока поиска
     */
  constructor(parent, state = DEFAULT_SEARCH) {
    const template = search;
    state = { ...DEFAULT_SEARCH, ...state };

    const homeType = new Button('searchString', {
      ...buttonPattern,
      text: state.homeType,
      id: 'homeType',
    });

    const roomNumber = new Button('searchString', {
      ...buttonPattern,
      text: state.roomNumber,
      id: 'roomNumber',
    });

    const price = new Button('searchString', {
      ...buttonPattern,
      text: state.price,
      id: 'price',
    });

    const inputMenu = new Input('searchString', {
      placeholder: 'Город, улица',
      type: 'text',
      blockClass: 'search__input',
      id: 'inputMenu',
    });

    const findButton = new Button('searchButton', {
      text: 'Найти',
      mode: 'primary',
      size: 'sm',
      borderRadius: 'sm',
      id: 'searchBtn',
    });

    const homeTypeMenu = new DropMenu('homeType', DEFAULT_DROP_HOMETYPE_MENU);

    const roomNumberMenu = new DropMenu('roomNumber', DEFAULT_DROP_ROOMNUMBER_MENU);

    const priceMenu = new DropMenu('price', DEFAULT_DROP_PRICE_MENU);

    const innerComponents = [homeType, roomNumber,
      price, inputMenu, findButton,
      homeTypeMenu, roomNumberMenu, priceMenu];
    super({
      parent, template, state, innerComponents,
    });

    [this.homeType, this.roomNumber, this.price, this.inputMenu, this.findButton,
      this.homeTypeMenu, this.roomNumberMenu, this.priceMenu] = this.innerComponents;
    this.menus = [this.homeTypeMenu, this.roomNumberMenu, this.priceMenu];
    this.buttons = [this.homeType, this.roomNumber, this.price];

    this.flatFilter = '';
    this.roomCounter = undefined;
    this.prices = [undefined, undefined];
    this.dealType = 'Sale';
  }

  componentDidMount() {
    document.querySelector('#searchBtn').addEventListener('click', this.search.bind(this));
    this.addListener(this.homeType, 'button', 'click', this.openMenu.bind(this.homeType));
    this.addListener(this.roomNumber, 'button', 'click', this.openMenu.bind(this.roomNumber));
    this.addListener(this.price, 'button', 'click', this.openMenu.bind(this.price));
    this.homeTypeMenu.self.querySelectorAll('input').forEach((input) => {
      input.addEventListener('change', this.chooseHomeType.bind(this));
    });
    this.roomNumberMenu.self.querySelectorAll('input').forEach((input) => {
      input.addEventListener('change', this.chooseRoomNember.bind(this));
    });
    this.priceMenu.self.querySelectorAll('input').forEach((input) => {
      input.addEventListener('input', this.choosePrice.bind(this));
    });
    this.filters = this.componentLink.querySelectorAll('.search__filter-link');
    this.filters.forEach((filter) => {
      filter.addEventListener('click', this.changeFilter.bind(this));
    });
    this.addListener(this.inputMenu, 'input', 'change', this.saveInput.bind(this));
    this.addClickListener('main-page', this.closeMenu.bind(this));
    if (this.state.typeSale === 'Rent') {
      this.filters.forEach((filter) => {
        if (filter.firstElementChild.innerText === 'Снять') {
          this.dealType = 'Rent';
          filter.classList.remove('filter-link_passive');
          filter.classList.add('filter-link_active');
        } else {
          filter.classList.remove('filter-link_active');
          filter.classList.add('filter-link_passive');
        }
      });
    }
  }

  openMenu(menuButton) {
    const parentDivForButton = menuButton.target.parentElement;
    const documentmenus = document.getElementsByClassName('dropMenu');
    Array.from(documentmenus).forEach((menu) => {
      if (!menu.classList.contains('hidden') && menu !== parentDivForButton.lastElementChild) {
        menu.classList.add('hidden');
      }
    });
    const menu = parentDivForButton.lastElementChild;
    menu.classList.toggle('hidden');
  }

  chooseHomeType(event) {
    this.flatFilter = event.target.value;
    let menuButton = event.target;
    let dropMenu;
    while (!menuButton.classList.contains('string_menu-button')) {
      if (menuButton.classList.contains('dropMenu')) {
        dropMenu = menuButton;
      }
      menuButton = menuButton.parentElement;
    }
    const inputs = dropMenu.querySelectorAll('input');
    const labels = dropMenu.querySelectorAll('label');
    let message = 'Квартиру в новостройке или вторичке';
    let checked = false;
    inputs.forEach((input, idx) => {
      if (input !== event.target) {
        input.checked = false;
      }
      if (input.checked) {
        if (!checked) {
          checked = true;
          message = '';
        }
        if (!message) {
          message = labels[idx].innerText;
        } else {
          message += ` или ${labels[idx].innerText}`;
        }
      }
    });
    menuButton.firstElementChild.innerText = message;
  }

  chooseRoomNember(event) {
    this.roomCounter = event.target.value;
    let menuButton = event.target;
    let dropMenu;
    while (!menuButton.classList.contains('string_menu-button')) {
      if (menuButton.classList.contains('dropMenu')) {
        dropMenu = menuButton;
      }
      menuButton = menuButton.parentElement;
    }
    const inputs = dropMenu.querySelectorAll('input');
    const labels = dropMenu.querySelectorAll('label');
    let message = 'Комнат';
    let checked = false;
    inputs.forEach((input, idx) => {
      if (input !== event.target) {
        input.checked = false;
      }
      if (input.checked) {
        if (!checked) {
          checked = true;
          message += `: ${labels[idx].innerText}`;
        } else {
          message += `, ${labels[idx].innerText}`;
        }
      }
    });
    menuButton.firstElementChild.innerText = message;
  }

  changeFilter(event) {
    let filterElement = event.target;
    if (!filterElement.classList.contains('search__filter-link')) {
      filterElement = filterElement.parentElement;
    }
    this.filters.forEach((filter) => {
      if (filter !== filterElement) {
        filter.classList.remove('filter-link_active');
        filter.classList.add('filter-link_passive');
      }
    });
    if (filterElement.firstElementChild.innerText === 'Купить') {
      this.dealType = 'Sale';
    } else {
      this.dealType = 'Rent';
    }
    filterElement.classList.remove('filter-link_passive');
    filterElement.classList.add('filter-link_active');
  }

  choosePrice(event) {
    let menuButton = event.target;
    let dropMenu;
    while (!menuButton.classList.contains('string_menu-button')) {
      if (menuButton.classList.contains('dropMenu')) {
        dropMenu = menuButton;
      }
      menuButton = menuButton.parentElement;
    }
    const fromToArray = [' от ', ' до '];
    let message = 'Цена';
    const inputs = dropMenu.querySelectorAll('input');
    inputs.forEach((input, idx) => {
      if (input.value !== '') {
        message += fromToArray[idx] + input.value;
        this.prices[idx] = input.value;
      }
    });
    const maxLength = 20;
    if (message.length > maxLength) {
      message = `${message.slice(0, maxLength)}...`;
    }
    menuButton.firstElementChild.innerText = message;
    const [, isValidPriceFilter] = checkPriceFilter(inputs[0].value, inputs[1].value);
    if (!isValidPriceFilter) {
      inputs.forEach((input) => {
        input.style.borderColor = 'red';
      });
    } else {
      inputs.forEach((input) => {
        input.style.borderColor = '';
      });
    }
  }

  closeMenu(event) {
    let currentObj = event.target;
    while (currentObj !== null) {
      if (currentObj.classList.contains('string_menu-button')) {
        return;
      }
      currentObj = currentObj.parentElement;
    }
    const parentDivForButton = event.target.parentElement;
    const parentDivForMenu = event.target.parentElement.parentElement;
    if (parentDivForButton
      .lastElementChild.classList
      .contains('dropMenu')
      || parentDivForMenu.lastElementChild.classList
        .contains('dropMenu')) {
      return;
    }
    const documentmenus = document.getElementsByClassName('dropMenu');
    Array.from(documentmenus).forEach((menu) => {
      if (!menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
      }
    });
  }

  saveInput(event) {
    this.adress = event.target.value;
  }

  search() {
    const queryParameters = {};
    // if (this.flatFilter === 1) {
    //   queryParameters.adverttype = 'Flat';
    // } else if (this.flatFilter === 2) {
    //   queryParameters.adverttype = 'House';
    // } else {
    //   queryParameters.adverttype = '';
    // }
    queryParameters.adverttype = this.flatFilter;
    queryParameters.adress = `${this.adress}`;
    queryParameters.dealtype = `${this.dealType}`;
    queryParameters.roomcount = `${this.roomCounter}`;
    queryParameters.minprice = `${this.prices[0]}`;
    queryParameters.maxprice = `${this.prices[1]}`;
    mainControler.updateMainModelWithParameters(queryParameters);
  }

  componentWillUnmount() {
    document.querySelector('#searchBtn').removeEventListener('click', this.search.bind(this));
    this.removeListener(this.homeType, 'button', 'click', this.openMenu.bind(this.homeType));
    this.removeListener(this.roomNumber, 'button', 'click', this.openMenu.bind(this.roomNumber));
    this.removeListener(this.price, 'button', 'click', this.openMenu.bind(this.price));
    this.homeTypeMenu.self.querySelectorAll('input').forEach((input) => {
      input.removeEventListener('change', this.chooseHomeType.bind(this.homeTypeMenu));
    });
    this.roomNumberMenu.self.querySelectorAll('input').forEach((input) => {
      input.removeEventListener('change', this.chooseRoomNember.bind(this.roomNumberMenu));
    });
    this.priceMenu.self.querySelectorAll('input').forEach((input) => {
      input.removeEventListener('input', this.choosePrice.bind(this.priceMenu));
    });
    this.filters.forEach((filter) => {
      filter.removeEventListener('click', this.changeFilter.bind(this));
    });
    this.removeListener(this.inputMenu, 'input', 'change', this.saveInput.bind(this));
    this.removeClickListener('main-page', this.closeMenu.bind(this));
  }
}
