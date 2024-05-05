import {
  BaseComponent,
} from '@components';

import mobilePage from './mobilePage.hbs';

/**
   * Класс главной страницы страницы
   */
export class MobilePage extends BaseComponent {
  constructor(parent) {
    const template = mobilePage;

    super({
      parent, template,
    });
  }
}
