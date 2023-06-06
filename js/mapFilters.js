const mapFilters = document.querySelector('.map__filters');
const mapFiltersList = mapFilters.children;

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

export { mapFiltersDisable, mapFiltersEnable, mapFiltersReset }
