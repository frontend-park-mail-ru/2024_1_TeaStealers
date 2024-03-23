/**
 * класс Роутера
 */
export class Router {
    currentView;
    constructor() {

        this.routes = {};
        this.currentRoute = window.location.pathname;
        
    }

    /**
     * Функция регистрации (добавления) роутера
     * @param {string} path - путь до модели View
     * @param {View} view - сама модель View, представляющая собой BaseCompontent
     */
    register(path, view) {
        this.currentView = view;
        this.routes[path] = view;
    }

    /**
     * Функция запуска роутинга. Изменение происходит при изменении в URL
     */
    start() {
        window.addEventListener('popstate', (e) => {
            e.preventDefault();

            this.go(window.location.pathname);
            //рендер
        });
    }

    /**
     * Функция перехода по URL
     * @param {string} path - путь URL
     */
    go (path) {
        if (path !== window.location.pathname) {
            window.history.pushState(this.state, '', path);
        }
        this.currentView?.unmountAndClean();
        this.currentView = this.routes[path];
        this.currentView.renderAndDidMount();
    }

    /**
     * Функция возврата в предыдущее состояние (назад)
     */
    back() {
        go(window.history.back())
    }

    /**
     * Функция возврата в последующее состояние (вперёд)
     */
    forward() {
        window.history.forward()
    }
}