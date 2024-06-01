import {
  BaseComponent, Footer, Search, GridCard,
} from '@components';
import { events } from '@models';
import main from './main.hbs';

const DEFAULT_MAIN = {
  title: 'Найди мечту',
  skeleton: false,
};

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
      homeType: 'Квартиру или дом',
      roomNumber: 'Комнат',
      price: 'Цена',
      skeleton: state.skeleton,
    });

    const gridCard = new GridCard('gridCards', { title: 'Все объявления' });

    const footer = new Footer('app');

    const innerComponents = [search, gridCard, footer];
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
