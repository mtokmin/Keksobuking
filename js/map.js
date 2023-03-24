import { formEnabled, addresAdSetCoords } from './form.js';
import { mapFiltersEnable } from './mapFilters.js';

const L = window.L;
const ZOOM_MAP = 12;
const CENTER_TOKYO_COORDS = {
  lat: 35.69034,
  lng: 139.75175,
};
const LeafletParameters = {
  TITLE_LAYER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};
//Главная метка
const mainPinIcon = L.icon({
  iconUrl: './leaflet/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
})

const map = L.map('map-canvas');

const mapInicialize = () => {
  map
    .on('load', () => { //События при загрузке карты
      formEnabled(); //Разблокируем форму
      mapFiltersEnable(); //Разблокируем фильтр карты
      addresAdSetCoords(CENTER_TOKYO_COORDS); //Задаем строке адреса координаты поумолчанию
    })
    .setView(CENTER_TOKYO_COORDS, ZOOM_MAP);

  L.tileLayer(LeafletParameters.TITLE_LAYER, {
    attribution: LeafletParameters.ATTRIBUTION,
  }).addTo(map);
};

const mainPin = L.marker(
  CENTER_TOKYO_COORDS,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPin.addTo(map);

//Получаем координаты главной метки
mainPin.on('moveend', (e) => {
  let coords = e.target.getLatLng();
  addresAdSetCoords(coords); //Вставляем координаты в строку адреса
})

export { mapInicialize, CENTER_TOKYO_COORDS };
