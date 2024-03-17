nav_listeners = {
    butlog: {
        event: sdfs
    },
    AdjBut: {

    },
    click: () => {},
    scroll: () => {},
}

listeners = {
    nav: nav_listeners,

}

class BaseComponent {
    constructor({parent, template, listeners, state = {}, innerComponents = []}) {
        this.parent = parent;
        this.template = template;
        this.listeners = listeners;
        this.state = state;
        this.innerComponents = innerComponents;
    }
    renderAndDidMount() {

    }
    render() {
        this.parent.insertAdjacentHTML(
            'beforeend',
            main(this.state),
        );
        this.componentLink = this.parent.firstChild;
        this.innerComponents.forEach(component => {
            component.render();
        });

    }

    componentDidMount(){
        this.componentLink.a
        this.innerComponents[0].addListener(...);
        this.innerComponents.forEach(component => {
            component.componentDidMount();
        });

    }

    componentDidUpdate(state) {
        if (this.state === state) { // проверка внутренних элементов
            return;
        }
        this.state = state;
        this.clean();
        this.renderAndDidMount();
    }

    componentWillUnmount() {
        //убираем листенеры
    }

    clean() {
        this.innerComponents.forEach(component => component.clean());
        this.parent.innerHTML = '';
    }
}