
// импортируем класс Popup
import { popupButton, addButton, closeButton, closeButtonAdd } from "./constant.js";
import { Popup } from './Popup.js';
// импортируем класс Card (создание карточек и методы для их обработки)
import { Card } from '../scripts/Card.js';
import { initialElement } from './initial-сards.js';
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
function cardFormSubmitHandler(evt) {
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
}


// вызов функции генерации карточек
initialElement.forEach((item) => {
  // Создадим экземпляр карточки
  const cardElm = new Card(item, '.element');
  // Создаём карточку и возвращаем наружу и добавляем в DOM
  cardElm.renderCard(cardsContainer);
});


// Попап на кнопке Edit
popupButton.addEventListener('click', () => popupProfile.openPopup());
formProfileElement.addEventListener('submit', submitProfileForm);
closeButton.addEventListener('click', () => popupProfile.closePopup());
// Попап на кнопке Add
addButton.addEventListener('click', () => popupAdd.openPopup());
formElementAdd.addEventListener('submit', cardFormSubmitHandler); // функция создания нового элемента/карточки
closeButtonAdd.addEventListener('click', () => popupAdd.closePopup());

// Валидация попапов
const validAdd = new FormValidator(config, popupAdd);
validAdd.enableValidation();

const validEdit = new FormValidator(config, popupProfile);
validEdit.enableValidation();

