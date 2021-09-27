
// импортируем класс Popup
import { popupButton,
         addButton,
         classCardsContainer,
         popupEditProfileSelector,
         popupAddSelector,
         popupPhotoSelector,
         userNameSelector,
         userWorkSelector} from "./constant.js";
import { Popup } from './Popup.js';
import { PopupWithForm } from "./PopupWithForm.js";
import {PopupWithImage} from './PopupWithImage.js';
// импортируем класс Card (создание карточек и методы для их обработки)
import { Card } from '../scripts/Card.js';
import { initialElement } from './initial-сards.js';
import { Section } from './Section.js';
import { UserInfo } from './UserInfo.js';
// импортируем класс FormValidator (валидация попапа)
import { FormValidator } from './FormValidator.js';
import { config } from './constant.js';




const popupProfile = new Popup('.popup-userProfile');
const popupAdd = new Popup('.popup-add');





// обработчик клика по карточке
function handleCardClick(userData) {
  const popup = new PopupWithImage({
    data: userData
  }, popupPhotoSelector);
  popup.openPopup();
}


// вызов генерации карточек
const cardList = new Section({
  items: initialElement,
  renderer: (item) => {
    // Создадим экземпляр карточки
    const cardElm = new Card({
      data: item,
      handleCardClick: () => handleCardClick(item)
    }, '.element');
    // Создаём карточку и возвращаем наружу
    const postElement = cardElm.createCard();
    // добавляем карточку в DOM
    cardList.addItem(postElement);
  }
}, classCardsContainer);
// вызов отрисовки всех карточек на странице 
cardList.rendererItem();


const userInfo = new UserInfo({ userNameSelector, userWorkSelector });

// Попап на кнопке Edit
popupButton.addEventListener('click', OpenPopupEditProfile);

// обработчик открытия попапа редактирования профиля
function OpenPopupEditProfile() {
  const popup = new PopupWithForm({
    handleSubmitForm: (item) => {
      userInfo.setUserInfo(item);
      popup.closePopup();
    }
  }, popupEditProfileSelector);

  popup.setInputValues(userInfo.getUserInfo());
  popup.openPopup();
}



// Попап на кнопке Add
addButton.addEventListener('click', OpenPopupAddCard);

// обработчик открытия попапа для добавления карточки
function OpenPopupAddCard() {
  const popup = new PopupWithForm({
    handleSubmitForm: (item) => {
    // Создадим экземпляр карточки
    const cardElm = new Card({
      data: item,
      handleCardClick: () => handleCardClick(item)
    }, '.element');
    // Создаём карточку и возвращаем наружу
    const postElement = cardElm.createCard();
    // добавляем карточку в DOM
    cardList.addItem(postElement);
    popup.closePopup();
    }
  }, popupAddSelector);

  popup.openPopup();
}



// Валидация попапов
const validAdd = new FormValidator(config, popupAdd);
validAdd.enableValidation();

const validEdit = new FormValidator(config, popupProfile);
validEdit.enableValidation();

