import { BaseComponent, Button, Navbar } from '@components';
import advertPage from './advertPage.hbs';

const VIEW_CONTACT_TEMPLATE = {
  mode: 'primary',
  text: 'Показать контакты',
  id: 'contact',
};

const DEFAULT_ADVERT_PAGE = {
  imgSrc: '../../static/room.jpeg',
  shortDesc: 'Лучшая квартира в городе',
  location: 'улица Есенина',
  characteristic: [
    {
      characteristicName: 'Общая площадь',
      characteristicDescription: '88',
    },
    {
      characteristicName: 'Жилая площадь',
      characteristicDescription: '70',
    },
    {
      characteristicName: 'Этаж',
      characteristicDescription: '15',
    },
    {
      characteristicName: 'Год постройки',
      characteristicDescription: '2013',
    },
  ],
  fullDescription: 'Лень писать',
  price: '11 100 500',
  complexImgSrc: '../../static/room.jpeg',
  complex: 'ЖК Ильинки',
  complexSrc: '/',
  phone: '+79099990099',
};
/**
 * Класс страницы объявления
 */
export class AdvertPage extends BaseComponent {
  /**
    * Создает новый экземпляр выпадающего меню
    * @param {Id} parent - Родительский элемент (Id)
    * @param {Object} [state] - Начальное состояние выпадающего меню
    */
  constructor(parent, state = { ...DEFAULT_ADVERT_PAGE, ...VIEW_CONTACT_TEMPLATE }) {
    const template = advertPage;
    state = { ...DEFAULT_ADVERT_PAGE, ...VIEW_CONTACT_TEMPLATE, ...state };
    const viewContact = new Button('price', state);
    const navbar = new Navbar('app', {
      isAuthenticated: state.isAuthenticated,
      id: 'navbar',
      notice: '+ Разместить объявление',
      skeleton: state.skeleton,
    });
    const innerComponents = [navbar, viewContact];
    super({
      parent, template, state, innerComponents,
    });
    [this.navbar, this.viewContact] = this.innerComponents;
  }

  componentDidMount() {
    this.addListener(this.viewContact, 'button', 'click', this.viewContactListener.bind(this.viewContact));
  }

  viewContactListener(event) {
    event.target.parentElement.innerHTML = this.state.phone;
  }

  componentWillUnmount() {
    this.removeListener(this.viewContact, 'button', 'click', this.viewContactListener.bind(this.viewContact));
  }
}
