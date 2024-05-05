import { BaseComponent, MapPopup } from '@components';
import { getAdvertsList, getGridAdverts } from '@modules/api';
import { globalVariables } from '@models';
import Map from './map.hbs';

// Долгота-широта

export class MapComponent extends BaseComponent {
  adverts;

  mapPopap;

  constructor(parent, state) {
    const template = Map;
    super({
      parent, template, state,
    });
    this.adverts = state.adverts;
  }

  render() {
    this.initMap(this.state.adverts);
    super.render();
  }

  async initMap(adverts) {
    await ymaps3.ready;
    const {
      YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls, YMapMarker,
    } = ymaps3;

    const { YMapZoomControl } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');

    const map = new YMap(
      document.getElementById('map'),
      {
        location: {
          center: [37.6230800529175, 55.7525902563876],
          zoom: 12,
        },
      },
      [
        new YMapDefaultSchemeLayer({}),
        new YMapDefaultFeaturesLayer({}),
      ],
    );

    map.addChild(
      new YMapControls({ position: 'right' })
        .addChild(new YMapZoomControl({})),
    );

    // try {
    //   const [statusCode, response] = await getGridAdverts('');
    //   if (statusCode !== globalVariables.HTTP_STATUS_OK) {
    //     return;
    //   }
    //   this.adverts = response.payload.adverts;
    // } catch (error) {
    //   console.log(error);
    // }

    this.adverts.forEach((advert, index) => {
      console.log(advert);
      console.log(advert.adressPoint);
      console.log(advert.adressPoint.replace('POINT(', '').replace(')', '').replace(' ', ', '));
      const [long, lat] = this.parsePoint(advert.adressPoint);
      const markerElement = document.createElement('img');
      markerElement.className = 'icon-marker';
      markerElement.id = `icon-marker-${index}`;
      markerElement.src = '../static/marker.svg';
      const marker = new YMapMarker(
        { coordinates: [long, lat] },
        markerElement,
      );
      map.addChild(marker);
    });

    // dev: одна точка
    // const index = 0;
    // const markerElement = document.createElement('img');
    // markerElement.className = 'icon-marker';
    // markerElement.id = `icon-marker-${index}`;
    // markerElement.src = '../static/marker.svg';
    // const marker = new YMapMarker(
    //   { coordinates: [37.8230800529175, 55.7525902563876] },
    //   markerElement,
    // );
    // map.addChild(marker);

    const markers = document.querySelectorAll('.icon-marker');
    markers.forEach((element) => {
      element.addEventListener('click', this.openAboutAdvert.bind(this));
    });
    this.addClickListener('map', this.closeAboutAdvert.bind(this));
  }

  openAboutAdvert(event) {
    event.preventDefault();
    if (this.mapPopap !== undefined) {
      this.mapPopap.unmountAndClean();
      this.mapPopap = undefined;
    }
    const idStr = event.target.id.replace('icon-marker-', '');
    const id = parseInt(idStr, 10);
    const curAdvert = this.adverts[id];

    this.mapPopap = new MapPopup(event.target.parentNode, curAdvert);
    this.mapPopap.renderAndDidMount();
  }

  closeAboutAdvert(event) {
    event.preventDefault();
    if (event.target.className === 'icon-marker') {
      return;
    }
    if (this.mapPopap === undefined) {
      return;
    }
    this.mapPopap.unmountAndClean();
    this.mapPopap = undefined;
  }

  parsePoint(point) {
    const coordinates = point.replace('POINT(', '').replace(')', '').split(' ');
    const long = parseFloat(coordinates[0]);
    const lat = parseFloat(coordinates[1]);
    // Возвращаем координаты точки в виде массива чисел
    console.log(long, lat);
    return [long, lat];
  }
}
