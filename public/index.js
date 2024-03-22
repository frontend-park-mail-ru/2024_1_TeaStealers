import { MainPage } from '@pages';
import { checkAuth, getAdvertList } from '@modules';
import './index.scss'

let isAuthenticated = false;
let skeleton = true;
let cardsData = [{
  imgSrc: '',
  shortDesc: '',
  likeSrc: '',
  adress: '',
  fullprise: '',
  description: '',
}];
let main = new MainPage(document.getElementById('app'), { isAuthenticated, cards: cardsData, skeleton });
main.render();


skeleton = false;
async function checkAuthentication() {
  const [statusCode, ,] = await checkAuth();

  if (statusCode === 200) {
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

(async () => {
  await Promise.all([checkAuthentication(), getAdverts()]);
  main.delete();
  main = new MainPage(document.getElementById('app'), { isAuthenticated, cards: cardsData });
  main.render();
  const [searchFilterAndString, inDevelop] = [
    document.querySelector('#filter-and-search'), document.querySelector('#search__in-develop'),
  ];
  
  searchFilterAndString.addEventListener('mouseover', (e) => {
    if (true) {
      searchFilterAndString.style.display = 'none';
      console.log(e.target.closest('div'));
      inDevelop.style.display = 'block';
    }
  });
  
  inDevelop.addEventListener('mouseout', (e) => {
    if (true) {
      inDevelop.style.display = 'none';
      console.log(e.target.closest('div'));
      searchFilterAndString.style.display = 'block';
    }
  });
})();


