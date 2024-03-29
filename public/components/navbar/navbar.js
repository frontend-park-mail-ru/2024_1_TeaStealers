import Button from '../button/button.js';
import LoginAndSignupLayout from '../../pages/loginAndSignupLayout/loginAndSignupLayout.js';
import { logout } from '../../modules/api.js';

const buttonPattern = {
  borderRadius: 'sm',
  size: 'sm',
  order: 'secondary',
};

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

  login;

  modal;

  /**
   * Конструктор класса навбара
   * @param {HTMLElement} parent - родительский элемент
   * @param {Object} state - состояния компонента
   */
  constructor(parent, state = {}) {
    this.state = { ...DEFAULT_NAVBAR, ...state };
    this.#parent = parent;
  }

  /**
   * Добавляет обработчик события открытия модального окна
   */
  addListeners() {
    if (document.querySelector('#login-button') !== null) {
      document.querySelector('#login-button').addEventListener('click', this.openModal.bind(this));
    }
    if (document.querySelector('#logout-button') !== null) {
      document.querySelector('#logout-button').addEventListener('click', this.logout.bind(this));
    }
  }

  /**
   * Открывает модально окно
   * @param {Event} event - событие, которое вызвало обработчик
   */
  openModal(event) {
    this.removeListenersOpen();
    event.preventDefault();
    this.modal = new LoginAndSignupLayout(document.querySelector('#modal'), {
      page: 'login',
      closeModal: this.closeModal.bind(this),
      renderButtonLog: this.renderButtonLog.bind(this),
    });
    this.modal.render();
    document.querySelector('.modal__close-button').addEventListener('click', this.closeModal.bind(this));
  }

  async logout(event) {
    event.preventDefault();
    this.removeLostenerLogout();
    const [codeStatus, data] = await logout();
    console.log(codeStatus);
    if (codeStatus === 200) {
      this.renderButtonLog(false);
    }
  }

  /**
   * Закрывает модальное окно
   */
  closeModal() {
    this.removeListenersClose();
    this.modal.self.remove();
    this.modal = undefined;
  }

  removeLostenerLogout() {
    if (document.querySelector('#logout-button') !== undefined) {
      document.querySelector('#logout-button').removeEventListener('click', this.logout.bind(this));
    }
  }

  /**
   * Удаляет обработчик события открытия окна
   */
  removeListenersOpen() {
    if (this.openModal !== undefined) {
      document.querySelector('#login-button').removeEventListener('click', this.openModal.bind(this));
    }
  }

  /**
   * Удаляет обработчик события закрытия окна
   */
  removeListenersClose() {
    if (this.closeModal !== undefined) {
      document.querySelector('.modal__close-button').removeEventListener('click', this.closeModal.bind(this));
    }
  }

  /**
   * Отрисовывает кнопку Войти\Выйти
   */
  renderButtonLog(isAuth) {
    console.log('renderButtonlog', isAuth);
    let buttonLoginLogout = {
      ...buttonPattern,
      id: 'login-button',
      text: 'Войти',
    };
    if (isAuth) {
      buttonLoginLogout = { ...buttonPattern, id: 'logout-button', text: 'Выйти' };
    }
    if (this.login !== undefined) {
      this.login.self.remove();
    }
    this.login = new Button(document.querySelector('#rightside'), buttonLoginLogout);
    this.login.render();
    this.addListeners();
  }

  /**
   * Отрисовка компонента навбар
   */
  render() {
    this.#parent.insertAdjacentHTML(
      'beforeend',
      window.Handlebars.templates['navbar.hbs'](this.state),
    );

    const noticeButton = new Button(document.querySelector('#rightside'), {
      ...buttonPattern,
      order: 'primary',
      text: this.state.notice,
    });
    noticeButton.render();

    this.renderButtonLog(this.state.isAuthenticated);
  }
}
