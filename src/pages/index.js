// импортируем класс Popup
import { popupEditProfileButton,
         addButton,
         selectorCardsContainer,
         popupEditProfileSelector,
         popupEditProfile,
         buttonSubmitFormEdit,
         popupAddSelector,
         popupAdd,
         buttonSubmitPopupAdd,
         popupPhotoSelector,
         userNameSelector,
         userWorkSelector,
         userImageSelector,
         validationConfig,
         baseUrl,
         baseToken,
         popupDeleteSelector,
         popupAvatarSelector,
         profileAvatarButton,
         popupAvatarChange,
         avatarValidationConfig,
         buttonSubmitPopupAvatar } from "../utils/constant.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import {PopupWithImage} from '../components/PopupWithImage.js';
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
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
// переменная для хранения id пользователя
let userId


// Валидация попапов
const validAdd = new FormValidator(validationConfig, popupAdd);
validAdd.enableValidation();

const validEdit = new FormValidator(validationConfig, popupEditProfile);
validEdit.enableValidation();

const validAvatarChange = new FormValidator(avatarValidationConfig, popupAvatarChange);
validAvatarChange.enableValidation();

//данные пользователя
const userInfo = new UserInfo({ userNameSelector, userWorkSelector, userImageSelector });

// API для получение данных
const apiData = new API(baseUrl,baseToken);

// контейнер карточек
const cardList = new Section({
  items: [],
  renderer: (item) => {
      // cоздаём карточку
      const postElement = createCard(item, userId);
      // добавляем карточку в DOM
      cardList.addItem(postElement);
  }
}, selectorCardsContainer);


// создаем попап картинки по клику
const popupImg = new PopupWithImage( popupPhotoSelector);

// создаем попап удаления карточки
const popupDelete = new PopupWithConfirmation(popupDeleteSelector);

// создаем попап редактирования данных пользователя
const popupEdit = new PopupWithForm({
  handleSubmitForm: (item) => {
    // собщение о загрузке
    renderLoading(buttonSubmitFormEdit, 'Сохранение...')
    // передаем данные на сервер
    apiData.setUserData(item)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEdit.closePopup();
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
      return [];
    }) 
    .finally(() => {
      // собщение о загрузке// очень быстрый процесс, может здесь стоит убрать изменение текста кнопки
      renderLoading(buttonSubmitFormEdit, 'Сохранить')
    });
  }
}, popupEditProfileSelector);


// создаем попап для добавления новой карточки
const popupAddNew = new PopupWithForm({
  handleSubmitForm: (item) => {
    // собщение о загрузке
    renderLoading(buttonSubmitPopupAdd, 'Создание...')
    // передаем данные на сервер
    apiData.postCard(item)
    .then(res => {
      // Создадим экземпляр карточки
      const cardElement = createCard(res, userId);
      // добавляем карточку в DOM
      cardList.addItem(cardElement);
      popupAddNew.closePopup();
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
      return [];
    })
    .finally(() => {
      // собщение об окончании загрузки
      renderLoading(buttonSubmitPopupAdd, 'Создать')
    });
  }
}, popupAddSelector);


  // создаем попап для редактирования профиля
const popupChangeAvatar = new PopupWithForm({
  handleSubmitForm: (item) => {
    // собщение о загрузке
    renderLoading(buttonSubmitPopupAvatar, 'Сохранение...')
    // передаем данные на сервер
    apiData.patchAvatar(item)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupChangeAvatar.closePopup();
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
      return [];
    })
    .finally(() => {
      // собщение об окончании загрузки
      renderLoading(buttonSubmitPopupAvatar, 'Сохранить')
    });
  }
}, popupAvatarSelector);


// обработчик клика по карточке
function handleCardClick(userData) {
  popupImg.openPopup(userData);
}

// обработчик клика по карточке
function handleSubmitDeleteCard(item, cardElm) {
  apiData.deleteCard(item._id)
  .then(() => {
    cardElm.removeCard();
    popupDelete.closePopup();
  })
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
    return [];
  });
} 


// функция создания карточек
function createCard(item, userId) {
  // Создадим экземпляр карточки
  const cardElm = new Card({
   data: item,
   handleCardClick: () => handleCardClick(item),
   handleDeleteClick: () =>  {
    popupDelete.setSubmitAction(function () {handleSubmitDeleteCard(item, cardElm)});
    popupDelete.openPopup();
   },
   handleLikeClick: () => {
    const likeStatus = cardElm.isLiked();
    apiData.changeLikeCardStatus(item._id, likeStatus)
    .then((res) => {
      cardElm.setLikesInfo(res.likes,likeStatus);
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
  },
   userData: userId
  }, '#element-template');
 // Создаём карточку и возвращаем наружу
  return cardElm.newCard();
}



Promise.all([
  apiData.getInitialCards(),
  apiData.getUserData()
])
.then((values)=>{ //попадаем сюда когда оба промиса будут выполнены
  // добавление имени пользователя и работы
  userInfo.setUserInfo(values[1]);
  userId = values[1]._id;
  // вызов отрисовки всех карточек на странице 
  cardList.renderItems(values[0]);
})
.catch((err)=>{ 
  console.log(err); // "Что-то пошло не так: ..."
  return [];
});



// Попап на кнопке Edit
popupEditProfileButton.addEventListener('click', openPopupEditProfile);

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


// Попап на смену картинки
profileAvatarButton.addEventListener('click', openPopupAvatarChange);

// обработчик открытия попапа для добавления карточки
function openPopupAvatarChange() {
  validAvatarChange.resetValidation();
  popupChangeAvatar.openPopup();
}

// функция для уведомления пользователя о процессе загрузки
function renderLoading(button, text) {
  button.textContent = text;
}



