/**
   * Класс компонента сетки объявлений
   */
export class GridCard {
  state;

  #parent;

  /**
      * Создает новый экземпляр карточки объявления
      * @param {HTMLElement} parent - Родительский элемент
      * @param {Object} [state] - Начальное состояние карточки объявления
      */
  constructor(parent, state = {}) {
    this.state = { ...state };
    this.#parent = parent;
  }

  /**
     * Функция отрисовки карточки объявления
     */
  render() {
    this.#parent.insertAdjacentHTML(
      'beforeend',
      window.Handlebars.templates['gridCard.hbs'](this.state),
    );
  }
}
