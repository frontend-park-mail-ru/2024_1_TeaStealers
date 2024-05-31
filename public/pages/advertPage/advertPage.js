import { BaseComponent, Button, PriceChange } from '@components';
import { events, authModel } from '@models';
import { router } from '@modules/router';
import { likeAdvert, dislikeAdvert } from '@modules';
import advertPage from './advertPage.hbs';

const VIEW_CONTACT_TEMPLATE = {
  mode: 'primary',
  text: 'Показать контакты',
  id: 'buttonViewContact',
};

const VIEW_PRICE_HISTORY = {
  mode: 'secondary',
  text: 'Показать изменение цены',
  id: 'buttonViewPriceHistory',
};

/**
 * Класс страницы объявления
 */
export class AdvertPage extends BaseComponent {
  slideIndex;

  /**
    * Создает новый экземпляр страницы объявления
    * @param {Id} parent - Родительский элемент (Id)
    * @param {Object} [state] - Начальное состояние страницы объявления
    */
  constructor(parent, state) {
    const template = advertPage;
    state = { ...state };
    const buttonViewContact = new Button('price', {
      ...VIEW_CONTACT_TEMPLATE,
    });
    const innerComponents = [buttonViewContact];
    super({
      parent, template, state, innerComponents,
    });

    [this.buttonViewContact] = innerComponents;
    this.slideIndex = 0;
    this.history = false;
    if (state.priceHistory) {
      this.history = true;
    }
  }

  render() {
    super.render();
  }

  componentDidMount() {
    this.addClickListener('buttonViewContact', this.viewContactListener.bind(this));
    this.addClickListener('imageAdvert__prev', this.prevSlide.bind(this));
    this.addClickListener('imageAdvert__next', this.nextSlide.bind(this));
    this.addClickListener('linkToComplex', this.goToComplex.bind(this));
    this.addClickListener('advert-page__back', this.goToList.bind(this));
    this.addClickListener('likes', this.like.bind(this));
  }

  showHistory() {
    document.querySelector('#price-change').classList.toggle('hidden');
    this.showingHistory
      ? this.buttonViewPriceHistory.self.firstElementChild.innerText = 'Показать изменение цены'
      : this.buttonViewPriceHistory.self.firstElementChild.innerText = 'Скрыть изменение цены';
    this.showingHistory = !this.showingHistory;
  }

  like() {
    if (!authModel.isAuth) {
      document.querySelector('#buttonNewAdvert').click();
      return;
    }
    const likeDiv = document.getElementById('likes');
    const likeSpan = likeDiv.querySelectorAll('span');
    if (likeSpan[0].innerText === 'favorite') {
      likeSpan[0].innerText = 'heart_check';
      likeAdvert(this.state.advertId);
      likeSpan[1].innerText = (parseInt(likeSpan[1].innerText, 10) + 1).toString();
    } else {
      likeSpan[0].innerText = 'favorite';
      dislikeAdvert(this.state.advertId);
      likeSpan[1].innerText = (parseInt(likeSpan[1].innerText, 10) - 1).toString();
    }
  }

  viewContactListener(event) {
    if (event.target.parentElement.id === 'buttonViewContact') {
      event.target.parentElement.innerHTML = this.state.phone;
    }
  }

  goToList(event) {
    event.preventDefault();
    router.back();
  }

  nextSlide() {
    this.showSlide(this.slideIndex += 1);
  }

  prevSlide() {
    this.showSlide(this.slideIndex -= 1);
  }

  showSlide(index) {
    const slides = document.querySelectorAll('.advert-page__slides img');
    if (index >= slides.length) {
      this.slideIndex = 0;
    }
    if (index < 0) {
      this.slideIndex = slides.length - 1;
    }
    slides.forEach((slide) => {
      slide.style.display = 'none';
    });
    slides[this.slideIndex].style.display = 'block';
  }

  goToComplex(event) {
    event.preventDefault();
    const href = event.target.getAttribute('href');
    this.redirect(href);
  }

  componentWillUnmount() {
    this.removeClickListener('buttonViewContact', this.viewContactListener.bind(this));
    this.removeClickListener('imageAdvert__prev', this.prevSlide.bind(this));
    this.removeClickListener('imageAdvert__next', this.nextSlide.bind(this));
    this.removeClickListener('linkToComplex', this.goToComplex.bind(this));
    this.removeClickListener('advert-page__back', this.goToList.bind(this));
    this.removeClickListener('likes', this.like.bind(this));
    if (this.history) {
      this.removeClickListener('buttonViewPriceHistory', this.showHistory.bind(this));
    }
  }

  componentDidUpdate(event) {
    if (event.name === events.GET_ADVERT_BY_ID) {
      this.state = event.data;
      this.unmountAndClean();
      const spacedPrice = parseInt(this.state.price, 10).toLocaleString('ru-RU');
      if (spacedPrice.length >= this.state.price.toString().length) {
        this.state.price = spacedPrice;
      }
      this.renderAndDidMount();
      this.renderButtonPriceChange();
    }
  }

  renderButtonPriceChange() {
    if (this.state.priceHistory.length === 1) {
      return;
    }
    this.priceHistory = new PriceChange('price', { priceHistory: this.dataForPriceChange(this.state.priceHistory) });
    this.buttonViewPriceHistory = new Button('price', {
      ...VIEW_PRICE_HISTORY,
    });
    this.buttonViewPriceHistory.renderAndDidMount();
    this.priceHistory.renderAndDidMount();
    this.addClickListener('buttonViewPriceHistory', this.showHistory.bind(this));
  }

  dataForPriceChange(data) {
    const newData = [];

    const months = {
      '01': 'янв',
      '02': 'фев',
      '03': 'мар',
      '04': 'апр',
      '05': 'мая',
      '06': 'июня',
      '07': 'июля',
      '08': 'авг',
      '09': 'сен',
      10: 'окт',
      11: 'ноя',
      12: 'дек',
    };

    let prevPrice = null;

    data.forEach((element) => {
      const dateParts = element.data.split('-');

      const day = parseInt(dateParts[2], 10).toString(); // Первые два символа - день
      const month = months[dateParts[1]]; // Вторая часть - месяц
      // const year = dateParts[0]; // Третья часть - год

      const newItem = {
        data: `${day} ${month}`,
      };

      if (prevPrice !== null) {
        const currentPrice = parseInt(element.price, 10);
        let priceChange = currentPrice - prevPrice;
        const spacedPrice = parseInt(priceChange, 10).toLocaleString('ru-RU');
        if (spacedPrice.length >= priceChange.toString().length) {
          priceChange = spacedPrice;
        }
        if (priceChange.includes('-')) {
          priceChange = priceChange.replace('-', '');
          newItem.down = true;
        } else {
          newItem.up = true;
        }

        newItem.priceChange = priceChange;
      }

      prevPrice = parseInt(element.price, 10);

      const spacedPrice = parseInt(element.price, 10).toLocaleString('ru-RU');
      if (spacedPrice.length >= element.price.toString().length) {
        newItem.price = spacedPrice;
      }

      newData.push(newItem);
    });

    return newData.reverse();
  }
}
