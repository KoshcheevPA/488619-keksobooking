'use strict';

(function () {
  var MIN_LOCATION_Y = 130;
  var MAX_LOCATION_Y = 630;
  var MAIN_PIN_HEIGHT = 66;
  var adForm = document.querySelector('.ad-form');
  var mapBlock = document.querySelector('.map__pins');
  var mapBlockWidth = mapBlock.offsetWidth;
  var mapBlockHeight = mapBlock.offsetHeight;
  var map = document.querySelector('.map');

  window.util = {
    MIN_LOCATION_Y: MIN_LOCATION_Y,
    MAX_LOCATION_Y: MAX_LOCATION_Y,
    adForm: adForm,
    mapBlockWidth: mapBlockWidth,
    mapBlockHeight: mapBlockHeight,
    map: map,
    getPinPosition: function (pin) {
      var positionPinY = Math.round(pin.offsetTop + MAIN_PIN_HEIGHT / 2);
      var positionPinX = Math.round(pin.offsetLeft + pin.offsetWidth / 2);
      return positionPinX + ', ' + positionPinY;
    },
    getRandom: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    getRandomMinMax: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    getRandomArrayItems: function (array, arrayLength) {
      var randomArray = [];
      for (var i = 0; i < arrayLength; i++) {
        randomArray.push(array[i]);
      }
      return randomArray;
    }
  };
})();
