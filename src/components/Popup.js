

export class Popup {

   _openedClass = 'popup_is-opened';

  constructor(className) {
    this._element = document.querySelector(className);
    this.closeBtn = this._element.querySelector('.popup__close');
    this.cardName = this._element.querySelector('.popup__title');
    this.cardImg = this._element.querySelector('.popup__image');
  }


  // функция открытия попапа
  openPopup() {
      this._element.classList.add(this._openedClass);
      // навешиваем слушатели
      this.setEventListeners();
    }
    
  // функция закрытия попапа
  closePopup() {
      this._element.classList.remove(this._openedClass);
      // удаляем слушатели
      this.removeEventListeners();
    }
  
  // функция закрытия открытого попапа (для клика по оверлею)
  _closePopupOverlay = (evt) => {
      if (evt.target.classList.contains(this._openedClass)) {
        this.closePopup();
      }
    }

  // функция закрытия по esc
  _handleEscClose = (evt) => {
      if (evt.key === 'Escape' && this._element.classList.contains(this._openedClass)) {
          this.closePopup();
      }
  }

  // функция навешивания слушателей
  setEventListeners() {
    // const closeBtn = this.element.querySelector('.popup__close');
    // закрытие по кнопке крестик
    this.closeBtn.addEventListener('click', () => this.closePopup());
    // закрытие по клику на оверлей
    this._element.addEventListener("click", this._closePopupOverlay);
    // Закрытие попапа нажатием на Esc
    document.addEventListener('keydown', this._handleEscClose);
  }

  // функция удаления слушателей
  removeEventListeners() {
    //const closeBtn = this.element.querySelector('.popup__close');
    // удаление слушателя закрытие по кнопке крестик
    this.closeBtn.removeEventListener('click', () => this.closePopup());
    // удаление слушателя закрытие по клику на оверлей
    this._element.removeEventListener("click", this._closePopupOverlay);
    // удаление слушателя закрытие попапа нажатием на Esc
    document.removeEventListener('keydown', this._handleEscClose);
  }

}