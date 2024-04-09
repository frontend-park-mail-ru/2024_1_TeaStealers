import { BaseComponent } from '@components';
import avatar from './avatar.hbs';

const defaultAvatar = {
  src: '../../static/defaultAvatar.png',
  alt: 'Аватар',
  id: 'avatar',
};

/**
 * Класс аватара
 */
export class Avatar extends BaseComponent {
  /**
   * Создает новый экземпляр avatar.
   * @param {HTMLElement} parent - Родительский элемент, к которому будет добавлен avatar.
   * @param {Object} [state=defaultAvatar] - Начальное состояние avatar.
   */
  constructor(parent, state = defaultAvatar) {
    const template = avatar;
    state = { ...defaultAvatar, ...state };
    super({ parent, template, state });
  }

  /**
   * Получение элемента кнопки
   */
  get self() {
    return document.getElementById(this.state.id);
  }
}
