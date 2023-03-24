//Объект МАР для мин цены
const typeMinPriceMap = new Map([
  ['bungalow', 0],
  ['flat', 1000],
  ['house', 5000],
  ['palace', 10000],
]);

const adForm = document.querySelector('.ad-form');
const adFormList = adForm.children;

const fieldTypeHousing = adForm.querySelector('#type');
const fieldPrice = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const addressAd = adForm.querySelector('#address');

function addressAdInicialize() {
  addressAd.setAttribute('readonly', true);
}

addressAdInicialize();

function addresAdSetCoords(coords) {
  addressAd.value = `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`
}

//Устновка минимальной цены
function setMinPrice() {
  let selectedValuePrice = typeMinPriceMap.get(fieldTypeHousing.value);
  fieldPrice.setAttribute('min', selectedValuePrice);
  fieldPrice.setAttribute('placeholder', selectedValuePrice);
}
setMinPrice();

fieldTypeHousing.addEventListener('change', setMinPrice);

//Сихронизация времени заезда/выезда
function toSyncTimeIn() {
  timeIn.value = timeOut.value;
}

function toSyncTimeOut() {
  timeOut.value = timeIn.value;
}

timeIn.addEventListener('change', toSyncTimeOut);

timeOut.addEventListener('change', toSyncTimeIn);

//Блокировка/разблокировка формы
function formDisabled() {
  adForm.classList.add('ad-form--disabled');
  for (let elem of adFormList) {
    elem.disabled = true
  };
};

function formEnabled() {
  adForm.classList.remove('ad-form--disabled');
  for (let elem of adFormList) {
    elem.disabled = false
  };
};

export { formDisabled, formEnabled, addresAdSetCoords }
