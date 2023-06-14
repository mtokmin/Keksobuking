import { formEnabled, addresAdSetCoords } from './form.js';
import { mapFiltersEnable } from './mapFilters.js';
import { createAdCards } from './card.js';

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
//Иконка главной метки
const mainPinIcon = L.icon({
  iconUrl: './leaflet/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
})
//Иконка метки объявлений
const pinAdIcon = L.icon({
  iconUrl: './leaflet/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
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

//Функция по созданию меток

function createPin(coords, icon = pinAdIcon, draggable = false) {
  return L.marker(
    coords,
    {
      icon: icon,
      draggable: draggable,
    },
  )
}
//Создаем главную метку
const mainPin = createPin(CENTER_TOKYO_COORDS, mainPinIcon, true)

mainPin.addTo(map);

//Получаем координаты главной метки
mainPin.on('moveend', (e) => {
  let coords = e.target.getLatLng();
  addresAdSetCoords(coords); //Вставляем координаты в строку адреса
})

//Сброс главное метки
const mainPinReset = () => {
  mainPin.setLatLng(CENTER_TOKYO_COORDS);

  addresAdSetCoords(CENTER_TOKYO_COORDS);
}

// Создание слоя с группой меток
const markerGroup = L.layerGroup().addTo(map);


//Создаем метки объявлений
function createPinAds(ads) {
  ads.forEach((ad) => {
    const marker = createPin(ad.location);
    marker
      .addTo(markerGroup)
      .bindPopup(
        createAdCards(ad), // привязывает балун-объявление к метке
        {
          keepInView: true, //карта автоматически перемещается, если всплывающий балун-объявление не помещается и вылезает за границы
        },
      )
  })
}

function createPinAd(ad) {
  const marker = createPin(ad.location);
  marker
    .addTo(markerGroup)
    .bindPopup(
      createAdCards(ad), // привязывает балун-объявление к метке
      {
        keepInView: true, //карта автоматически перемещается, если всплывающий балун-объявление не помещается и вылезает за границы
      },
    )
}

// Очищение слоя с метками объявлений
const clearMarkers = () => markerGroup.clearLayers();



export { createPinAd, mapInicialize, mainPinReset, clearMarkers, createPinAds };
