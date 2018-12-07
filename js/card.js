'use strict';

(function () {
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var renderCard = function (object) {
    var cardElement = similarCardTemplate.cloneNode(true);
    cardElement.classList.add('hidden');
    cardElement.querySelector('.popup__title').textContent = object.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = object.offer.adress;
    cardElement.querySelector('.popup__text--price').textContent = object.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' комнаты для ' + object.offer.guest + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = object.offer.description;
    cardElement.querySelector('.popup__avatar').src = object.autor.avatar;

    var featuresList = cardElement.querySelector('.popup__features');
    var featuresItem = featuresList.querySelector('li');
    for (var i = 0; i < object.offer.features.length; i++) {
      featuresItem.textContent = object.offer.features[i];
    }

    var housePhotos = cardElement.querySelector('.popup__photos');
    var housePhoto = cardElement.querySelector('.popup__photo');
    housePhoto.src = object.offer.photos[0];
    for (var j = 1; j < object.offer.photos.length; j++) {
      var photoElement = housePhoto.cloneNode(true);
      photoElement.src = object.offer.photos[j];
      housePhotos.appendChild(photoElement);
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
    addCard: function () {
      var cardFragment = document.createDocumentFragment();
      for (var i = 0; i < window.data.offersArray.length; i++) {
        cardFragment.appendChild(renderCard(window.data.offersArray[i]));
      }
      var mapFilters = document.querySelector('map__filters-container');
      window.util.map.insertBefore(cardFragment, mapFilters);
    }
  };
})();
