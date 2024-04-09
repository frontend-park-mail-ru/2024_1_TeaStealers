import { BaseComponent, Button } from '@components';
import { advertPageController } from '@controllers';
import { deleteAdvertById, router } from '@modules';
import { events, globalVariables, myAdvertModel } from '@models';
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

    const innerComponents = [];
    super({
      parent, template, state, innerComponents,
    });
  }

  componentDidMount() {
    document.querySelectorAll('.gridCards__card').forEach((card) => {
      card.querySelector('a').addEventListener('click', this.goToAdvert.bind(this));
    });
    document.querySelectorAll('.gridCards__edit').forEach((card) => {
      card.addEventListener('click', this.editAdvert.bind(this));
    });
    document.querySelectorAll('.gridCards__delete').forEach((card) => {
      card.addEventListener('click', this.deleteAdvert.bind(this));
    });
  }

  componentWillUnmount() {
    document.querySelectorAll('gridCard__mini-card').forEach((card) => {
      card.querySelector('a').removeEventListener('click', this.goToAdvert.bind(this));
    });
    document.querySelectorAll('.gridCards__edit').forEach((card) => {
      card.removeEventListener('click', this.editAdvert.bind(this));
    });
    document.querySelectorAll('.gridCards__delete').forEach((card) => {
      card.removeEventListener('click', this.deleteAdvert.bind(this));
    });
  }

  componentDidUpdate(event) {
    if (event.name === events.GET_ADVERTS_MAIN) {
      this.unmountAndClean();
      this.state.miniCards = event.data.adverts;
      this.state = { ...this.state, ...event.data.pageInfo };
      this.renderAndDidMount();
    }
    if (event.name === events.GET_MY_ADVERTS) {
      this.unmountAndClean();
      this.state.miniCards = event.data;
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

  async deleteAdvert(event) {
    event.preventDefault();
    const idAdvert = event.target.getAttribute('href');
    try {
      await deleteAdvertById(idAdvert);
    } catch (error) {
      console.log(error);
    }
    await myAdvertModel.getMyAdverts();
  }

  editAdvert(event) {
    event.preventDefault();
    const href = event.target.getAttribute('href');
    this.redirect(href);
  }
}
