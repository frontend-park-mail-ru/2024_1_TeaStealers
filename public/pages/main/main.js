import main from './main.hbs';
import { Card, Navbar, Search, GridCard } from '@components';

const DEFAULT_MAIN = {
  isAuthenticated: false,
  title: 'Найди мечту',
  skeleton: false,
};
const DEFAULT_GRIDCARD = {
  miniCards: [
    {
      imgSrc: '../../static/room.jpeg',
      fullprice: '11111111',
      pricePerMetr: '1231',
      releaseDate: 'today',
    },
    {
      imgSrc: '../../static/room1.jpg',
      fullprice: '2222222',
      pricePerMetr: '3213',
      releaseDate: 'tomorrow',
    },
    {
      imgSrc: '../../static/room2.jpg',
      fullprice: '33333333',
      pricePerMetr: '44532',
      releaseDate: 'yesterday',
    },
    {
      imgSrc: '../../static/room.jpeg',
      fullprice: '11111111',
      pricePerMetr: '1231',
      releaseDate: 'today',
    },
    {
      imgSrc: '../../static/room1.jpg',
      fullprice: '2222222',
      pricePerMetr: '3213',
      releaseDate: 'tomorrow',
    },
    {
      imgSrc: '../../static/room2.jpg',
      fullprice: '33333333',
      pricePerMetr: '44532',
      releaseDate: 'yesterday',
    },
  ],
};
/**
 * Класс главной страницы страницы
 */
export class MainPage {
  #parent;

  state;

  /**
     * Конструктор класса
     * @param {HTMLElement} parent - Родительский элемент
     * @param {Object} [state = DEFAULT_MAIN] - Начальное состояние главной страницы
     */
  constructor(parent, state = DEFAULT_MAIN) {
    this.#parent = parent;
    this.state = { ...DEFAULT_MAIN, ...DEFAULT_GRIDCARD, ...state };
  }

  render() {
    this.#parent.insertAdjacentHTML(
      'beforeend',
      main(this.state),
    );
    const navbar = new Navbar(document.querySelector('#app'), {
      isAuthenticated: this.state.isAuthenticated,
      id: 'navbar',
      notice: '+ Разместить объявление',
      skeleton: this.state.skeleton,
    });

    navbar.render();

    const search = new Search(document.querySelector('#app'), {
      id: 'search',
      title: 'Найди мечту',
      firstFilterLinkStatus: 'active',
      secondFilterLinkStatus: 'passive',
      firstFilterLinkDesc: 'Купить',
      secondFilterLinkDesc: 'Снять',
      homeType: 'Квартиру в новостройке или вторичке',
      roomNumber: 'Комнат',
      price: 'Цена',
      skeleton: this.state.skeleton,
    });
    search.render();

    const gridCard = new GridCard(document.querySelector('#app'), this.state);
    gridCard.render();

    if (this.state.skeleton === true) {
      const card = new Card(document.querySelector('#app'), this.state);
      card.render();
    } else if (this.state.cards && this.state.cards.length > 0) {
      this.state.cards.forEach((cardData) => {
        const card = new Card(document.querySelector('#app'), cardData);
        card.render();
      });
    }
  }

  delete() {
    this.#parent.innerHTML = '';
  }
}
