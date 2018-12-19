'use strict';

(function () {

  var PRICE = {
    'any': {
      minPrice: 0,
      maxPrice: Infinity
    },
    'low': {
      minPrice: 0,
      maxPrice: 10000
    },
    'middle': {
      minPrice: 10000,
      maxPrice: 50000
    },
    'high': {
      minPrice: 50000,
      maxPrice: Infinity
    }
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
    return item.offer.type === housingType.value || housingType.value === defaultValue;
  };

  var compareHousingRooms = function (item) {
    return item.offer.rooms.toString() === housingRooms.value || housingRooms.value === defaultValue;
  };

  var compareHousingGuests = function (item) {
    return item.offer.guests.toString() === housingGuests.value || housingGuests.value === defaultValue;
  };

  var comparePrice = function (item) {
    var prices = PRICE[housingPrice.value];
    var min = prices.minPrice;
    var max = prices.maxPrice;
    return item.offer.price >= min && item.offer.price <= max;
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

  var onFilterChange = window.util.debounce(function () {
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
