import { ErrorPage } from '@pages';
import { authModel } from '@models';
import { router } from '@modules';

export class ErrorView {
  constructor() {
    this.parent = 'app';
    authModel.addObserver(this);
    this.errorPage = new ErrorPage(this.parent, {});
  }

  /**
   * Функция отображения страницы ошибки
   */
  render() {
    this.errorPage.renderAndDidMount();
  }

  update(event) {
    if (event.name === 'AUTH') {
      if (event.data !== true) {
        return;
      }
      router.go(window.location.pathname);
    }
  }

  /**
   * Функция удаления страницы ошибки
   */
  clean() {
    this.errorPage.unmountAndClean();
  }
}
