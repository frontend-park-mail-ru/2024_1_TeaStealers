import { BaseComponent, Button } from '@components';
import card from './card.hbs';

const DEFAULT_CARD = {
  id: '',
  parentID: '',
  imgSrc: '../../static/room1.jpg',
  cardLink: '',
  shortDesc: '',
  releaseDate: '',
  likeSrc: '',
  adress: '',
  fullprice: '',
  pricePerMetr: '',
  description: '',
  phone: 'phone',
};

/**
 * Класс компонента карточки объявления
 */
export class Card extends BaseComponent {
  /**
    * Создает новый экземпляр карточки объявления
    * @param {HTMLElement} parent - Родительский элемент
    * @param {Object} [state = DEFAULT_CARD] - Начальное состояние карточки объявления
    */
  constructor(parent, state) {
    const template = card;
    state = { ...state };
    const viewContact = new Button(`phone${state.advertId}`, {
      id: `phoneButton${state.advertId}`,
      position: 'afterbegin',
      borderRadius: 'sm',
      size: 'sm',
      mode: 'primary',
      text: 'Показать контакты',
    });
    const innerComponents = [viewContact];
    super({
      parent, template, state, innerComponents,
    });
    [this.viewContact] = this.innerComponents;
  }

  componentDidMount() {
    this.addListener(this.viewContact, '', 'click', this.viewContactListener.bind(this));
    document.querySelector(`#href${this.state.advertId}`)
      .addEventListener('click', this.goToAdvert.bind(this));
  }

  goToAdvert(event) {
    event.preventDefault();
    this.redirect(event.target.getAttribute('href'));
  }

  viewContactListener(event) {
    event.target.parentElement.innerHTML = this.state.phone;
  }

  componentWillUnmount() {
    this.removeListener(this.viewContact, '', 'click', this.viewContactListener.bind(this));
    document.querySelector(`#href${this.state.advertId}`)
      .removeEventListener('click', this.goToAdvert.bind(this));
  }
}
