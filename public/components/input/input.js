import { BaseComponent } from '@components';
import input from './input.hbs';

const DEFAULT_INPUT = {
  position: 'beforeend',
  id: '',
  type: 'text',
  placeholder: '',
  isPassword: '',
  isError: '',
  label: '',
  value: '',
  file: '',
  multiple: false,
};

/**
 * Класс компонента инпута
 */
export class Input extends BaseComponent {
  /**
   * Создает новый экземпляр инпута.
   * @param {HTMLElement} parent - Родительский элемент, к которому будет добавлен инпут.
   * @param {Object} [state=DEFAULT_INPUT] - Начальное состояние инпута.
   */
  constructor(parent, state = DEFAULT_INPUT) {
    const template = input;
    state = { ...DEFAULT_INPUT, ...state };
    super({ parent, template, state });
  }

  render() {
    if (document.getElementById(this.parent) !== null) {
      document.getElementById(this.parent).insertAdjacentHTML(
        this.state.position,
        this.template(this.state),
      );
      this.componentLink = document.getElementById(this.parent).lastChild;
    }
  }

  getValue() {
    return this.self.querySelector('input').value;
  }

  setValue(value) {
    this.self.querySelector('input').value = value;
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
}
