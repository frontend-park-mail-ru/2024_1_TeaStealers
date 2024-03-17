/**
 * класс Роутера
 */
class Router {
    constructor() {

        this.routes = {};
        this.currentRoute = window.location.pathname;
        
    }

    /**
     * Функция регистрации (добавления) роутера
     * @param {string} path - путь до модели View
     * @param {View} view - сама модель View или BaseCompontent
     */
    register(path, view) {

    }

    /**
     * Функция запуска роутинга. Изменение происходит при изменении в URL
     */
    start() {
        window.addEventListener('popstate', (e) => {
            e.preventDefault();

            this.go(window.location.pathname);
            
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
        // clean у вьюшки у текущей
        // renderAndMount у this.routs[path]
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