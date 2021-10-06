import { Popup } from "./Popup.js";

// класс для попапа удаления карточки
export class PopupDelete extends Popup{

    constructor({handleSubmitForm}, popupSelector) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        // ищем кнопку сабмита
        this._formElement = this._element.querySelector('.popup__submit-btn_delete');
        // фиксируем вызов функции сабмита формы
        this._submitFormCallback = this._submitForm.bind(this);
    }

    // функция открытия попапа
    openPopup(idCard) {
      super.openPopup();
      // запоминаем карточку
      this._cardID = idCard;
    }

    _submitForm(evt) {
        // Эта строчка отменяет стандартную отправку формы, так мы можем определить свою логику отправки.
        evt.preventDefault();
        // функция сабмита
        this._handleSubmitForm(this._cardID);
        // закрываем попап
        this.closePopup();
        // удаляем карточку/элемент
        console.log(this);
        // evt.closest('.element').remove();
      }
    
      // функция навешивания слушателей
      setEventListeners() {
        super.setEventListeners();
        // обработчик сабмита формы
        console.log(this._formElement);
        this._formElement.addEventListener('click', this._submitFormCallback);
      }
    
      // функция удаления слушателей
      removeEventListeners() {
        super.removeEventListeners();
        this._formElement.removeEventListener('click', this._submitFormCallback);
      }
    


}