import { ErrorPage } from '@pages';

export class ErrorView {
  constructor() {
    this.parent = 'app';
    this.errorPage = new ErrorPage(this.parent, {});
  }

  /**
   * Функция отображения страницы ошибки
   */
  render() {
    this.errorPage.renderAndDidMount();
  }

  /**
   * Функция удаления страницы ошибки
   */
  clean() {
    this.errorPage.unmountAndClean();
  }
}
