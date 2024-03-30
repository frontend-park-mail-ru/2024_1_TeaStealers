import { Button, Input, BaseComponent } from '@components';
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
    const HomeTypeMenu = new Button('searchString', {
      ...buttonPattern,
      text: state.homeType,
    });
    const roomNumberMenu = new Button('searchString', {
      ...buttonPattern,
      text: state.roomNumber,
    });
    const priceMenu = new Button('searchString', {
      ...buttonPattern,
      text: state.price,
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
    const innerComponents = [HomeTypeMenu, roomNumberMenu, priceMenu, inputMenu, findButton];
    super({
      parent, template, state, innerComponents,
    });
  }

  componentDidMount() {
    document.querySelector('#searchBtn').addEventListener('click', listeners.click);
  }
}
