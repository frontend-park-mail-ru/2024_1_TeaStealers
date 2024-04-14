import { BaseComponent } from '@components';
import { logout, router } from '@modules';
import { authModel, globalVariables } from '@models';
import menu from './menu.hbs';

const DEFAULT_MENU = {
  avatar: '',
  name: '',
  profile: false,
  newAdvert: false,
  myAdverts: false,
};

export class Menu extends BaseComponent {
  constructor(parent, state) {
    const template = menu;
    state = { ...DEFAULT_MENU, ...state };
    super({ parent, template, state });
  }

  /**
   * Добавление обработчиков
   */
  componentDidMount() {
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
  }

  /**
   * Перейти к моим объявлениям
   */
  toMyAdvert() {
    this.redirect('/my-advert/');
  }

  /**
   * Перейти к созданию нового объявления
   */
  toNewAdvert() {
    this.redirect('/new-advert/');
  }
}
