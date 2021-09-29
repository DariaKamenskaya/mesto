import { Popup } from "./Popup.js";

// класс для попапа с картинкой
export class PopupWithImage extends Popup{

  constructor( popupSelector) {
    super(popupSelector);
    this._placeImg = this.element.querySelector('.popup__image');
    this._placeName = this.element.querySelector('.popup__title_img');
  }

// метод открытия попапа по клику на картинку карточки
  openPopup(data) {
    this._placeImg.src = data.link;
    this._placeImg.alt = data.name; 
    this._placeName.textContent = data.name;
    super.openPopup();
  }


}