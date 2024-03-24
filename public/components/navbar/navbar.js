import navbar from './navbar.hbs';
import { Button, BaseComponent } from '@components';
import { LoginAndSignupLayout } from '@pages';
import { logout } from '@modules';

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
  skeleton: false,
};

const listeners = {
  loginListener: (event) => {

  },
}

/**
 * Класс компонента навигационной панели
 */
export class Navbar extends BaseComponent {

  login;

  modal;

  /**
   * Конструктор класса навбара
   * @param {HTMLElement} parent - родительский элемент
   * @param {Object} state - состояния компонента
   */
  constructor(parent, state = DEFAULT_NAVBAR) {
    const template = navbar;
    // state = { ...DEFAULT_BUTTON, ...state };
    const noticeButton = new Button('rightside', {
      ...buttonPattern,
      order: 'primary',
      text: state.notice,
    });
    let buttonLoginLogout = new Button('rightside', {
      ...buttonPattern,
      id: 'login-button',
      text: 'Войти',
    });
    if (state.isAuth) {
      buttonLoginLogout = { ...buttonPattern, id: 'logout-button', text: 'Выйти' };
    }
    // this.login = new Button(document.querySelector('#rightside'), buttonLoginLogout);
    let innerComponents = [noticeButton, buttonLoginLogout];
    super({parent, template, state, innerComponents});
  }

  /**
   * Добавляет обработчик события открытия модального окна
   */
  componentDidMount() {
    if (document.querySelector('#login-button') !== null) {
      // this.innerComponents[0].addEventListener('click', listeners['loginListener'])
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
    this.removeListenerLogout();
    const [codeStatus, data] = await logout();
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

  removeListenerLogout() {
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
  renderButtonLog(isAuth, skeleton) {
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
    if (skeleton === false) {
      this.addListeners();
    }
  }
}