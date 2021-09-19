

export class Popup {

   _openedClass = 'popup_is-opened';

  constructor(className) {
    this.element = document.querySelector(className);
    this.cardName = this.element.querySelector('.popup__title');
    this.cardImg = this.element.querySelector('.popup__image');
  }


  // функция открытия попапа
  openPopup() {
      this.element.classList.add(this._openedClass);
     // навешываем слушатели закрытия
      this.element.addEventListener("click", this.closePopupOverlay);
      // Закрытие попапа нажатием на Esc
      document.addEventListener('keydown', this._handleEscapeClick);
    }
    
    // функция закрытия попапа
  closePopup() {
      this.element.classList.remove(this._openedClass);
    }
  
  // функция закрытия открытого попапа (для клика по оверлею)
  _closePopupOverlay = (evt) => {
      if (evt.target.classList.contains(this._openedClass)) {
        this.closePopup();
      }
    }

  // функция закрытия по esc
  _handleEscapeClick = (evt) => {
      if (evt.key === 'Escape' && this.element.classList.contains(this._openedClass)) {
          this.closePopup();
      }
  }


}