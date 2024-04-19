import { BaseComponent, Button, Footer } from '@components';
import { events } from '@models';
import { router } from '@modules/router';
import advertPage from './advertPage.hbs';

const VIEW_CONTACT_TEMPLATE = {
  mode: 'primary',
  text: 'Показать контакты',
  id: 'buttonViewContact',
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

    const footer = new Footer('app');

    const innerComponents = [buttonViewContact, footer];
    super({
      parent, template, state, innerComponents,
    });
    [this.buttonViewContact, this.footer] = innerComponents;
    this.slideIndex = 0;
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
    this.footer.componentDidMount();
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
    this.footer.componentWillUnmount();
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
