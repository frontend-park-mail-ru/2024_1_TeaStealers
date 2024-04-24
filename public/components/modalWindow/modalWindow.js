import { BaseComponent, Button } from '@components';
import { modalWindow } from './modalWindow.hbs';

export class ModalWindow extends BaseComponent {
  /**
     * Конструктор класса
     * @param {HTMLElement} parent - Родительский элемент
     * @param {Object} [state] - Флаг оттрисовки логина или регистрации
     */
  constructor(parent, state) {
    const template = modalWindow;

    const acceptButtom = new Button('modalWindowForm', {
      mode: 'primary',
      text: 'Войти',
    });
    const innerComponents = [acceptButtom];
    super({
      parent, template, state, innerComponents,
    });
    this.state = state;
  }
}
