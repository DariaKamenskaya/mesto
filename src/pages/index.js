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
         config,
         baseUrl,
         baseToken,
         profileAvatar,
         CardsContainer,
         popupDeleteSelector} from "../utils/constant.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import {PopupWithImage} from '../components/PopupWithImage.js';
import { PopupDelete } from "../components/PopupDelete.js";
// импортируем класс Card (создание карточек и методы для их обработки)
import { Card } from '../components/Card.js';
// import { initialElement } from '../utils/initial-сards.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
// импортируем класс FormValidator (валидация попапа)
import { FormValidator } from '../components/FormValidator.js';
// импортируем класс для работы с сервером
import { API } from '../components/Api.js';
// для сборки под вебпаком импорт стилей
import './index.css'; // добавьте импорт главного файла стилей 



// Валидация попапов
const validAdd = new FormValidator(config, popupAdd);
validAdd.enableValidation();

const validEdit = new FormValidator(config, popupEditProfile);
validEdit.enableValidation();

// создаем попап картинки по клику
const popupImg = new PopupWithImage( popupPhotoSelector);

// создаем попап удаления карточки
const popupDelete = new PopupDelete( {
  handleSubmitForm: (Card) => {
    // удаляем карточку на сервере
    apiData.deleteCard(Card)
    .then()
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
      return [];
    }); 
  }
} ,popupDeleteSelector);

// создаем попап редактирования данных пользователя
const popupEdit = new PopupWithForm({
  handleSubmitForm: (item) => {
    userInfo.setUserInfo(item);
    popupEdit.closePopup();
    // передаем данные на сервер
    apiData.patchUserData(item)
    .then()
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
      return [];
    }); 
  }
}, popupEditProfileSelector);


// создаем попап для добавления новой карточки
  const popupAddNew = new PopupWithForm({
    handleSubmitForm: (item) => {
      // передаем данные на сервер
      apiData.postCard(item)
      .then(res => {
      // Создадим экземпляр карточки
      console.log(res);
      const postElement = newCard(res, userInfo.getUserInfo());
    // добавляем карточку в DOM
      CardsContainer.prepend(postElement);
      popupAddNew.closePopup();
      })
      .catch((err) => {
        console.log(err); // "Что-то пошло не так: ..."
        return [];
      });
    }
  }, popupAddSelector);

// обработчик клика по карточке
function handleCardClick(userData) {
  popupImg.openPopup(userData);
}

// обработчик открытия попапа для удаления карточки
function handleDeleteClick(item) {
  console.log(item);
  popupDelete.openPopup(item._id);
}

// обработчик удаления карточки
function handleDeleteCard(idCard) {
  apiData.deleteCard(idCard);
}

// функция создания карточек
function newCard(item, userInfoData) {
  // Создадим экземпляр карточки
  const cardElm = new Card({
   data: item,
   handleCardClick: () => handleCardClick(item),
   handleDeleteClick: () => handleDeleteClick(item),
   handleDeleteCard: () => handleDeleteCard(item._id),
   userData: userInfoData
   }, '#element-template');
 // Создаём карточку и возвращаем наружу
 return cardElm.createCard();
}

// API для получение данных
const apiData = new API(baseUrl,baseToken);

// создание начальных карточек
apiData.getInitialCards()
  .then(initialElm => {
    // вызов генерации карточек
    console.log(initialElm);
    const cardList = new Section({
      items: initialElm,
      renderer: (item) => {
        // cоздаём карточку
        const postElement = newCard(item, userInfo.getUserInfo());
        // добавляем карточку в DOM
        cardList.addItem(postElement);
      }
    }, classCardsContainer);
    // вызов отрисовки всех карточек на странице 
    cardList.rendererItem();
  })
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
    return [];
  }); 



  const userInfo = new UserInfo({ userNameSelector, userWorkSelector });

// начальные данные пользователя
  apiData.getUserData()
  .then(userData => {
    // добавление имени пользователя и работы
    userInfo.setUserInfo(userData);
    // добавление картинки пользователя
    profileAvatar.src = userData.avatar;
    profileAvatar.alt = userData.name; 
  })
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
    return [];
  }); 



// Попап на кнопке Edit
popupButton.addEventListener('click', openPopupEditProfile);

// обработчик открытия попапа редактирования профиля
function openPopupEditProfile() {
  popupEdit.setInputValues(userInfo.getUserInfo());
  validEdit.resetValidation();
  popupEdit.openPopup();
}



// Попап на кнопке Add
addButton.addEventListener('click', openPopupAddCard);


// обработчик открытия попапа для добавления карточки
function openPopupAddCard() {
  validAdd.resetValidation();
  popupAddNew.openPopup();
}





