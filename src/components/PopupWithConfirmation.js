import { Popup } from "./Popup.js";

// класс для попапа удаления карточки
export class PopupWithConfirmation extends Popup{

  constructor (popupSelector) {
    super(popupSelector);
    // ищем кнопку сабмита
    this._submitButton = this._element.querySelector('.popup__submit-btn_delete');
    // фиксируем вызов функции сабмита формы
    this._submitFormCallback = this._submitForm.bind(this);
  }


  // метод, получающий на вход функцию и записывающий ее в переменную класса
  setSubmitAction(handleSubmitForm) {
    return this._handleSubmitForm = handleSubmitForm;
  }


  _submitForm(evt) {
    // Эта строчка отменяет стандартную отправку формы, так мы можем определить свою логику отправки.
    evt.preventDefault();
    // функция сабмита
    this._handleSubmitForm();
  }


  // функция навешивания слушателей
  _setEventListeners() {
    super._setEventListeners();
    // обработчик сабмита формы
    this._submitButton.addEventListener('click', this._submitFormCallback);
  }


  // функция удаления слушателей
  _removeEventListeners() {
    super._removeEventListeners();
    this._submitButton.removeEventListener('click', this._submitFormCallback);
  }
  


}