import { BaseComponent, Footer } from '@components';
import { router } from '@modules';
import errorPage from './errorPage.hbs';

export class ErrorPage extends BaseComponent {
  /**
    * Создает новый экземпляр страницы ошибки
    * @param {Id} parent - Родительский элемент (Id)
    * @param {Object} [state] - Начальное состояние страницы ошибки
    */
  constructor(parent, state) {
    const template = errorPage;
    state = { ...state };

    super({
      parent, template, state,
    });
  }

  componentDidMount() {
    document.querySelector('#goback').addEventListener('click', this.goBack.bind(this));
  }

  goBack() {
    router.back();
  }

  componentWillUnmount() {
    document.querySelector('#goback').removeEventListener('click', this.goBack.bind(this));
  }
}
