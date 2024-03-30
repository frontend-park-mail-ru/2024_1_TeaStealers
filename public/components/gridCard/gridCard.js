import { BaseComponent } from '@components';
import gridCard from './gridCard.hbs';

/**
   * Класс компонента сетки объявлений
   */
export class GridCard extends BaseComponent {
  /**
      * Создает новый экземпляр карточки объявления
      * @param {HTMLElement} parent - Родительский элемент
      * @param {Object} [state] - Начальное состояние карточки объявления
      */
  constructor(parent, state = {}) {
    const template = gridCard;
    super({ parent, template, state });
  }
}
