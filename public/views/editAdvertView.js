import { EditAdvertPage } from '@pages';
import { editAdvertModel, authModel } from '@models';

export class EditAdvertView {
  constructor(advertId) {
    this.parent = 'app';
    editAdvertModel.addObserver(this);
    this.editAdvertPage = new EditAdvertPage(this.parent, { isAuthenticated: authModel.isAuth });
    editAdvertModel.updateState(advertId);
  }

  /**
   * Обновление страницы объявлений
   * @param {state} adverts
   */
  update(event) {
    this.editAdvertPage.componentDidUpdate(event);
  }

  render() {
    this.editAdvertPage.renderAndDidMount();
  }

  clean() {
    this.editAdvertPage.unmountAndClean();
  }
}
