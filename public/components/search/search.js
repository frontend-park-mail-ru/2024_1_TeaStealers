import search from './search.hbs';
import { Button, Input } from '@components';

const SEARCH_DEFAULT = {
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

listeners = {
  click: () => {
    console.log('searchButton');
  }
}

/**
 * Класс компонента блока поиска
 */
export class Search extends BaseComponent {
  state;

  #parent;

  /**
     * Создает новый экземпляр блока поиска
     * @param {HTMLElement} parent - Родительский элемент
     * @param {Object} [state = SEARCH_DEFAULT] - Начальное состояние блока поиска
     */
  constructor(parent, state = DEFAULT_BUTTON) {
    template = new search;
    state = { ...DEFAULT_BUTTON, ...state };
    const HomeTypeMenu = new Button(document.querySelector('#searchString'), {
      ...buttonPattern,
      text: this.state.homeType,
    });
    const roomNumberMenu = new Button(document.querySelector('#searchString'), {
      ...buttonPattern,
      text: this.state.roomNumber,
    });
    const priceMenu = new Button(document.querySelector('#searchString'), {
      ...buttonPattern,
      text: this.state.price,
    });
    const inputMenu = new Input(document.querySelector('#searchString'), {
      placeholder: 'Город, адрес, метро, район',
      type: 'text',
      blockClass: 'search__input',
    });
    const findButton = new Button(document.querySelector('#searchButton'), {
      text: 'Найти',
      order: 'primary',
      size: 'sm',
      borderRadius: 'sm',
    });
    innerComponents = [HomeTypeMenu, roomNumberMenu, priceMenu, inputMenu, findButton];
    super({parent, template, state, innerComponents});
  }

  componentDidMount() {
    this.innerComponents[4].AddEventListener(click, listeners[click]);
  }
}
