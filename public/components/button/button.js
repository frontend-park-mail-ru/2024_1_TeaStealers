export class Button {
    id;
    text;
    color;
    borderRadius;
    order;
    size;
    blockClass
    constructor(props = {}) {
        console.log(props);
        const { id, text, order, color, borderRadius, parentID, size } = props;
        this.id = id;
        this.text = text;
        this.order = order;
        this.parentID = parentID;
        this.color = color;
        this.borderRadius = borderRadius;
        this.size = size;
    }
    render() {
        console.log(Handlebars);
        const template = Handlebars.templates["button.hbs"];
        const app = document.querySelector(`#${this.parentID}`);
        const config = {
            text: this.text,
            id: this.id,
            color: this.color,
            borderRadius: this.borderRadius,
            order: this.order,
            size: this.size,
        }
        // console.log(template(config));
        // app.innerHTML = template(config);
        app.insertAdjacentHTML('beforebegin', template(config));
    }
}
