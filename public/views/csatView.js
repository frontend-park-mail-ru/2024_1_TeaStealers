import { CsatPage } from '@pages';
import { csatModel } from '@models';

export class CsatView {
  constructor(tag) {
    this.tag = tag;
    this.parent = 'app';
    csatModel.addObserver(this);
    this.csatPage = new CsatPage(this.parent, {});
    // csatModel. // запрос к бэку
  }

  /**
   * Обновление страницы объявлений
   * @param {state} adverts
   */
  update(event) {
    this.csatPage.componentDidUpdate(event);
  }

  /**
   * Функция отображения главной страницы
   */
  render() {
    this.csatPage.renderAndDidMount();
  }

  /**
   * Функция удаления главной страницы
   */
  clean() {
    this.csatPage.unmountAndClean();
  }
}
