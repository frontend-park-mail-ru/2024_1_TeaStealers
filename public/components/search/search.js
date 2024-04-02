import {
  Button, Input, BaseComponent, DropMenu,
} from '@components';
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
  types: [
    {
      value: 0,
      label: 'квартира в новостройке',
    },
    {
      value: 0,
      label: 'квартира во вторичке',
    },
  ],
  id: 'homeTypeMenu',
};

const DEFAULT_DROP_ROOMNUMBER_MENU = {
  roomNumber: true,
  roomCount: [
    {
      value: 0,
      label: '1',
    },
    {
      value: 0,
      label: '2',
    },
    {
      value: 0,
      label: '3 и более',
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

const listeners = {
  click: () => {
    console.log('searchButton');
  },
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
      placeholder: 'Город, адрес, метро, район',
      type: 'text',
      blockClass: 'search__input',
    });

    const findButton = new Button('searchButton', {
      text: 'Найти',
      order: 'primary',
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
  }

  componentDidMount() {
    document.querySelector('#searchBtn').addEventListener('click', listeners.click);
    this.addListener(this.homeType, 'button', 'click', this.openMenu.bind(this.homeType));
    this.addListener(this.roomNumber, 'button', 'click', this.openMenu.bind(this.roomNumber));
    this.addListener(this.price, 'button', 'click', this.openMenu.bind(this.price));
    document.addEventListener('click', this.closeMenu.bind(this));
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

  closeMenu(event) {
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

  componentWillUnmount() {
    this.removeListener(this.homeType, 'button', 'click', this.openMenu.bind(this.homeType));
    this.removeListener(this.roomNumber, 'button', 'click', this.openMenu.bind(this.roomNumber));
    this.removeListener(this.price, 'button', 'click', this.openMenu.bind(this.price));
    document.removeEventListener('click', this.closeMenu.bind(this));
  }
}
