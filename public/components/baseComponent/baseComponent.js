class BaseComponent {
    constructor({parent, template, listeners = {}, state = {}, innerComponents = []}) {
        this.parent = parent;
        this.template = template;
        this.listeners = listeners;
        this.state = state;
        this.innerComponents = innerComponents;
    }

    checkState(state) {
        for (let key of Object.keys(this.state)) {
            if (this.state[key] !== state[key]) {
                return false;
            }
        }
        return true;
    }

    renderAndDidMount() {
        this.render();
        this.componentDidMount();
    }

    render() {
        this.parent.insertAdjacentHTML(
            'beforeend',
            template(this.state),
        );
        this.componentLink = this.parent.firstChild;
        this.innerComponents.forEach(component => {
            component.render();
        });

    }

    componentDidMount(){
        this.componentLink.addEventListener()
        // this.innerComponents[0].addEventListener(...);
        this.innerComponents.forEach(component => {
            component.componentDidMount();
        });

    }

    componentDidUpdate(state) {
        if (checkState(state)) { // проверка внутренних элементов
            return;
        }
        this.state = state;
        this.clean();
        this.renderAndDidMount();
    }

    componentWillUnmount() {
        this.componentLink.addEventListener();
        this.innerComponents.forEach(component => {
            component.addEventListener();
        });
    }

    clean() {
        this.innerComponents.forEach(component => component.clean());
        this.parent.innerHTML = '';
    }
}