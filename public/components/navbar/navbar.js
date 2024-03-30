import { Button, BaseComponent } from '@components';
import { LoginAndSignupLayout } from '@pages';
import { logout } from '@modules';
import { globalVariables } from '@models';
import navbar from './navbar.hbs';

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

/**
 * Класс компонента навигационной панели
 */
export class Navbar extends BaseComponent {
  modal;

  /**
   * Конструктор класса навбара
   * @param {HTMLElement} parent - родительский элемент
   * @param {Object} state - состояния компонента
   */
  constructor(parent, state = DEFAULT_NAVBAR) {
    const template = navbar;
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
    const innerComponents = [noticeButton, buttonLoginLogout];
    super({
      parent, template, state, innerComponents,
    });
  }

  /**
   * Добавляет обработчик события открытия модального окна
   */
  componentDidMount() {
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
    event.preventDefault();
    this.modal = new LoginAndSignupLayout('modal', {
      id: 'modal',
      page: 'login',
    });

    this.modal.renderAndDidMount();
    document.querySelector('.modal__close-button').addEventListener('click', this.closeModal.bind(this));
  }

  async logout(event) {
    event.preventDefault();
    this.removeListenerLogout();
    const [codeStatus, ,] = await logout();
    if (codeStatus === globalVariables.HTTP_STATUS_OK) {
      this.renderButtonLog(false);
    }
  }

  /**
   * Закрывает модальное окно
   */
  closeModal() {
    this.modal.unmountAndClean();
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
}
