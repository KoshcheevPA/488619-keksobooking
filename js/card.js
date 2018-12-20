'use strict';

(function () {
  var OFFER_TYPE = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var renderCard = function (object) {
    var cardElement = similarCardTemplate.cloneNode(true);
    cardElement.classList.add('hidden');
    if (object.offer.title) {
      cardElement.querySelector('.popup__title').textContent = object.offer.title;
    } else {
      cardElement.querySelector('.popup__title').style = 'display: none';
    }

    if (object.offer.address) {
      cardElement.querySelector('.popup__text--address').textContent = object.offer.address;
    } else {
      cardElement.querySelector('.popup__text--address').style = 'display: none';
    }

    if (object.offer.price) {
      cardElement.querySelector('.popup__text--price').textContent = object.offer.price + ' ₽/ночь';
    } else {
      cardElement.querySelector('.popup__text--price').style = 'display: none';
    }

    if (object.offer.rooms && object.offer.guests) {
      cardElement.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
    } else {
      cardElement.querySelector('.popup__text--capacity').style = 'display: none';
    }

    if (object.offer.checkin && object.offer.checkout) {
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
    } else {
      cardElement.querySelector('.popup__text--time').style = 'display: none';
    }

    if (object.offer.description) {
      cardElement.querySelector('.popup__description').textContent = object.offer.description;
    } else {
      cardElement.querySelector('.popup__description').style = 'display: none';
    }

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

    var photosArray = object.offer.photos;
    housePhotos.style = 'display: none';

    if (photosArray.length !== 0) {
      housePhoto.src = photosArray[0];
      for (var j = 1; j < photosArray.length; j++) {
        var photoElement = housePhoto.cloneNode(true);
        photoElement.src = photosArray[j];
        housePhotos.appendChild(photoElement);
        housePhotos.style = 'display: flex';
      }
    }

    cardElement.querySelector('.popup__type').textContent = OFFER_TYPE[object.offer.type];
    return cardElement;
  };

  var addCard = function (cards) {
    var cardFragment = document.createDocumentFragment();
    for (var i = 0; i < cards.length; i++) {
      cardFragment.appendChild(renderCard(cards[i]));
    }
    var mapFiltersContainer = document.querySelector('map__filters-container');
    window.map.map.insertBefore(cardFragment, mapFiltersContainer);
  };

  window.card = {
    addCard: addCard
  };
})();
