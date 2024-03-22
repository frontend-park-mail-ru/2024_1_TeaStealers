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
/**
 * Класс компонента блока поиска
 */
export class Search {
  state;

  #parent;

  /**
     * Создает новый экземпляр блока поиска
     * @param {HTMLElement} parent - Родительский элемент
     * @param {Object} [state = SEARCH_DEFAULT] - Начальное состояние блока поиска
     */
  constructor(parent, state = {}) {
    this.state = { ...SEARCH_DEFAULT, ...state };
    this.#parent = parent;
  }

  /**
   * Функция отрисовки блока поиска
   */
  render() {
    this.#parent.insertAdjacentHTML(
      'beforeend',
      search(this.state),
    );

    const buttonPattern = {
      blockClass: 'string_menu-button',
    };
    const HomeTypeMenu = new Button(document.querySelector('#searchString'), {
      ...buttonPattern,
      text: this.state.homeType,
    });
    HomeTypeMenu.render();
    const roomNumberMenu = new Button(document.querySelector('#searchString'), {
      ...buttonPattern,
      text: this.state.roomNumber,
    });
    roomNumberMenu.render();

    const priceMenu = new Button(document.querySelector('#searchString'), {
      ...buttonPattern,
      text: this.state.price,
    });
    priceMenu.render();

    const inputMenu = new Input(document.querySelector('#searchString'), {
      placeholder: 'Город, адрес, метро, район',
      type: 'text',
      blockClass: 'search__input',
    });
    inputMenu.render();

    const findButton = new Button(document.querySelector('#searchButton'), {
      text: 'Найти',
      order: 'primary',
      size: 'sm',
      borderRadius: 'sm',
    });
    findButton.render();
  }
}
