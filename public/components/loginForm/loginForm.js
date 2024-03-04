import Input from '../input/input.js';
import Button from '../button/button.js';

const LOGIN_BUTTON = {
  id: 'login_button',
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

/**
 * Класс компонента формы авторизации.
 */
export default class LoginForm {
  #parent;

  login;

  password;

  button;

  /**
   * Создает новый экземпляр формы авторизации.
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

  validateLoginInput = this.validateLoginInput.bind(this);

  validatePasswordInput = this.validatePasswordInput.bind(this);

  /**
    * Отрисовка компонента формы авторизации
    */
  render() {
    this.#parent.insertAdjacentHTML(
      'beforeend',
      window.Handlebars.templates['loginForm.hbs'](),
    );

    this.login = new Input(document.querySelector('.login-form__login'), LOGIN_INPUT);
    this.login.render();

    this.password = new Input(document.querySelector('.login-form__password'), PASSWORD_INPUT);
    this.password.render();

    const button = new Button(document.querySelector('.login-form__button'), LOGIN_BUTTON);
    button.render();

    this.addListeners();
  }
}
