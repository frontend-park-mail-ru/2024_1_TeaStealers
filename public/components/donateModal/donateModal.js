import { BaseComponent, Button, Input } from '@components';
import { formatFloat, donate, gerRating } from '@modules';
import { globalVariables } from '@models';
import donateModal from './donateModal.hbs';

/**
   * Класс компонента выпадающего меню
   */
export class DonateModal extends BaseComponent {
  state;

  /**
      * Создает новый экземпляр выпадающего меню
      * @param {HTMLElement} parent - Родительский элемент
      * @param {Object} [state] - Начальное состояние выпадающего меню
      */
  constructor(parent, state) {
    state = { id: 'donationModal' };
    const template = donateModal;
    const cardNumber = new Input('donationForm', {
      id: 'cardNumber',
      placeholder: '1234 5678 9012 3456',
      label: 'Номер карты',
      maxlength: '19',
    });
    const cardExpiry = new Input('donationForm', {
      id: 'cardExpiry',
      placeholder: 'MM/YY',
      label: 'Годен до',
      maxlength: '5',
    });
    const cardCVC = new Input('donationForm', {
      id: 'cardCVC',
      placeholder: '123',
      label: 'CVC',
      maxlength: '3',
    });
    const donationAmount = new Input('donationForm', {
      id: 'donationAmount',
      placeholder: '1 балл = 1 рубль',
      label: 'Количество баллов продвижения',
    });
    const donateButton = new Button('donationForm', {
      mode: 'primary',
      text: 'Подтвердить',
      id: 'confirmDonate',
    });
    const innerComponents = [cardNumber, cardExpiry, cardCVC, donationAmount, donateButton];
    super({
      parent, template, state, innerComponents,
    });
    this.state = state;
    [this.cardNumber, this.cardExpiry, this.cardCVC,
      this.donationAmount, this.donateButton] = innerComponents;
  }

  componentDidMount() {
    document.querySelector('.close').addEventListener('click', this.closeModal.bind(this));
    this.addListener(this.cardNumber, 'input', 'input', this.formatCardNumber.bind(this));
    this.addListener(this.cardExpiry, 'input', 'input', this.formatCardExpiry.bind(this));
    this.addListener(this.cardCVC, 'input', 'input', this.formatCardCVC.bind(this));
    this.addListener(this.donationAmount, 'input', 'input', this.formatDonationAmount.bind(this));
    this.addListener(this.donateButton, 'button', 'click', this.confirmDonate.bind(this));
    this.addListener(this.cardNumber, 'input', 'blur', this.validateCardNumber.bind(this));
    this.addListener(this.cardExpiry, 'input', 'blur', this.validateCardExpiry.bind(this.cardExpiry));
    this.addListener(this.cardCVC, 'input', 'blur', this.validateCardCVC.bind(this.cardCVC));
    this.addListener(this.donationAmount, 'input', 'blur', this.validateDonationAmount.bind(this.donationAmount));
  }

  componentWillUnmount() {
    document.querySelector('.close').removeEventListener('click', this.closeModal.bind(this));
    this.removeListener(this.cardNumber, 'input', 'input', this.formatCardNumber.bind(this));
    this.removeListener(this.cardExpiry, 'input', 'input', this.formatCardExpiry.bind(this));
    this.removeListener(this.cardCVC, 'input', 'input', this.formatCardCVC.bind(this));
    this.removeListener(this.donationAmount, 'input', 'input', this.formatDonationAmount.bind(this));
    this.removeListener(this.donateButton, 'button', 'click', this.confirmDonate.bind(this));
    this.removeListener(this.cardNumber, 'input', 'blur', this.validateCardNumber.bind(this));
    this.removeListener(this.cardExpiry, 'input', 'blur', this.validateCardExpiry.bind(this.cardExpiry));
    this.removeListener(this.cardCVC, 'input', 'blur', this.validateCardCVC.bind(this.cardCVC));
    this.removeListener(this.donationAmount, 'input', 'blur', this.validateDonationAmount.bind(this.donationAmount));
  }

  closeModal() {
    this.cardNumber.setValue('');
    this.cardExpiry.setValue('');
    this.cardCVC.setValue('');
    this.donationAmount.setValue('');
    document.querySelector('#donationModal').classList.toggle('hidden');
  }

  async componentDidUpdate(advertId) {
    this.state.donateHref = advertId;
    try {
      const [statusCode, response] = await gerRating(this.state.donateHref);
      if (statusCode !== globalVariables.HTTP_STATUS_OK) {
        this.state.rating = 0;
        document.querySelector('#rating').innerHTML = `Текущий рейтинг: ${this.state.rating}`;
        return;
      }
      if (response.payload === null) {
        document.querySelector('#rating').innerHTML = `Текущий рейтинг: ${this.state.rating}`;
        return;
      }
      const info = response.payload;
      this.state.rating = info.rating;
    } catch (error) {
      console.log(error);
    }
    document.querySelector('#rating').innerHTML = `Текущий рейтинг: ${this.state.rating}`;
  }

  formatCardNumber() {
    const { value } = this.cardNumber.self.querySelector('input');
    let formatCardNumber = value;
    formatCardNumber = formatCardNumber.replace(/\D/g, '');
    formatCardNumber = formatCardNumber.match(/.{1,4}/g);
    if (formatCardNumber) {
      this.cardNumber.setValue(formatCardNumber.join(' '));
    } else {
      this.cardNumber.setValue('');
    }
  }

