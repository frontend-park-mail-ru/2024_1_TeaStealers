import button from './button.hbs';

const DEFAULT_BUTTON = {
  position: 'beforeend',
  order: '',
  size: 'sm',
  borderRadius: 'sm',
  id: '',
  text: '',
};

/**
 * Класс кнопки
 */
export class Button {
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
   * Получение элемента кнопки
   */
  get self() {
    return document.getElementById(this.state.id);
  }

  /**
   * Отрисовка компонента кнопки
  */
  render() {
    this.#parent.insertAdjacentHTML(
      'beforeend',
      button(this.state),
    );
  }
}
