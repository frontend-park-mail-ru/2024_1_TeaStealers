export class Div {
    id;
    className;
    text;
    parentID;
    constructor(props = {}) {
        const { id, className, text, parentID } = props;
        this.id = id;
        this.className = className;
        this.text = text;
        this.parentID = parentID;
    }
    render() {
        const template = Handlebars.templates["div.hbs"];
        const app = document.querySelector(`#${this.parentID}`);
        console.log(app);
        const config = {
            id: this.id,
            className: this.className,
            text: this.text,
            parentID: this.parentID,
        }
        console.log(template(config));
        // app.innerHTML = template(config);

        app.insertAdjacentHTML('beforeend',template(config));
    }
}