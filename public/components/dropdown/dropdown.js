import { BaseComponent, LoginForm, SignupForm } from '@components';
import { events } from '@models';
import dropdown from './dropdown.hbs';

/**
 * Класс dropdown
 */
export class Dropdown extends BaseComponent {
  items;

  /**
   * Конструктор класса
   * @param {HTMLElement} parent - Родительский элемент
   * @param {Object} [state]
   */
  constructor(parent, state) {
    const template = dropdown;
    super({ parent, template, state });
    this.items = state.items;
  }

  clean() {
    this.innerComponents.forEach((component) => { return component.clean(); });
    this.self?.remove();
  }
}
