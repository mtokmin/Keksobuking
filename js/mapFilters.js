import { clearMarkers, createPinAd } from './map.js';

const mapFilters = document.querySelector('.map__filters');
const mapFiltersList = mapFilters.children;
const housingTypeFilter = mapFilters.querySelector('#housing-type');
const housingPriceFilter = mapFilters.querySelector('#housing-price');
const housingRoomsFilter = mapFilters.querySelector('#housing-rooms');
const housingGuestsFilter = mapFilters.querySelector('#housing-guests');
const featuresFilter = mapFilters.querySelectorAll('.map__checkbox');

const DEFAULT_VALUE = 'any';
const SIMILAR_AD_COUNT = 10;

const priceMapFilter = {
  low: {
    start: 0,
    end: 10000,
  },
  middle: {
    start: 10000,
    end: 50000,
  },
  high: {
    start: 50000,
    end: 10000000,
  },
}

//Блокировка фильтра карты

const mapFiltersDisable = () => {
  mapFilters.classList.add('ad-form--disabled');
  for (let elem of mapFiltersList) {
    elem.disabled = true;
  }
}

const mapFiltersEnable = () => {
  mapFilters.classList.remove('ad-form--disabled');
  for (let elem of mapFiltersList) {
    elem.disabled = false;
  }
}

//Сброс фильтров карты
const mapFiltersReset = () => {
  mapFilters.reset();
}

//Проверка фильтров
const checkHousingTypeFilter = (ad) => housingTypeFilter.value === ad.offer.type || housingTypeFilter.value === DEFAULT_VALUE;

const checkHousingPriceFilter = (ad) => housingPriceFilter.value === DEFAULT_VALUE || (ad.offer.price >= priceMapFilter[housingPriceFilter.value].start && ad.offer.price <= priceMapFilter[housingPriceFilter.value].end);

const checkHousingRoomsFilter = (ad) => Number(housingRoomsFilter.value) === ad.offer.rooms || housingRoomsFilter.value === DEFAULT_VALUE;

const checkHousingGuestsFilter = (ad) => Number(housingGuestsFilter.value) === ad.offer.guests || housingGuestsFilter.value === DEFAULT_VALUE;

const checkFeaturesFilter = (ad) => {
  return Array.from(featuresFilter)
    .every((filterFeature) => {
      if (!filterFeature.checked) {
        return true;
      }
      if (!ad.offer.features) {
        return false;
      }
      return ad.offer.features.includes(filterFeature.value);
    });
};

//Отфильтрованные объявления
const checkAllFilters = (ads) => {
  const filteredData = [];
  for (let i = 0; i < ads.length; i++) {
    const ad = ads[i];
    if (
      checkHousingTypeFilter(ad) &&
      checkHousingPriceFilter(ad) &&
      checkHousingRoomsFilter(ad) &&
      checkHousingGuestsFilter(ad) &&
      checkFeaturesFilter(ad)
    ) {
      createPinAd(ad);
      filteredData.push(ad);
    }
    if (filteredData.length === SIMILAR_AD_COUNT) {
      break;
    }
  }
  return filteredData;
};

//Перерисовка карты при изменении фильтров
const changeMapFilters = (callback) => {
  mapFilters.addEventListener('change', () => {
    clearMarkers();
    callback();
  })
}

export { mapFiltersDisable, mapFiltersEnable, mapFiltersReset, checkAllFilters, changeMapFilters }
