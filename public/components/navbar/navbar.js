import {
  Button, BaseComponent, Avatar, Csat,
} from '@components';
import { LoginAndSignupLayout } from '@pages';
import { Router } from '@modules';
import { globalVariables, events } from '@models';
import { mainControler } from '@controllers';
import navbar from './navbar.hbs';

const buttonPattern = {
  borderRadius: 'sm',
  size: 'sm',
  mode: 'secondary',
};

const DEFAULT_NAVBAR = {
  id: 'nav',
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
  constructor(parent, state) {
    state = { ...DEFAULT_NAVBAR, ...state };
    const template = navbar;
    const noticeButton = new Button('rightside', {
      ...buttonPattern,
      mode: 'primary',
      text: state.notice,
      id: 'buttonNewAdvert',
    });
    let buttonLoginLogout = new Button('rightside', {
      ...buttonPattern,
      id: 'buttonLogin',
      text: 'Войти',
    });
    if (state.isAuthenticated) {
      buttonLoginLogout = new Button('rightside', {
        ...buttonPattern,
        id: 'buttonProfile',
        text: 'Мой профиль',
      });
    }
    const innerComponents = [noticeButton, buttonLoginLogout];
    super({
      parent, template, state, innerComponents,
    });
    this.btnLogin = buttonLoginLogout;
  }

  /**
   * Отображение кнопки 'Войти' или 'Мой аккаунт' в зависимости от состояния аутентификации
   * @param {bool} isAuth - Состояние аутентификации
   * @returns
   */
  chooseLoginButton(isAuth) {
    if (isAuth) {
      return new Button('rightside', {
        ...buttonPattern,
        id: 'buttonProfile',
        text: 'Мой профиль',

      });
    }
    return new Button('rightside', {
      ...buttonPattern,
      id: 'buttonLogin',
      text: 'Войти',
    });
  }

  /**
   * Добавляет обработчик события
   */
  componentDidMount() {
    this.addClickListener('buttonLogin', this.openModal.bind(this));
    this.addClickListener('buttonProfile', this.goToProfile.bind(this));
    this.addClickListener('buttonNewAdvert', this.goToNewAdvert.bind(this));
    this.addClickListener('nabarBrand', this.goToMain.bind(this));
    this.addClickListener('sale', this.goToBuy.bind(this));
    this.addClickListener('rent', this.goToRent.bind(this));
  }

  /**
   * Удаление обработчиков
   */
  componentWillUnmount() {
    this.removeClickListener('buttonLogin', this.openModal.bind(this));
    this.removeClickListener('buttonProfile', this.goToProfile.bind(this));
    this.removeClickListener('buttonNewAdvert', this.goToNewAdvert.bind(this));
    this.removeClickListener('nabarBrand', this.goToMain.bind(this));
    this.removeClickListener('sale', this.goToBuy.bind(this));
    this.removeClickListener('rent', this.goToRent.bind(this));
  }

  /**
   * Изменение состояния элемента
   * @param {Object} event - Событие изменения состояния
   * @returns
   */
  componentDidUpdate(event) {
    if (event.name === events.AUTH) {
      if (this.state.isAuthenticated === event.data) {
        return;
      }
      this.state.isAuthenticated = event.data;
      this.btnLogin.unmountAndClean();
      this.btnLogin = this.chooseLoginButton(this.state.isAuthenticated);
      this.btnLogin.renderAndDidMount();
      this.componentWillUnmount();
      this.componentDidMount();
    }
  }

  /**
   * Перейти на главную страницу с фильтром покупки
   */
  goToBuy() {
    const queryParameters = {};
    queryParameters.dealtype = 'Sale';
    mainControler.updateMainModelWithParameters(queryParameters);
    this.redirect('/statistics/');
  }

  /**
   * Перейти на главную страницу с фильтром аренды
   */
  goToRent() {
    const queryParameters = {};
    queryParameters.dealtype = 'Rent';
    mainControler.updateMainModelWithParameters(queryParameters);
    this.redirect('/');
  }

  /**
   * Открывает модальное окно
   * @param {Event} event - событие, которое вызвало обработчик
   */
  openModal(event) {
    event.preventDefault();
    this.modal = new LoginAndSignupLayout('modal', {
      id: 'modal',
      page: 'login',
      closeModal: this.closeModal.bind(this),
    });

    this.modal.renderAndDidMount();
    document.querySelector('.modal__close-button').addEventListener('click', this.closeModal.bind(this));
  }

  /**
   * Переход на страницу профиля
   * @param {Object} event - Отслеживаемое событие
   */
  goToProfile(event) {
    event.preventDefault();
    this.redirect('/profile/');
  }

  /**
   * Переход на страницу создания объявления
   * @param {Object} event - Отслеживаемое событие
   */
  goToNewAdvert(event) {
    event.preventDefault();
    if (this.state.isAuthenticated) {
      this.redirect('/new-advert/');
    } else {
      this.openModal(event);
    }
  }

  /**
   * Переход на главную страницу
   * @param {Object} event - Отслеживаемое событие
   */
  goToMain(event) {
    event.preventDefault();
    this.redirect('/');
  }

  /**
   * Закрывает модальное окно
   */
  closeModal() {
    this.modal.unmountAndClean();
  }

  /**
   * Удаляет обработчик события открытия окна
   */
  removeListenersOpen() {
    this.removeClickListener('buttonLogin', this.openModal.bind(this));
  }

  /**
   * Удаляет обработчик события закрытия окна
   */
  removeListenersClose() {
    if (this.closeModal !== null) {
      document.querySelector('.modal__close-button')?.removeEventListener('click', this.closeModal.bind(this));
    }
  }
}
