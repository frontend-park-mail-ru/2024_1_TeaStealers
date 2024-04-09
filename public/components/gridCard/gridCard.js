import { BaseComponent } from '@components';
import { advertPageController } from '@controllers';
import { router } from '@modules';
import { events } from '@models';
import gridCard from './gridCard.hbs';

/**
   * Класс компонента сетки объявлений
   */
export class GridCard extends BaseComponent {
  /**
      * Создает новый экземпляр карточки объявления
      * @param {HTMLElement} parent - Родительский элемент
      * @param {Object} [state] - Начальное состояние карточки объявления
      */
  constructor(parent, state) {
    const template = gridCard;
    state = { ...state };
    super({ parent, template, state });
  }

  componentDidMount() {
    document.querySelectorAll('.gridCard__mini-card').forEach((card) => {
      card.querySelector('a').addEventListener('click', this.goToAdvert.bind(this));
    });
  }

  componentWillUnmount() {
    document.querySelectorAll('gridCard__mini-card').forEach((card) => {
      card.querySelector('a').removeEventListener('click', this.goToAdvert.bind(this));
    });
  }

  componentDidUpdate(event) {
    if (event.name === events.GET_ADVERTS_MAIN) {
      this.unmountAndClean();
      this.state.miniCards = event.data.adverts;
      this.renderAndDidMount();
    }
  }

  goToAdvert(event) {
    event.preventDefault();
    let href = event.target.parentElement.parentElement.getAttribute('href');
    if (href === null) {
      href = event.target.parentElement.getAttribute('href');
    }
    this.redirect(href);
  }
}
