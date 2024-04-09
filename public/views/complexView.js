import { ComplexPage } from '@pages';
import { complexModel } from '@models';

export class ComplexView {
  constructor(id) {
    this.advertId = id;
    this.parent = 'app';
    complexModel.addObserver(this);
    this.advertPage = new ComplexPage(this.parent, {});
    complexModel.updateState(this.advertId);
  }

  /**
   * Обновление страницы объявлений
   * @param {state} adverts
   */
  update(event) {
    this.advertPage.componentDidUpdate(event);
  }

  /**
   * Функция отображения главной страницы
   */
  render() {
    this.advertPage.renderAndDidMount();
  }

  /**
   * Функция удаления главной страницы
   */
  clean() {
    this.advertPage.unmountAndClean();
  }
}
