import { MainPage } from '@pages';
import { mainModel, authModel } from '@models';

export class MainView {
  constructor() {
    this.parent = 'app';
    mainModel.addObserver(this);
    authModel.addObserver(this);
    this.mainPage = new MainPage(this.parent, { isAuthenticated: authModel.isAuth });
    mainModel.updateWithParameters('');
  }

  /**
   * Обновление страницы объявлений
   * @param {state} adverts
   */
  update(event) {
    this.mainPage.componentDidUpdate(event);
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
