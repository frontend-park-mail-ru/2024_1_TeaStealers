import LoginForm from '../../components/loginForm/loginForm.js';
import SignupForm from '../../components/signupForm/signupForm.js';
import '../../templates/handlebars.precompiled.js';

/**
 * Класс страницы логина или регистрации
 */
export default class LoginAndSignupLayout {
  state;

  #parent;

  page;

  /**
   * Конструктор класса
   * @param {HTMLElement} parent - Родительский элемент
   * @param {Object} [state] - Флаг оттрисовки логина или регистрации
   */
  constructor(parent, state) {
    this.#parent = parent;
    this.state = state;
  }

  /**
   * Возвращает элесент страницы логина или регистрации
   */
  get self() {
    return this.#parent.querySelector('.modal');
  }

  /**
   * Добавляет обработчик события при переходе к странице логина
   */
  addListenerLogin() {
    const signupFormLink = this.page.self.querySelector('.signup-form__link');
    signupFormLink.addEventListener('click', this.goToLogin.bind(this));
  }

  /**
   * Добавляет обработчик события при переходе на страницу регистрации
   */
  addListenerSignup() {
    const loginFormLink = this.page.self.querySelector('.login-form__link');
    loginFormLink.addEventListener('click', this.goToSignup.bind(this));
  }

  /**
   * Переход к странице регистрации
   * @param {Event} event - событие, которое вызвало обработчик
   */
  goToSignup(event) {
    event.preventDefault();
    this.state.page = 'signup';
    this.page.removeListeners();
    this.page = new SignupForm(document.querySelector('.modal__form'), {
      closeModal: this.state.closeModal,
      renderButtonLog: this.state.renderButtonLog,
    });
    this.page.render();
    this.addListenerLogin();
  }

  /**
   * Переход на страницу логина
   * @param {Event} event - событие, которое вызвало обработчик
   */
  goToLogin(event) {
    event.preventDefault();
    this.state.page = 'login';
    this.page.removeListeners();
    this.page = new LoginForm(document.querySelector('.modal__form'), {
      closeModal: this.state.closeModal,
      renderButtonLog: this.state.renderButtonLog,
    });
    this.page.render();
    this.addListenerSignup();
  }

  /**
 * Удаляет обработчики событий
 */
  removeListeners() {
    if (this.goToLogin !== undefined) {
      this.page.self.querySelector('.login-form__link').removeEventListener('click', this.goToLogin.bind(this));
    }
    if (this.goToSignup !== undefined) {
      this.page.self.querySelector('.signup-form__link').removeEventListener('click', this.goToSignup.bind(this));
    }
  }

  /**
    * Отрисовка страницы модального окна авторизации/регистрации
    */
  render() {
    this.#parent.insertAdjacentHTML(
      'beforeend',
      window.Handlebars.templates['loginAndSignupLayout.hbs'](),
    );
    this.page = new LoginForm(document.querySelector('.modal__form'), { closeModal: this.state.closeModal, renderButtonLog: this.state.renderButtonLog });
    this.page.render();

    this.addListenerSignup();
  }
}
