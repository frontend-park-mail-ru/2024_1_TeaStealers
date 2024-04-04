import { AdvertPage } from '@pages';
import { advertModel } from '@models';

export class AdvertView {
  constructor() {
    this.parent = 'app';
    advertModel.addObserver(this);
    this.advertPage = new AdvertPage(this.parent, {});
  }

  /**
   * Обновление страницы объявлений
   * @param {state} adverts
   */
  update(adverts) {
    this.advertPage.componentDidUpdate(adverts);
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

export const advertView = new AdvertView();
