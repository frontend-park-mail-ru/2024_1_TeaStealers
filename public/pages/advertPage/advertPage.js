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

    if (state.priceHistory) {
      const priceHistory = new PriceChange('price', { priceHistory: state.priceHistory });
      const buttonViewPriceHistory = new Button('price', {
        ...VIEW_PRICE_HISTORY,
      });
      innerComponents.push(priceHistory);
      innerComponents.push(buttonViewPriceHistory);
    }
    super({
      parent, template, state, innerComponents,
    });
    if (state.priceHistory) {
      [this.buttonViewContact, this.priceHistory, this.buttonViewPriceHistory] = innerComponents;
    } else {
      [this.buttonViewContact] = innerComponents;
    }
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
    if (this.history) {
      this.addClickListener('buttonViewPriceHistory', this.showHistory.bind(this));
    }
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
      return;
    }
    const likeDiv = document.getElementById('likes');
    const likeSpan = likeDiv.querySelectorAll('span');
    if (likeSpan[0].innerText === 'favorite') {
      likeSpan[0].innerText = 'heart_check';
      likeAdvert(this.state.advrt_id);
      likeSpan[1].innerText = (parseInt(likeSpan[1].innerText, 10) + 1).toString();
    } else {
      likeSpan[0].innerText = 'favorite';
      dislikeAdvert(this.state.advrt_id);
      likeSpan[1].innerText = (parseInt(likeSpan[1].innerText, 10) + 1).toString();
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
    }
  }
}
