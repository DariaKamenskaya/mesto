import { Popup } from "./Popup.js";

// класс для попапа удаления карточки
export class PopupWithConfirmation extends Popup{

    constructor (popupSelector) {
        super(popupSelector);
        //this._handleSubmitForm = handleSubmitForm;
        // ищем кнопку сабмита
        this._submitButton = this._element.querySelector('.popup__submit-btn_delete');
        // фиксируем вызов функции сабмита формы
        this._submitFormCallback = this._submitForm.bind(this);
    }

    // функция открытия попапа
    openPopup() {
      super.openPopup();
      // запоминаем карточку
      //this._cardID = idCard;
      //this._card = card;
      
    }

    // метод, получающий на вход функцию и записывающий ее в переменную класса
    setSubmitAction(handleSubmitForm) {
      console.log('setSubmitAction', handleSubmitForm);
      return this._handleSubmitForm = handleSubmitForm;
    }


    _submitForm(evt) {
        // Эта строчка отменяет стандартную отправку формы, так мы можем определить свою логику отправки.
        evt.preventDefault();
        // функция сабмита
        console.log(this._handleSubmitForm);
        this._handleSubmitForm();
        // закрываем попап
        //this.closePopup();
        // удаляем карточку/элемент
        //this._card.remove();
      }
    
      // функция навешивания слушателей
      setEventListeners() {
        super.setEventListeners();
        // обработчик сабмита формы
        this._submitButton.addEventListener('click', this._submitFormCallback);
      }
    
      // функция удаления слушателей
      removeEventListeners() {
        super.removeEventListeners();
        this._submitButton.removeEventListener('click', this._submitFormCallback);
      }
    


}