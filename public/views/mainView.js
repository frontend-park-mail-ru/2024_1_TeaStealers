import { MainPage } from '@pages';
import { mainModel } from '@models';

export class MainView {
  // BaseComponent
  // ... 
  constructor() {
    this.parent = 'app';
    mainModel.addObserver(this);
    this.mainPage = new MainPage(parent, {});
  }

  /**
   * Обновление страницы объявлений
   * @param {state} adverts 
   */
  update(adverts) {
    this.mainPage.componentDidUpdate(adverts);
  }

  render() {
    this.mainPage.renderAndDidMount();
  }

  clean() {
    this.mainPage.unmountAndClean();
  }
}

export const mainView = new MainView();
//eventBus отслеживает у model, усть изменения - перерендер
/**
 * Класс главной страницы страницы
 */
