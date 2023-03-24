import {getRandomFloat, getRandomInt} from './util.js';

const TYPES_HOUSING = [
  'palace',
  'flat',
  'house',
  'bungalow'];

const TIMES = [
  '12:00',
  '13:00',
  '14:00'];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const RENTAL_ADS_COUNT = 10;


const getRandomArrElement = (arr) => {
  return arr[getRandomInt(0, arr.length - 1)];
};

const getRandomUniqueArrElements = (arr) => {
  let newArr = [];
  for (let i = 0; i < getRandomInt(1, arr.length); i++) {
    let randomIndex = getRandomInt(0, arr.length - 1);
    if (!newArr.includes(arr[randomIndex])) {
      newArr.push(arr[randomIndex]);
    }
  }
  return newArr;
};

const getAvatarId = () => {
  let id = getRandomInt(1, 10);
  return id < 10 ? `0${id}` : id;
}

const createRentalAds = () => {
  return {
    author: {
      avatar: `img/avatars/user${getAvatarId()}.png`,
    },
    offer: {
      title: 'Заголовок',
      address: 'location.x, location.y',
      price: getRandomInt(1000, 10000),
      type: getRandomArrElement(TYPES_HOUSING),
      rooms: getRandomInt(1, 10),
      guests: getRandomInt(1,10),
      checkin: getRandomArrElement(TIMES),
      checkout: getRandomArrElement(TIMES),
      features: getRandomUniqueArrElements(FEATURES),
      description: 'Описание',
      photos: getRandomUniqueArrElements(PHOTOS),
    },
    location: {
      lat: getRandomFloat(35.65, 35.7, 5),
      lng: getRandomFloat(139.7, 139.8, 5),
    },
  };
}

const rentalAds = () => new Array(RENTAL_ADS_COUNT).fill(null).map(() => createRentalAds());

export {rentalAds};
