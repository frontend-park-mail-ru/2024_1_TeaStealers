const DEFAULT_INPUT = {
  position: 'beforeend',
  id: '',
  type: 'text',
  placeholder: '',
  isPassword: '',
  isError: '',
};

/**
 * Класс компонента инпута
 */
export default class Input {
  state;

  #parent;

  /**
   * Создает новый экземпляр инпута.
   * @param {HTMLElement} parent - Родительский элемент, к которому будет добавлен инпут.
   * @param {Object} [state=DEFAULT_INPUT] - Начальное состояние инпута.
   */
  constructor(parent, state = DEFAULT_INPUT) {
    this.state = { ...DEFAULT_INPUT, ...state };
    this.#parent = parent;
  }

  /**
  * Получение элемента инпута
  */
  get self() {
    return document.getElementById(this.state.id).querySelector('input');
  }

  /**
  * Отображает сообщение об ошибке и добавляет стили для выделения поля ввода.
  * @param {string} textError - Текст сообщения об ошибке.
  */
  renderError(textError) {
    this.self.querySelector('input').classList.add('error-border');
    this.self.querySelector('.error-message').textContent = textError;
  }

  /**
   * Удаляет сообщение об ошибке и стили выделения поля ввода.
   */
  removeError() {
    this.self.querySelector('input').classList.remove('error-border');
    this.self.querySelector('.error-message').textContent = '';
  }

  /**
   * Отрисовывает элемент ввода и добавляет его к родительскому элементу.
   */
  render() {
    this.#parent.insertAdjacentHTML(
      this.state.position,
      window.Handlebars.templates['input.hbs'](this.state),
    );
  }
}
