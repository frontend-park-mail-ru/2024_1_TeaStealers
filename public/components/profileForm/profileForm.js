import { BaseComponent, Button, Input } from '@components';
import {
  checkLogin, checkPassword, checkPhone, checkEmail, checkDateDirthday, uploadAvatar,
  updateUserInfo, updateUserPassword,
} from '@modules';
import { events, globalVariables } from '@models';
import profileForm from './profileForm.hbs';

const DEFAULT_FORM = {
  avatar: '../../static/defaultAvatar.png',
};

/**
 * Класс компонента инпута
 */
export class ProfileForm extends BaseComponent {
  infoChange = false;

  /**
   * Создает новый экземпляр инпута.
   * @param {HTMLElement} parent - Родительский элемент, к которому будет добавлен инпут.
   * @param {Object} [state] - Начальное состояние инпута.
   */
  constructor(parent, state) {
    const template = profileForm;
    state = { ...state };
    const bthNewAvatar = new Input('profileFormButtons', {
      id: 'buttonNewAvatar',
      value: 'Обновить фото',
      type: 'file',
      file: true,
      textInputFile: 'Обновить фото',
    });
    const inputName = new Input('profileFormMainInfo', {
      id: 'inputName',
      placeholder: 'Введите имя',
      label: 'Имя',
      value: state.firstName,
    });
    const inputSecondName = new Input('profileFormMainInfo', {
      id: 'inputSecondName',
      placeholder: 'Введите фамилию',
      label: 'Фамилия',
      value: state.secondName,
    });
    const inputPhone = new Input('profileFormMainInfo', {
      id: 'inputPhone',
      placeholder: 'Введите номер телефона',
      label: 'Телефон',
      value: state.phone,
    });
    const inputEmail = new Input('profileFormMainInfo', {
      id: 'inputEmail',
      placeholder: 'Введите электронную почту',
      label: 'Электронная почта',
    });
    const buttonSave = new Button('profileFormMainInfo', {
      mode: 'primary',
      id: 'buttonSave',
      text: 'Сохранить',
    });
    const inputOldPassword = new Input('profileFormPassword', {
      id: 'inputOldPassword',
      placeholder: 'Введите старый пароль',
      label: 'Старый пароль',
      type: 'password',
    });
    const inputNewPassword = new Input('profileFormPassword', {
      id: 'inputNewPassword',
      placeholder: 'Введите новый пароль',
      label: 'Новый пароль',
      type: 'password',

    });
    const buttonChangePassword = new Button('profileFormPassword', {
      mode: 'primary',
      id: 'buttonChangePassword',
      text: 'Сменить пароль',
    });

    const innerComponents = [
      bthNewAvatar,
      inputName,
      inputSecondName,
      inputPhone,
      inputEmail,
      buttonSave,
      inputOldPassword,
      inputNewPassword,
      buttonChangePassword,
    ];
    super({
      parent, template, state, innerComponents,
    });
    [this.bthNewAvatar,
      this.inputName,
      this.inputSecondName,
      this.inputPhone,
      this.inputEmail,
      this.buttonSave,
      this.inputOldPassword,
      this.inputNewPassword,
      this.buttonChangePassword] = innerComponents;
  }

  /**
     * Добавление листенеров
     */
  componentDidMount() {
    this.bthNewAvatar.self.addEventListener('input', this.uploadAvatar.bind(this.bthNewAvatar));
    this.buttonSave.self.addEventListener('click', this.saveHandler.bind(this));
    this.buttonChangePassword.self.addEventListener('click', this.changePasswordHandler.bind(this));
    this.addListener(this.inputName, 'input', 'blur', this.validateName.bind(this.inputName));
    this.addListener(this.inputSecondName, 'input', 'blur', this.validateName.bind(this.inputSecondName));
    this.addListener(this.inputPhone, 'input', 'input', this.validatePhone.bind(this.inputPhone));
    this.addListener(this.inputEmail, 'input', 'blur', this.validateEmail.bind(this.inputEmail));
    this.addListener(this.inputOldPassword, 'input', 'blur', this.validatePassword.bind(this.inputOldPassword));
    this.addListener(this.inputNewPassword, 'input', 'blur', this.validatePassword.bind(this.inputNewPassword));
    super.componentDidMount();
  }

  /**
     * Удаление листенеров
     */
  componentWillUnmount() {
    if (this.bthNewAvatar.self !== null) {
      this.bthNewAvatar.self.removeEventListener('click', this.uploadAvatar.bind(this.bthNewAvatar));
    }
    if (this.buttonSave.self !== null) {
      this.buttonSave.self.removeEventListener('click', this.saveHandler.bind(this));
    }
    if (this.buttonChangePassword.self !== null) {
      this.buttonChangePassword.self.removeEventListener('click', this.changePasswordHandler.bind(this));
    }
    if (this.inputName.self !== null) {
      this.removeListener(this.inputName, 'input', 'blur', this.validateName.bind(this.inputName));
    }
    if (this.inputSecondName.self !== null) {
      this.removeListener(this.inputSecondName, 'input', 'blur', this.validateName.bind(this.inputSecondName));
    }
    if (this.inputPhone.self !== null) {
      this.removeListener(this.inputPhone, 'input', 'blur', this.validatePhone.bind(this.inputPhone));
    }
    if (this.inputEmail.self !== null) {
      this.removeListener(this.inputEmail, 'input', 'blur', this.validateEmail.bind(this.inputEmail));
    }
    if (this.inputOldPassword.self !== null) {
      this.removeListener(this.inputOldPassword, 'input', 'blur', this.validatePassword.bind(this.inputOldPassword));
    }
    if (this.inputNewPassword.self !== null) {
      this.removeListener(this.inputNewPassword, 'input', 'blur', this.validatePassword.bind(this.inputNewPassword));
    }
    super.componentWillUnmount();
  }

