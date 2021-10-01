// импортируем класс Popup
import { popupButton,
         addButton,
         classCardsContainer,
         popupEditProfileSelector,
         popupEditProfile,
         buttonSubmitFormEdit,
         popupAddSelector,
         popupAdd,
         buttonSubmitPopupAdd,
         popupPhotoSelector,
         userNameSelector,
         userWorkSelector,
         config} from "../utils/constant.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import {PopupWithImage} from '../components/PopupWithImage.js';
// импортируем класс Card (создание карточек и методы для их обработки)
import { Card } from '../components/Card.js';
import { initialElement } from '../utils/initial-сards.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
// импортируем класс FormValidator (валидация попапа)
import { FormValidator } from '../components/FormValidator.js';
// для сборки под вебпаком импорт стилей
import './index.css'; // добавьте импорт главного файла стилей 



// Валидация попапов
const validAdd = new FormValidator(config, popupAdd);
validAdd.enableValidation();

const validEdit = new FormValidator(config, popupEditProfile);
validEdit.enableValidation();

// создаем попап картинки по клику
const popupImg = new PopupWithImage( popupPhotoSelector);

// создаем попап редактирования данных пользователя
const popupEdit = new PopupWithForm({
  handleSubmitForm: (item) => {
    userInfo.setUserInfo(item);
    popupEdit.closePopup();
  }
}, popupEditProfileSelector);

// создаем попап для добавления новой карточки
const popupAddNew = new PopupWithForm({
  handleSubmitForm: (item) => {
  // Создадим экземпляр карточки
  const cardElm = new Card({
    data: item,
    handleCardClick: () => handleCardClick(item)
  }, '#element-template');
  // Создаём карточку и возвращаем наружу
  const postElement = cardElm.createCard();
  // добавляем карточку в DOM
  cardList.addItem(postElement);
  popupAddNew.closePopup();
  }
}, popupAddSelector);


// обработчик клика по карточке
function handleCardClick(userData) {
  popupImg.openPopup(userData);
}


// вызов генерации карточек
const cardList = new Section({
  items: initialElement,
  renderer: (item) => {
    // Создадим экземпляр карточки
    const cardElm = new Card({
      data: item,
      handleCardClick: () => handleCardClick(item)
    }, '#element-template');
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
popupButton.addEventListener('click', openPopupEditProfile);

// обработчик открытия попапа редактирования профиля
function openPopupEditProfile() {
  popupEdit.setInputValues(userInfo.getUserInfo());
  validEdit.resetValidation();
  //buttonOnActive(buttonSubmitFormEdit);
  popupEdit.openPopup();
}



// Попап на кнопке Add
addButton.addEventListener('click', openPopupAddCard);


// обработчик открытия попапа для добавления карточки
function openPopupAddCard() {
  validAdd.resetValidation();
  //buttonOnDisabled(buttonSubmitFormEdit);
  popupAddNew.openPopup();
}





