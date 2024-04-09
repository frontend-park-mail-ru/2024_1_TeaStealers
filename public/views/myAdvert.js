import { MyAdvertPage } from '@pages';
import { authModel, myAdvertModel } from '@models';

export class MyAdvertView {
  constructor() {
    this.parent = 'app';
    myAdvertModel.addObserver(this);
    authModel.addObserver(this);
    this.myAdvertPage = new MyAdvertPage(this.parent, { isAuthenticated: authModel.isAuth });
    myAdvertModel.getMyAdverts();
  }

  /**
   * Обновление страницы объявлений
   * @param {state} adverts
   */
  update(event) {
    this.myAdvertPage.componentDidUpdate(event);
  }

  render() {
    this.myAdvertPage.renderAndDidMount();
  }

  clean() {
    this.myAdvertPage.unmountAndClean();
  }
}
