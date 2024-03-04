import { Button } from '../button/button.js';

const DEFAULT_NAVBAR = {
  id: '',
  parentID: '',
  notice: '',
  login: '',
};
/**
 * Класс компонента навигации
 */
export class Navbar {
  state;

  #parent;

  /**
     *
     * @param {HTMLElement} parent - Родительский элемент
     * @param {Object} [state = DEFAULT_NAVBAR] - Начальное состояние компонента навигации
     */
  constructor(parent, state = {}) {
    this.state = state;
    this.#parent = parent;
  }

  render() {
    this.#parent.insertAdjacentHTML(
      'beforeend',
      window.Handlebars.templates['navbar.hbs'](this.state),
    );

    const buttonPattern = {
      borderRadius: 'sm',
      size: 'sm',
    };

    const noticeButton = new Button(document.querySelector('#rightside'), {
      ...buttonPattern,
      text: this.state.notice,
      order: 'primary',
    });
    noticeButton.render();

    const login = new Button(document.querySelector('#rightside'), {
      ...buttonPattern,
      text: this.state.login,
      order: 'secondary',
    });
    login.render();
  }
}
