import signupForm from './signupForm.hbs';
import { Input, Button } from '@components';
import { checkLogin, checkPassword, checkRepeatPassword, signup } from '@modules';

const SIGNUP_BUTTON = {
  id: 'signup_button',
  text: 'Зарегистрироваться',
  order: 'primary',
  size: 'sm',
  borderRadius: 'sm',
};
const LOGIN_INPUT = {
  id: 'signup_login',
  type: 'text',
  placeholder: 'Логин',
};
const PASSWORD_INPUT = {
  id: 'signup_password',
  type: 'password',
  placeholder: 'Пароль',
};
const PASSWORD_REPEAT_INPUT = {
  id: 'signup_password_repeat',
  type: 'password',
  placeholder: 'Повторите пароль',
};
const SIGNUP_ERROR = 'Такой логиин уже зарегистрирован';

/**
 * Класс компонента формы авторизации.
 */
export class SignupForm {
  #parent;

  state;

  login;

  password;

  repeatPassword;

  /**
   * Конструктор класса
   * @param {HTMLElement} parent - Родительский элемент
   */
  constructor(parent, state) {
    this.#parent = parent;
    this.state = state;
  }

  /**
 *Возвращает элемент формы регистрации
 */
  get self() {
    return this.#parent.querySelector('#signup-form');
  }

  /**
 * Добавляет листенеры
 */
  addListeners() {
    this.login.self.querySelector('input').addEventListener('input', this.validateLoginInput.bind(this));
    this.password.self.querySelector('input').addEventListener('input', this.validatePasswordInput.bind(this));
    this.repeatPassword.self.querySelector('input').addEventListener('input', this.validatePasswordRepeatInput.bind(this));
    this.button.self.addEventListener('click', this.signupHandler.bind(this));
  }

  /**
 * Валидирует логин
 */
  validateLoginInput() {
    const login = this.login.self.querySelector('input').value.trim();
    const [err, isValid] = checkLogin(login);
    if (isValid) {
      this.login.removeError();
      return true;
    }
    this.login.renderError(err);
    return false;
  }

  /**
 * Валидирует пароль
 */
  validatePasswordInput() {
    const pass = this.password.self.querySelector('input').value.trim();
    const [err, isValid] = checkPassword(pass);
    if (isValid) {
      this.password.removeError();
      return true;
    }
    this.password.renderError(err);
    return false;
  }

  /**
 * Валидирует повтор пароля
 */
  validatePasswordRepeatInput() {
    const pass = this.password.self.querySelector('input').value.trim();
    const passRepeat = this.repeatPassword.self.querySelector('input').value.trim();
    const [err, isValid] = checkRepeatPassword(pass, passRepeat);
    if (isValid) {
      this.repeatPassword.removeError();
      return true;
    }
    this.repeatPassword.renderError(err);
    return false;
  }

  /**
   * Обработчик события для регистрации
   * @param {Event} event - событие, которое вызвало обработчик
   */
  async signupHandler(event) {
    const valLog = this.validateLoginInput();
    const valPass = this.validatePasswordInput();
    const valPassRe = this.validatePasswordRepeatInput();
    event.preventDefault();
    if (!valLog || !valPass || !valPassRe) {
      return;
    }
    this.removeErr();
    const log = this.login.self.querySelector('input').value.trim();
    const pass = this.password.self.querySelector('input').value.trim();
    const data = { login: log, password: pass };
    const [statusCode, ,] = await signup(data);
    if (statusCode === 500 || statusCode === 400) {
      this.addErr(SIGNUP_ERROR);
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
 *Удаляет листенеры
 */
  removeListeners() {
    if (this.validateLoginInput !== undefined) {
      this.login.self.querySelector('input').removeEventListener('input', this.validateLoginInput.bind(this));
    }
    if (this.validatePasswordInput !== undefined) {
      this.password.self.querySelector('input').removeEventListener('input', this.validatePasswordInput.bind(this));
    }
    if (this.validatePasswordRepeatInput !== undefined) {
      this.repeatPassword.self.querySelector('input').removeEventListener('input', this.validatePasswordRepeatInput.bind(this));
    }
    if (this.signupHandler !== undefined) {
      this.button.self.removeEventListener('click', this.signupHandler.bind(this));
    }
  }

  /**
    * Отрисовка компонента формы регистрации
    */
  render() {
    this.#parent.innerHTML = signupForm();

    this.login = new Input(document.querySelector('.signup-form__login'), LOGIN_INPUT);
    this.login.render();

    this.password = new Input(document.querySelector('.signup-form__password'), PASSWORD_INPUT);
    this.password.render();

    this.repeatPassword = new Input(document.querySelector('.signup-form__password-repeat'), PASSWORD_REPEAT_INPUT);
    this.repeatPassword.render();

    this.button = new Button(document.querySelector('.signup-form__button'), SIGNUP_BUTTON);
    this.button.render();

    this.addListeners();
  }
}
