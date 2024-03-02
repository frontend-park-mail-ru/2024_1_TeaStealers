export class Img {
    id;
    className;
    alt;
    src;
    parentID;
    constructor(props = {}) {
        const { id, className, alt, src, parentID } = props;
        this.id = id;
        this.className = className;
        this.alt = alt;
        this.src = src;
        this.parentID = parentID;
    }
    render() {
        const template = Handlebars.templates["img.hbs"];
        const app = document.querySelector(`#${this.parentID}`);
        const config = {
            id: this.id,
            className: this.className,
            alt: this.alt,
            src: this.src,
            parentID: this.parentID,
        }
        console.log(template(config));
        // app.innerHTML = template(config);
        app.insertAdjacentHTML('beforeend',template(config));
    }
}