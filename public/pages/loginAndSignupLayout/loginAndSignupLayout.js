import LoginForm from '../../components/loginForm/loginForm.js';
import SignupForm from '../../components/signupForm/signupForm.js';
import '../../templates/handlebars.precompiled.js';

/**
 * Класс страницы логина или регистрации
 */
export default class LoginAndSignupLayout {
  state = 'login';

  #parent;

  /**
   * Конструктор класса
   * @param {HTMLElement} parent - Родительский элемент
   * @param {string} [state] - Флаг оттрисовки логина или регистрации
   */
  constructor(parent, state) {
    this.#parent = parent;
    this.state = state;
  }

  /**
    * Отрисовка страницы модального окна авторизации/регистрации
    */
  render() {
    this.#parent.insertAdjacentHTML(
      'beforeend',
      window.Handlebars.templates['loginAndSignupLayout.hbs'](),
    );
    if (this.state === 'login') {
      const login = new LoginForm(document.querySelector('.modal__form'));
      login.render();
      return;
    }
    const signup = new SignupForm(document.querySelector('.modal__form'));
    signup.render();
  }
}
