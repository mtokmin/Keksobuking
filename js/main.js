import './card.js';
import { formDisabled, setUserFormSubmit } from './form.js';
import { mapInicialize, createPinAds, pinAdIcon } from './map.js';
import { mapFiltersDisable } from './mapFilters.js';
import { getData } from './server.js';

//Блокируем страницу

function disablePage() {
  formDisabled();
  mapFiltersDisable();
}

disablePage();
mapInicialize();


getData((ads) => {
  createPinAds(ads, pinAdIcon);
})

setUserFormSubmit();
