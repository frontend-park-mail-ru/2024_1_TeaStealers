import { Card } from './components/card/card.js';
import { Navbar } from './components/navbar/navbar.js';
import { Search } from './components/search/search.js';

const navbar = new Navbar(document.querySelector('#app'), {
  id: 'navbar',
  notice: '+ Разместить объявление',
  login: 'Войти',
});
navbar.render();

const search = new Search(document.querySelector('#app'), {
  id: 'search',
  title: 'Найди мечту',
  firstFilterLinkStatus: 'active',
  secondFilterLinkStatus: 'passive',
  firstFilterLinkDesc: 'Купить',
  secondFilterLinkDesc: 'Снять',
  homeType: 'Квартиру в новостройке или вторичке',
  roomNumber: 'Комнат',
  price: 'Цена',
});
search.render();

const card = new Card(document.querySelector('#app'), {
  imgSrc: './static/images/room.jpeg',
  cardLink: '',
  shortDesc: '2-ух комнатная квартира 80',
  releaseDate: '2 квартал 2024',
  likeSrc: './static/images/save.svg',
  adress: 'Москва, ЦАО, р-н Тверской, м. Площадь Революции, Ильинка 3/8 ЖК',
  fullprice: '190 000 000',
  pricePerMetr: '2 000 000',
  description: `Светлая квартира площадью 85 кв. м с окнами на южной стороне. 
    Продуманная планировка позволяет разместить одну или две отдельные спальные комнаты."Лаврушинский" 
    - бескомпромиссный дом с лучшими видами на Кремль. Благодаря расположению всего в одном километре от 
    Кремля, своей высоте и малоэтажной окружающей застройке, из квартир открываются поразительные прямые 
    виды на главные достопримечательности центра Москвы, включая храм Христа Спасителя и собор Василия 
    Блаженного. Расположение в глубине квартала, посередине парка, дает удивительное для центра ощущение 
    тишины и простора. На закрытой территории находится самый ...`,
});
card.render();
