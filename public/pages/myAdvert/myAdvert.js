import {
  BaseComponent, EditAdvert, GridCard, Menu,
} from '@components';
import myAdvert from './myAdvert.hbs';

const mini = [
  {
    advertId: '123',
    photo: '../../static/fone.jpg',
    price: '1231231',
    houseProperties: {
      squareArea: 213,
      roomCount: 2,
    },
    adress: 'dsadasda',
  },
  {
    advertId: '123',
    photo: '../../static/fone.jpg',
    price: '1231231',
    houseProperties: {
      squareArea: 213,
      roomCount: 2,
      adress: 'dsadasda',
    },
    adress: 'dsadasda',
  },
  {
    advertId: '123',
    photo: '../../static/fone.jpg',
    price: '1231231',
    houseProperties: {
      squareArea: 213,
      roomCount: 2,
      adress: 'dsadasda',
    },
    adress: `dsadasda
    dsadsaasdsadasdasdasd`,
  },
  {
    advertId: '123',
    photo: '../../static/fone.jpg',
    price: '1231231',
    houseProperties: {
      squareArea: 213,
      roomCount: 2,
      adress: 'dsadasda',
    },
    adress: 'dsadasda',
  },
];

export class MyAdvertPage extends BaseComponent {
  state;

  constructor(parent, state) {
    const template = myAdvert;
    const menu = new Menu('left-menu', { myAdverts: true });
    const cards = new GridCard('myAdvertContainer', { myAdverts: true, title: 'Мои объявления', miniCards: mini });
    const innerComponents = [menu, cards];
    super({
      parent, template, state, innerComponents,
    });
  }
}
