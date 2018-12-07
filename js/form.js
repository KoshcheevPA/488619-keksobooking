'use strict';

(function () {

  var priceInput = adForm.querySelector('#price');
  var typeSelect = adForm.querySelector('#type');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var guestRoomSelect = adForm.querySelector('#capacity');

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
})();
