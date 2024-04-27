import { BaseComponent } from '@components';
import mobileMenu from './mobileMenu.hbs';

const DEFAULT_MOBILE_MENU = {
  link: [
    {
      href: '/',
      title: '1',
    },
    {
      href: '/',
      title: '2',
    },
    {
      href: '/',
      title: '3',
    },
    {
      href: '/',
      title: '4',
    },
  ],
};

export class MobileMenu extends BaseComponent {
  constructor(parent, state) {
    parent = document.getElementById('navbarBrand');
    const template = mobileMenu;
    state = { ...DEFAULT_MOBILE_MENU, ...state };
    super({ parent, template, state });
  }

  render() {
    this.parent.innerHTML = '';
    console.log(this.parent);
    console.log(mobileMenu);
    this.parent.insertAdjacentHTML(
      'beforeend',
      this.template(this.state),
    );
  }
}
