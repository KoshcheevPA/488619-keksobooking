'use strict';

(function () {
  var MIN_LOCATION_Y = 130;
  var MAX_LOCATION_Y = 630;
  var MIN_LOCATION_X = 0;
  var mapBlock = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var filterArray;
  var formHeader = window.form.adForm.querySelector('.ad-form-header');
  var formElements = window.form.adForm.querySelectorAll('.ad-form__element');
  var adressInput = document.querySelector('#address');

  var setDisabled = function () {
    formHeader.setAttribute('disabled', 'true');
    formElements.forEach(function (element) {
      element.setAttribute('disabled', 'true');
    });
  };

  var removeDisabled = function () {
    formHeader.removeAttribute('disabled', 'true');
    formElements.forEach(function (element) {
      element.removeAttribute('disabled', 'true');
    });
  };

  var mainPin = document.querySelector('.map__pin--main');
  adressInput.value = mapBlock.offsetWidth / 2 + ', ' + mapBlock.offsetHeight / 2;

  var turnOffMap = function () {
    adressInput.value = window.pin.getPinPosition(mainPin);
    map.classList.add('map--faded');
    window.form.adForm.classList.add('ad-form--disabled');
    mainPin.style.left = window.pin.mapPins.offsetWidth / 2 - window.map.mainPin.offsetWidth / 2 + 'px';
    mainPin.style.top = window.pin.mapPins.offsetHeight / 2 + window.map.mainPin.offsetHeight / 2 + 'px';
    mainPin.addEventListener('mouseup', onFormActivate);
    mainPin.addEventListener('keydown', onMainPinActivateEnter);
  };

  setDisabled();


  var onFormActivate = function () {
    window.backend.load(onLoad, 'Ошибка');
    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');

    removeDisabled();
    adressInput.value = window.pin.getPinPosition(mainPin);
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
    if (evt.keyCode === window.util.enterButton) {
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

      var minY = MIN_LOCATION_Y - mainPin.offsetHeight / 2;
      var maxY = MAX_LOCATION_Y - mainPin.offsetHeight / 2;
      var minX = MIN_LOCATION_X - mainPin.offsetWidth / 2;
      var maxX = map.offsetWidth - mainPin.offsetWidth / 2;

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

      adressInput.value = window.pin.getPinPosition(mainPin);
    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();
      adressInput.value = window.pin.getPinPosition(mainPin);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mainPin.addEventListener('mouseup', onFormActivate);
  mainPin.addEventListener('keydown', onMainPinActivateEnter);

  window.map = {
    map: map,
    setDisabled: setDisabled,
    turnOffMap: turnOffMap,
    adressInput: adressInput,
    mainPin: mainPin,
    getFilterPins: getFilterPins
  };
})();
