'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_HEIGHT = 40;
  var DEFAULT_WIDTH = 40;

  var defaultAvatar = 'img/muffin-grey.svg';
  var avatarInput = window.form.adForm.querySelector('.ad-form-header__input');
  var avatarPreview = window.form.adForm.querySelector('.ad-form-header__preview');
  var avatarPreviewImg = window.form.adForm.querySelector('.ad-form-header__preview img');
  var photoInput = window.form.adForm.querySelector('.ad-form__input');
  var photoContainer = window.form.adForm.querySelector('.ad-form__photo-container');
  var photoDiv = window.form.adForm.querySelector('.ad-form__photo');

  avatarInput.addEventListener('change', function () {
    var fileAvatar = avatarInput.files[0];
    var fileName = fileAvatar.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreviewImg.src = reader.result;
        avatarPreviewImg.width = avatarPreview.offsetWidth;
        avatarPreviewImg.height = avatarPreview.offsetHeight;
        avatarPreviewImg.style = 'border-radius: 5px';
        avatarPreview.style = 'padding: 0';
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

      reader.addEventListener('load', function () {
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

  var resetAvatarPhoto = function () {
    avatarPreviewImg.src = defaultAvatar;
    avatarPreviewImg.width = DEFAULT_WIDTH;
    avatarPreviewImg.height = DEFAULT_HEIGHT;
    avatarPreview.style = '';
  };

  var resetPhotos = function () {
    var housePhotos = window.form.adForm.querySelectorAll('#photo');
    housePhotos.forEach(function (photo) {
      photo.remove();
    });
  };

  window.file = {
    resetAvatarPhoto: resetAvatarPhoto,
    resetPhotos: resetPhotos
  };
})();
