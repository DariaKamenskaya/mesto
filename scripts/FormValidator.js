class FormValidator {

  constructor(config, targetFormElm) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._targetFormElm = targetFormElm;
  }
  

  _showInputError = (formElement, inputElement, errorMessage) => {
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add('popup__input_type_error');
      errorElement.textContent = errorMessage;
      // errorElement.classList.add('popup__input-error_active');
  };
    
  _hideInputError = (formElement, inputElement) => {
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove('popup__input_type_error');
      // errorElement.classList.remove('popup__input-error_active');
      errorElement.textContent = '';
  };
    
  _hasInvalidInput = (inputList) => {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
  };
    
  _toggleButtonState = (inputList, buttonElement) => {
      // Если есть хотя бы один невалидный инпут
      if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
        buttonElement.classList.add('popup__submit-btn_inactive');
      } else {
        // иначе сделай кнопку активной
        buttonElement.classList.remove('popup__submit-btn_inactive');
      }
  }; 
  
  _checkInputValidity = (formElement, inputElement) => {
      if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
      } else {
        hideInputError(formElement, inputElement);
      }
  };
    
  _setEventListeners = (formElement) => {
    this._targetFormElm.element.addEventListener("submit", (evt) => {
        evt.preventDefault();
    });
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__submit-btn');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
    
  enableValidation() {
    this._setEventListeners();
  }



}