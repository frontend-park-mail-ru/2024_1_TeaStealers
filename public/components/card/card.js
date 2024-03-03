export class Card {
    id;
    parentID;
    imgSrc;
    cardLink;
    shortDesc;
    releaseDate;
    likeSrc;
    adress;
    fullprice;
    pricePerMetr;
    description;
    constructor(props = {}) {
        const { id, parentID, imgSrc, cardLink, shortDesc, releaseDate, likeSrc, adress, fullprice, pricePerMetr, description } = props;
        this.id = id;
        this.parentID = parentID;
        this.imgSrc = imgSrc;
        this.cardLink = cardLink;
        this.shortDesc = shortDesc
        this.releaseDate = releaseDate;
        this.likeSrc = likeSrc;
        this.adress = adress;
        this.fullprice = fullprice;
        this.pricePerMetr = pricePerMetr;
        this.description = description;
    }
    render() {

        const template = Handlebars.templates["card.hbs"];
        const page = document.querySelector(`#${this.parentID}`);
        const config = {
            id: this.id,
            parentID: this.parentID,
            imgSrc: this.imgSrc,
            cardLink: this.cardLink,
            shortDesc: this.shortDesc,
            releaseDate: this.releaseDate,
            likeSrc: this.likeSrc,
            adress: this.adress,
            fullprice: this.fullprice,
            pricePerMetr: this.pricePerMetr,
            description: this.description,
        }
        page.insertAdjacentHTML('beforeend', template(config));
    }
}