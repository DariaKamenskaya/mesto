const popupButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const popupAdd = document.querySelector('popup-add');
const closeButtonAdd = document.querySelector('popup__close-add');
const popupImg = document.querySelector('popup-img');
const closeButtonImg = document.querySelector('popup__close_img');


console.log(popupButton, closeButton, popup, popupAdd);
// Находим форму в DOM
let formElement = document.querySelector('.popup__input');
let formElementAdd = document.querySelector('.popup__input-add');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input-text_type_name');
let jobInput = document.querySelector('.popup__input-text_type_work');
let placeName = document.querySelector('.popup__input-text_type_place-name');
let placeImg = document.querySelector('.popup__input-text_type_place-img');
// Находим template-элемент и сам элемент в html
const elementTemplate = document.getElementById('element-template');
const element = document.querySelector('.elements');
// Находим кнопку для вызова создания template-элемент
const addButton = document.querySelector('.profile__add-button');


// функция  открытия - закрытия попапа для кнопки edit
function togglePopup() {
    console.log('click', popup);
    popup.classList.toggle('popup_is-opened');
}

// функция  открытия - закрытия попапа для кнопки add
function togglePopupAdd() {
    console.log('click', popupAdd);
    popupAdd.classList.toggle('popup_is-opened');
}

// функция  открытия - закрытия попапа для картинки
function togglePopupImg(e) {
    console.log('click', popupImg);
    popupImg.classList.toggle('popup_is-opened');
    console.log(popupImg.className);
    if (popupImg.className === 'popup popup_img popup_is-opened') {
      console.log('yes');
      initPopup(e);
    }; 
}

function initPopup(e) {
    let elm = e.target.closest('.element'); 
    console.log(elm);
    console.log(elm.querySelector('.element__title').innerText);
    popupImg.querySelector('.popup__title').innerText = elm.querySelector('.element__title').innerText;
    popupImg.querySelector('.popup__image').alt = elm.querySelector('.element__image').alt;
    popupImg.querySelector('.popup__image').src = elm.querySelector('.element__image').src;
}

// функция  окрашивания лайка
function toggleLike(e) {
    like = e.target.closest('.element__heart-button');
    console.log('click', like);
    like.classList.toggle('element__heart-button-active');
}

// функция удаления карточки/элемента
function removeElm(e) {
    e.target.closest('.element').remove();
}

function initEventListeners (elm) {
    elm.querySelector('.element__remove-button').addEventListener('click', removeElm);
    elm.querySelector('.element__heart-button').addEventListener('click', toggleLike);
    elm.querySelector('.element__image').addEventListener('click', togglePopupImg);
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
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
    togglePopup();
}

// функция инициализации элементов/карточек
function initElement (elm) {
    console.log(elm.name,elm.link);
    const newElement = elementTemplate.content.firstElementChild.cloneNode(true);
    newElement.querySelector('.element__title').innerText = elm.name;
    newElement.querySelector('.element__image').alt = elm.name;
    newElement.querySelector('.element__image').src = elm.link;
    element.prepend(newElement);
    
    initEventListeners(newElement);
} 


popupButton.addEventListener('click', togglePopup);
addButton.addEventListener('click',togglePopupAdd);
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 
closeButton.addEventListener('click', togglePopup);
closeButtonAdd.addEventListener("click", togglePopupAdd);
closeButtonImg.addEventListener("click", togglePopupImg);

// функция создания нового элемента/карточки
formElementAdd.addEventListener('submit', (e) => {
    e.preventDefault();
    let newElm = [];
    newElm.name=placeName.value;
    newElm.link=placeImg.value;
    initElement(newElm);
    placeName.reset();
    placeImg.reset();

    togglePopupAdd();

}); 

// Начальная инициализация карточек
initialElement.forEach(initElement); 