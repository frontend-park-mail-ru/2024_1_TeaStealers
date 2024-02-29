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
// button.render();
import { Input } from "./components/input/input.js";
const input = new Input({
    type: "text",
    id: "inp",
    size: 'md',
    borderRadius: 'md',
    parentID: 'app',
    blockClass: 'search__input',
    placeholder: 'Город, адрес, метро, район',
});
input.render();