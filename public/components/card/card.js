import { Button } from "../button/button.js";
import { Input } from "../input/input.js";
import { Svg } from "../svg/svg.js";
import { Img } from "../img/img.js"
import { Div } from "../div/div.js";
import { A } from "../a/a.js"
export class Card {
    id;
    className;
    parentID;
    constructor(props = {}) {
        const { id, className, parentID} = props;
        this.id = id;
        this.className = className;
        this.parentID = parentID;
    }
    render() {

        const template = Handlebars.templates["card.hbs"];
        const app = document.querySelector(`#${this.parentID}`);
        const config = {
            id: this.id,
            className: this.className,
        }
        // app.innerHTML = template(config);
        app.insertAdjacentHTML('beforebegin', template(config));

        const cardPicure = new Img ({
            id: 'cardPicture',
            className: 'card__picture',
            alt: 'Квартира мечты',
            src: '../../static/images/room.jpeg',
            parentID: 'card',
        })
        console.log(cardPicure);
        cardPicure.render();
        const cardInfo = new Div ({
            id: 'cardInfo',
            className: 'card__info',
            parentID: this.id,
        })
        cardInfo.render();
        // card__header-and-save
        const cardHeaderAndSave = new Div ({
            id: 'cardHeaderAndSave',
            className: 'card__header-and-save',
            parentID: 'cardInfo',
        })
        cardHeaderAndSave.render();

        const cardHeader = new Div ({
            id: 'cardHeader',
            className: 'card__header',
            parentID: 'cardHeaderAndSave'
        })
        cardHeader.render();

        const cardHeaderLink = new A ({
            id: 'cardHeaderLink',
            className: 'card__header-link',
            text: '2-комн. квартира, 88,5 м<sup>2</sup>',
            parentID: 'cardHeader',
        })
        cardHeaderLink.render();
    }
}