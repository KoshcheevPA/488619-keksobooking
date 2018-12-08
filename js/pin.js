'use strict';

(function () {
  var similarPinElement = document.querySelector('.map__pin');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinFragment = document.createDocumentFragment();
  var mapPins = document.querySelector('.map__pins');
  window.pin = {
    similarPinElement: similarPinElement,
    getNewPin: function (array) {
      for (var i = 0; i < array.length; i++) {
        var pinElement = pinTemplate.cloneNode(true);
        var pinImg = pinElement.querySelector('img');
        pinTemplate.style = 'left: ' + array[i].location.x + 'px; top: ' + array[i].location.y + 'px;';
        pinImg.src = array[i].autor.avatar;
        pinImg.alt = array[i].offer.title;
        pinFragment.appendChild(pinElement);
      }
      mapPins.appendChild(pinFragment);
    }
  };
})();
