export class Sup {
    id;
    className;
    text
    parentID;
    constructor(props = {}) {
        const { id, className, text, parentID } = props;
        this.id = id;
        this.className = className;
        this.text = text;
        this.parentID = parentID;
    }
    render() {
        const template = Handlebars.templates["sup.hbs"];
        const app = document.querySelector(`#${this.parentID}`);
        const config = {
            id: this.id,
            className: this.className,
            text: this.text,
            parentID: this.parentID,
        }
        app.insertAdjacentHTML('beforeend', template(config));
    }
}