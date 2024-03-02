export class A {
    id;
    className;
    href;
    text;
    parentID;
    constructor(props = {}) {
        const { id, className, href, text, parentID } = props;
        this.id = id;
        this.className = className;
        this.href = href;
        this.text = text;
        this.parentID = parentID;
    }
    render() {
        const template = Handlebars.templates["a.hbs"];
        const app = document.querySelector(`#${this.parentID}`);
        const config = {
            id: this.id,
            className: this.className,
            href: this.href,
            text: this.text,
            parentID: this.parentID,
        }
        // app.innerHTML = template(config);
        app.insertAdjacentHTML('beforebegin', template(config));

    }
}