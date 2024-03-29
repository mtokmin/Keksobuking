const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

let typeHousingMap = new Map([
  ['palace', 'Дворец '],
  ['flat', 'Квартира'],
  ['house', 'Дом'],
  ['bungalow', 'Бунгало']]);


//Функция для отрисовки карточки


function createAdCards({ author, offer }) {

  const cardsElement = cardTemplate.cloneNode(true);

  let roomsCapacityText = '';
  switch (offer.rooms) {
    case 1:
      roomsCapacityText = 'комната';
      break;
    case 2:
    case 3:
    case 4:
      roomsCapacityText = 'комнаты';
      break;
    default:
      roomsCapacityText = 'комнат';
      break;
  }

  let guestsCapacityText = '';
  switch (offer.guests) {
    case 1:
      guestsCapacityText = 'гостя';
      break;
    default:
      guestsCapacityText = 'гостей';
      break;
  }

  cardsElement.querySelector('.popup__avatar').src = author.avatar;
  cardsElement.querySelector('.popup__title').textContent = offer.title;
  cardsElement.querySelector('.popup__text--address').textContent = offer.address;
  cardsElement.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  cardsElement.querySelector('.popup__type').textContent = typeHousingMap.get(offer.type);
  cardsElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${roomsCapacityText} для ${offer.guests} ${guestsCapacityText}`;
  cardsElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardsElement.querySelector('.popup__features').textContent = offer.features;
  cardsElement.querySelector('.popup__description').textContent = offer.description;
  cardsElement.querySelector('.popup__photos').querySelector('.popup__photo').src = offer.photos;

  return cardsElement;
}

export { createAdCards };