  formatCardExpiry() {
    const { value } = this.cardExpiry.self.querySelector('input');
    let formatcardExpiry = value;
    formatcardExpiry = formatcardExpiry.replace(/\D/g, '');
    if (formatcardExpiry.length >= 3) {
      formatcardExpiry = `${formatcardExpiry.slice(0, 2)}/${formatcardExpiry.slice(2)}`;
    }
    this.cardExpiry.setValue(formatcardExpiry);
  }

  formatCardCVC() {
    const { value } = this.cardCVC.self.querySelector('input');
    let formatCardCVC = value;
    formatCardCVC = formatCardCVC.replace(/\D/g, '');
    this.cardCVC.setValue(formatCardCVC);
  }

  formatDonationAmount() {
    const { value } = this.donationAmount.self.querySelector('input');
    let formatDonationAmount = value;
    formatDonationAmount = formatDonationAmount.replace(/\D/g, '');
    if (formatDonationAmount === '') {
      this.donationAmount.setValue('');
      return;
    }
    if (formatDonationAmount.length >= 4) {
      formatDonationAmount = formatDonationAmount.slice(0, 4);
    }
    if (formatDonationAmount > 5000) {
      this.donationAmount.renderError('Сумма не может превышать 5 000 рублей');
    }
    formatDonationAmount = parseInt(formatDonationAmount, 10).toLocaleString('ru-RU').toString();
    if (formatDonationAmount) {
      this.donationAmount.setValue(formatDonationAmount);
    } else {
      this.donationAmount.setValue('');
    }
  }

  validateCardNumber() {
    if (this.cardNumber.self.querySelector('input').value.length !== 19) {
      this.cardNumber.renderError('Проверьте номер карты');
      return false;
    }
    this.cardNumber.removeError();
    return true;
  }

  validateCardExpiry() {
    if (this.self.querySelector('input').value.length === 5) {
      const date = this.self.querySelector('input').value;
      if (Number(date.slice(0, 2)) > 12 || Number(date.slice(0, 2)) === 0) {
        this.renderError('Введите корректный месяц');
        return false;
      }
      if (Number(date.slice(3, 5)) < 24) {
        this.renderError('Ваша карта просрочена');
        return false;
      }
      if (Number(date.slice(0, 2)) < 5 && Number(date.slice(3, 5)) === 24) {
        this.renderError('Ваша карта просрочена');
        return false;
      }
      this.removeError();
      return true;
    }
    this.renderError('Введите данные полностью');
    return false;
  }

  validateCardCVC() {
    if (this.self.querySelector('input').value.length !== 3) {
      this.renderError('Введите полный код');
      return false;
    }
    this.removeError();
    return true;
  }

  validateDonationAmount() {
    if (this.self.querySelector('input').value === '') {
      this.renderError('Введите сумму пожертвования');
      return false;
    }
    if (this.self.querySelector('input').value.replace(' ', '') > 5000) {
      this.renderError('Сумма не может быть больше 5000');
      return false;
    }
    this.removeError();
    return true;
  }

  validateInput() {
    if (this.cardNumber.getValue().length !== 19) {
      return false;
    }
    if (this.cardExpiry.getValue().length === 5) {
      const date = this.cardExpiry.self.querySelector('input').value;
      if (Number(date.slice(0, 2)) > 12) {
        return false;
      }

      if (Number(date.slice(3, 5)) < 25) {
        if (Number(date.slice(3, 5)) === 24) {
          if (Number(date.slice(0, 2)) < 5) {
            return false;
          }
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
    if (this.cardCVC.self.querySelector('input').value.length !== 3) {
      return false;
    }
    if (this.donationAmount.self.querySelector('input').value === undefined) {
      return false;
    }
    return true;
  }

  renderErrorMessage(text, elementId, ok) {
    const errorMessage = document.createElement('div');
    errorMessage.id = 'errorMessage';
    errorMessage.textContent = text;
    errorMessage.classList.add('errorMessage');

    const curButton = document.getElementById(elementId);
    curButton.parentNode.insertAdjacentElement('beforeend', errorMessage);
    if (!ok) {
      errorMessage.classList.add('errorMessage-hide');
    } else {
      errorMessage.classList.add('modalOkMessage');
    }
    setTimeout(() => {
      errorMessage.remove();
    }, 3000);
  }

  async confirmDonate() {
    if (!this.validateInput()) {
      this.renderErrorMessage('Заполните поля', 'confirmDonate');
      return;
    }
    const amount = this.donationAmount.getValue();

    const cardInfo = {
      cardNumber: this.cardNumber.self.querySelector('input').value,
      cardExpiry: this.cardExpiry.self.querySelector('input').value,
      cardCVC: this.cardCVC.self.querySelector('input').value,
      donationAmount: amount.replace(/\s+/g, ''),
    };
    try {
      const [statusCode, ,] = await donate(this.state.donateHref, cardInfo);
      if (statusCode !== globalVariables.HTTP_STATUS_OK) {
        this.renderErrorMessage('Произошла ошибка, проверьте поля', 'confirmDonate');
        return;
      }
    } catch (error) {
      this.renderErrorMessage('Произошла ошибка, проверьте поля', 'confirmDonate');
      return;
    }
    this.closeModal();
  }
}
