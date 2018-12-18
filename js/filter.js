'use strict';

(function () {

  var PRICE = {
    'any': [0, Infinity],
    'low': [0, 10000],
    'middle': [10000, 50000],
    'high': [50000, Infinity]
  };

  var defaultValue = 'any';
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');
  var housingFeaturesCheckbox = housingFeatures.querySelectorAll('.map__checkbox');

  var compareHousingType = function (item) {
    if (item.offer.type === housingType.value) {
      return item.offer.type === housingType.value;
    } else {
      return housingType.value === defaultValue;
    }
  };

  var compareHousingRooms = function (item) {
    if (item.offer.rooms === housingRooms.value) {
      return item.offer.rooms === housingRooms.value;
    } else {
      return housingRooms.value === defaultValue;
    }
  };

  var compareHousingGuests = function (item) {
    if (item.offer.guests === housingGuests.value) {
      return item.offer.guests === housingGuests.value;
    } else {
      return housingGuests.value === defaultValue;
    }
  };

  var onFilterChange = function () {
    window.map.getFilterPins();
  };

  var addFilterChange = function () {
    housingType.addEventListener('change', onFilterChange);
    console.log('change');
  };

  addFilterChange();

  var getFilterArray = function (array) {
    var filteredArray = array.filter(function (item) {
      return compareHousingType(item);
    });

    return filteredArray;
  };

  window.filter = {
    getFilterArray: getFilterArray
  };


})();
