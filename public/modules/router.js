import { authModel } from '@models';
import { ErrorView, MobileView } from '@views';
/**
 * класс Роутера
 */
class Router {
  routes;

  curView;

  curPath;

  constructor() {
    this.routes = {};
    this.curView = null;
    this.curPath = '';
    this.protectedRoutes = {};
    this.error = false;
  }

  /**
     * Функция регистрации (добавления) роутера
     * @param {string} path - путь до модели View
     * @param {View} view - сама модель View, представляющая собой BaseCompontent
     */
  register(path, view, protect = false) {
    if (protect) {
      this.protectedRoutes[path] = view;
    }
    this.routes[path] = view;
  }

  /**
     * Функция перехода по URL
     * @param {string} path - путь URL
     */
  go(path, isReplace) {
    console.log(this.curView);
    this.error = false;
    if (path === this.curPath) {
      return;
    }
    if (this.protectedRoutes[path] !== undefined && authModel.isAuth !== true) {
      this.error = true;
    }
    const id = path.substring(path.lastIndexOf('/') + 1);
    const pathWithoutId = path.replace(id, '');

    const prevView = this.curView;
    const CurrentView = this.routes[pathWithoutId];
    if (!CurrentView) {
      return;
    }

    if (prevView) {
      prevView.clean();
    }
    if (id) {
      this.curView = new CurrentView(id);
    } else {
      this.curView = new CurrentView();
    }
    if (this.error) {
      this.curPath = 'error';
      this.curView = new ErrorView();
    } else {
      this.curPath = path;
    }

    if (window.innerWidth <= 600 && false) {
      this.curPath = 'mobile';
      this.curView = new MobileView();
    }

    this.curView.render();

    if (isReplace) {
      window.history.replaceState({ path }, '', path);
      return;
    }
    window.history.pushState({ path }, '', path);
  }

  /**
     * Функция запуска роутинга. Изменение происходит при изменении в URL
     */
  start() {
    window.addEventListener('popstate', (event) => {
      event.preventDefault();
      this.go(event.state.path, true);
    });
    this.go(window.location.pathname);
  }

  /**
     * Функция возврата в предыдущее состояние (назад)
     */
  back() {
    window.history.back();
  }

  /**
     * Функция возврата в последующее состояние (вперёд)
     */
  forward() {
    window.history.forward();
  }
}

export const router = new Router();
