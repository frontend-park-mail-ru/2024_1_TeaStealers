import { Button } from "./components/button/button.js";
const button = new Button({
    text: "124",
    id: "butt",
    order: 'secondary',
    size: 'md',
    borderRadius: 'md',
    color: "yellow",
    parentID: 'app',
});
button.render();