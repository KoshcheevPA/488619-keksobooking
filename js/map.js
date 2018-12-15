'use strict';

(function () {
  var MIN_LOCATION_X = 0;
  var ESC_BUTTON = 27;
  var ENTER_BUTTON = 13;

  var formHeader = window.util.adForm.querySelector('.ad-form-header');
  var formElement = window.util.adForm.querySelectorAll('.ad-form__element');
  var adressInput = document.querySelector('#address');

  var setDisabled = function () {
    formHeader.setAttribute('disabled', 'true');
    for (var k = 0; k < formElement.length; k++) {
      formElement[k].setAttribute('disabled', 'true');
    }
  };

  var turnOffMap = function () {
    adressInput.value = window.util.getPinPosition(mainPin);
    window.util.map.classList.add('map--faded');
    window.util.adForm.classList.add('ad-form--disabled');
  };

  setDisabled();

  var mainPin = document.querySelector('.map__pin--main');
  adressInput.value = window.util.mapBlockWidth / 2 + ', ' + window.util.mapBlockHeight / 2;

  var onFormActivate = function () {
    window.util.map.classList.remove('map--faded');
    window.util.adForm.classList.remove('ad-form--disabled');

    formHeader.removeAttribute('disabled');
    for (var t = 0; t < formElement.length; t++) {
      formElement[t].removeAttribute('disabled');
    }

    adressInput.value = window.util.getPinPosition(mainPin);

    var mapCard = document.querySelectorAll('.map__card');
    var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var popupCross = document.querySelectorAll('.popup__close');

    if (mapPin.length === 0) {
      window.backend.load(window.pin.getNewPin, 'Ошибка');
    }

    for (var k = 0; k < mapPin.length; k++) {
      mapPin[k].classList.remove('hidden');
    }

    var onPinClick = function (pin, card) {
      pin.addEventListener('click', function () {
        document.addEventListener('keydown', onPopupCloseEsc);
        for (var i = 0; i < mapCard.length; i++) {
          if (!mapCard[i].classList.contains('hidden')) {
            mapCard[i].classList.add('hidden');
          }
        }
        card.classList.remove('hidden');
      });
    };

    var onPopupClose = function () {
      for (var i = 0; i < mapCard.length; i++) {
        mapCard[i].classList.add('hidden');
      }
      document.removeEventListener('keydown', onPopupCloseEsc);
    };

    var onPopupCloseEsc = function (evt) {
      for (var i = 0; i < mapCard.length; i++) {
        if (evt.keyCode === ESC_BUTTON) {
          mapCard[i].classList.add('hidden');
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
  };

  var onMainPinActivateEnter = function (evt) {
    if (evt.keyCode === ENTER_BUTTON) {
      onFormActivate();
      mainPin.removeEventListener('keydown', onMainPinActivateEnter);
    }
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();

      var shift = {
        x: startCoords.x - evtMove.clientX,
        y: startCoords.y - evtMove.clientY
      };

      startCoords = {
        x: evtMove.clientX,
        y: evtMove.clientY,
      };

      var topCoord = mainPin.offsetTop - shift.y;
      var leftCoord = mainPin.offsetLeft - shift.x;

      if (topCoord <= (window.util.MIN_LOCATION_Y - mainPin.offsetHeight / 2)) {
        topCoord = window.util.MIN_LOCATION_Y - mainPin.offsetHeight / 2;
      } else if (topCoord >= (window.util.MAX_LOCATION_Y - mainPin.offsetHeight / 2)) {
        topCoord = window.util.MAX_LOCATION_Y - mainPin.offsetHeight / 2;
      }

      if (leftCoord <= (MIN_LOCATION_X - mainPin.offsetWidth / 2)) {
        leftCoord = MIN_LOCATION_X - mainPin.offsetWidth / 2;
      } else if (leftCoord >= (window.util.map.offsetWidth - mainPin.offsetWidth / 2)) {
        leftCoord = window.util.map.offsetWidth - mainPin.offsetWidth / 2;
      }

      mainPin.style.top = topCoord + 'px';
      mainPin.style.left = leftCoord + 'px';

      adressInput.value = window.util.getPinPosition(mainPin);
    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();
      adressInput.value = window.util.getPinPosition(mainPin);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mainPin.addEventListener('mouseup', onFormActivate);
  mainPin.addEventListener('keydown', onMainPinActivateEnter);

  window.map = {
    setDisabled: setDisabled,
    turnOffMap: turnOffMap,
    adressInput: adressInput,
    mainPin: mainPin,
    escButton: ESC_BUTTON
  };
})();
