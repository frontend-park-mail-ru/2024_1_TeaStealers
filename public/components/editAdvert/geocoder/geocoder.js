import { BaseComponent } from '@components/baseComponent/baseComponent';
import { editAdvertModel, newAdvertModel } from '@models';
import mapgeocoder from './geocoder.hbs';

const LOCATION = {
  center: [37.62, 55.75], // начальные координаты [долгота, широта]
  zoom: 9, // начальное увеличение
};

export class MapGeocoder extends BaseComponent {
  marker;

  map;

  delayTimer;

  constructor(parent, state) {
    const template = mapgeocoder;
    super({ parent, template, state });
    this.delayTimer = null;
  }

  render() {
    this.initMap();
    super.render();
  }

  async initMap() {
    await ymaps3.ready;
    const {
      YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls, YMapMarker,
    } = ymaps3;

    const { YMapZoomControl } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');
    const { YMapDefaultMarker } = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');

    this.map = new YMap(
      document.getElementById('geocoder'),
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
    this.map.addChild(
      new YMapControls({ position: 'right' })
        .addChild(new YMapZoomControl({})),
    );

    this.marker = new YMapDefaultMarker({
      coordinates: LOCATION.center,
      draggable: true,
      title: `Longitude: ${LOCATION.center[0].toFixed(6)} <br>
      Latitude ${LOCATION.center[1].toFixed(6)}`,
      onDragMove: this.onDragMoveHandler.bind(this),
    });
    this.map.addChild(this.marker);
  }

  async addMarker(longitude, latitude) {
    if (this.marker) {
      this.map.removeChild(this.marker);
    }
    const { YMapDefaultMarker } = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');

    this.marker = new YMapDefaultMarker({
      coordinates: [longitude, latitude],
      draggable: true,
      title: `Longitude: ${LOCATION.center[0].toFixed(6)} <br>
      Latitude ${LOCATION.center[1].toFixed(6)}`,
      onDragMove: this.onDragMoveHandler.bind(this),
    });

    this.map.addChild(this.marker);
    this.map.update({ location: { center: [longitude, latitude], zoom: 16, duration: 2000 } });
  }

  async onDragMoveHandler(coordinates) {
    const longitude = `Longitude: ${coordinates[0].toFixed(6)}`;
    const latitude = `Latitude: ${coordinates[1].toFixed(6)}`;
    this.marker.update({ coordinates, title: `${longitude} <br> ${latitude}` });
    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(async () => {
      await this.coordinateToAdress(coordinates);
    }, 500);
  }

  async coordinateToAdress(coordinates) {
    const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=4df46c00-ebef-47d8-9642-9e3d7773eef0&geocode=${coordinates}&format=json&kind=house&results=1`);
    if (!response.ok) {
      return;
    }

    const address = await response.json();

    if (address.response.GeoObjectCollection.featureMember.length === 0) {
      editAdvertModel.setAddressError();
      newAdvertModel.setAddressError();
      return;
    }

    const formatAddress = address.response.GeoObjectCollection.featureMember[0]
      .GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted;
    editAdvertModel.setAddress(formatAddress, address);
    newAdvertModel.setAddress(formatAddress, address);
  }
}
