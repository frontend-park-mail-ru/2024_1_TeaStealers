import {
  BaseComponent, Card, Navbar, Search, GridCard,
} from '@components';
import { events } from '@models';
import main from './main.hbs';

const DEFAULT_MAIN = {
  title: 'Найди мечту',
  skeleton: false,
};
// const DEFAULT_GRIDCARD = {
//   miniCards: [
//     {
//       advertId: '/',
//       imgSrc: '../../static/room.jpeg',
//       fullprice: '11111111',
//       pricePerMetr: 'Цена за метр не указана',
//       releaseDate: 'today',
//     },
//     {
//       imgSrc: '../../static/room1.jpg',
//       fullprice: '2222222',
//       pricePerMetr: '3213',
//       releaseDate: 'tomorrow',
//     },
//     {
//       imgSrc: '../../static/room2.jpg',
//       fullprice: '33333333',
//       pricePerMetr: '44532',
//       releaseDate: 'yesterday',
//     },
//     {
//       imgSrc: '../../static/room.jpeg',
//       fullprice: '11111111',
//       pricePerMetr: '1231',
//       releaseDate: 'today',
//     },
//     {
//       imgSrc: '../../static/room1.jpg',
//       fullprice: '2222222',
//       pricePerMetr: '3213',
//       releaseDate: 'tomorrow',
//     },
//     {
//       imgSrc: '../../static/room2.jpg',
//       fullprice: '33333333',
//       pricePerMetr: '44532',
//       releaseDate: 'yesterday',
//     },
//   ],
// };
/**
 * Класс главной страницы страницы
 */
export class MainPage extends BaseComponent {
  /**
     * Конструктор класса
     * @param {HTMLElement} parent - Родительский элемент
     * @param {Object} [state = DEFAULT_MAIN] - Начальное состояние главной страницы
     */
  constructor(parent, state = DEFAULT_MAIN) {
    const template = main;
    state = { ...DEFAULT_MAIN, ...state };

    const search = new Search('searhMenu', {
      id: 'search',
      title: 'Найди мечту',
      firstFilterLinkStatus: 'active',
      secondFilterLinkStatus: 'passive',
      firstFilterLinkDesc: 'Купить',
      secondFilterLinkDesc: 'Снять',
      homeType: 'Квартиру в новостройке или вторичке',
      roomNumber: 'Комнат',
      price: 'Цена',
      skeleton: state.skeleton,
    });

    const gridCard = new GridCard('gridCards', {});

    const innerComponents = [search, gridCard];
    super({
      parent, template, state, innerComponents,
    });
    this.search = search;
    this.gridCard = gridCard;
  }

  delete() {
    this.parent.innerHTML = '';
  }
}
