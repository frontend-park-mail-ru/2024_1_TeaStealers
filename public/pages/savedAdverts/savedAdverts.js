import {
  BaseComponent, EditAdvert, GridCard, Menu,
} from '@components';
import savedAdverts from './savedAdverts.hbs';

const mini = [
  {
    advertId: '123',
    photo: '../../static/fone.jpg',
    price: '123123100',
    houseProperties: {
      squareArea: 213,
      roomCount: 2,
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
      squareArea: 213,
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

export class SavedAdvertPage extends BaseComponent {
  state;

  constructor(parent, state) {
    const template = savedAdverts;
    const menu = new Menu('left-menu', { savedAdverts: true });
    const cards = new GridCard('savedAdvertContainer', {
      savedAdverts: true, title: 'Сохраненные объявления',
    });
    const innerComponents = [menu, cards];
    super({
      parent, template, state, innerComponents,
    });
  }
}