  validateName() {
    const { value } = this.self.querySelector('input');
    const [errorText, isValid] = checkLogin(value);
    if (isValid) {
      this.removeError();
      return true;
    }
    this.renderError(errorText);
    return false;
  }

  validateDate() {
    const date = this.self.querySelector('input').value;
    const isValid = checkDateDirthday(date);

    if (isValid) {
      this.removeError();
      return true;
    }
    this.renderError('Укажите корректную дату рождения');
    return false;
  }

  validatePhone() {
    const { value } = this.self.querySelector('input');
    const [formatValue, isValid] = checkPhone(value);

    this.self.querySelector('input').value = formatValue;
    if (isValid) {
      this.removeError();
      return true;
    }
    this.renderError('Некорректный формат');
    return false;
  }

  validateEmail() {
    const { value } = this.self.querySelector('input');
    const isValid = checkEmail(value);
    if (isValid) {
      this.removeError();
      return true;
    }
    this.renderError('Некорректный формат');
    return false;
  }

  validatePassword() {
    const pass = this.self.querySelector('input').value.trim();
    const [errorText, isValid] = checkPassword(pass);
    if (isValid) {
      this.removeError();
      return true;
    }
    this.renderError(errorText);
    return false;
  }

  componentDidUpdate(event) {
    if (event.name !== events.ME) {
      return;
    }
    this.inputName.self.querySelector('input').value = event.data.firstName;
    this.inputSecondName.self.querySelector('input').value = event.data.secondName;
    this.inputPhone.self.querySelector('input').value = event.data.phone;
    this.inputEmail.self.querySelector('input').value = event.data.email;
    if (event.data.photo === '') {
      document.getElementById('profileFormAvatar').src = '../../static/defaultAvatar.png';
    } else {
      document.getElementById('profileFormAvatar').src = event.data.photo;
    }
  }

  async saveHandler() {
    const isValName = this.validateName.bind(this.inputName);
    const isValSecondName = this.validateName.bind(this.inputSecondName);
    const isValPhone = this.validatePhone.bind(this.inputPhone);
    const isValEmail = this.validateEmail.bind(this.inputEmail);

    if (!isValName() || !isValSecondName() || !isValPhone() || !isValEmail()) {
      return;
    }

    const info = {
      firstName: this.inputName.self.querySelector('input').value,
      secondName: this.inputSecondName.self.querySelector('input').value,
      dateBirthday: new Date(),
      phone: this.inputPhone.self.querySelector('input').value,
      email: this.inputEmail.self.querySelector('input').value,

    };
    try {
      const [statusCode, ,] = await updateUserInfo(info);
      if (statusCode !== globalVariables.HTTP_STATUS_OK) {
        this.inputEmail.renderError('Такой пароль или почта уже заняты');
        this.inputPhone.renderError('');
        return;
      }
      this.renderOkMessage('Данные успешно сохранены', 'buttonSave');
    } catch (error) {
      this.renderOkMessage('Произошла ошибка при изменении данных', 'buttonSave');
    }
  }

  async changePasswordHandler() {
    const isValOld = this.validatePassword.bind(this.inputOldPassword);
    const isValNew = this.validatePassword.bind(this.inputNewPassword);
    if (!isValNew() || !isValOld()) {
      return;
    }
    const info = {
      oldPassword: this.inputOldPassword.self.querySelector('input').value,
      newPassword: this.inputNewPassword.self.querySelector('input').value,
    };
    try {
      const [statusCode, data] = await updateUserPassword(info);
      if (statusCode !== globalVariables.HTTP_STATUS_OK) {
        if (data.message === 'passwords must not match') {
          this.inputNewPassword.renderError('Пароли не должны совпадать');
          return;
        }
        this.inputOldPassword.renderError('Неправильный пароль');
        return;
      }
      this.renderOkMessage('Пароль успешно изменен', 'buttonChangePassword');
      this.inputOldPassword.self.querySelector('input').value = '';
      this.inputNewPassword.self.querySelector('input').value = '';
    } catch (error) {
      this.renderOkMessage('Произошла ошибка при именении пароля', 'buttonChangePassword');
    }
  }

  async uploadAvatar() {
    document.getElementById('profileForm__avatarError').textContent = '';
    const file = this.self.querySelector('input').files[0];
    if (!file) {
      return;
    }
    if (!file.type.includes('image')) {
      document.getElementById('profileForm__avatarError').textContent = 'Только .png, .jpeg, .jpg';
      return;
    }
    try {
      const formData = new FormData();
      formData.set('file', file);
      const [statusCode, data] = await uploadAvatar(formData);
      if (statusCode === globalVariables.HTTP_STATUS_OK) {
        const fileName = data.payload;
        document.getElementById('profileFormAvatar').src = fileName;
        document.getElementById('profileFormAvatar').alt = fileName;
      }
      if (statusCode === globalVariables.HTTP_BAD_REQUEST) {
        document.getElementById('profileForm__avatarError').textContent = 'Размер файла не должен превышать 5мб';
      }
    } catch (error) {
      document.getElementById('profileForm__avatarError').textContent = 'Ошибка при загрузке аватара';
    }
  }

  renderOkMessage(text, elementId) {
    const okMessage = document.createElement('div');
    okMessage.id = 'okMessage';
    okMessage.textContent = text;
    okMessage.classList.add('okMessage');

    const curButton = document.getElementById(elementId);
    curButton.parentNode.insertAdjacentElement('beforeend', okMessage);

    okMessage.classList.add('okMessage-hide');
    setTimeout(() => {
      okMessage.remove();
    }, 3000);
  }
}
