const popupButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup-add');
const closeButtonAdd = document.querySelector('.popup__close-add');
const popupImg = document.querySelector('.popup_img');
const closeButtonImg = document.querySelector('.popup__close_img');


console.log(popupButton, closeButton, popup, popupAdd, closeButtonAdd, popupImg, closeButtonImg);
// Находим форму в DOM
let formElement = document.querySelector('.popup__input');
let formElementAdd = document.querySelector('.popup__input-add');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input-text_type_name');
let jobInput = document.querySelector('.popup__input-text_type_work');
let placeName = document.querySelector('.popup__input-text_type_place-name');
let placeImg = document.querySelector('.popup__input-text_type_place-img');
// Находим контейнер в html для карточек
const element = document.querySelector('.elements');
// Находим кнопку для вызова создания template-элемент
const addButton = document.querySelector('.profile__add-button');


// функция открытия попапа
function openPopup(pop) {
  console.log(pop);
  pop.classList.add('popup_is-opened');
}

function closePopup(pop) {
  pop.classList.remove('popup_is-opened');
}

// функция  окрашивания лайка
function handleLikeIcon(evt) {
  evt.target.classList.toggle('element__heart-button-active');
}

// функция удаления карточки/элемента
function handleDeleteCard(e) {
  e.target.closest('.element').remove();
}

// Обработчик «отправки» формы для попапа на кнопе Edit
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы, так мы можем определить свою логику отправки.
  // значение полей jobInput и nameInput из свойства value
  let valNameInput = nameInput.value;
  let valJobInput = jobInput.value;
  console.log(nameInput.value, jobInput.value);
   // Выбериаем элементы, куда должны быть вставлены значения полей
  let profileNameInput = document.querySelector('.profile__title');
  let profileJobInput = document.querySelector('.profile__text');
  console.log(profileNameInput, profileJobInput);
  // Вставим новые значения с помощью textContent
  profileNameInput.textContent = valNameInput;
  profileJobInput.textContent =  valJobInput;
  // Закрываем попап
  closePopup(popup);
}

// функция создания элементов/карточек
function createCard (elm) {
  console.log(elm.name,elm.link);
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
  return (newElement); 
} 

function handlePreviewPicture(title, img) {
  openPopup(popupImg);
  popupImg.querySelector('.popup__title').textContent = title.textContent;
  popupImg.querySelector('.popup__image').alt = img.alt;
  popupImg.querySelector('.popup__image').src = img.src;
}

// функция добавления элемента/карточки в контейнер
function renderCard(data, wrap) {
  wrap.prepend(createCard(data));
 }

// Начальная инициализация карточек
 initialElement.forEach((card) => {
  renderCard(card, element)
 });

// Обработчик «отправки» формы для попапа на кнопе Add
function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  let newElm = [];
  newElm.name=placeName.value;
  newElm.link=placeImg.value;
  // Создаем элемент и добавляем элемент в разметку
  renderCard(newElm, element);
  // Очищаем поля формы
  formElementAdd.reset();
  // Закрываем попап
  closePopup(popupAdd);
}

// Попап на кнопке Edit
popupButton.addEventListener('click', function() { openPopup(popup); });
formElement.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener('click', function() { closePopup(popup); });
// Попап на кнопке Add
addButton.addEventListener('click', function() { openPopup(popupAdd); });
formElementAdd.addEventListener('submit', cardFormSubmitHandler); // функция создания нового элемента/карточки
closeButtonAdd.addEventListener('click', function() { closePopup(popupAdd); });
// Попап на картинке
closeButtonImg.addEventListener("click", function() { closePopup(popupImg); });



