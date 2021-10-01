export class Card {

  constructor({data, handleCardClick}, cardSelector) {
    this.name = data.name;
    this.link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getElement();
    this._likeButton = this._element.querySelector('.element__heart-button'); //нашли лайк карточки
    this._deleteButton = this._element.querySelector('.element__remove-button'); //нашли кнопку удаления карточки
    this._cardImage = this._element.querySelector('.element__image'); //нашли картинку карточки
    this._cardTitle = this._element.querySelector('.element__title'); // нашли поле карточки для задания имени
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
    //  4. Повесить на кнопки и картинку слушатели , где внутри есть функции обработчики.В обработчик картинки прокинуть данные карточки
    this._setEventListeners();
    //   5. Вернуть DOM элемент.
    return this._element; 
  }

    // функция  окрашивания лайка
  _handleLikeIcon(evt) {
    evt.target.classList.toggle('element__heart-button-active');
  }

    // функция удаления карточки/элемента
  _handleDeleteCard() {
    this.closest('.element').remove();
  }

  // функция навешивания слушателей повесить на кнопки и картинку слушатели
  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLikeIcon); // поставить лайк
    this._deleteButton.addEventListener('click', this._handleDeleteCard); // удалить карточку
    this._cardImage.addEventListener('click', this._handleCardClick.bind(this)); // открыть попап
  }



}