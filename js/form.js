'use strict';

(function () {
  var MIN_BUNGALO_PRICE = 0;
  var MIN_FLAT_PRICE = 1000;
  var MIN_HOUSE_PRICE = 5000;
  var MIN_PALACE_PRICE = 10000;

  var priceInput = window.util.adForm.querySelector('#price');
  var typeSelect = window.util.adForm.querySelector('#type');
  var timeInSelect = window.util.adForm.querySelector('#timein');
  var timeOutSelect = window.util.adForm.querySelector('#timeout');
  var roomNumberSelect = window.util.adForm.querySelector('#room_number');
  var guestRoomSelect = window.util.adForm.querySelector('#capacity');

  var guestsAllOptions = guestRoomSelect.querySelectorAll('option');


  priceInput.placeholder = MIN_FLAT_PRICE;
  typeSelect.addEventListener('change', function () {
    if (typeSelect.value === 'bungalo') {
      priceInput.min = MIN_BUNGALO_PRICE;
    } else if (typeSelect.value === 'flat') {
      priceInput.min = MIN_FLAT_PRICE;
    } else if (typeSelect.value === 'house') {
      priceInput.min = MIN_HOUSE_PRICE;
    } else if (typeSelect.value === 'palace') {
      priceInput.min = MIN_PALACE_PRICE;
    }
    priceInput.placeholder = priceInput.min;
  });

  timeInSelect.addEventListener('change', function () {
    timeOutSelect.selectedIndex = timeInSelect.selectedIndex;
  });

  timeOutSelect.addEventListener('change', function () {
    timeInSelect.selectedIndex = timeOutSelect.selectedIndex;
  });

  var setDisabled = function (element) {
    element.setAttribute('disabled', true);
  };

  var removeDisabled = function (element) {
    element.removeAttribute('disabled');
  };

  var guestsNumbersObject = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var getGuestOptions = function (array) {
    for (var j = 0; j < guestsAllOptions.length; j++) {
      setDisabled(guestsAllOptions[j]);
    }
    for (var i = 0; i < array.length; i++) {
      var guestOptions = guestRoomSelect.querySelector('[value="' + array[i] + '"]');
      removeDisabled(guestOptions);
    }
  };

  roomNumberSelect.addEventListener('change', function () {
    if (roomNumberSelect.value === '100') {
      guestRoomSelect.value = '0';
    } else {
      guestRoomSelect.value = roomNumberSelect.value;
    }
    getGuestOptions(guestsNumbersObject[roomNumberSelect.value]);
  });

  var submitSuccess = function (evt) {
    window.map.turnOffMap();
    window.map.setDisabled();
    window.util.adForm.reset();
    window.map.mainPin.style.left = window.pin.mapPins.offsetWidth / 2 - window.map.mainPin.offsetWidth / 2 + 'px';
    window.map.mainPin.style.top = window.pin.mapPins.offsetHeight / 2 - window.map.mainPin.offsetHeight / 2 + 'px';
    window.map.adressInput.value = window.util.getPinPosition(window.map.mainPin);
    var mapCard = document.querySelectorAll('.map__card');
    var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPin.length; i++) {
      if (mapPin[i]) {
        mapPin[i].remove();
      }
      if (mapCard[i]) {
        mapCard[i].remove();
      }
    }
  };

  var getError = function () {
    console.log(22);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.util.adForm), submitSuccess, getError);
    window.util.adForm.removeEventListener('submit', onFormSubmit);
  };

  window.util.adForm.addEventListener('submit', onFormSubmit);
})();
