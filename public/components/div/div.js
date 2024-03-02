export class Div {
    id;
    className;
    parentID;
    constructor(props = {}) {
        const { id, className, parentID } = props;
        this.id = id;
        this.className = className;
        this.parentID = parentID;
    }
    render() {
        const template = Handlebars.templates["div.hbs"];
        const app = document.querySelector(`#${this.parentID}`);
        const config = {
            id: this.id,
            className: this.className,
            parentID: this.parentID,
        }
        console.log(template(config));
        // app.innerHTML = template(config);

        app.insertAdjacentHTML('beforeend',template(config));
    }
}