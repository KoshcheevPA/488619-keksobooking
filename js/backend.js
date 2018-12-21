'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';

  var makeRequest = function (url, method, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
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
    xhr.open(method, url);
    xhr.send(data);
  };

  var backendLoad = function (onLoad, onError) {
    makeRequest(URL_LOAD, 'GET', onLoad, onError);
  };

  var backendSave = function (data, onLoad, onError) {
    makeRequest(URL_SAVE, 'POST', onLoad, onError, data);
  };

  window.backend = {
    load: backendLoad,
    save: backendSave
  };
})();
