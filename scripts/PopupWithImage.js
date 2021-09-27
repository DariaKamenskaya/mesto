import { Popup } from "./Popup.js";

// класс для попапа с картинкой
export class PopupWithImage extends Popup{

  constructor({data}, popupSelector) {
    super(popupSelector);
    this._nameImg = data.name;
    this._linkImg = data.link;
    this._placeImg = this.element.querySelector('.popup__image');
    this._placeName = this.element.querySelector('.popup__title_img');
  }

// метод открытия попапа по клику на картинку карточки
  openPopup() {
    this._placeImg.src = this._linkImg;
    this._placeImg.alt = this._nameImg;
    this._placeName.textContent = this._nameImg;
    super.openPopup();
    console.log(this);
  }


}