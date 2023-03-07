//Объект МАР для мин цены
const typeMinPriceMap = new Map([
  ['bungalow', 0],
  ['flat', 1000],
  ['house', 5000],
  ['palace', 10000],
]);

const form = document.querySelector('.ad-form');
const fieldTypeHousing = form.querySelector('#type');
const fieldPrice = form.querySelector('#price');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');

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
