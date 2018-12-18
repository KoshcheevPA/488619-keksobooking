'use strict';

(function () {

  var PRICE = {
    LOW: 10000,
    HIGH: 50000
  };

  var defaultValue = 'any';
  var mapFilters = document.querySelector('.map__filters');
  var filtersSelect = mapFilters.querySelectorAll('select');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');
  var housingFeaturesCheckbox = housingFeatures.querySelectorAll('.map__checkbox');

  var setDisabledFilter = function () {
    filtersSelect.forEach(function (element) {
      element.setAttribute('disabled', 'true');
    });
    housingFeaturesCheckbox.forEach(function (input) {
      input.setAttribute('disabled', 'true');
    });
  };

  var removeDisabledFilter = function () {
    filtersSelect.forEach(function (element) {
      element.removeAttribute('disabled', 'true');
    });
    housingFeaturesCheckbox.forEach(function (input) {
      input.removeAttribute('disabled', 'true');
    });
  };

  setDisabledFilter();

  var compareHousingType = function (item) {
    if (item.offer.type === housingType.value) {
      return item.offer.type === housingType.value;
    } else {
      return housingType.value === defaultValue;
    }
  };

  var compareHousingRooms = function (item) {
    if (item.offer.rooms.toString() === housingRooms.value) {
      return item.offer.rooms.toString() === housingRooms.value;
    } else {
      return housingRooms.value === defaultValue;
    }
  };

  var compareHousingGuests = function (item) {
    if (item.offer.guests.toString() === housingGuests.value) {
      return item.offer.guests.toString() === housingGuests.value;
    } else {
      return housingGuests.value === defaultValue;
    }
  };

  var comparePrice = function (item) {
    if (housingPrice.value === 'low') {
      return item.offer.price < PRICE.LOW;
    } else if (housingPrice.value === 'middle') {
      return item.offer.price >= PRICE.LOW && item.offer.price <= PRICE.HIGH;
    } else if (housingPrice.value === 'high') {
      return item.offer.price > PRICE.HIGH;
    } else {
      return housingPrice.value === defaultValue;
    }
  };

  var compareFeatures = function (item) {
    var featuresArray = [];
    var checkedFeatures = housingFeatures.querySelectorAll('.map__checkbox:checked');
    var collectedFeatures = function (checkedInput, element) {
      if (checkedInput.value === element) {
        featuresArray.push(element);
      }
    };

    for (var i = 0; i < checkedFeatures.length; i++) {
      for (var j = 0; j < item.offer.features.length; j++) {
        collectedFeatures(checkedFeatures[i], item.offer.features[j]);
      }
    }
    return featuresArray.length === checkedFeatures.length;
  };

  var onFilterChange = window.debounce(function () {
    window.map.getFilterPins();
  });

  var addFilterChange = function () {
    housingType.addEventListener('change', onFilterChange);
    housingRooms.addEventListener('change', onFilterChange);
    housingGuests.addEventListener('change', onFilterChange);
    housingPrice.addEventListener('change', onFilterChange);
    housingFeaturesCheckbox.forEach(function (it) {
      it.addEventListener('change', onFilterChange);
    });
  };

  addFilterChange();

  var getFilterArray = function (array) {
    var filteredArray = array.filter(function (item) {
      return compareHousingType(item) && compareHousingGuests(item) && compareHousingRooms(item) && comparePrice(item) && compareFeatures(item);
    });

    return filteredArray;
  };

  window.filter = {
    getFilterArray: getFilterArray,
    removeDisabledFilter: removeDisabledFilter
  };


})();
