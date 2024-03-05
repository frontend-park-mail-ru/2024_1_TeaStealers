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
export default class Card {
  state;

  #parent;

  /**
    * Создает новый экземпляр карточки объявления
    * @param {HTMLElement} parent - Родительский элемент
    * @param {Object} [state = DEFAULT_CARD] - Начальное состояние карточки объявления
    */
  constructor(parent, state = {}) {
    this.state = { ...DEFAULT_CARD, ...state };
    this.#parent = parent;
  }

  /**
   * Функция отрисовки карточки объявления
   */
  render() {
    this.#parent.insertAdjacentHTML(
      'beforeend',
      window.Handlebars.templates['card.hbs'](this.state),
    );
  }
}
