export class Svg {
    id;
    svgHtml;
    parentID;
    constructor(props = {}) {
        const { id, svgHtml, parentID } = props;
        this.id = id;
        this.svgHtml = svgHtml;
        this.parentID = parentID;
    }
    render() {
        const template = Handlebars.templates["svg.hbs"];
        const app = document.querySelector(`#${this.parentID}`);
        const config = {
            id: this.id,
            svgHtml: this.svgHtml,
            parentID: this.parentID,
        }
        app.innerHTML = template(config);
    }
}