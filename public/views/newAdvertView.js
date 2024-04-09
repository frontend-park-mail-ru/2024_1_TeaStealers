import { NewAdvert } from '@pages';
import { newAdvertModel, authModel } from '@models';

export class NewAdvertView {
  constructor() {
    this.parent = 'app';
    newAdvertModel.addObserver(this);
    this.profilePage = new NewAdvert(this.parent, { isAuthenticated: authModel.isAuth });
  }

  /**
   * Обновление страницы объявлений
   * @param {state} adverts
   */
  update(event) {
    this.profilePage.componentDidUpdate(event);
  }

  render() {
    this.profilePage.renderAndDidMount();
  }

  clean() {
    this.profilePage.unmountAndClean();
  }
}

// export const profileView = new ProfileView();
// eventBus отслеживает у model, усть изменения - перерендер
/**
 * Класс главной страницы страницы
 */
