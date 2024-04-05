/**
 * класс Роутера
 */
export class Router {
  routes;

  constructor() {
    this.routes = {};
  }

  /**
     * Функция регистрации (добавления) роутера
     * @param {string} path - путь до модели View
     * @param {View} view - сама модель View, представляющая собой BaseCompontent
     */
  register(path, view) {
    this.routes[path] = view;
  }

  /**
     * Функция запуска роутинга. Изменение происходит при изменении в URL
     */
  start() {
    window.addEventListener('popstate', (e) => {
      e.preventDefault();

      this.go(window.location.pathname);
    });
    this.go(window.location.pathname);
  }

  /**
     * Функция перехода по URL
     * @param {string} path - путь URL
     */
  go(path) {
    let currentView = this.routes[window.location.pathname];
    if (path !== window.location.pathname) {
      window.history.pushState(this.state, '', path);
    }
    if (this.currentView) {
      this.currentView.clean();
    }
    currentView = this.routes[path];
    if (currentView) {
      currentView.render();
    }
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
