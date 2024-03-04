import { Button } from '../button/button.js';
import { Input } from '../input/input.js';

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
     *
     * @param {HTMLElement} parent - Родительский элемент
     * @param {Object} [state = SEARCH_DEFAULT] - Начальное состояние блока поиска
     */
  constructor(parent, state = {}) {
    this.state = state;
    this.#parent = parent;
  }

  render() {
    this.#parent.insertAdjacentHTML(
      'beforeend',
      window.Handlebars.templates['search.hbs'](this.state),
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
