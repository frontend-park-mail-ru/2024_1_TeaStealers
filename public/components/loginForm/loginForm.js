import { BaseComponent, Input, Button } from '@components';
import { checkLogin, checkPassword, login } from '@modules';
import { globalVariables } from '@models';
import loginForm from './loginForm.hbs';

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

    [this.loginInput, this.password, this.button] = this.innerComponents;

    this.loginHandler = this.loginHandler.bind(this);
  }

  /**
   * Добавляет листенеры
   */
  componentDidMount() {
    this.addListener(this.loginInput, 'input', 'blur', this.validateLoginInput.bind(this));
    this.addListener(this.password, 'input', 'blur', this.validatePasswordInput.bind(this));
    this.button.self.addEventListener('click', this.loginHandler.bind(this));
  }

  /**
 * Валидирует логин
 */
  validateLoginInput() {
    const loginVal = this.loginInput.self.querySelector('input').value.trim();
    const [, isValid] = checkLogin(loginVal);
    if (isValid) {
      this.loginInput.removeError();
      return true;
    }
    this.loginInput.renderError(ERROE_LOG);
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
    const logValue = this.loginInput.self.querySelector('input').value.trim();
    const password = this.password.self.querySelector('input').value.trim();
    const [, isValidLogin] = checkLogin(logValue);
    const [, isValidPass] = checkPassword(password);
    if (!isValidLogin) {
      this.loginInput.renderError(ERROE_LOG);
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
    if (statusCode === globalVariables.HTTP__INTERNAL_SERVER_ERROR
      || statusCode === globalVariables.HTTP_BAD_REQUEST) {
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
      this.removeListener(this.loginInput, 'input', 'blur', this.validateLoginInput.bind(this));
    }
    if (!this.validatePasswordInput) {
      this.removeListener(this.password, 'input', 'blur', this.validatePasswordInput.bind(this));
    }
    if (!this.loginHandler) {
      this.button.self.removeEventListener('click', this.loginHandler.bind(this));
    }
  }
}
