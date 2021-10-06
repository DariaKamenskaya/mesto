export class Card {

  constructor({data, handleCardClick, handleDeleteClick, handleLike, userData}, cardSelector) {
    this.name = data.name;
    this.link = data.link;
    this._likes = data.likes;
    this._cardID = data._id;
    this._userCardName= data.owner.name;
    this._userName = userData.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLike = handleLike;
    //this._handleDeleteCard = handleDeleteCard;
    this._element = this._getElement();
    this._likeButton = this._element.querySelector('.element__heart-button'); //нашли лайк карточки
    this._deleteButton = this._element.querySelector('.element__remove-button'); //нашли кнопку удаления карточки
    this._cardImage = this._element.querySelector('.element__image'); //нашли картинку карточки
    this._cardTitle = this._element.querySelector('.element__title'); // нашли поле карточки для задания имени
    this._cardLikes = this._element.querySelector('.element__likes-number'); // нашли поле карточки для задания имени
    this.handleLikeIcon = this.handleLikeIcon.bind(this);
    this._toggleLike = this._toggleLike.bind(this);
    }
  

  // функция клонирования элемента/карточки 
   _getElement() {
    const element = document.querySelector(this._cardSelector).content.firstElementChild.cloneNode(true);
    return element;
  } 

  // функция создания элементов/карточек
  createCard() {
    //  1. Клонировать из шаблона элемент - в конструкторе класса
    //  2. Найти в элементе и записать в переменные кнопку лайка,удаления и картинку  - в конструкторе класса
    //  3. Задать данные картинке
    this._cardTitle.textContent = this.name;
    this._cardImage.alt = this.name;
    this._cardImage.src = this.link;
    this._cardLikes.textContent = this._likes.length;
    // проверка создана ли карточка нами
    if (this._userCardName != this._userName) {
      // удаляем кнопку с корзинкой
      this._deleteButton.remove();
    }
    //  4. Повесить на кнопки и картинку слушатели , где внутри есть функции обработчики.В обработчик картинки прокинуть данные карточки
    this._setEventListeners();
    //   5. Вернуть DOM элемент.
    return this._element; 
  }

    // функция  окрашивания лайка
  handleLikeIcon(likes) {
    this._likeButton.classList.toggle('element__heart-button-active');
    this._cardLikes.textContent = likes.length;
  }

  _toggleLike(evt) {
    this._handleLike(evt.target, this._cardID);
  }

  // функция удаления карточки/элемента
  removeCard() {
    this.closest('.element').remove();
  }

  // функция навешивания слушателей повесить на кнопки и картинку слушатели
  _setEventListeners() {
    this._likeButton.addEventListener('click', this._toggleLike.bind(this)); // поставить лайк
    this._deleteButton.addEventListener('click', this._handleDeleteClick.bind(this)); // удалить карточку
    this._cardImage.addEventListener('click', this._handleCardClick.bind(this)); // открыть попап
  }



}