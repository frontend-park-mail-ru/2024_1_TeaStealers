import { BaseComponent, Input, Button } from '@components';
import {
  checkLogin, checkPassword, login, checkPhone,
} from '@modules';
import { authModel, globalVariables } from '@models';
import loginForm from './loginForm.hbs';

const LOGIN_BUTTON = {
  id: 'login_button',
  mode: 'primary',
  text: 'Войти',
};
const LOGIN_INPUT = {
  id: 'login_input',
  type: 'text',
  placeholder: 'Телефон',
};
const PASSWORD_INPUT = {
  id: 'password_input',
  type: 'password',
  placeholder: 'Пароль',
};
const ERROR_LOGIN = 'Неверный телефон или пароль';
const ERROE_PHONE = 'Некорректный формат';
const ERROE_PASS = 'Некорректный пароль';

/**
 * Класс компонента формы авторизации.
 */
export class LoginForm extends BaseComponent {
  /**
   * Создает новый экземпляр формы авторизации.
   * @param {HTMLElement} parent - Родительский элемент (id)
   */
  constructor(parent, state) {
    const template = loginForm;

    const loginInput = new Input('loginFormLogin', LOGIN_INPUT);

    const password = new Input('loginFormPassword', PASSWORD_INPUT);

    const button = new Button('confirmButton', LOGIN_BUTTON);

    const innerComponents = [loginInput, password, button];

    super({
      parent, template, state, innerComponents,
    });

    [this.loginInput, this.password, this.button] = innerComponents;

    this.loginHandler = this.loginHandler.bind(this);
  }

  /**
   * Добавляет листенеры
   */
  componentDidMount() {
    this.addListener(this.loginInput, 'input', 'input', this.formatPhoneNumber.bind(this));
    this.addListener(this.password, 'input', 'blur', this.validatePasswordInput.bind(this));
    this.button.self.addEventListener('click', this.loginHandler.bind(this));
  }

  /**
 * Валидирует номер телефона
 */
  formatPhoneNumber() {
    const { value } = this.innerComponents[0].self.querySelector('input');

    const [formatValue, isValid] = checkPhone(value);

    this.innerComponents[0].self.querySelector('input').value = formatValue;
    if (isValid) {
      this.innerComponents[0].removeError();
      return true;
    }
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
    const phoneValue = this.loginInput.self.querySelector('input').value.trim();
    const password = this.password.self.querySelector('input').value.trim();
    const isValidLogin = this.formatPhoneNumber();
    const isValidPass = this.validatePasswordInput();
    if (!isValidLogin) {
      this.loginInput.renderError(ERROE_PHONE);
      return;
    }
    if (!isValidLogin || !isValidPass) {
      return;
    }
    this.removeErr();
    const data = { login: phoneValue, password };
    const [statusCode, ,] = await login(data);
    if (statusCode === globalVariables.HTTP_INTERNAL_SERVER_ERROR
      || statusCode === globalVariables.HTTP_BAD_REQUEST) {
      this.addErr(ERROR_LOGIN);
      return;
    }
    this.state.closeModal();
    authModel.setAuth();
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
     * Удаление обработчиков событий
     */
  componentWillUnmount() {
    if (!this.validateLoginInput) {
      this.removeListener(this.loginInput, 'input', 'blur', this.formatPhoneNumber.bind(this));
    }
    if (!this.validatePasswordInput) {
      this.removeListener(this.password, 'input', 'blur', this.validatePasswordInput.bind(this));
    }
    if (!this.loginHandler) {
      this.button.self.removeEventListener('click', this.loginHandler.bind(this));
    }
  }
}
