import { BaseComponent } from '@components';
import dropMenu from './dropMenu.hbs';

/**
   * Класс компонента сетки объявлений
   */
export class DropMenu extends BaseComponent {
  /**
      * Создает новый экземпляр карточки объявления
      * @param {HTMLElement} parent - Родительский элемент
      * @param {Object} [state] - Начальное состояние карточки объявления
      */
  constructor(parent, state) {
    const template = dropMenu;
    super({ parent, template, state });
  }
}
