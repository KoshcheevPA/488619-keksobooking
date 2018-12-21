'use strict';

(function () {
  var MAIN_PIN_HEIGHT = 66;
  var MAX_PIN_AMOUNT = 5;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinFragment = document.createDocumentFragment();
  var mapPins = document.querySelector('.map__pins');

  var getPinPosition = function (pin) {
    var positionPinY = Math.round(pin.offsetTop + MAIN_PIN_HEIGHT / 2);
    var positionPinX = Math.round(pin.offsetLeft + pin.offsetWidth / 2);
    return positionPinX + ', ' + positionPinY;
  };

  var getPopupOpenLogic = function () {
    var mapCard = document.querySelectorAll('.map__card');
    var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var popupCross = document.querySelectorAll('.popup__close');


    mapPin.forEach(function (element) {
      element.classList.remove('hidden');
    });

    var onPinClick = function (pin, card) {
      pin.addEventListener('click', function () {
        document.addEventListener('keydown', onPopupCloseEsc);
        mapCard.forEach(function (element) {
          if (!element.classList.contains('hidden')) {
            element.classList.add('hidden');
          }
        });
        card.classList.remove('hidden');
      });
    };

    var onPopupClose = function () {
      mapCard.forEach(function (element) {
        element.classList.add('hidden');
      });
      document.removeEventListener('keydown', onPopupCloseEsc);
    };

    var onPopupCloseEsc = function (evt) {
      mapCard.forEach(function (element) {
        if (evt.keyCode === window.util.escButton) {
          element.classList.add('hidden');
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

    popupCross.forEach(function (element) {
      element.addEventListener('click', onPopupClose);
    });
  };

  var getNewPin = function (array) {
    for (var i = 0; i < Math.min(array.length, MAX_PIN_AMOUNT); i++) {
      var pinElement = pinTemplate.cloneNode(true);
      var pinImg = pinElement.querySelector('img');
      pinElement.style = 'left: ' + array[i].location.x + 'px; top: ' + array[i].location.y + 'px;';
      pinImg.src = array[i].author.avatar;
      pinImg.alt = array[i].offer.title;
      pinFragment.appendChild(pinElement);
      if (array.offer === 0) {
        pinElement.style = 'display: none;';
      }
    }
    window.card.addCard(array);
    mapPins.appendChild(pinFragment);
    getPopupOpenLogic();
  };

  window.pin = {
    mapPins: mapPins,
    getNewPin: getNewPin,
    getPinPosition: getPinPosition
  };
})();
