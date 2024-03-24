import card from './card.hbs';
import { BaseComponent } from '@components';


const DEFAULT_CARD = {
  id: '',
  parentID: '',
  imgSrc: '',
  cardLink: '',
  shortDesc: '',
  releaseDate: '',
  likeSrc: '',
  adress: '',
  fullprice: '',
  pricePerMetr: '',
  description: '',
};

/**
 * Класс компонента карточки объявления
 */
export class Card extends BaseComponent {
  state;
  
  /**
    * Создает новый экземпляр карточки объявления
    * @param {HTMLElement} parent - Родительский элемент
    * @param {Object} [state = DEFAULT_CARD] - Начальное состояние карточки объявления
    */
  constructor(parent, state = DEFAULT_CARD) {
    const template = card;
    state = { ...DEFAULT_CARD, ...state };
    super({parent, template, state});
  }

  /**
   * Функция отрисовки карточки объявления
   */
  
}
