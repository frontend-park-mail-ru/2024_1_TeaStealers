import MainPage from './pages/main/main.js';
import { checkAuth, getAdvertList } from './modules/api.js';

let isAuthenticated = false;
let cardsData = [{
  imgSrc: '',
  shortDesc: '',
  likeSrc: '',
  adress: '',
  fullprise: '',
  description: '',
}];

async function checkAuthentication() {
  const [statusCode, data] = await checkAuth();

  if (statusCode === 200) {
    console.log(data);
    isAuthenticated = true;
    return;
  }
  isAuthenticated = false;
}

async function getAdverts() {
  const [statusCode, data] = await getAdvertList();
  if (statusCode !== 200) {
    return;
  }
  cardsData = data.map((ad, index) => ({
    imgSrc: `/static/room${index + 1}.jpg`,
    shortDesc: ad.description,
    likeSrc: '/static/save.svg',
    adress: ad.location,
    fullprice: ad.price,
  }));
}

Promise.all([checkAuthentication(), getAdverts()])
  .then(() => {
    const main = new MainPage(document.getElementById('app'), { isAuthenticated, cards: cardsData });
    main.render();
  });
