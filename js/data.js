'use strict';

(function () {
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MIN_GUESTS_NUMBER = 1;
  var MAX_GUESTS_NUMBER = 10;
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
  // var FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS_ARRAY = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var getLocationX = function (blockWidth, pinWidth) {
    var maxLocationX = blockWidth - pinWidth;
    var minLocationX = pinWidth;
    return [minLocationX, maxLocationX];
  };

  // window.data = {
  //   offersArray: [],
  //   getOffers: function (offersNumber) {
  //     for (var i = 1; i < offersNumber + 1; i++) {
  //       var avatarSrc = 'img/avatars/user0' + i + '.png';
  //       var locationY = window.util.getRandomMinMax(window.util.MIN_LOCATION_Y, window.util.MAX_LOCATION_Y);
  //       var locationX = window.util.getRandomMinMax(getLocationX(window.util.mapBlockWidth, window.pin.similarPinElement.offsetWidth)[0], getLocationX(window.util.mapBlockWidth, window.pin.similarPinElement.offsetWidth)[1]);
  //       var offer = {
  //         autor: {
  //           avatar: avatarSrc
  //         },
  //         offer: {
  //           title: OFFER_TITLES[i - 1],
  //           adress: (locationX + ', ' + locationY),
  //           price: Math.round(window.util.getRandomMinMax(MIN_PRICE, MAX_PRICE) / 1000) * 1000,
  //           type: window.util.getRandom(OFFER_TYPES),
  //           rooms: window.util.getRandomMinMax(MIN_ROOMS, MAX_ROOMS),
  //           guest: window.util.getRandomMinMax(MIN_GUESTS_NUMBER, MAX_GUESTS_NUMBER),
  //           checkin: window.util.getRandom(CHECK),
  //           checkout: window.util.getRandom(CHECK),
  //           features: window.util.getRandomArrayItems(FEATURES_ARRAY, window.util.getRandomMinMax(0, FEATURES_ARRAY.length + 1)),
  //           description: '',
  //           photos: window.util.getRandomArrayItems(PHOTOS_ARRAY, window.util.getRandomMinMax(1, PHOTOS_ARRAY.length + 1)),
  //         },
  //         location: {
  //           x: locationX,
  //           y: locationY,
  //         }
  //       };
  //       window.data.offersArray.push(offer);
  //     }
  //     return window.data.offersArray;
  //   }
  // };
})();
