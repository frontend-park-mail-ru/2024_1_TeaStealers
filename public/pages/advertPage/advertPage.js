import { BaseComponent, Button } from '@components';
import { events } from '@models';
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
    * Создает новый экземпляр выпадающего меню
    * @param {Id} parent - Родительский элемент (Id)
    * @param {Object} [state] - Начальное состояние выпадающего меню
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
  }

  render() {
    super.render();
  }

  componentDidMount() {
    this.addClickListener('buttonViewContact', this.viewContactListener.bind(this));
    this.addClickListener('imageAdvert__prev', this.prevSlide.bind(this));
    this.addClickListener('imageAdvert__next', this.nextSlide.bind(this));
    this.addClickListener('linkToComplex', this.goToComplex.bind(this));
  }

  viewContactListener(event) {
    if (event.target.parentElement.id === 'buttonViewContact') {
      event.target.parentElement.innerHTML = this.state.phone;
    }
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
  }

  componentDidUpdate(event) {
    if (event.name === events.GET_ADVERT_BY_ID) {
      this.state = event.data;
      this.unmountAndClean();
      this.renderAndDidMount();
    }
  }
}
