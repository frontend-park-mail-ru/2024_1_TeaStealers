import { BaseComponent } from '@components';
import input from './input.hbs';

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
