export class BaseComponent {
    constructor({parent, template, listeners = {}, state = {}, innerComponents = []}) {
        this.parent = parent;
        this.template = template;
        this.listeners = listeners;
        this.state = state;
        this.innerComponents = innerComponents;
    }

    /**
     * Проверяет равенство объектов состояния
     * @param {State} state - состояние, в которое необходимо привести элемент
     * @returns 
     */
    checkState(state) {
        for (let key of Object.keys(this.state)) {
            if (this.state[key] !== state[key]) {
                return false;
            }
        }
        return true;
    }
    
    /**
     * Получение элемента
     */
    get self() {
        return document.getElementById(this.state.id);
    }

    /**
     * Производить отрисовку элемента и добавление листенеров
     */
    renderAndDidMount() {
        this.render();
        this.componentDidMount();
    }

    /**
     * Производит рендер элемента
     */
    render() {
        document.getElementById(this.parent).insertAdjacentHTML(
            'beforeend',
            this.template(this.state),
        );
        this.componentLink = this.parent.firstChild;
        this.innerComponents.forEach(component => {
            component.render();
        });
    }

    /**
     * Добавление листенеров
     */
    componentDidMount(){
        // this.componentLink.addEventListener();
        this.innerComponents.forEach(component => {
            component.componentDidMount();
        });

    }

    /**
     * Изменение состояния элемента
     * @param {State} state - состояние, в которое надо привести элемент
     * @returns 
     */
    componentDidUpdate(state) {
        if (checkState(state)) { // проверка внутренних элементов
            return;
        }
        this.state = state;
        this.unmountAndClean();
        this.renderAndDidMount();
    }

    /**
     * Вызов функций удаление обработчиков и элементов
     */
    unmountAndClean() {
        this.componentWillUnmount();
        this.clean();
    }

    /**
     * Удаление листенеров
     */
    componentWillUnmount() {
        this.componentLink.removeEventListener();
        this.innerComponents.forEach(component => component.componentWillUnmount());
    }

    /**
     * Удаление элемента
     */
    clean() {
        this.innerComponents.forEach(component => component.clean());
        this.parent.innerHTML = '';
    }
}