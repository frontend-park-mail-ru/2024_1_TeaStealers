import { BaseComponent } from '@components';
import dropMenu from './dropMenu.hbs';

/**
   * Класс компонента выпадающего меню
   */
export class DropMenu extends BaseComponent {
  /**
      * Создает новый экземпляр выпадающего меню
      * @param {HTMLElement} parent - Родительский элемент
      * @param {Object} [state] - Начальное состояние выпадающего меню
      */
  constructor(parent, state) {
    const template = dropMenu;
    super({ parent, template, state });
  }
}
