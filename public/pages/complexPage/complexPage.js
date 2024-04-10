import { BaseComponent, Card } from '@components';
import { events } from '@models';
import complexPage from './complexPage.hbs';

/**
 * Класс страницы жилищного комплекса
 */
export class ComplexPage extends BaseComponent {
  /**
     *
     * @param {id} parent - родительский элемент
     * @param {Object} state - актуальное состояние
     */
  constructor(parent, state) {
    const template = complexPage;
    state = { ...state };
    const cardsComponents = [];
    state.cards?.forEach((card) => {
      const cardObject = new Card('cards', card);
      cardsComponents.push(cardObject);
    });
    const innerComponents = [];
    innerComponents.push(...cardsComponents);
    super({
      parent, template, state, innerComponents,
    });
    [...this.cards] = this.innerComponents;
  }

  componentDidUpdate(event) {
    if (event.name === events.GET_COMPLEX_BY_ID) {
      this.unmountAndClean();
      console.log(event.data);
      this.state = { ...event.data };
      const dateBegin = new Date(this.state.dateBeginBuild);
      const dateEnd = new Date(this.state.dateEndBuild);
      const dateBeginString = dateBegin.toLocaleString('ru-RU', { month: 'long', year: 'numeric' });
      const dateEndString = dateEnd.toLocaleString('ru-RU', { month: 'long', year: 'numeric' });
      this.state.dateBeginBuild = dateBeginString;
      this.state.dateEndBuild = dateEndString;
      this.renderAndDidMount();
      console.log(this.state);
    }
    if (event.name === events.GET_COMPLEX_ADVERTS_BY_ID) {
      this.innerComponents.forEach((component) => {
        component.unmountAndClean();
      });
      this.state.cards = [...event.data];
      const cardsComponents = [];
      this.state.cards.forEach((card) => {
        const cardObject = new Card('cards', card);
        cardsComponents.push(cardObject);
      });
      this.innerComponents = [];
      this.innerComponents.push(...cardsComponents);
      this.innerComponents.forEach((component) => {
        component.renderAndDidMount();
      });
    }
  }
}
