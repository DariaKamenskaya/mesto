
// PopUp constant
export const popupEditProfileButton = document.querySelector('.profile__edit-button');
export const closeButton = document.querySelector('.popup__close-user');
export const closeButtonAdd = document.querySelector('.popup__close-add');
export const closeButtonImg = document.querySelector('.popup__close_img');
export const profileAvatar = document.querySelector('.profile__avatar');
export const profileAvatarButton = document.querySelector('.profile__avatar-button');
export const cardsContainer = document.querySelector('.elements');
// Находим кнопку для вызова создания template-элемент
export const addButton = document.querySelector('.profile__add-button');

export const selectorCardsContainer = '.elements';
export const cardSelector = '.element';
export const popupEditProfileSelector = '.popup-user';
export const popupAddSelector = '.popup-add';
export const popupDeleteSelector = '.popup_delete';
export const popupAvatarSelector = '.popup-avatar';
export const userNameSelector = '.profile__title';
export const userWorkSelector = '.profile__text';
export const userImageSelector = '.profile__avatar';
export const popupPhotoSelector = '.popup_img';

export const popupEditProfile = document.querySelector('.popup-user');
export const popupAdd = document.querySelector('.popup-add');
export const popupAvatarChange = document.querySelector('.popup-avatar');


export const buttonSubmitFormEdit = document.querySelector('.popup__submit-btn_edit');
export const buttonSubmitPopupAdd = document.querySelector('.popup__submit-btn_add');
export const buttonSubmitPopupAvatar = document.querySelector('.popup__submit-btn_avatar');

// объект для валидации
export const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-btn",
    inactiveButtonClass: "popup__submit-btn_inactive",
    inputErrorClass: "popup__input_type_error"
  };

// объект для валидации попап для смены картинки пользователя
export const avatarValidationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_inactive-avatar",
  inputErrorClass: "popup__input_type_error"
};

export const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-28';
export const baseToken = 'c9a5b46a-18cc-468c-aca5-c21309b709fb';