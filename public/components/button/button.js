export class Button {
    id;
    text;
    color;
    borderRadius;
    variant;
    constructor(props = {}) {
        console.log(props);
        const { id, text, variant, color, borderRadius, parentID } = props;
        this.id = id;
        this.text = text;
        this.variant = variant;
        this.parentID = parentID;
        console.log(variant);
    }
    render() {
        console.log(Handlebars);
        const template = Handlebars.templates["button.hbs"];
        const app = document.querySelector(`#${this.parentID}`);
        const config = {
            text: this.text,
            id: this.id,
        }
        console.log(this.variant);
        if (this.variant && this.variant === 'primary') {
            config.primary = true;
        }
        console.log(config);
        app.innerHTML = template(config);
        // app.insertAdjacentHTML
    }
}
