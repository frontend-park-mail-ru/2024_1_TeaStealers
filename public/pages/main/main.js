import Card from '../../components/card/card.js';
import Navbar from '../../components/navbar/navbar.js';

const DEFAULT_MAIN = {
  isAuthenticated: false,
  title: 'Найди мечту',
};
/**
 * Класс главной страницы страницы
 */
export default class MainPage {
  #parent;

  state;

  /**
     * Конструктор класса
     * @param {HTMLElement} parent - Родительский элемент
     * @param {Object} [state = DEFAULT_MAIN] - Начальное состояние главной страницы
     */
  constructor(parent, state = DEFAULT_MAIN) {
    this.#parent = parent;
    this.state = { ...DEFAULT_MAIN, ...state };
  }

  render() {
    this.#parent.insertAdjacentHTML(
      'beforeend',
      window.Handlebars.templates['main.hbs'](this.state),
    );
    const navbar = new Navbar(document.querySelector('#app'), {
      isAuthenticated: this.state.isAuthenticated,
      id: 'navbar',
      notice: '+ Разместить объявление',
    });
    navbar.render();

    if (this.state.cards && this.state.cards.length > 0) {
      this.state.cards.forEach((cardData) => {
        const card = new Card(document.querySelector('#app'), cardData);
        card.render();
      });
    }
  }
}
