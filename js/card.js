'use strict';

(function () {
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var renderCard = function (object) {
    var cardElement = similarCardTemplate.cloneNode(true);
    cardElement.classList.add('hidden');
    cardElement.querySelector('.popup__title').textContent = object.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = object.offer.adress;
    cardElement.querySelector('.popup__text--price').textContent = object.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = object.offer.description;
    cardElement.querySelector('.popup__avatar').src = object.author.avatar;

    var createFeatures = function (features) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < features.length; i++) {
        var featureItem = document.createElement('li');
        featureItem.className = 'popup__feature popup__feature--' + features[i];
        fragment.appendChild(featureItem);
      }
      return fragment;
    };

    var featuresList = cardElement.querySelector('.popup__features');
    featuresList.textContent = '';
    featuresList.appendChild(createFeatures(object.offer.features));

    var housePhotos = cardElement.querySelector('.popup__photos');
    var housePhoto = cardElement.querySelector('.popup__photo');
    housePhoto.src = object.offer.photos[0];

    if (object.offer.photos.length !== 0) {
      for (var j = 1; j < object.offer.photos.length; j++) {
        var photoElement = housePhoto.cloneNode(true);
        photoElement.src = object.offer.photos[j];
        housePhotos.appendChild(photoElement);
      }
    } else {
      housePhotos.style = 'display: none';
    }

    if (object.offer.type === 'flat') {
      cardElement.querySelector('.popup__type').textContent = 'Квартира';
    } else if (object.offer.type === 'bungalo') {
      cardElement.querySelector('.popup__type').textContent = 'Бунгало';
    } else if (object.offer.type === 'house') {
      cardElement.querySelector('.popup__type').textContent = 'Дом';
    } else if (object.offer.type === 'palace') {
      cardElement.querySelector('.popup__type').textContent = 'Дворец';
    }
    return cardElement;
  };

  window.card = {
    addCard: function (array) {
      var cardFragment = document.createDocumentFragment();
      for (var i = 0; i < array.length; i++) {
        cardFragment.appendChild(renderCard(array[i]));
      }
      var mapFilters = document.querySelector('map__filters-container');
      window.util.map.insertBefore(cardFragment, mapFilters);
    }
  };
})();
