import {
  BaseComponent, EditAdvert, GridCard, Menu,
} from '@components';
import editAdvert from './editAdvert.hbs';

export class EditAdvertPage extends BaseComponent {
  state;

  constructor(parent, state) {
    const template = editAdvert;
    const menu = new Menu('left-menu', { myAdverts: true });
    const editAdvertPlace = new EditAdvert('body-page', { title: 'Изменение объявленя', editAdvert: true });
    const innerComponents = [menu, editAdvertPlace];
    super({
      parent, template, state, innerComponents,
    });
  }
}
