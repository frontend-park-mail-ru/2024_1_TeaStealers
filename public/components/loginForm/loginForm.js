import Input from '../input/input.js';
import Button from '../button/button.js';
import { checkLogin, checkPassword } from '../../modules/validation.js';
import { login } from '../../modules/api.js';

const LOGIN_BUTTON = {
  id: 'login_button',
  order: 'primary',
  text: 'Войти',
};
const LOGIN_INPUT = {
  id: 'login_input',
  type: 'text',
  placeholder: 'Логин',
};
const PASSWORD_INPUT = {
  id: 'password_input',
  type: 'password',
  placeholder: 'Пароль',
};
const ERROR_LOGIN = 'Неверный логин или пароль';
const ERROE_LOG = 'Некорректный логин';
const ERROE_PASS = 'Некорректный пароль';

/**
 * Класс компонента формы авторизации.
 */
export default class LoginForm {
  #parent;

  state;

  login;

  password;

  button;

  /**
   * Создает новый экземпляр формы авторизации.
   * @param {HTMLElement} parent - Родительский элемент
   */
  constructor(parent, state) {
    this.#parent = parent;
    this.state = state;
    this.loginHandler = this.loginHandler.bind(this);
  }

  /**
   * Получение элемента формы авторизации
   */
  get self() {
    return this.#parent.querySelector('#login-form');
  }

  /**
   * Добавляет листенеры
   */
  addListeners() {
    this.button.self.addEventListener('click', this.loginHandler.bind(this));
    this.login.self.querySelector('input').addEventListener('blur', this.validateLoginInput.bind(this));
    this.password.self.querySelector('input').addEventListener('blur', this.validatePasswordInput.bind(this));
  }

  /**
 * Валидирует логин
 */
  validateLoginInput() {
    const loginVal = this.login.self.querySelector('input').value.trim();
    const [, isValid] = checkLogin(loginVal);
    if (isValid) {
      this.login.removeError();
      return true;
    }
    this.login.renderError(ERROE_LOG);
    return false;
  }

  /**
   * Валидирует пароль
   */
  validatePasswordInput() {
    const pass = this.password.self.querySelector('input').value.trim();
    const [, isValid] = checkPassword(pass);
    if (isValid) {
      this.password.removeError();
      return true;
    }
    this.password.renderError(ERROE_PASS);
    return false;
  }

  /**
   * Обрабатывает действие кнопки "войти"
   */
  async loginHandler() {
    const logValue = this.login.self.querySelector('input').value.trim();
    const password = this.password.self.querySelector('input').value.trim();
    const [, isValidLogin] = checkLogin(logValue);
    const [, isValidPass] = checkPassword(password);
    if (!isValidLogin) {
      this.login.renderError(ERROE_LOG);
    }
    if (!isValidLogin) {
      this.password.renderError(ERROE_PASS);
    }
    if (!isValidLogin || !isValidPass) {
      return;
    }
    this.removeErr();
    const data = { login: logValue, password };
    const [statusCode, ,] = await login(data);
    if (statusCode === 500 || statusCode === 400) {
      this.addErr(ERROR_LOGIN);
      return;
    }
    this.state.closeModal();
    this.state.renderButtonLog(true);
  }

  /**
   * Добавляет отрисовку ошибки
   * @param {string} errorText - текст ошибки
   */
  addErr(errorText) {
    this.self.querySelector('#error-message').textContent = errorText;
  }

  /**
   * Удаляет отрисовку ошибки
   */
  removeErr() {
    this.self.querySelector('#error-message').textContent = '';
  }

  /**
     * Удаление обработчиков событий
     */
  removeListeners() {
    if (this.loginHandler !== undefined) {
      this.button.self.removeEventListener('focusout', this.loginHandler.bind(this));
    }
  }

  /**
    * Отрисовка компонента формы авторизации
    */
  render() {
    this.#parent.innerHTML = window.Handlebars.templates['loginForm.hbs']();

    this.login = new Input(document.querySelector('.login-form__login'), LOGIN_INPUT);
    this.login.render();

    this.password = new Input(document.querySelector('.login-form__password'), PASSWORD_INPUT);
    this.password.render();

    this.button = new Button(document.querySelector('.login-form__button'), LOGIN_BUTTON);
    this.button.render();

    this.addListeners();
  }
}
