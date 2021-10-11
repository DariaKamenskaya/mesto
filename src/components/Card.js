//import { forEach } from "core-js/core/array";

export class Card {

  constructor({data, handleCardClick, handleDeleteClick, handleLikeClick, handleDeleteCard, userData}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardID = data._id;
    this._ownerId= data.owner._id;
    //this._userCardName= data.owner.name;
    this._currentUserId = userData.id;
    //this._userName = userData.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick.bind(this);
    this._handleDeleteClick = handleDeleteClick.bind(this);
    this._handleLikeClick = handleLikeClick.bind(this);
    this._handleDeleteCard = handleDeleteCard;
    //this._element = this._getElement();
    this._element = {}; //document.querySelector('.element'); //нашли лайк карточки
    this._likeButton = {}; //this._element.querySelector('.element__heart-button'); //нашли лайк карточки
    this._deleteButton = {}; //this._element.querySelector('.element__remove-button'); //нашли кнопку удаления карточки
    this._cardImageElement = {}; //this._element.querySelector('.element__image'); //нашли картинку карточки
    this._cardTitleElement = {}; //this._element.querySelector('.element__title'); // нашли поле карточки для задания имени
    this._cardLikesElement = {}; //this._element.querySelector('.element__likes-number'); // нашли поле карточки для задания имени
    this.setLikesInfo = this.setLikesInfo.bind(this);
    this._toggleLike = this._toggleLike.bind(this);
    }
  

  // функция клонирования элемента/карточки 
  _getElement() {
    this._element = document.querySelector(this._cardSelector).content.firstElementChild.cloneNode(true);
    this._likeButton = this._element.querySelector('.element__heart-button'); //нашли лайк карточки
    this._deleteButton = this._element.querySelector('.element__remove-button'); //нашли кнопку удаления карточки
    this._cardImageElement = this._element.querySelector('.element__image'); //нашли картинку карточки
    this._cardTitleElement = this._element.querySelector('.element__title'); // нашли поле карточки для задания имени
    this._cardLikesElement = this._element.querySelector('.element__likes-number'); // нашли поле карточки для задания имени
  } 

  // функция создания элементов/карточек
  createCard() {
    //  1. Клонировать из шаблона элемент 
    //  2. Найти в элементе и записать в переменные кнопку лайка,удаления и картинку  
    this._getElement();
    //  3. Задать данные картинке
    this._cardTitleElement.textContent = this._name;
    this._cardImageElement.alt = this._name;
    this._cardImageElement.src = this._link;
    //this._cardLikesElement.textContent = this._likes.length;
    const statusLikeNewCard = this.isLiked();
    this.setLikesInfo(this._likes,!statusLikeNewCard);
    // проверка создана ли карточка нами
    if (this._ownerId != this._currentUserId) {
      // удаляем кнопку с корзинкой
      this._deleteButton.remove();
    }
    //  4. Повесить на кнопки и картинку слушатели , где внутри есть функции обработчики.В обработчик картинки прокинуть данные карточки
    this._setEventListeners();
    //   5. Вернуть DOM элемент.
    return this._element; 
  }


  // функция  проверки того, что в массиве лайков есть лайк, айди которого совпадает с айди текущего пользователя 
  isLiked() {
    //console.log(this._currentUserId, this._likes);
    let status = false;
    for (let i = 0; i < this._likes.length; i++) { // выведет 0, затем 1, затем 2
      //console.log(i, this._currentUserId, this._likes[i]._id);
      if (this._currentUserId === this._likes[i]._id) {
        status = true;
        break;
      }
    }
    return status;
    /*this._likes.forEach((item) => {
      if (this._currentUserId === item.id) {
        return true;
      }  else {
        return false;
      }
    });*/
  }

  // функция  окрашивания лайка
  setLikesInfo(likes,status) {
    if (status) {
      this._likeButton.classList.remove('element__heart-button-active');
    } else {
      this._likeButton.classList.add('element__heart-button-active');
    }
    //this._likeButton.classList.toggle('element__heart-button-active');
    this._cardLikesElement.textContent = likes.length;
    this._likes = likes;
  }

  _toggleLike(evt) {
    this._handleLikeClick(evt.target, this._cardID);
  }

  // функция удаления карточки/элемента
  removeCard() {
    //this.closest('.element').remove();
    this._element = null;
  }

  // функция навешивания слушателей повесить на кнопки и картинку слушатели
  _setEventListeners() {
    this._likeButton.addEventListener('click',  this._handleLikeClick); // поставить лайк this._toggleLike
    this._deleteButton.addEventListener('click', this._handleDeleteClick); // удалить карточку
    this._cardImageElement.addEventListener('click', this._handleCardClick); // открыть попап
  }



}