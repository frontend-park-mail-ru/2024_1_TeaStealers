import { SavedAdvertPage } from '@pages';
import { authModel, myAdvertModel } from '@models';

export class SavedAdvertView {
  constructor() {
    this.parent = 'app';
    myAdvertModel.addObserver(this);
    authModel.addObserver(this);
    this.savedAdverts = new SavedAdvertPage(this.parent, { isAuthenticated: authModel.isAuth });
    myAdvertModel.getSavedAdverts();
  }

  /**
   * Обновление страницы объявлений
   * @param {state} adverts
   */
  update(event) {
    this.savedAdverts.componentDidUpdate(event);
  }

  render() {
    this.savedAdverts.renderAndDidMount();
  }

  clean() {
    this.savedAdverts.unmountAndClean();
  }
}
