import { BaseComponent } from '@components';
import button from './button.hbs';

const DEFAULT_BUTTON = {
  position: 'beforeend',
  mode: '',
  size: 'sm',
  borderRadius: 'sm',
  id: '',
  text: '',
  full: false,
};

/**
 * Класс кнопки
 */
export class Button extends BaseComponent {
  /**
   * Создает новый экземпляр кнопки.
   * @param {HTMLElement} parent - Родительский элемент, к которому будет добавлена кнопка.
   * @param {Object} [state=DEFAULT_BUTTON] - Начальное состояние кнопки.
   */
  constructor(parent, state = DEFAULT_BUTTON) {
    const template = button;
    state = { ...DEFAULT_BUTTON, ...state };
    super({ parent, template, state });
  }

  /**
   * Получение элемента кнопки
   */
  get self() {
    return document.getElementById(this.state.id);
  }
}
