export class Ul {
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
        const template = Handlebars.templates["ul.hbs"];
        const app = document.querySelector(`#${this.parentID}`);
        const config = {
            id: this.id,
            className: this.className,
            parentID: this.parentID,
        }
        app.innerHTML = template(config);
    }
}