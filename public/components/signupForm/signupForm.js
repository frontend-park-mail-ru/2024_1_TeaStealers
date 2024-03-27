import signupForm from './signupForm.hbs';
import { BaseComponent, Input, Button } from '@components';
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
export class SignupForm extends BaseComponent {
  innerComponents;
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
    
    super({parent, template, state, innerComponents});

    this.innerComponents = [login, password, repeatPassword, signupButton];
  }

  /**
 * Добавляет листенеры
 */
  componentDidMount() {
    // this.login.self.querySelector('input').addEventListener('input', this.validateLoginInput.bind(this));
    // this.password.self.querySelector('input').addEventListener('input', this.validatePasswordInput.bind(this));
    // this.repeatPassword.self.querySelector('input').addEventListener('input', this.validatePasswordRepeatInput.bind(this));
    // this.button.self.addEventListener('click', this.signupHandler.bind(this));

    this.innerComponents[0].self.querySelector('input').addEventListener('input', this.validateLoginInput.bind(this));
    this.innerComponents[1].self.querySelector('input').addEventListener('input', this.validatePasswordInput.bind(this));
    this.innerComponents[2].self.querySelector('input').addEventListener('input', this.validatePasswordRepeatInput.bind(this));
    this.innerComponents[3].self.addEventListener('click', this.signupHandler.bind(this));
  }

  /**
 * Валидирует логин
 */
  validateLoginInput() {
    const login = this.innerComponents[0].self.querySelector('input').value.trim();
    const [err, isValid] = checkLogin(login);
    if (isValid) {
      this.innerComponents[0].removeError();
      return true;
    }
    this.innerComponents[0].renderError(err);
    return false;
  }

  /**
 * Валидирует пароль
 */
  validatePasswordInput() {
    const pass = this.innerComponents[1].self.querySelector('input').value.trim();
    const [err, isValid] = checkPassword(pass);
    if (isValid) {
      this.innerComponents[1].removeError();
      return true;
    }
    this.innerComponents[1].renderError(err);
    return false;
  }

  /**
 * Валидирует повтор пароля
 */
  validatePasswordRepeatInput() {
    const pass = this.innerComponents[1].self.querySelector('input').value.trim();
    const passRepeat = this.innerComponents[2].self.querySelector('input').value.trim();
    const [err, isValid] = checkRepeatPassword(pass, passRepeat);
    if (isValid) {
      this.innerComponents[2].removeError();
      return true;
    }
    this.innerComponents[2].renderError(err);
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
    const log = this.innerComponents[0].self.querySelector('input').value.trim();
    const pass = this.innerComponents[1].self.querySelector('input').value.trim();
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
      this.innerComponents[0].self.querySelector('input').removeEventListener('input', this.validateLoginInput.bind(this));
    }
    if (this.validatePasswordInput !== undefined) {
      this.innerComponents[1].self.querySelector('input').removeEventListener('input', this.validatePasswordInput.bind(this));
    }
    if (this.validatePasswordRepeatInput !== undefined) {
      this.innerComponents[2].self.querySelector('input').removeEventListener('input', this.validatePasswordRepeatInput.bind(this));
    }
    if (this.signupHandler !== undefined) {
      this.innerComponents[3].self.removeEventListener('click', this.signupHandler.bind(this));
    }
  }
}
