import { MobilePage } from '@pages';

export class MobileView {
  constructor() {
    this.parent = 'app';
    this.mobilePage = new MobilePage(this.parent);
  }

  /**
   * Функция отображения главной страницы
   */
  render() {
    this.mobilePage.renderAndDidMount();
  }

  /**
   * Функция удаления главной страницы
   */
  clean() {
    this.mobilePage.unmountAndClean();
  }
}
