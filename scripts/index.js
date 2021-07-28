const popupButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close");
const popup = document.querySelector(".popup");
// Находим форму в DOM
let formElement = document.querySelector(".popup__input");
// Находим поля формы в DOM
let nameInput = document.querySelector(".popup__input-text_type_name");
let jobInput = document.querySelector(".popup__input-text_type_work");

console.log(formElement, nameInput, jobInput);

function togglePopup() {
    console.log("click", popup);
   popup.classList.toggle("popup_is-opened");
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы, так мы можем определить свою логику отправки.
    // значение полей jobInput и nameInput из свойства value
    let ValNameInput = nameInput.value;
    let ValJobInput = jobInput.value;
    console.log(nameInput.value, jobInput.value);
     // Выбериаем элементы, куда должны быть вставлены значения полей
    let profileNameInput = document.querySelector(".profile__title");
    let profileJobInput = document.querySelector(".profile__text");
    console.log(profileNameInput, profileJobInput);
    // Вставим новые значения с помощью textContent
    profileNameInput.textContent = ValNameInput;
    profileJobInput.textContent =  ValJobInput;
    togglePopup()
    /*popup.classList.toggle("popup_is-opened");*/
}

popupButton.addEventListener("click", togglePopup);
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler); 
closeButton.addEventListener("click", togglePopup);
