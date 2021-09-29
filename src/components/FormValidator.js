// объект для валидации
export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_inactive",
  inputErrorClass: "popup__input_type_error"
};

export class FormValidator {

  constructor(config, targetFormElm) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;

    this._targetFormElm = targetFormElm;
    //this._inputList = Array.from(this._targetFormElm.element.querySelectorAll(this._inputSelector));
    this.inputList = Array.from(this._targetFormElm.querySelectorAll(this._inputSelector));
    this._buttonElement = this._targetFormElm.querySelector(this._submitButtonSelector);
  }
  

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._targetFormElm.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    // errorElement.classList.add('popup__input-error_active');
  };
    
  _hideInputError = (inputElement) => {
    const errorElement = this._targetFormElm.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    // errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
  };
    
  _hasInvalidInput(inputList)  {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
    
  _toggleButtonState(inputList) {
    const buttonElement = this._targetFormElm.querySelector(this._submitButtonSelector);
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }; 
  
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
    
  _setEventListeners () {
    /*this._targetFormElm.addEventListener("submit", (evt) => {
        evt.preventDefault();
    }); */
    this._toggleButtonState(this.inputList);
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this.inputList);
      });
    });
  };
    
  enableValidation() {
    this._setEventListeners();
  }



}