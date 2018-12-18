'use strict';

(function () {
  var PIN_AMOUNT = 5;
  var similarPinElement = document.querySelector('.map__pin');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinFragment = document.createDocumentFragment();
  var mapPins = document.querySelector('.map__pins');
  window.pin = {
    mapPins: mapPins,
    similarPinElement: similarPinElement,
    getNewPin: function (array) {
      for (var i = 0; i < Math.min(array.length, PIN_AMOUNT); i++) {
        var pinElement = pinTemplate.cloneNode(true);
        var pinImg = pinElement.querySelector('img');
        pinTemplate.style = 'left: ' + array[i].location.x + 'px; top: ' + array[i].location.y + 'px;';
        pinImg.src = array[i].author.avatar;
        pinImg.alt = array[i].offer.title;
        pinFragment.appendChild(pinElement);
        if (array.offer === 0) {
          pinElement.style = 'display: none;';
        }
      }
      window.card.addCard(array);
      mapPins.appendChild(pinFragment);
      var mapCard = document.querySelectorAll('.map__card');
      var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var popupCross = document.querySelectorAll('.popup__close');

      for (var k = 0; k < mapPin.length; k++) {
        mapPin[k].classList.remove('hidden');
      }

      var onPinClick = function (pin, card) {
        pin.addEventListener('click', function () {
          document.addEventListener('keydown', onPopupCloseEsc);
          for (var j = 0; j < mapCard.length; j++) {
            if (!mapCard[j].classList.contains('hidden')) {
              mapCard[j].classList.add('hidden');
            }
          }
          card.classList.remove('hidden');
        });
      };

      var onPopupClose = function () {
        for (var j = 0; j < mapCard.length; j++) {
          mapCard[j].classList.add('hidden');
        }
        document.removeEventListener('keydown', onPopupCloseEsc);
      };

      var onPopupCloseEsc = function (evt) {
        for (var t = 0; t < mapCard.length; t++) {
          if (evt.keyCode === window.map.escButton) {
            mapCard[t].classList.add('hidden');
            document.removeEventListener('keydown', onPopupCloseEsc);
          }
        }
      };

      for (var j = 0; j < mapPin.length; j++) {
        if (mapCard[j].classList.contains('hidden')) {
          onPinClick(mapPin[j], mapCard[j]);
        } else {
          mapCard[j].classList.add('hidden');
        }
      }

      for (var l = 0; l < mapPin.length; l++) {
        popupCross[l].addEventListener('click', onPopupClose);
      }
    }
  };
})();
