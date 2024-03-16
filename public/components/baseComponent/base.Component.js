class BaseComponent {
    constructor(parent, state, innerComponents) {
        this.parent = parent;
        this.state = state;
        this.innerComponents = innerComponents;
    }

    render() {
        this.parent.insertAdjacentHTML(
            'beforeend',
            main(this.state),
        );
        if (this.innerComponents !== undefined) {
            this.innerComponents.forEach(component => {
                component.render;
            });
        }
    }

    componentDidMount(){

    }

    componentDidUpdate() {

    }

    componentWillUnount() {

    }

    clean() {
        if (this.innerComponents !== undefined) {
            this.innerComponents.forEach(component => {
                component.clean;
            });
        }
        document.querySelector(`#${parrent}`).innerHTML = '';
    }
}