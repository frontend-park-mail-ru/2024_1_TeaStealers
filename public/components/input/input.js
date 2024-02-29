export class Input {
    id;
    type;
    placeholder;
    borderRadius;
    size;
    blockClass;
    constructor(props = {}) {
        console.log(props);
        const { id, type, placeholder, borderRadius, parentID, size, blockClass } = props;
        this.id = id;
        this.type = type;
        this.placeholder = placeholder;
        this.borderRadius = borderRadius;
        this.size = size;
        this.blockClass = blockClass;
        this.parentID = parentID;
    }
    render() {
        console.log(Handlebars);
        const template = Handlebars.templates["input.hbs"];
        const app = document.querySelector(`#${this.parentID}`);
        const config = {
            type: this.type,
            id: this.id,
            placeholder: this.placeholder,
            blockClass: this.blockClass,
            borderRadius: this.borderRadius,
            size: this.size,
        }
        app.innerHTML = template(config);
        // app.insertAdjacentHTML
    }
}
