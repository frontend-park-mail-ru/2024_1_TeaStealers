import { AdvertPage } from '@pages';
import { advertModel } from '@models';

export class AdvertView {
  constructor(id) {
    this.advertId = id;
    this.parent = 'app';
    advertModel.addObserver(this);
    this.advertPage = new AdvertPage(this.parent, {});
    advertModel.getInfoAdvert(this.advertId);
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
