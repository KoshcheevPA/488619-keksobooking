'use strict';

(function () {
  var TYPE_PRICE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var adForm = document.querySelector('.ad-form');
  var priceInput = adForm.querySelector('#price');
  var typeSelect = adForm.querySelector('#type');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var guestRoomSelect = adForm.querySelector('#capacity');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var guestsAllOptions = guestRoomSelect.querySelectorAll('option');

  priceInput.placeholder = TYPE_PRICE.flat;
  typeSelect.addEventListener('change', function () {
    var price = TYPE_PRICE[typeSelect.value];
    priceInput.min = price;
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
    guestsAllOptions.forEach(function (option) {
      setDisabled(option);
    });
    array.forEach(function (guestOption) {
      var guestOptions = guestRoomSelect.querySelector('[value="' + guestOption + '"]');
      removeDisabled(guestOptions);
    });
  };
  getGuestOptions(guestsNumbersObject[roomNumberSelect.value]);

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
    if (evt.keyCode === window.util.escButton) {
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
    if (evt.keyCode === window.util.escButton) {
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
    mapPin.forEach(function (pin) {
      if (pin) {
        pin.remove();
      }
    });
  };

  var removeCard = function () {
    var mapCard = document.querySelectorAll('.map__card');
    mapCard.forEach(function (card) {
      if (card) {
        card.remove();
      }
    });
  };

  var resetPage = function () {
    window.map.turnOffMap();
    window.map.setDisabled();
    window.file.resetAvatarPhoto();
    window.file.resetPhotos();
    window.filter.setDisabledFilter();
    window.util.adForm.reset();
    window.map.adressInput.value = window.pin.getPinPosition(window.map.mainPin);
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
    window.backend.save(new FormData(adForm), saveForm, getError);
  };

  resetButton.addEventListener('click', resetPage);

  adForm.addEventListener('submit', onFormSubmit);

  window.form = {
    removeMapPins: removeMapPins,
    removeCard: removeCard,
    adForm: adForm
  };
})();
