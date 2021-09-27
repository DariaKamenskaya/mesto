
// импортируем класс Popup
import { popupButton,
         addButton,
         closeButton,
         closeButtonAdd,
         classCardsContainer,
         popupEditProfileSelector,
         popupAddSelector } from "./constant.js";
import { Popup } from './Popup.js';
import { PopupWithForm } from "./PopupWithForm.js";
// импортируем класс Card (создание карточек и методы для их обработки)
import { Card } from '../scripts/Card.js';
import { initialElement } from './initial-сards.js';
import { Section } from './Section.js';
// импортируем класс FormValidator (валидация попапа)
import { FormValidator } from './FormValidator.js';
import { config } from "./constant.js";



// const popup = new Popup('.popup');
const popupProfile = new Popup('.popup-userProfile');
const popupAdd = new Popup('.popup-add');


// Находим форму в DOM
const formProfileElement = document.querySelector('.popup__form_users');
// const formElement = document.querySelector('.popup__form_users');
const formElementAdd = document.querySelector('.popup__input-add');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_work');
const placeName = document.querySelector('.popup__input_type_place-name');
const placeImg = document.querySelector('.popup__input_type_place-img');
// Находим контейнер в html для карточек
const cardsContainer = document.querySelector('.elements');
// Выбериаем элементы, куда должны быть вставлены значения полей
const profileNameInput = document.querySelector('.profile__title');
const profileJobInput = document.querySelector('.profile__text');



// Обработчик «отправки» формы для попапа на кнопе Edit
function submitProfileForm (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы, так мы можем определить свою логику отправки.
  // значение полей jobInput и nameInput из свойства value
  const valNameInput = nameInput.value;
  const valJobInput = jobInput.value;
  // Вставим новые значения с помощью textContent
  profileNameInput.textContent = valNameInput;
  profileJobInput.textContent =  valJobInput;
  // Закрываем попап
  popupProfile.closePopup();
}



// Обработчик «отправки» формы для попапа на кнопе Add
/* function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  const item_new = {name:placeName.value, link: placeImg.value };
  const newElm = new Card(item_new, '.element');
  // Создаем элемент и добавляем элемент в разметку
  newElm.renderCard(cardsContainer);
  // Очищаем поля формы
  formElementAdd.reset();
  // Деактивируем кнопку сабмита
  formElementAdd.classList.add(config.inactiveButtonClass);
  formElementAdd.setAttribute("disabled", "disabled");
  // Закрываем попап
  popupAdd.closePopup();
} */


// вызов генерации карточек
const cardList = new Section({
  items: initialElement,
  renderer: (item) => {
    // Создадим экземпляр карточки
    const cardElm = new Card(item, '.element');
    // Создаём карточку и возвращаем наружу
    const postElement = cardElm.createCard();
    // добавляем карточку в DOM
    cardList.addItem(postElement);
  }
}, classCardsContainer);
// вызов отрисовки всех карточек на странице 
cardList.rendererItem();




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

/*popupButton.addEventListener('click', () => {
  nameInput.value = profileNameInput.textContent;
  jobInput.value = profileJobInput.textContent;
  popupProfile.openPopup();
});
formProfileElement.addEventListener('submit', submitProfileForm);
popupProfile.setEventListeners();*/

// Попап на кнопке Add
addButton.addEventListener('click', OpenPopupAddCard);

// обработчик открытия попапа для добавления карточки
function OpenPopupAddCard() {
  const popup = new PopupWithForm({
    handleSubmitForm: (item) => {
    // Создадим экземпляр карточки
    const cardElm = new Card(item, '.element');
    // Создаём карточку и возвращаем наружу
    const postElement = cardElm.createCard();
    // добавляем карточку в DOM
    cardList.addItem(postElement);
    popup.closePopup();
    }
  }, popupAddSelector);

  popup.openPopup();
}

/* addButton.addEventListener('click', () => popupAdd.openPopup());
formElementAdd.addEventListener('submit', cardFormSubmitHandler); // функция создания нового элемента/карточки
popupAdd.setEventListeners(); */

// Валидация попапов
const validAdd = new FormValidator(config, popupAdd);
validAdd.enableValidation();

const validEdit = new FormValidator(config, popupProfile);
validEdit.enableValidation();

