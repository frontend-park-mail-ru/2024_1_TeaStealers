import { MainPage } from '@pages';
import { mainModel } from '@models';

export class MainView {
  constructor() {
    this.parent = 'app';
    mainModel.addObserver(this);
    this.mainPage = new MainPage(this.parent, {});
  }

  /**
   * Обновление страницы объявлений
   * @param {state} adverts
   */
  update(adverts) {
    this.mainPage.componentDidUpdate(adverts);
  }

  /**
   * Функция отображения главной страницы
   */
  render() {
    this.mainPage.renderAndDidMount();
  }

  /**
   * Функция удаления главной страницы
   */
  clean() {
    this.mainPage.unmountAndClean();
  }
}

export const mainView = new MainView();
