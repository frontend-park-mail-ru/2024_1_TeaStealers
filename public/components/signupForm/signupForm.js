import { BaseComponent, Input, Button } from '@components';
import {
  checkLogin, checkPassword, checkRepeatPassword, signup,
} from '@modules';
import { globalVariables } from '@models';
import signupForm from './signupForm.hbs';

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
export class SignupForm extends BaseComponent {
  /**
   * Конструктор класса
   * @param {HTMLElement} parent - Родительский элемент
   */
  constructor(parent, state) {
    const template = signupForm;

    const login = new Input('signupFormLogin', LOGIN_INPUT);

    const password = new Input('signupFormPassword', PASSWORD_INPUT);

    const repeatPassword = new Input('repeatPassword', PASSWORD_REPEAT_INPUT);

    const signupButton = new Button('signupButton', SIGNUP_BUTTON);

    const innerComponents = [login, password, repeatPassword, signupButton];

    super({
      parent, template, state, innerComponents,
    });

    [this.login, this.password, this.repeatPassword, this.signupButton] = this.innerComponents;
  }

  /**
 * Добавляет листенеры
 */
  componentDidMount() {
    this.addListener(this.login, 'input', 'input', this.validateLoginInput.bind(this));
    this.addListener(this.password, 'input', 'input', this.validatePasswordInput.bind(this));
    this.addListener(this.repeatPassword, 'input', 'input', this.validatePasswordRepeatInput.bind(this));
    this.signupButton.self.addEventListener('click', this.signupHandler.bind(this));
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
    if (statusCode === globalVariables.HTTP__INTERNAL_SERVER_ERROR
      || statusCode === globalVariables.HTTP_BAD_REQUEST) {
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
    document.getElementById('error-message').textContent = errorText;
  }

  /**
     * Удаляет отрисовку ошибки
     */
  removeErr() {
    document.getElementById('error-message').textContent = '';
  }

  /**
 *Удаляет листенеры
 */
  componentWillUnmount() {
    if (this.validateLoginInput !== undefined) {
      this.removeListener(this.login, 'input', 'input', this.validateLoginInput.bind(this));
    }
    if (this.validatePasswordInput !== undefined) {
      this.removeListener(this.password, 'input', 'input', this.validatePasswordInput.bind(this));
    }
    if (this.validatePasswordRepeatInput !== undefined) {
      this.removeListener(this.repeatPassword, 'input', 'input', this.validatePasswordRepeatInput.bind(this));
    }
    if (this.signupHandler !== undefined) {
      this.signupButton.self.removeEventListener('click', this.signupHandler.bind(this));
    }
  }
}
