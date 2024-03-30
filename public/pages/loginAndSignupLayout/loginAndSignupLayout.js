import { BaseComponent, LoginForm, SignupForm } from '@components';
import LoginAndSignupLayoutTemplate from './loginAndSignupLayout.hbs';

/**
 * Класс страницы логина или регистрации
 */
export class LoginAndSignupLayout extends BaseComponent {
  page;

  /**
   * Конструктор класса
   * @param {HTMLElement} parent - Родительский элемент
   * @param {Object} [state] - Флаг оттрисовки логина или регистрации
   */
  constructor(parent, state) {
    const template = LoginAndSignupLayoutTemplate;

    const loginForm = new LoginForm('modalForm', {
      id: 'login-form',
    });
    const innerComponents = [loginForm];
    super({
      parent, template, state, innerComponents,
    });

    this.page = loginForm;
  }

  /**
   * Добавление обработчиков
   */
  componentDidMount() {
    this.addListenerSignup();
  }

  /**
   * Добавляет обработчик события при переходе к странице логина
   */
  addListenerLogin() {
    const signupFormLink = document.querySelector('.signup-form__link');
    signupFormLink.addEventListener('click', this.goToLogin.bind(this));
  }

  /**
   * Добавляет обработчик события при переходе на страницу регистрации
   */
  addListenerSignup() {
    const loginFormLink = document.querySelector('.login-form__link');
    loginFormLink.addEventListener('click', this.goToSignup.bind(this));
  }

  /**
   * Переход к странице регистрации
   * @param {Event} event - событие, которое вызвало обработчик
   */
  goToSignup(event) {
    event.preventDefault();
    this.state.page = 'signup';
    this.page.unmountAndClean();
    this.page = new SignupForm('modalForm', {
      id: 'signup-form',
    });
    this.page.renderAndDidMount();
    this.addListenerLogin();
  }

  /**
   * Переход на страницу логина
   * @param {Event} event - событие, которое вызвало обработчик
   */
  goToLogin(event) {
    event.preventDefault();
    this.state.page = 'login';
    this.page.unmountAndClean();
    this.page = new LoginForm('modalForm', {
      id: 'login-form',
    });
    this.page.renderAndDidMount();
    this.addListenerSignup();
  }

  /**
 * Удаляет обработчики событий
 */
  componentWillUnmount() {
    if (this.page.self.querySelector('.login-form__link') !== null) {
      this.page.self.querySelector('.login-form__link').removeEventListener('click', this.goToLogin.bind(this));
    }
    if (this.page.self.querySelector('.signup-form__link') !== null) {
      this.page.self.querySelector('.signup-form__link').removeEventListener('click', this.goToSignup.bind(this));
    }
  }

  clean() {
    this.page.clean();
    document.getElementById(this.parent).innerHTML = '';
  }
}
