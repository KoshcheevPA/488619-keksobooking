'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_HEIGHT = 40;
  var DEFAULT_WIDTH = 40;

  var TYPE_PRICE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var defaultAvatar = 'img/muffin-grey.svg';
  var adForm = document.querySelector('.ad-form');
  var avatarInput = adForm.querySelector('.ad-form-header__input');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview');
  var avatarPreviewImg = adForm.querySelector('.ad-form-header__preview img');
  var photoInput = adForm.querySelector('.ad-form__input');
  var photoContainer = adForm.querySelector('.ad-form__photo-container');
  var photoDiv = adForm.querySelector('.ad-form__photo');
  var priceInput = adForm.querySelector('#price');
  var typeSelect = adForm.querySelector('#type');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var guestRoomSelect = adForm.querySelector('#capacity');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var guestsAllOptions = guestRoomSelect.querySelectorAll('option');

  avatarInput.addEventListener('change', function () {
    var fileAvatar = avatarInput.files[0];
    var fileName = fileAvatar.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function() {
        avatarPreviewImg.src = reader.result;
        avatarPreviewImg.width = avatarPreview.offsetWidth;
        avatarPreviewImg.height = avatarPreview.offsetHeight;
        avatarPreview.style = 'padding: 0; border-radius: 5px';
      });

      reader.readAsDataURL(fileAvatar);
    }
  });

  photoInput.addEventListener('change', function () {
    var filePhoto = photoInput.files[0];
    var fileName = filePhoto.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function() {
        var photoBlock = document.createElement('div');
        var photo = document.createElement('img');
        photoBlock.classList.add('ad-form__photo');
        photoBlock.id = 'photo';
        photoContainer.insertBefore(photoBlock, photoDiv);
        photo.setAttribute('src', reader.result);
        photo.width = photoBlock.offsetWidth;
        photo.height = photoBlock.offsetHeight;
        photo.style = 'border-radius: 5px';
        photoBlock.appendChild(photo);
      });
      reader.readAsDataURL(filePhoto);
    }
  });

  priceInput.placeholder = TYPE_PRICE.flat;
  typeSelect.addEventListener('change', function () {
    var price = TYPE_PRICE[typeSelect.value];
    priceInput.min = price;
    priceInput.placeholder = priceInput.min;
  });

  timeInSelect.addEventListener('change', function () {
    timeOutSelect.selectedIndex = timeInSelect.selectedIndex;
  });

  timeOutSelect.addEventListener('change', function () {
    timeInSelect.selectedIndex = timeOutSelect.selectedIndex;
  });

  var setDisabled = function (element) {
    element.setAttribute('disabled', true);
  };

  var removeDisabled = function (element) {
    element.removeAttribute('disabled');
  };

  var guestsNumbersObject = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var getGuestOptions = function (array) {
    guestsAllOptions.forEach(function (option) {
      setDisabled(option);
    });
    array.forEach(function (guestOptions) {
      var guestOptions = guestRoomSelect.querySelector('[value="' + guestOptions + '"]');
      removeDisabled(guestOptions);
    });
  };

  roomNumberSelect.addEventListener('change', function () {
    if (roomNumberSelect.value === '100') {
      guestRoomSelect.value = '0';
    } else {
      guestRoomSelect.value = roomNumberSelect.value;
    }
    getGuestOptions(guestsNumbersObject[roomNumberSelect.value]);
  });

  var main = document.querySelector('main');

  var successElement = document.querySelector('#success').content.querySelector('.success');
  var successMessage = successElement.cloneNode(true);
  var errorElement = document.querySelector('#error').content.querySelector('.error');
  var errorMessage = errorElement.cloneNode(true);
  var errorButton = errorMessage.querySelector('.error__button');


  var closeSuccess = function () {
    main.removeChild(successMessage);
    document.removeEventListener('keydown', closeSuccessEsc);
    document.removeEventListener('click', closeSuccess);
  };

  var closeSuccessEsc = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === window.util.escButton) {
      main.removeChild(successMessage);
      document.removeEventListener('keydown', closeSuccessEsc);
      document.removeEventListener('click', closeSuccess);
    }
  };

  var onSuccessShow = function () {
    document.addEventListener('keydown', closeSuccessEsc);
    document.addEventListener('click', closeSuccess);
    main.appendChild(successMessage);
  };

  var closeError = function () {
    main.removeChild(errorMessage);
    errorMessage.removeEventListener('click', closeError);
    document.removeEventListener('keydown', closeErrorEsc);
    document.removeEventListener('click', closeError);
  };

  var closeErrorEsc = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === window.util.escButton) {
      main.removeChild(errorMessage);
      errorMessage.removeEventListener('click', closeError);
      document.removeEventListener('keydown', closeErrorEsc);
      document.removeEventListener('click', closeError);
    }
  };

  var onErrorShow = function () {
    document.addEventListener('keydown', closeErrorEsc);
    document.addEventListener('click', closeError);
    errorButton.addEventListener('click', closeError);
    main.appendChild(errorMessage);
  };

  var removeMapPins = function () {
    var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPin.forEach(function (pin) {
      if (pin) {
        pin.remove();
      }
    });
  };

  var removeCard = function () {
    var mapCard = document.querySelectorAll('.map__card');
    mapCard.forEach(function (card) {
      if (card) {
        card.remove();
      }
    });
  };

  var resetAvatarPhoto = function () {
    avatarPreviewImg.src = defaultAvatar;
    avatarPreviewImg.width = DEFAULT_WIDTH;
    avatarPreviewImg.height = DEFAULT_HEIGHT;
    avatarPreview.style = '';
  };

  var resetPhotos = function () {
    var housePhotos = adForm.querySelectorAll('#photo');
    housePhotos.forEach(function (photo) {
      photo.remove();
    });
  };

  var resetPage = function () {
    window.map.turnOffMap();
    window.map.setDisabled();
    resetAvatarPhoto();
    resetPhotos();
    window.filter.setDisabledFilter();
    window.util.adForm.reset();
    window.map.adressInput.value = window.pin.getPinPosition(window.map.mainPin);
    removeMapPins();
    removeCard();
  };

  var saveForm = function () {
    resetPage();
    onSuccessShow();
  };
  var getError = function () {
    onErrorShow();
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), saveForm, getError);
  };

  resetButton.addEventListener('click', resetPage);

  adForm.addEventListener('submit', onFormSubmit);

  window.form = {
    removeMapPins: removeMapPins,
    removeCard: removeCard,
    adForm: adForm
  };
})();
