import { getAdvertList } from '@modules';

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
