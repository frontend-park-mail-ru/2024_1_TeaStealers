import {
  BaseComponent, EditAdvert, GridCard, Menu,
} from '@components';
import myAdvert from './myAdvert.hbs';

const mini = [
  {
    advertId: '123',
    photo: '../../static/fone.jpg',
    price: '123123100',
    flatProperties: {
      floor: 20,
      floorGeneral: 20,
      roomCount: 20,
      squareGeneral: 2000,
    },
    adress: 'dsadasda',
    rating: '1',
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
    rating: '2',
  },
  {
    advertId: '123',
    photo: '../../static/fone.jpg',
    price: '1231231',
    houseProperties: {
      squareArea: 2132342342342342343,
      roomCount: 2,
      adress: 'dsadasda',
    },
    adress: `dsadasda
      dsadsaasdsadasdasdasd`,
    rating: '3',
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
    rating: '4',
  },
];

export class MyAdvertPage extends BaseComponent {
  state;

  constructor(parent, state) {
    const template = myAdvert;
    const menu = new Menu('left-menu', { myAdverts: true });
    const cards = new GridCard('myAdvertContainer', { myAdverts: true, title: 'Мои объявления' });
    const innerComponents = [menu, cards];
    super({
      parent, template, state, innerComponents,
    });
  }
}
