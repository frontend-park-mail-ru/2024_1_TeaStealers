import main from '@pages';
import { Card, Navbar, Search, BaseComponent } from '@components';

const DEFAULT_MAIN = {
  isAuthenticated: false,
  title: 'Найди мечту',
};
export class View {
  // BaseComponent
  // ...
}
//eventBus отслеживает у model, усть изменения - перерендер
/**
 * Класс главной страницы страницы
 */
export class MainPage extends BaseComponent {

  #parent;

  /**
     * Конструктор класса
     * @param {HTMLElement} parent - Родительский элемент
     * @param {Object} [state = DEFAULT_MAIN] - Начальное состояние главной страницы
     */
  constructor(parent, state = DEFAULT_MAIN) {
    components
    super({ ...DEFAULT_MAIN, ...state });
    this.#parent = parent;
  }

  super(components);

  render() {
    this.#parent.insertAdjacentHTML(
      'beforeend',
      main(this.state),
    );
    
    const navbar = new Navbar(document.querySelector('#app'), {
      isAuthenticated: this.state.isAuthenticated,
      id: 'navbar',
      notice: '+ Разместить объявление',
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
    });
    search.render();

    if (this.state.cards && this.state.cards.length > 0) {
      this.state.cards.forEach((cardData) => {
        const card = new Card(document.querySelector('#app'), cardData);
        card.render();
      });
    }
  }

  clean() {

  }
}
