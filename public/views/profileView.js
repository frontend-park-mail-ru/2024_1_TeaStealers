import { ProfilePage } from '@pages';
import { profileModel, authModel } from '@models';

export class ProfileView {
  constructor() {
    this.parent = 'app';
    profileModel.addObserver(this);
    authModel.addObserver(this);
    this.profilePage = new ProfilePage(this.parent, { isAuthenticated: authModel.isAuth });
    profileModel.getMeInfo();
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
