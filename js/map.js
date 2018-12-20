'use strict';

(function () {
  var MIN_LOCATION_X = 0;
  var ENTER_BUTTON = 13;
  var filterArray;
  var formHeader = window.util.adForm.querySelector('.ad-form-header');
  var formElement = window.util.adForm.querySelectorAll('.ad-form__element');
  var adressInput = document.querySelector('#address');

  var setDisabled = function () {
    formHeader.setAttribute('disabled', 'true');
    for (var k = 0; k < formElement.length; k++) {
      formElement[k].setAttribute('disabled', 'true');
    }
  };

  var removeDisabled = function () {
    formHeader.removeAttribute('disabled', 'true');
    for (var t = 0; t < formElement.length; t++) {
      formElement[t].removeAttribute('disabled', 'true');
    }
  };

  var mainPin = document.querySelector('.map__pin--main');
  adressInput.value = window.util.mapBlockWidth / 2 + ', ' + window.util.mapBlockHeight / 2;

  var turnOffMap = function () {
    adressInput.value = window.util.getPinPosition(mainPin);
    window.util.map.classList.add('map--faded');
    window.util.adForm.classList.add('ad-form--disabled');
    mainPin.style.left = window.pin.mapPins.offsetWidth / 2 - window.map.mainPin.offsetWidth / 2 + 'px';
    mainPin.style.top = window.pin.mapPins.offsetHeight / 2 + window.map.mainPin.offsetHeight / 2 + 'px';
    mainPin.addEventListener('mouseup', onFormActivate);
    mainPin.addEventListener('keydown', onMainPinActivateEnter);
  };

  setDisabled();


  var onFormActivate = function () {
    window.backend.load(onLoad, 'Ошибка');
    window.util.map.classList.remove('map--faded');
    window.util.adForm.classList.remove('ad-form--disabled');

    removeDisabled();
    adressInput.value = window.util.getPinPosition(mainPin);
    mainPin.removeEventListener('mouseup', onFormActivate);
  };

  var getFilterPins = function () {
    var filteredPins = window.filter.getFilterArray(filterArray);
    window.form.removeMapPins();
    window.form.removeCard();
    window.pin.getNewPin(filteredPins);
  };

  var onLoad = function (array) {
    window.filter.removeDisabledFilter();
    window.pin.getNewPin(array);
    filterArray = array;
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

      var minY = window.util.MIN_LOCATION_Y - mainPin.offsetHeight / 2;
      var maxY = window.util.MAX_LOCATION_Y - mainPin.offsetHeight / 2;
      var minX = MIN_LOCATION_X - mainPin.offsetWidth / 2;
      var maxX = window.util.map.offsetWidth - mainPin.offsetWidth / 2;

      if (topCoord <= minY) {
        topCoord = minY;
      } else if (topCoord >= maxY) {
        topCoord = maxY;
      }

      if (leftCoord <= minX) {
        leftCoord = minX;
      } else if (leftCoord >= maxX) {
        leftCoord = maxX;
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
    getFilterPins: getFilterPins
  };
})();
