import { sendData } from './server.js';
import { showErrorModal, showSuccessModal } from './popup.js';
import { mainPinReset } from './map.js';
import { mapFiltersReset } from './mapFilters.js'

//Объект МАР для мин цены
const typeMinPriceMap = new Map([
  ['bungalow', 0],
  ['flat', 1000],
  ['house', 5000],
  ['palace', 10000],
]);

//Объект MAP для вместимости комнат
const roomNumberCapacityMap = {
  1: ['для 1 гостя'],
  2: ['для 1 гостя', 'для 2 гостей'],
  3: ['для 1 гостя', 'для 2 гостей', 'для 3 гостей'],
  100: ['не для гостей'],
}

const adForm = document.querySelector('.ad-form');
const adFormList = adForm.children;

const fieldTypeHousing = adForm.querySelector('#type');
const titleAdInput = adForm.querySelector('#title');
const fieldPrice = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const resetButtonAdForm = adForm.querySelector('.ad-form__reset');

const addressAd = adForm.querySelector('#address');

function addressAdInicialize() {
  addressAd.setAttribute('readonly', true);
}

addressAdInicialize();

//Задаем координаты строке адреса
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

//Ограничение кол-ва мест от кол-ва гостей

//Удаляем елементы из списка кол-во мест
const clearCapaciryList = () => {
  while (capacity.firstChild) {
    capacity.removeChild(capacity.firstChild);
  }
}

//Функция по ограничению кол-ва мест при типе жилья
const capacityRoomsLimit = () => {
  let capacityValues = roomNumberCapacityMap[roomNumber.value];
  clearCapaciryList();
  capacityValues.forEach((capacityValue) => {
    const option = document.createElement('option');
    const roomNumberValue = roomNumber.value == 100 ? 0 : roomNumber.value;
    option.value = roomNumberValue;
    option.textContent = capacityValue;
    capacity.appendChild(option);
  })
}
capacityRoomsLimit();

roomNumber.addEventListener('change', capacityRoomsLimit);

//Блокировка/разблокировка формы
const formDisabled = () => {
  adForm.classList.add('ad-form--disabled');
  for (let elem of adFormList) {
    elem.disabled = true
  }
}

const formEnabled = () => {
  adForm.classList.remove('ad-form--disabled');
  for (let elem of adFormList) {
    elem.disabled = false
  }
}

//Валидация полей формы

titleAdInput.addEventListener('invalid', () => {
  if (titleAdInput.validity.tooShort) {
    titleAdInput.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
  } else if (titleAdInput.validity.tooLong) {
    titleAdInput.setCustomValidity('Заголовок может состоять максимум из 100 символов');
  } else if (titleAdInput.validity.valueMissing) {
    titleAdInput.setCustomValidity('Обязательное поле');
  }
});

//Сброс формы в исходное состояние

const resetPage = () => {
  adForm.reset();
  mapFiltersReset();
  mainPinReset();
}

resetButtonAdForm.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPage();
})

//Отправка формы

const setUserFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    sendData(
      () => {
        showSuccessModal();
        resetPage();
      },
      showErrorModal,
      formData,
    );

  })
};

export { formDisabled, formEnabled, addresAdSetCoords, setUserFormSubmit }
