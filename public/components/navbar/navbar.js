import Button from '../button/button.js';

const DEFAULT_NAVBAR = {
  id: '',
  parentID: '',
  notice: '',
  login: '',
};
/**
 * Класс компонента навигационной панели
 */
export default class Navbar {
  state;

  #parent;

  /**
    * Создает новый экземпляр навигационной панели
    * @param {HTMLElement} parent - Родительский элемент
    * @param {Object} [state = DEFAULT_NAVBAR] - Начальное состояние компонента навигационной панели
    */
  constructor(parent, state = {}) {
    this.state = { ...DEFAULT_NAVBAR, ...state };
    this.#parent = parent;
  }

  /**
   * Функция отрисовки навигационной панели
   */
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
