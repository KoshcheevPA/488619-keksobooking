'use strict';

var OFFERS_NUMBER = 8;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS_NUMBER = 1;
var MAX_GUESTS_NUMBER = 10;
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_X = 630;
var OFFER_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK = ['12:00', '13:00', '14:00'];
var FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_ARRAY = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var mapBlock = document.querySelector('.map__pins');
var mapBlockWidth = mapBlock.offsetWidth;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getRandom = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomMinMax = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getLocationX = function (blockWidth, pinWidth) {
  var maxLocationX = blockWidth - pinWidth;
  var minLocationX = pinWidth;
  return [minLocationX, maxLocationX];
};

var getRandomArrayItems = function (array, arrayLength) {
  var randomArray = [];
  for (var i = 0; i < arrayLength; i++) {
    randomArray.push(array[i]);
  }
  return randomArray;
};

var offersArray = [];
var getOffers = function (offersNumber) {
  for (var i = 1; i < offersNumber + 1; i++) {
    var avatarSrc = 'img/avatars/user0' + i + '.png';
    var locationY = getRandomMinMax(MIN_LOCATION_Y, MAX_LOCATION_X);
    var locationX = getRandomMinMax(getLocationX(mapBlockWidth, similarPinElement.offsetWidth)[0], getLocationX(mapBlockWidth, similarPinElement.offsetWidth)[1]);
    var offer = {
      autor: {
        avatar: avatarSrc
      },
      offer: {
        title: OFFER_TITLES[i - 1],
        adress: (locationX + ', ' + locationY),
        price: Math.round(getRandomMinMax(MIN_PRICE, MAX_PRICE) / 1000) * 1000,
        type: getRandom(OFFER_TYPES),
        rooms: getRandomMinMax(MIN_ROOMS, MAX_ROOMS),
        guest: getRandomMinMax(MIN_GUESTS_NUMBER, MAX_GUESTS_NUMBER),
        checkin: getRandom(CHECK),
        checkout: getRandom(CHECK),
        features: getRandomArrayItems(FEATURES_ARRAY, getRandomMinMax(0, FEATURES_ARRAY.length + 1)),
        description: '',
        photos: getRandomArrayItems(PHOTOS_ARRAY, getRandomMinMax(0, PHOTOS_ARRAY.length + 1)),
      },
      location: {
        x: locationX,
        y: locationY,
      }
    };
    offersArray.push(offer);
  }
  return offersArray;
};

var similarPinElement = document.querySelector('.map__pin');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinFragment = document.createDocumentFragment();
var mapPins = document.querySelector('.map__pins');

var getNewPin = function (array) {
  for (var i = 0; i < array.length; i++) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinImg = pinElement.querySelector('img');
    pinTemplate.style = 'left: ' + array[i].location.x + 'px; top: ' + array[i].location.y + 'px;';
    pinImg.src = array[i].autor.avatar;
    pinImg.alt = array[i].offer.title;
    pinFragment.appendChild(pinElement);
  }
  mapPins.appendChild(pinFragment);
};
getNewPin(getOffers(OFFERS_NUMBER));

var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var renderCard = function (offerNumber) {
  var cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offerNumber.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offerNumber.offer.adress;
  cardElement.querySelector('.popup__text--price').textContent = offerNumber.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__text--capacity').textContent = offerNumber.offer.rooms + ' комнаты для ' + offerNumber.offer.guest + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerNumber.offer.checkin + ', выезд до ' + offerNumber.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = offerNumber.offer.description;
  cardElement.querySelector('.popup__avatar').src = offerNumber.autor.avatar;

  var featuresList = cardElement.querySelector('.popup__features');
  var featuresItem = featuresList.querySelector('li');
  for (var i = 0; i < offerNumber.offer.features.length; i++) {
    featuresItem.textContent = offerNumber.offer.features[i];
  }

  var housePhotos = cardElement.querySelector('.popup__photos');
  var housePhoto = cardElement.querySelector('.popup__photo');
  housePhoto.src = offerNumber.offer.photos[0];
  for (var j = 1; j < offerNumber.offer.photos.length; j++) {
    var photoElement = housePhoto.cloneNode(true);
    photoElement.src = offerNumber.offer.photos[j];
    housePhotos.appendChild(photoElement);
  }

  if (offerNumber.offer.type === 'flat') {
    cardElement.querySelector('.popup__type').textContent = 'Квартира';
  } else if (offerNumber.offer.type === 'bungalo') {
    cardElement.querySelector('.popup__type').textContent = 'Бунгало';
  } else if (offerNumber.offer.type === 'house') {
    cardElement.querySelector('.popup__type').textContent = 'Дом';
  } else if (offerNumber.offer.type === 'palace') {
    cardElement.querySelector('.popup__type').textContent = 'Дворец';
  }
  return cardElement;
};

var cardFragment = document.createDocumentFragment();
for (var i = 0; i < offersArray.length; i++) {
  cardFragment.appendChild(renderCard(offersArray[i]));
}

var mapFilters = document.querySelector('map__filters-container');
map.insertBefore(cardFragment, mapFilters);
