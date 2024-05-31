import { BaseComponent, Button, DonateModal } from '@components';
import { advertPageController, mainControler } from '@controllers';
import { deleteAdvertById, router, dislikeAdvert } from '@modules';
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

    state.miniCards?.forEach((card) => {
      const spacedPrice = parseInt(card.price, 10).toLocaleString('ru-RU');
      if (spacedPrice.length >= card.price.toString().length) {
        card.price = spacedPrice;
      }
    });
    const innerComponents = [];
    const modal = new DonateModal('placeToDonateModal', {});
    if (state.myAdverts) {
      innerComponents.push(modal);
    }

    super({
      parent, template, state, innerComponents,
    });
    if (state.myAdverts) {
      this.modal = modal;
      this.donateAdvertId = '';
    }
  }

  /**
   * Добавление обработчиков
   */
  componentDidMount() {
    document.querySelectorAll('.gridCards__card').forEach((card) => {
      card.querySelector('a').addEventListener('click', this.goToAdvert.bind(this));
    });
    document.querySelectorAll('.gridCards__Mycard').forEach((card) => {
      card.querySelector('a').addEventListener('click', this.goToAdvert.bind(this));
    });
    document.querySelectorAll('.gridCards__edit').forEach((card) => {
      card.addEventListener('click', this.editAdvert.bind(this));
    });
    if (this.state.savedAdverts) {
      document.querySelectorAll('.gridCards__delete').forEach((card) => {
        card.addEventListener('click', this.unlikeAdvert.bind(this));
      });
    } else if (this.state.myAdverts) {
      document.querySelectorAll('.gridCards__delete').forEach((card) => {
        card.addEventListener('click', this.deleteAdvert.bind(this));
      });
      document.querySelectorAll('.gridCards__rating-up').forEach((card) => {
        card.addEventListener('click', this.donate.bind(this));
      });
      this.modal?.componentDidMount();
    }
    if (!this.state.myAdverts && !this.state.savedAdverts) {
      document.querySelector('#clearFilters').addEventListener('click', this.clearFilters.bind(this));
    }
  }

  /**
   * Удаление обработчиков
   */
  componentWillUnmount() {
    document.querySelectorAll('.gridCards__card').forEach((card) => {
      card.querySelector('a')?.removeEventListener('click', this.goToAdvert.bind(this));
    });
    document.querySelectorAll('.gridCards__Mycard').forEach((card) => {
      card.querySelector('a').removeEventListener('click', this.goToAdvert.bind(this));
    });
    document.querySelectorAll('.gridCards__edit').forEach((card) => {
      card.removeEventListener('click', this.editAdvert.bind(this));
    });
    if (this.state.savedAdverts) {
      document.querySelectorAll('.gridCards__delete').forEach((card) => {
        card.removeEventListener('click', this.unlikeAdvert.bind(this));
      });
    } else if (this.state.myAdverts) {
      document.querySelectorAll('.gridCards__delete').forEach((card) => {
        card.removeEventListener('click', this.deleteAdvert.bind(this));
      });
      document.querySelectorAll('.gridCards__rating-up').forEach((card) => {
        card.removeEventListener('click', this.donate.bind(this));
      });
      this.modal.componentWillUnmount();
    }
    if (!this.state.myAdverts && !this.state.savedAdverts) {
      document.querySelector('#clearFilters').removeEventListener('click', this.clearFilters.bind(this));
    }
  }

  /**
   * Обновление состояния
   * @param {Object} event - Событие обновления данных
   */
  componentDidUpdate(event) {
    if (event.name === events.GET_ADVERTS_MAIN) {
      this.unmountAndClean();
      this.state.miniCards = event.data.adverts;
      this.state = { ...this.state, ...event.data.pageInfo };
      this.state.miniCards.forEach((card) => {
        const spacedPrice = parseInt(card.price, 10).toLocaleString('ru-RU');
        if (spacedPrice.length >= card.price.toString().length) {
          card.price = spacedPrice;
        }
      });
      this.renderAndDidMount();
      if (this.state.title !== 'Все объявления') {
        if (document.querySelector('#clearFilters').classList
          .contains('gridCards_hidden')) {
          document.querySelector('#clearFilters').classList.remove('gridCards_hidden');
        }
      }
    }
    if (event.name === events.GET_MY_ADVERTS || event.name === events.GET_SAVED_ADVERTS) {
      this.unmountAndClean();
      this.state.miniCards = event.data;
      this.renderAndDidMount();
    }
  }

  donate(event) {
    event.preventDefault();
    let target;
    if (event.target.tagName === 'SPAN') {
      target = event.target.parentElement;
    } else {
      target = event.target;
    }
    this.donateAdvertId = target.getAttribute('href');
    this.modal.componentDidUpdate(this.donateAdvertId);
    // this.modal.state.donateHref = target.getAttribute('href');
    document.querySelector('#donationModal').classList.toggle('hidden');
  }

  /**
   * Переход на страницу объявления
   * @param {Object} event - Отслеживаемое событие
   */
  goToAdvert(event) {
    event.preventDefault();
    let href = event.target.parentElement.parentElement.getAttribute('href');
    if (href === null) {
      href = event.target.parentElement.getAttribute('href');
    }
    this.redirect(href);
  }

  /**
   * Удаление объявления
   * @param {Object} event - Отслеживаемое событие
   */
  async deleteAdvert(event) {
    event.preventDefault();
    let target;
    if (event.target.tagName === 'SPAN') {
      target = event.target.parentElement;
    } else {
      target = event.target;
    }
    const idAdvert = target.getAttribute('href');
    try {
      await deleteAdvertById(idAdvert);
    } catch (error) {
      console.log(error);
    }
    await myAdvertModel.getMyAdverts();
  }

  /**
   * Переход на страницу редактирования объявления
   * @param {Object} event - Отслеживаемое событие
   */
  editAdvert(event) {
    event.preventDefault();
    let target;
    if (event.target.tagName === 'SPAN') {
      target = event.target.parentElement;
    } else {
      target = event.target;
    }
    const href = target.getAttribute('href');
    this.redirect(href);
  }

  async unlikeAdvert(event) {
    event.preventDefault();
    let target;
    if (event.target.tagName === 'SPAN') {
      target = event.target.parentElement;
    } else {
      target = event.target;
    }
    const idAdvert = target.getAttribute('href');
    try {
      await dislikeAdvert(idAdvert);
    } catch (error) {
      console.log(error);
    }
    await myAdvertModel.getSavedAdverts();
  }

  clearFilters() {
    mainControler.updateMainModelWithParameters({});
  }
}
