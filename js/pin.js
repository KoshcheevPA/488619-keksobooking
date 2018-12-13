'use strict';

(function () {
  var similarPinElement = document.querySelector('.map__pin');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinFragment = document.createDocumentFragment();
  var mapPins = document.querySelector('.map__pins');
  window.pin = {
    mapPins: mapPins,
    similarPinElement: similarPinElement,
    getNewPin: function (array) {
      for (var i = 0; i < array.length; i++) {
        var pinElement = pinTemplate.cloneNode(true);
        var pinImg = pinElement.querySelector('img');
        pinTemplate.style = 'left: ' + array[i].location.x + 'px; top: ' + array[i].location.y + 'px;';
        pinImg.src = array[i].author.avatar;
        pinImg.alt = array[i].offer.title;
        pinFragment.appendChild(pinElement);
        pinElement.classList.add('hidden');
        if (array.offer === 0) {
          pinElement.style = 'display: none;';
        }
      }
      window.card.addCard(array);
      mapPins.appendChild(pinFragment);
    }
  };
})();
