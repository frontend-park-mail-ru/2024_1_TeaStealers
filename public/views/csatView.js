import { CsatPage } from '@pages';
import { csatModel, authModel } from '@models';

export class CsatView {
  constructor(tag) {
    this.tag = tag;
    this.parent = 'app';
    authModel.addObserver(this);
    csatModel.addObserver(this);
    this.csatPage = new CsatPage(this.parent, {});
    tag = 'createAdvert';
    csatModel.updateState(tag);
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
