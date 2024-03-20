// import { MainPage } from '@pages';
import { checkAuth, getAdvertList, Router } from '@modules';
import '../scss/index.scss';
import { mainView } from '@views';
import { mainControler } from '@controllers';

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_NOT_FOUND = 404;

// 404 500 400 403

// создаю роутер и регаю роуты, создаю вьюшки и контроллеры, потом старт роутера

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

  if (statusCode === HTTP_STATUS_OK) {
    isAuthenticated = true;
    return;
  }
  isAuthenticated = false;
}

async function getAdverts() {
  const [statusCode, data] = await getAdvertList();
  if (statusCode !== HTTP_STATUS_OK) {
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

const router = new Router();

router.register('/', mainView);
router.start();
let main;

(async () => {
  await Promise.all([checkAuthentication(), getAdverts()]);
  main = new MainPage(document.getElementById('app'), { isAuthenticated, cards: cardsData });

  main.render();
})();
