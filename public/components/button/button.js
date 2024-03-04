const DEFAULT_BUTTON = {
  position: 'beforeend',
  order: 'primary',
  size: 'sm',
  borderRadius: 'sm',
  id: '',
  text: '',
};

/**
 * Класс кнопки
 */
export default class Button {
  state;

  #parent;

  /**
   * Создает новый экземпляр кнопки.
   * @param {HTMLElement} parent - Родительский элемент, к которому будет добавлена кнопка.
   * @param {Object} [state=DEFAULT_BUTTON] - Начальное состояние кнопки.
   */
  constructor(parent, state = DEFAULT_BUTTON) {
    this.state = { ...DEFAULT_BUTTON, ...state };
    this.#parent = parent;
  }

  /**
   * Отрисовка компонента кнопки
  */
  render() {
    this.#parent.insertAdjacentHTML(
      'beforeend',
      window.Handlebars.templates['button.hbs'](this.state),
    );
  }
}
