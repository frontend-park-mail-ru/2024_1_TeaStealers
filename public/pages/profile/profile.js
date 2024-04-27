import {
  BaseComponent, Menu, ProfileForm, MobileMenu,
} from '@components';
import profile from './profile.hbs';

export class ProfilePage extends BaseComponent {
  state;

  constructor(parent, state) {
    const template = profile;
    let menu;
    if (window.innerWidth <= 600) {
      menu = new MobileMenu('navbarMenu', {});
    } else {
      menu = new Menu('left-menu', { profile: true });
    }
    const profileForm = new ProfileForm('body-page', {});
    const innerComponents = [menu, profileForm];
    super({
      parent, template, state, innerComponents,
    });
  }
}
