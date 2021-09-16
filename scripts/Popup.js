

export class Popup {

   _openedClass = 'popup_opened';

  constructor(className) {
    this.element = document.querySelector(className);
    this.cardName = this.element.querySelector('.popup__title');
    this.cardImg = this.element.querySelector('.popup__image');
}


  // функция открытия попапа
  _openPopup() {
      this.element.classList.add(this._openedClass);
    }
    
    // функция закрытия попапа
  _closePopup() {
      this.element.classList.remove(this._openedClass);
    }
  
  // функция закрытия открытого попапа (для клика по оверлею)
  _closePopupOverlay() {
      if (this.target.classList.contains(_openedClass)) {
        closePopup(this.target);
      }
    }


}