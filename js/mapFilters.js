const mapFilters = document.querySelector('.map__filters');
const mapFiltersList = mapFilters.children;

//Блокировка фильтра карты

function mapFiltersDisable() {
  mapFilters.classList.add('ad-form--disabled');
  for(let elem of mapFiltersList) {
    elem.disabled = true;
  }
};

function mapFiltersEnable() {
  mapFilters.classList.remove('ad-form--disabled');
  for(let elem of mapFiltersList) {
    elem.disabled = false;
  }
};

export {mapFiltersDisable, mapFiltersEnable}
