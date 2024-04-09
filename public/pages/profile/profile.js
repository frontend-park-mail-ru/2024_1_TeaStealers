import {
  BaseComponent, Menu, ProfileForm,
} from '@components';
import profile from './profile.hbs';

export class ProfilePage extends BaseComponent {
  state;

  constructor(parent, state) {
    const template = profile;
    const menu = new Menu('left-menu', { profile: true });
    const profileForm = new ProfileForm('body-page', { name: 'rita' });
    const innerComponents = [menu, profileForm];
    super({
      parent, template, state, innerComponents,
    });
  }
}
