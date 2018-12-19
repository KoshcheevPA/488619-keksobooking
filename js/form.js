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
  var resetButton = window.util.adForm.querySelector('.ad-form__reset');
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

  var main = document.querySelector('main');

  var successElement = document.querySelector('#success').content.querySelector('.success');
  var successMessage = successElement.cloneNode(true);
  var errorElement = document.querySelector('#error').content.querySelector('.error');
  var errorMessage = errorElement.cloneNode(true);
  var errorButton = errorMessage.querySelector('.error__button');


  var closeSuccess = function () {
    main.removeChild(successMessage);
    document.removeEventListener('keydown', closeSuccessEsc);
    document.removeEventListener('click', closeSuccess);
  };

  var closeSuccessEsc = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === window.map.escButton) {
      main.removeChild(successMessage);
      document.removeEventListener('keydown', closeSuccessEsc);
      document.removeEventListener('click', closeSuccess);
    }
  };

  var onSuccessShow = function () {
    document.addEventListener('keydown', closeSuccessEsc);
    document.addEventListener('click', closeSuccess);
    main.appendChild(successMessage);
  };

  var closeError = function () {
    main.removeChild(errorMessage);
    errorMessage.removeEventListener('click', closeError);
    document.removeEventListener('keydown', closeErrorEsc);
    document.removeEventListener('click', closeError);
  };

  var closeErrorEsc = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === window.map.escButton) {
      main.removeChild(errorMessage);
      errorMessage.removeEventListener('click', closeError);
      document.removeEventListener('keydown', closeErrorEsc);
      document.removeEventListener('click', closeError);
    }
  };

  var onErrorShow = function () {
    document.addEventListener('keydown', closeErrorEsc);
    document.addEventListener('click', closeError);
    errorButton.addEventListener('click', closeError);
    main.appendChild(errorMessage);
  };

  var removeMapPins = function () {
    var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPin.length; i++) {
      if (mapPin[i]) {
        mapPin[i].remove();
      }
    }
  };

  var removeCard = function () {
    var mapCard = document.querySelectorAll('.map__card');
    for (var i = 0; i < mapCard.length; i++) {
      if (mapCard[i]) {
        mapCard[i].remove();
      }
    }
  };


  var resetPage = function () {
    window.map.turnOffMap();
    window.map.setDisabled();
    window.util.adForm.reset();
    window.map.mainPin.style.left = window.pin.mapPins.offsetWidth / 2 - window.map.mainPin.offsetWidth / 2 + 'px';
    window.map.mainPin.style.top = window.pin.mapPins.offsetHeight / 2 + window.map.mainPin.offsetHeight / 2 + 'px';
    window.map.adressInput.value = window.util.getPinPosition(window.map.mainPin);
    removeMapPins();
    removeCard();
  };

  var saveForm = function () {
    resetPage();
    onSuccessShow();
  };
  var getError = function () {
    onErrorShow();
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.util.adForm), saveForm, getError);
  };

  resetButton.addEventListener('click', resetPage);

  window.util.adForm.addEventListener('submit', onFormSubmit);

  window.form = {
    removeMapPins: removeMapPins,
    removeCard: removeCard
  };
})();
