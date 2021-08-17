const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    console.log(errorElement, errorMessage, inputElement);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    // errorElement.classList.add('popup__input-error_active');
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    console.log(errorElement);
    inputElement.classList.remove('popup__input_type_error');
    // errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  
  const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add('popup__submit-btn_inactive');
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove('popup__submit-btn_inactive');
    }
  }; 

  const checkInputValidity = (formElement, inputElement) => {
    console.log(inputElement.validity, inputElement.validationMessage);
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__submit-btn');
    toggleButtonState(inputList, buttonElement);
    console.log(inputList);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    console.log(formList);
    formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
      setEventListeners(formElement);
  }); 
  };
  
  enableValidation(); 