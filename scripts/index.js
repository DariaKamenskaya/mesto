const popupButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const popupAdd = document.getElementById('popup-add');
const closeButtonAdd = document.getElementById('closeButtonAdd');


console.log(popupButton, closeButton, popup, popupAdd);
// Находим форму в DOM
let formElement = document.querySelector('.popup__input');
let formElementAdd = document.getElementById('form-add');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input-text_type_name');
let jobInput = document.querySelector('.popup__input-text_type_work');
let placeName = document.querySelector('.popup__input-text_type_place-name');
let placeImg = document.querySelector('.popup__input-text_type_place-img');
// Находим template-элемент и сам элемент в html
const ElementTemplate = document.getElementById('element-template');
const Element = document.querySelector('.elements');
// Находим кнопку для вызова создания template-элемент
const AddButton = document.querySelector('.profile__add-button');
// Находим поля заполнения карточки: картинка, заголовок
let ElementName = document.querySelector('.element__title');
let ElementImg = document.querySelector('.element__image');

const initialElement =  [ {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

// функция  открытия - закрытия попапа для кнопки edit
function togglePopup() {
    console.log("click", popup);
    popup.classList.toggle("popup_is-opened");
}

// функция  открытия - закрытия попапа для кнопки add
function togglePopupAdd() {
    console.log("click", popupAdd);
    popupAdd.classList.toggle("popup_is-opened");
}

// функция  окрашивания лайка
function toggleLike(e) {
    const Like = e.target.closest(element).querySelector('.element__heart-button');
    console.log("click", Like);
    Like.classList.toggle("element__heart-button-active");
}

// функция удаления карточки/элемента
function removeElm(e) {
    e.target.closest('.element').remove();
}

function initEventListeners (elm) {
    const Like = document.querySelector('.element__heart-button');
    console.log(Like);
    elm.querySelector('.element__remove-button').addEventListener('click', removeElm);
    // Like.addEventListener('click', toggleLike);
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы, так мы можем определить свою логику отправки.
    // значение полей jobInput и nameInput из свойства value
    let ValNameInput = nameInput.value;
    let ValJobInput = jobInput.value;
    console.log(nameInput.value, jobInput.value);
     // Выбериаем элементы, куда должны быть вставлены значения полей
    let profileNameInput = document.querySelector(".profile__title");
    let profileJobInput = document.querySelector(".profile__text");
    console.log(profileNameInput, profileJobInput);
    // Вставим новые значения с помощью textContent
    profileNameInput.textContent = ValNameInput;
    profileJobInput.textContent =  ValJobInput;
    togglePopup();
}

// функция инициализации элементов/карточек
function initElement (elm) {
    console.log(elm.name,elm.link);
    const NewElement = ElementTemplate.content.firstElementChild.cloneNode(true);
    NewElement.querySelector('.element__title').innerText = elm.name;
    NewElement.querySelector('.element__image').alt = elm.name;
    NewElement.querySelector('.element__image').src = elm.link;
    Element.prepend(NewElement);
    
    initEventListeners(NewElement);
} 


popupButton.addEventListener("click", togglePopup);
AddButton.addEventListener('click',togglePopupAdd);
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler); 
closeButton.addEventListener("click", togglePopup);
closeButtonAdd.addEventListener("click", togglePopupAdd);
// Like.addEventListener('click',toggleLike);

// функция создания нового элемента/карточки
formElementAdd.addEventListener('submit', (e) => {
    e.preventDefault();
    let newElm = [];
    newElm.name=placeName.value;
    newElm.link=placeImg.value;
    initElement(newElm);
    placeName.value = '';
    placeImg.value = '';

    togglePopupAdd();

}); 

initialElement.forEach(initElement); 
/* Like.addEventListener('click',toggleLike); */