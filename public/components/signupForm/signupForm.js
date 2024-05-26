import { BaseComponent, Input, Button } from '@components';
import {
  checkPhone, checkEmail, checkPassword, checkRepeatPassword, signup,
} from '@modules';
import { authModel, globalVariables } from '@models';
import signupForm from './signupForm.hbs';

const SIGNUP_BUTTON = {
  id: 'signup_button',
  text: 'Зарегистрироваться',
  mode: 'primary',
  size: 'sm',
  borderRadius: 'sm',
  full: true,
};
const PHONE_INPUT = {
  id: 'signup_phone',
  type: 'text',
  placeholder: 'Телефон',
  autocomplete: 'tel',
  name: 'login',
};
const EMAIL_INPUT = {
  id: 'signup_email',
  type: 'text',
  placeholder: 'Электронная почта',
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
  blockClass: 'passwordInput',
};
const SIGNUP_ERROR = 'Такой логиин уже существует';

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

    const phone = new Input('signupFormLogin', PHONE_INPUT);

    const email = new Input('signupFormLogin', EMAIL_INPUT);

    const password = new Input('signupFormPassword', PASSWORD_INPUT);

    const repeatPassword = new Input('repeatPassword', PASSWORD_REPEAT_INPUT);

    const signupButton = new Button('signupButton', SIGNUP_BUTTON);

    const innerComponents = [phone, email, password, repeatPassword, signupButton];

    super({
      parent, template, state, innerComponents,
    });

    this.state = state;
    [this.phone,
      this.email,
      this.password,
      this.repeatPassword,
      this.signupButton] = innerComponents;
  }

  /**
 * Добавляет листенеры
 */
  componentDidMount() {
    this.addListener(this.phone, 'input', 'input', this.formatPhoneNumber.bind(this));
    this.addListener(this.email, 'input', 'input', this.validateEmailInput.bind(this));
    this.addListener(this.password, 'input', 'input', this.validatePasswordInput.bind(this));
    this.addListener(this.repeatPassword, 'input', 'input', this.validatePasswordRepeatInput.bind(this));
    this.signupButton.self.addEventListener('click', this.signupHandler.bind(this));
    this.repeatPassword.componentDidMount();
  }

  /**
 * Валидирует номер телефона
 */
  formatPhoneNumber() {
    const { value } = this.phone.self.querySelector('input');

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
   * Валидирует email
   */
  validateEmailInput() {
    const email = this.innerComponents[1].self.querySelector('input').value.trim();
    const isValid = checkEmail(email);
    if (isValid) {
      this.innerComponents[1].removeError();
      return true;
    }
    this.innerComponents[1].renderError('Некорректный формат');
    return false;
  }

  /**
   * Обработчик события для регистрации
   * @param {Event} event - событие, которое вызвало обработчик
   */
  async signupHandler(event) {
    this.removeErr();
    const valPhone = this.formatPhoneNumber();
    const valEmail = this.validateEmailInput();
    const valPass = this.validatePasswordInput();
    const valPassRe = this.validatePasswordRepeatInput();
    event.preventDefault();
    if (!valPhone) {
      this.phone.renderError('Некорректный формат');
    }
    if (!valPass || !valPassRe || !valEmail || !valPhone) {
      return;
    }
    const phoneValue = this.innerComponents[0].self.querySelector('input').value.trim();
    const emailValue = this.innerComponents[1].self.querySelector('input').value.trim();
    const pass = this.innerComponents[2].self.querySelector('input').value.trim();
    const data = { phone: phoneValue, email: emailValue, password: pass };
    try {
      const [statusCode, ,] = await signup(data);
      if (statusCode === globalVariables.HTTP__INTERNAL_SERVER_ERROR
        || statusCode === globalVariables.HTTP_BAD_REQUEST) {
        this.addErr(SIGNUP_ERROR);
        return;
      }
    } catch (error) {
      this.addErr('Ошибка при регистрации');
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
 *Удаляет листенеры
 */
  componentWillUnmount() {
    if (this.formatPhoneNumber !== undefined) {
      this.removeListener(this.phone, 'input', 'input', this.formatPhoneNumber.bind(this));
    }
    if (this.validateEmailInput !== undefined) {
      this.removeListener(this.email, 'input', 'input', this.validateEmailInput.bind(this));
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
