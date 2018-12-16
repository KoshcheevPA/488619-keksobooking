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
        if (array.offer === 0) {
          pinElement.style = 'display: none;';
        }
      }
      window.card.addCard(array);
      mapPins.appendChild(pinFragment);
      var mapCard = document.querySelectorAll('.map__card');
      var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var popupCross = document.querySelectorAll('.popup__close');

      mapPin.forEach(function (mapPin) {
        mapPin.classList.remove('hidden');
      });

      var onPinClick = function (pin, card) {
        pin.addEventListener('click', function () {
          document.addEventListener('keydown', onPopupCloseEsc);
          mapCard.forEach(function (mapCard) {
            if (!mapCard.classList.contains('hidden')) {
              mapCard.classList.add('hidden');
            }
          });
          card.classList.remove('hidden');
        });
      };

      var onPopupClose = function () {
        mapCard.forEach(function (mapCard) {
          mapCard.classList.add('hidden');
        });
        document.removeEventListener('keydown', onPopupCloseEsc);
      };

      var onPopupCloseEsc = function (evt) {
        mapCard.forEach(function (mapCard) {
          if (evt.keyCode === window.map.escButton) {
            mapCard.classList.add('hidden');
            document.removeEventListener('keydown', onPopupCloseEsc);
          }
        });
      };

      for (var j = 0; j < mapPin.length; j++) {
        if (mapCard[j].classList.contains('hidden')) {
          onPinClick(mapPin[j], mapCard[j]);
        } else {
          mapCard[j].classList.add('hidden');
        }
      }

      for (var k = 0; k < mapPin.length; k++) {
        popupCross[k].addEventListener('click', onPopupClose);
      }
    }
  };
})();
