export class Button {
    id;
    text;
    color;
    borderRadius;
    order;
    constructor(props = {}) {
        console.log(props);
        const { id, text, order, color, borderRadius, parentID } = props;
        this.id = id;
        this.text = text;
        this.order = order;
        this.parentID = parentID;
        this.color = color;
    }
    render() {
        console.log(Handlebars);
        const template = Handlebars.templates["button.hbs"];
        // const app = document.querySelector(`#${this.parentID}`);
        const app = document.querySelector("#app");
        const config = {
            text: this.text,
            id: this.id,
            color: this.color,
            selColor: true,
        }
        console.log(this.order);
        if (this.order) {
            config.selOrder = true;
            config.order = this.order;
        }
        console.log(config);
        app.innerHTML = template(config);
        // app.insertAdjacentHTML
    }
}
