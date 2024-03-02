import { Button } from "../button/button.js";
import { Input } from "../input/input.js";
import { Svg } from "../svg/svg.js";
import { Span } from "../span/span.js";
import { Img } from "../img/img.js"
import { Div } from "../div/div.js";
import { A } from "../a/a.js"
import { Sup } from "../sup/sup.js"
export class Card {
    id;
    className;
    parentID;
    fullPrice;
    pricePerMetr;
    descText;
    constructor(props = {}) {
        const { id, className, parentID, fullPrice, pricePerMetr, descText} = props;
        this.id = id;
        this.className = className;
        this.parentID = parentID;
        this.fullPrice = fullPrice;
        this.pricePerMetr = pricePerMetr;
        this.descText = descText;
    }
    render() {

        const template = Handlebars.templates["card.hbs"];
        const app = document.querySelector(`#${this.parentID}`);
        const config = {
            id: this.id,
            className: this.className,
        }
        app.insertAdjacentHTML('beforeend', template(config));

        const cardPicure = new Img ({
            id: 'cardPicture',
            className: 'card__picture',
            alt: 'Квартира мечты',
            src: '../../static/images/room.jpeg',
            parentID: this.id,
        })
        console.log(cardPicure);
        cardPicure.render();
        const cardInfo = new Div ({
            id: 'cardInfo',
            className: 'card__info',
            parentID: this.id,
        })
        cardInfo.render();
       
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
            text: '2-комн. квартира, 88,5 м',
            parentID: 'cardHeader',
        })
        cardHeaderLink.render();

        const squareSup = new Sup ({
            id: 'pow',
            text: 2,
            parentID: 'cardHeaderLink',
        })
        squareSup.render();

        const cardHeaderDescription = new Span ({
            id: 'cardHeaderDescription',
            className: 'card__header-description',
            text: 'Сдача корпуса 4 кв. 2024',
            parentID: 'cardHeader',
        })
        cardHeaderDescription.render();

        const likeItem = new Svg ({
            id: 'like',
            parentID: 'cardHeaderAndSave',
        })
        likeItem.render();

        const cardAdress = new Div ({
            id: 'cardAdress',
            className: 'card__adress',
            parentID: 'cardInfo',
        })
        cardAdress.render();

        // button ??

        const cardPrice = new Div ({
            id: 'cardPrice',
            className: 'card__price',
            parentID: 'cardInfo',
        })
        cardPrice.render();

        const fullPrice = new Span ({
            id: 'fullPrice',
            className: 'card__fullprice',
            text: this.fullPrice,
            parentID: 'cardPrice',
        })
        fullPrice.render();

        const pricePerMetr = new Span ({
            id: 'pricePerMetr',
            className: 'card__price-per-metr',
            text: this.pricePerMetr,
            parentID: 'cardPrice',
        })
        pricePerMetr.render();

        const ruble = new Span ({
            id: 'ruble',
            className: 'ruble',
            parentID: 'pricePerMetr',
        })
        ruble.render();

        const perMetre = new Span ({
            id: 'perMetr',
            text: '/м',
            parentID: 'pricePerMetr',
        })
        perMetre.render();

        const squareSup2 = new Sup ({
            id: 'pow',
            text: 2,
            parentID: 'pricePerMetr',
        })
        squareSup2.render();

        const cardDescriotion = new Div ({
            id: 'cardDescriotion',
            className: 'card__description',
            tetx: this.descText,
            parentID: 'cardInfo',
        })
        cardPrice.render();
    }
}