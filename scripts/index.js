
// импортируем класс Popup
import { popupButton, addButton, closeButton, closeButtonAdd } from "./constant.js";
import { Popup } from './Popup.js';
// импортируем класс Card
import { Card } from '../scripts/Card.js';
import { initialElement } from './initial-сards.js';


const popup = new Popup('.popup');
const popupAdd = new Popup('.popup-add');


// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
const formElementAdd = document.querySelector('.popup__input-add');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_work');
const placeName = document.querySelector('.popup__input_type_place-name');
const placeImg = document.querySelector('.popup__input_type_place-img');
// Находим контейнер в html для карточек
const element = document.querySelector('.elements');
// Выбериаем элементы, куда должны быть вставлены значения полей
const profileNameInput = document.querySelector('.profile__title');
const profileJobInput = document.querySelector('.profile__text');



// Обработчик «отправки» формы для попапа на кнопе Edit
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы, так мы можем определить свою логику отправки.
  // значение полей jobInput и nameInput из свойства value
  const valNameInput = nameInput.value;
  const valJobInput = jobInput.value;
  // Вставим новые значения с помощью textContent
  profileNameInput.textContent = valNameInput;
  profileJobInput.textContent =  valJobInput;
  // Закрываем попап
  popup._closePopup();
}



// Обработчик «отправки» формы для попапа на кнопе Add
function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  const item_new = {name:placeName.value, link: placeImg.value };
  const newElm = new Card(item_new, '.element');
  // Создаем элемент и добавляем элемент в разметку
  newElm.renderCard(element);
  // Очищаем поля формы
  formElementAdd.reset();
  // Закрываем попап
  popupAdd._closePopup();
}


// вызов функции генерации карточек
initialElement.forEach((item) => {
  // Создадим экземпляр карточки
  const cardElm = new Card(item, '.element');
  // Создаём карточку и возвращаем наружу и добавляем в DOM
  cardElm.renderCard(element);
});


// Попап на кнопке Edit
popupButton.addEventListener('click', () => popup._openPopup());
formElement.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener('click', () => popup._closePopup());
// Попап на кнопке Add
addButton.addEventListener('click', () => popupAdd._openPopup());
formElementAdd.addEventListener('submit', cardFormSubmitHandler); // функция создания нового элемента/карточки
closeButtonAdd.addEventListener('click', () => popupAdd._closePopup());

