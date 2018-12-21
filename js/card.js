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
    var cardTitle = cardElement.querySelector('.popup__title');
    var cardAddress = cardElement.querySelector('.popup__text--address');
    var cardPrice = cardElement.querySelector('.popup__text--price');
    var cardCapacity = cardElement.querySelector('.popup__text--capacity');
    var cardTime = cardElement.querySelector('.popup__text--time');
    var cardDescription = cardElement.querySelector('.popup__description');
    var cardAvatar = cardElement.querySelector('.popup__avatar');
    var cardType = cardElement.querySelector('.popup__type');

    cardElement.classList.add('hidden');

    if (object.offer.title) {
      cardTitle.textContent = object.offer.title;
    } else {
      cardTitle.style = 'display: none';
    }

    if (object.offer.address) {
      cardAddress.textContent = object.offer.address;
    } else {
      cardAddress.style = 'display: none';
    }

    if (object.offer.price) {
      cardPrice.textContent = object.offer.price + ' ₽/ночь';
    } else {
      cardPrice.style = 'display: none';
    }

    if (object.offer.rooms && object.offer.guests) {
      cardCapacity.textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
    } else {
      cardCapacity.style = 'display: none';
    }

    if (object.offer.checkin && object.offer.checkout) {
      cardTime.textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
    } else {
      cardTime.style = 'display: none';
    }

    if (object.offer.description) {
      cardDescription.textContent = object.offer.description;
    } else {
      cardDescription.style = 'display: none';
    }

    cardAvatar.src = object.author.avatar;

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

    cardType.textContent = OFFER_TYPE[object.offer.type];

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
