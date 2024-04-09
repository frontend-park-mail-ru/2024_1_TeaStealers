import { Navbar } from '@components';
import { authModel } from '@models';

export class NavbarView {
  constructor() {
    this.parent = 'main-navbar';
    authModel.addObserver(this);
    this.navbar = new Navbar(this.parent, {
      isAuthenticated: authModel.isAuth,
      id: 'navbar',
      notice: '+ Разместить объявление',
    });
  }

  /**
   * Обновление страницы объявлений
   * @param {state} adverts
   */
  update(event) {
    this.navbar.componentDidUpdate(event);
  }

  render() {
    this.navbar.renderAndDidMount();
  }

  clean() {
    this.navbar.unmountAndClean();
  }
}
