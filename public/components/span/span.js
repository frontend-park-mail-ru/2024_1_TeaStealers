export class Span {
    className;
    id;
    text;
    constructor(props = {}) {
        console.log(props);
        const { className, id, text, parentID } = props;
        this.className = className;
        this.id = id;
        this.parentID = parentID;
    }
    render() {
        console.log(Handlebars);
        const template = Handlebars.templates["span.hbs"];
        const app = document.querySelector(`#${this.parentID}`);
        const config = {
            className: this.className,
            id: this.id,
            text: this.text,
        }
        app.innerHTML = template(config);
    }
}