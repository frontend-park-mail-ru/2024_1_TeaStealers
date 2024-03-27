import loginForm from './loginForm.hbs';
import { BaseComponent, Input, Button } from '@components';
import { checkLogin, checkPassword, login } from '@modules';
// import { globalVariables } from '@models';

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
  innerComponents;
  /**
   * Создает новый экземпляр формы авторизации.
   * @param {HTMLElement} parent - Родительский элемент (id)
   */
  constructor(parent, state) {

    const template = loginForm;

    const login = new Input('loginFormLogin', LOGIN_INPUT);
    
    const password = new Input('loginFormPassword', PASSWORD_INPUT);
    
    const button = new Button('confirmButton', LOGIN_BUTTON);
    
    const innerComponents = [login, password, button];
    
    super({parent, template, state, innerComponents});

    this.innerComponents = [login, password, button];
    this.loginHandler = this.loginHandler.bind(this);
  }

  /**
   * Добавляет листенеры
   */
  componentDidMount() {
    // this.button.self.addEventListener('click', this.loginHandler.bind(this));
    // this.login.self.querySelector('input').addEventListener('blur', this.validateLoginInput.bind(this));
    // this.password.self.querySelector('input').addEventListener('blur', this.validatePasswordInput.bind(this));
    this.innerComponents[0].self.querySelector('input').addEventListener('blur', this.validateLoginInput.bind(this));
    this.innerComponents[1].self.querySelector('input').addEventListener('blur', this.validatePasswordInput.bind(this));
    this.innerComponents[2].self.addEventListener('click', this.loginHandler.bind(this));
  }

  /**
 * Валидирует логин
 */
  validateLoginInput() {
    const loginVal = this.innerComponents[0].self.querySelector('input').value.trim();
    const [, isValid] = checkLogin(loginVal);
    if (isValid) {
      this.innerComponents[0].removeError();
      return true;
    }
    this.innerComponents[0].renderError(ERROE_LOG);
    return false;
  }

  /**
   * Валидирует пароль
   */
  validatePasswordInput() {
    const pass = this.innerComponents[1].self.querySelector('input').value.trim();
    const [, isValid] = checkPassword(pass);
    if (isValid) {
      this.innerComponents[1].removeError();
      return true;
    }
    this.innerComponents[1].renderError(ERROE_PASS);
    return false;
  }

  /**
   * Обрабатывает действие кнопки "войти"
   */
  async loginHandler() {
    const logValue = this.innerComponents[0].self.querySelector('input').value.trim();
    const password = this.innerComponents[1].self.querySelector('input').value.trim();
    const [, isValidLogin] = checkLogin(logValue);
    const [, isValidPass] = checkPassword(password);
    if (!isValidLogin) {
      this.innerComponents[0].renderError(ERROE_LOG);
    }
    if (!isValidLogin) {
      this.innerComponents[1].renderError(ERROE_PASS);
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
    if (this.validateLoginInput !== undefined) {
      this.innerComponents[0].self.querySelector('input').removeEventListener('input', this.validateLoginInput.bind(this));
    }
    if (this.validatePasswordInput !== undefined) {
      this.innerComponents[1].self.querySelector('input').removeEventListener('input', this.validatePasswordInput.bind(this));
    }
    if (this.loginHandler !== undefined) {
      this.innerComponents[2].self.removeEventListener('click', this.loginHandler.bind(this));
    }
  }
}
