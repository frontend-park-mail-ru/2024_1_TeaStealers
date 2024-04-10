import {
  BaseComponent, Menu, EditAdvert,
} from '@components';
import newAdvert from './newAdvert.hbs';

export class NewAdvert extends BaseComponent {
  state;

  constructor(parent, state) {
    const template = newAdvert;
    const menu = new Menu('left-menu', { newAdvert: true });
    const editAdvert = new EditAdvert('body-page', { title: 'Новое объявление' });
    const innerComponents = [menu, editAdvert];
    super({
      parent, template, state, innerComponents,
    });
  }
}
