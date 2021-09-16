

export class Popup {

// функция открытия попапа
_openPopup() {
    this.classList.add('popup_is-opened');
  }
  
  // функция закрытия попапа
_closePopup() {
    this.classList.remove('popup_is-opened');
  }

// функция закрытия открытого попапа (для клика по оверлею)
_closePopupOverlay() {
    if (this.target.classList.contains('popup_is-opened')) {
      closePopup(this.target);
    }
  }


}