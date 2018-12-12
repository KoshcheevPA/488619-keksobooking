'use strict';

(function () {
  var backendLoad = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var URL = 'https://js.dump.academy/keksobooking/data';
    xhr.timeout = 10000;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибки соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', URL);
    xhr.send();
  };

  var backendSave = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var URL = 'https://js.dump.academy/keksobooking';
    xhr.timeout = 10000;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибки соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('POST', URL);
    xhr.send();
  };

  window.backend = {
    load: backendLoad,
    save: backendSave
  };
})();
