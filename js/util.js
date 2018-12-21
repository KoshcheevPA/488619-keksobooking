'use strict';

(function () {
  var ESC_BUTTON = 27;
  var ENTER_BUTTON = 13;
  var DEBOUNCE_INTERVAL = 500;
  var adForm = document.querySelector('.ad-form');

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    escButton: ESC_BUTTON,
    adForm: adForm,
    debounce: debounce,
    enterButton: ENTER_BUTTON
  };
})();
