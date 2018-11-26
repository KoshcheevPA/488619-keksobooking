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
        price: getRandomMinMax(MIN_PRICE, MAX_PRICE),
        type: getRandom(OFFER_TYPES),
        rooms: getRandomMinMax(MIN_ROOMS, MAX_ROOMS),
        guest: getRandomMinMax(MIN_GUESTS_NUMBER, MAX_GUESTS_NUMBER),
        checkin: getRandom(CHECK),
        checkout: getRandom(CHECK),
        features: getRandom(FEATURES_ARRAY),
        description: '',
        photos: getRandom(PHOTOS_ARRAY)
      },
      location: {
        x: locationX,
        y: locationY,
      }
    };
    offersArray.push(offer);
  }
  console.log(offersArray);
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

var map = document.querySelector('.map');
map.classList.remove('map--faded');
