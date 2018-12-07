'use strict';

(function () {
  window.data = {
    offersArray: [],
    getOffers: function (offersNumber) {
    for (var i = 1; i < offersNumber + 1; i++) {
      var avatarSrc = 'img/avatars/user0' + i + '.png';
      var locationY = getRandomMinMax(MIN_LOCATION_Y, MAX_LOCATION_Y);
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
          photos: getRandomArrayItems(PHOTOS_ARRAY, getRandomMinMax(1, PHOTOS_ARRAY.length + 1)),
        },
        location: {
          x: locationX,
          y: locationY,
        }
      };
      window.data.offersArray.push(offer);
    }
    return window.data.offersArray;
    }
  };
})();
