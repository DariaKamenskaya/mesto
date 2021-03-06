import { Popup } from "./Popup.js";

// класс для попапа с формой
export class PopupWithForm extends Popup{

  constructor({handleSubmitForm}, popupSelector) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    // ищем саму форму с данными данного попапа
    this._formElement = this._element.querySelector('.popup__form');
    // фиксируем вызов функции сабмита формы
    this._submitFormCallback = this._submitForm.bind(this);
    // ищем все поля формы
    this._inputList = this._formElement.querySelectorAll('.popup__input');
  }

  // метод, который собирает данные всех полей формы
  _getInputValues(){
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

 // метод, который переносит данные в поля формы 
  setInputValues(data) {
    this._getInputValues();
    Object.assign(this._formValues, data);
    this._inputList.forEach(input => {
      input.value = this._formValues[input.name];
    });
  }

  _submitForm(evt) {
    // Эта строчка отменяет стандартную отправку формы, так мы можем определить свою логику отправки.
    evt.preventDefault();
    // функция сабмита формы из входных данных
    this._handleSubmitForm(this._getInputValues());
  }
  
  // функция навешивания слушателей
  _setEventListeners() {
    super._setEventListeners();
    // обработчик сабмита формы
    this._formElement.addEventListener('submit', this._submitFormCallback);
  }
  
  // функция удаления слушателей
  _removeEventListeners() {
    super._removeEventListeners();
    this._formElement.removeEventListener('submit', this._submitFormCallback);
  }
  
  // функция закрытия попапа
  closePopup() {
    super.closePopup();
    // Очищаем поля формы
    this._formElement.reset();
  }

}