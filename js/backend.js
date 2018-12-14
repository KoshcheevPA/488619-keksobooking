'use strict';

(function () {
  var urlLoad = 'https://js.dump.academy/keksobooking/data';
  var backendLoad = function (onLoad, onError) {
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
    xhr.open('GET', urlLoad);
    xhr.send();
  };

  var urlSave = 'https://js.dump.academy/keksobooking';
  var backendSave = function (data, onLoad, onError) {
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

    xhr.open('POST', urlSave);
    xhr.send(data);
  };

  window.backend = {
    load: backendLoad,
    save: backendSave
  };
})();
