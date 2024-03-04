import { Card } from './components/card/card.js';
import { Navbar } from './components/navbar/navbar.js';
import { Search } from './components/search/search.js';

const DEFAULT_MAIN = {
  login: 'Войти',
  title: 'Найди мечту',
  cards: [{
    imgSrc: '',
    cardLink: '',
    shortDesc: '',
    releaseDate: '',
    likeSrc: '',
    adress: '',
    fullprice: '',
    pricePerMetr: '',
    description: '',
  }],
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
      id: 'navbar',
      notice: '+ Разместить объявление',
      login: this.state.login,
    });
    navbar.render();

    const search = new Search(document.querySelector('#app'), {
      id: 'search',
      title: this.state.title,
      firstFilterLinkStatus: 'active',
      secondFilterLinkStatus: 'passive',
      firstFilterLinkDesc: 'Купить',
      secondFilterLinkDesc: 'Снять',
      homeType: 'Квартиру в новостройке или вторичке',
      roomNumber: 'Комнат',
      price: 'Цена',
    });
    search.render();

    this.state.cards.forEach((cardData) => {
      const card = new Card(document.querySelector('#app'), cardData);
      card.render();
    });
  }
}
