
// Класс UserInfo отвечает за управление отображением информации о пользователе на странице
export class UserInfo {

  constructor({ userNameSelector, userWorkSelector }) {
    this._userNameElm = document.querySelector(userNameSelector);
    this._userWorkElm = document.querySelector(userWorkSelector);
  }

// метод возвращает объект с данными пользователя
  getUserInfo() {
    this._userInfo = {};
    this._userInfo.name = this._userNameElm.textContent;
    this._userInfo.work = this._userWorkElm.textContent;
  
    return this._userInfo;
    }
  
//метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._userNameElm.textContent = data.name;
    this._userWorkElm.textContent = data.work;
  }


}