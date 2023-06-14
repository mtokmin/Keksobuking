import { formDisabled, setUserFormSubmit } from './form.js';
import { mapInicialize } from './map.js';
import { mapFiltersDisable, checkAllFilters, changeMapFilters } from './mapFilters.js';
import { getData } from './server.js';
import { debounce } from './util.js';
import { showErrorModal } from './popup.js';

//Задержка отображения маркеров на карте
const TIMEOUT_DELAY = 500;


//Блокируем страницу

function disablePage() {
  formDisabled();
  mapFiltersDisable();
}

disablePage();
mapInicialize();


getData((ads) => {
  checkAllFilters(ads);
  changeMapFilters(debounce(() => checkAllFilters(ads), TIMEOUT_DELAY));
})

setUserFormSubmit();

