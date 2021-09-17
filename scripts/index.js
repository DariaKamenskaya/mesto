
// импортируем класс Popup
import { popupButton, addButton, closeButton, closeButtonAdd } from "./constant.js";
import { Popup } from './Popup.js';
// импортируем класс Card
import { Card } from '../scripts/Card.js';
import { initialElement } from './initial-сards.js';

// const popupButton = document.querySelector('.profile__edit-button');
// const popupButton = new Popup('.profile__edit-button');
// const closeButton = document.querySelector('.popup__close');
// const closeButton = new Popup('.popup__close');
// const popup = document.querySelector('.popup');
const popup = new Popup('.popup');
// const popupAdd = document.querySelector('.popup-add');
const popupAdd = new Popup('.popup-add');
// const closeButtonAdd = document.querySelector('.popup__close-add');
// const closeButtonAdd  = new Popup('.popup__close-add');
// const popupImg = document.querySelector('.popup_img');
const popupImg = new Popup('.popup_img');
// const closeButtonImg = document.querySelector('.popup__close_img');
// const closeButtonImg = new Popup('.popup__close_img');


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
// Находим кнопку для вызова создания template-элемент
// const addButton = document.querySelector('.profile__add-button');
// Выбериаем элементы, куда должны быть вставлены значения полей
const profileNameInput = document.querySelector('.profile__title');
const profileJobInput = document.querySelector('.profile__text');

// функция открытия попапа
/* function openPopup(pop) {
  pop.classList.add('popup_is-opened');
} */

// функция закрытия попапа
/* function closePopup(pop) {
  pop.classList.remove('popup_is-opened');
} */

// функция  окрашивания лайка
/* function handleLikeIcon(evt) {
  evt.target.classList.toggle('element__heart-button-active');
}  */

// функция удаления карточки/элемента
/* function handleDeleteCard(e) {
    e.target.closest('.element').remove();
}  */

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
  // closePopup(popup);
}

// функция создания элементов/карточек
/*function createCard (elm) {
  //  1. Клонировать из шаблона элемент
  const newElement = document.querySelector('#element-template').content.querySelector('.element').cloneNode(true);
  //  2. Найти в элементе и записать в переменные кнопку лайка,удаления и картинку
  const likeButton = newElement.querySelector('.element__heart-button'); //нашли лайк карточки
  const deleteButton = newElement.querySelector('.element__remove-button'); //нашли кнопку удаления карточки
  const cardImage = newElement.querySelector('.element__image'); //нашли картинку карточки
  //  3. Задать данные картинке
  const cardTitle = newElement.querySelector('.element__title');
  cardTitle.textContent = elm.name;
  cardImage.alt = elm.name;
  cardImage.src = elm.link;
  //  4. Повесить на кнопки и картинку слушатели , где внутри есть функции обработчики.В обработчик картинки прокинуть данные карточки
  likeButton.addEventListener('click', handleLikeIcon);
  deleteButton.addEventListener('click', handleDeleteCard);
  cardImage.addEventListener('click', () => handlePreviewPicture(cardTitle, cardImage));
  //   5. Вернуть DOM элемент.
  return newElement; 
}  */

// функция открытия попапа по картинке
/* function handlePreviewPicture(title, img) {
  openPopup(popupImg);
  popupImg.querySelector('.popup__title').textContent = title.textContent;
  popupImg.querySelector('.popup__image').alt = img.alt;
  popupImg.querySelector('.popup__image').src = img.src;
} */

// функция добавления элемента/карточки в контейнер
/*function renderCard(data, wrap) {
  wrap.prepend(createCard(data));
 } */

// Начальная инициализация карточек
/* initialElement.forEach((card) => {
  renderCard(card, element)
 });  */

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

// функция закрытия открытого попапа (для клика по оверлею)
/* function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    closePopup(evt.target);					
  }
} */

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
// Попап на картинке
// closeButtonImg.addEventListener("click", () => closePopup(popupImg));
// Закрытие попапа по клику на оверлей
// popup.addEventListener('click', () => popup._closePopupOverlay());
// popupAdd.addEventListener('click', () => popupAdd.closePopupOverlay());
// Закрытие попапа нажатием на Esc
/* document.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape' && popup.classList.contains('popup_is-opened')) {
    popup.classList.remove('popup_is-opened');
 } 
  if (evt.key === 'Escape' && popupAdd.classList.contains('popup_is-opened')) {
    popupAdd.classList.remove('popup_is-opened');
} 
}); */
