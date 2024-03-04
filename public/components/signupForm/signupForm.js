import Input from '../input/input.js';
import Button from '../button/button.js';

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

/**
 * Класс компонента формы авторизации.
 */
export default class SignupForm {
  #parent;

  login;

  password;

  repeatPassword;

  /**
   * Конструктор класса
   * @param {HTMLElement} parent - Родительский элемент
   */
  constructor(parent) {
    this.#parent = parent;
  }

  /**
 * Добавляет листенеры
 */
  addListeners() {
    this.login.self.addEventListener('blur', this.validateLoginInput);
    this.password.self.addEventListener('blur', this.validatePasswordInput);
    this.repeatPassword.self.addEventListener('blur', this.validatePasswordRepeatInput);
  }

  /**
 * Валидирует логин
 */
  validateLoginInput() {
    this.login.renderError('Text error');
  }

  /**
 * Валидирует пароль
 */
  validatePasswordInput() {
    this.password.renderError('error error error error');
  }

  /**
 * Валидирует повтор пароля
 */
  validatePasswordRepeatInput() {
    this.repeatPassword.renderError('пароли не совпадают');
  }

  validateLoginInput = this.validateLoginInput.bind(this);

  validatePasswordInput = this.validatePasswordInput.bind(this);

  validatePasswordRepeatInput = this.validatePasswordRepeatInput.bind(this);

  /**
    * Отрисовка компонента формы регистрации
    */
  render() {
    this.#parent.insertAdjacentHTML(
      'beforeend',
      window.Handlebars.templates['signupForm.hbs'](),
    );

    this.login = new Input(document.querySelector('.signup-form__login'), LOGIN_INPUT);
    this.login.render();

    this.password = new Input(document.querySelector('.signup-form__password'), PASSWORD_INPUT);
    this.password.render();

    this.repeatPassword = new Input(document.querySelector('.signup-form__password-repeat'), PASSWORD_REPEAT_INPUT);
    this.repeatPassword.render();

    const button = new Button(document.querySelector('.signup-form__button'), SIGNUP_BUTTON);
    button.render();

    this.addListeners();
  }
}
