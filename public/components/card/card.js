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
export class Card {
  state;

  #parent;

  /**
     *
     * @param {HTMLElement} parent - Родительский элемент
     * @param {Object} [state = DEFAULT_CARD] - Начальное состояние карточки объявления
     */
  constructor(parent, state = {}) {
    this.state = state;
    this.#parent = parent;
  }

  render() {
    this.#parent.insertAdjacentHTML(
      'beforeend',
      window.Handlebars.templates['card.hbs'](this.state),
    );
  }
}
