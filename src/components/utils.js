// переключение кнопки в активное состояние
export function buttonOnActive(buttonElm) {
    buttonElm.classList.remove('popup__submit-btn_inactive');
    buttonElm.disabled = false;
  }
  
  // переключение кнопки в неактивное состояние
export  function buttonOnDisabled(buttonElm) {
    buttonElm.classList.add('popup__submit-btn_inactive');
    buttonElm.disabled = true;
  }

