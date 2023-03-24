import './generator.js';
import { formDisabled } from './form.js';
import { mapInicialize } from './map.js';
import { mapFiltersDisable } from './mapFilters.js';

//Блокируем страницу

function disablePage() {
  formDisabled();
  mapFiltersDisable();
}

disablePage();
mapInicialize();
