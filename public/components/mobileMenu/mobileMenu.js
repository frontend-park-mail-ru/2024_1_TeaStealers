import { BaseComponent } from '@components';
import { authModel, globalVariables } from '@models';
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
    const template = mobileMenu;
    state = { ...DEFAULT_MOBILE_MENU, ...state };
    super({ parent, template, state });
  }

  render() {
    document.getElementById(this.parent).insertAdjacentHTML(
      'afterbegin',
      this.template(this.state),
    );
  }

  componentDidMount() {
    document.querySelector('#closeMenu').addEventListener('click', this.closeModal.bind(this));
    document.querySelector('.mobile-menu').addEventListener('click', this.openModal.bind(this));
    this.addClickListener('menu_logout', this.logout.bind(this));
    this.addClickListener('menu_profile', this.toProfile.bind(this));
    this.addClickListener('menu_new-advert', this.toNewAdvert.bind(this));
    this.addClickListener('menu_my-advert', this.toMyAdvert.bind(this));
    super.componentDidMount();
  }

  /**
   * Удаление обработчиков
   */
  componentWillUnmount() {
    this.removeClickListener('menu_logout', this.logout.bind(this));
    this.removeClickListener('menu_profile', this.toProfile.bind(this));
    this.removeClickListener('menu_new-advert', this.toNewAdvert.bind(this));
    this.removeClickListener('menu_my-advert', this.toMyAdvert.bind(this));
    super.componentWillUnmount();
  }

  /**
   * Выход из аккаунта
   */
  async logout() {
    const [codeStatus, ,] = await logout();
    if (codeStatus === globalVariables.HTTP_STATUS_OK) {
      this.redirect('/');
      authModel.setNotAutn();
    }
  }

  /**
   * Перейти на страницу профиля
   */
  toProfile() {
    this.redirect('/profile/');
    this.closeModal();
  }

  /**
   * Перейти к моим объявлениям
   */
  toMyAdvert() {
    this.redirect('/my-advert/');
    this.closeModal();
  }

  /**
   * Перейти к созданию нового объявления
   */
  toNewAdvert() {
    this.redirect('/new-advert/');
    this.closeModal();
  }

  closeModal() {
    document.querySelector('.mobile-menu__modal').style.display = 'none';
  }

  openModal() {
    document.querySelector('.mobile-menu__modal').style.display = 'flex';
  }
}
