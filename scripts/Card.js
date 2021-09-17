import { closeButtonImg } from "./constant.js";
import { Popup } from "./Popup.js";

export class Card {

  constructor(data, cardSelector) {
    this.name = data.name;
    this.link = data.link;
    this._cardSelector = cardSelector;
    }
  

    // функция создания и добавления элемента/карточки в контейнер
  renderCard(wrap) {
    wrap.prepend(this._createCard());
  }

  // функция создания элементов/карточек
  _createCard() {
    //  1. Клонировать из шаблона элемент
    const newElement = document.querySelector('#element-template').content.querySelector(this._cardSelector).cloneNode(true);
    //  2. Найти в элементе и записать в переменные кнопку лайка,удаления и картинку
    const likeButton = newElement.querySelector('.element__heart-button'); //нашли лайк карточки
    const deleteButton = newElement.querySelector('.element__remove-button'); //нашли кнопку удаления карточки
    const cardImage = newElement.querySelector('.element__image'); //нашли картинку карточки
    //  3. Задать данные картинке
    const cardTitle = newElement.querySelector('.element__title');
    cardTitle.textContent = this.name;
    cardImage.alt = this.name;
    cardImage.src = this.link;
    //  4. Повесить на кнопки и картинку слушатели , где внутри есть функции обработчики.В обработчик картинки прокинуть данные карточки
    likeButton.addEventListener('click', this._handleLikeIcon);
    deleteButton.addEventListener('click', this._handleDeleteCard);
    cardImage.addEventListener('click', () => this._handlePreviewPicture(cardTitle, cardImage));
    //   5. Вернуть DOM элемент.
    return newElement; 
  }

    // функция  окрашивания лайка
  _handleLikeIcon(evt) {
    evt.target.classList.toggle('element__heart-button-active');
  }

    // функция удаления карточки/элемента
  _handleDeleteCard(e) {
    e.target.closest('.element').remove();
  }

  _handlePreviewPicture(title, img) {
    const popupImg = new Popup('.popup_img');
    popupImg.cardName.textContent = title.textContent;
    popupImg.cardImg.alt = img.alt;
    popupImg.cardImg.src = img.src;
    popupImg._openPopup();
    // закрытие попап на картинке по кнопке крестик
    closeButtonImg.addEventListener("click", () => popupImg._closePopup());
    }



}