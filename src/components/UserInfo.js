
// Класс UserInfo отвечает за управление отображением информации о пользователе на странице
export class UserInfo {

  constructor({ userNameSelector, userWorkSelector, userImageSelector }) {
    this._userNameElm = document.querySelector(userNameSelector);
    this._userWorkElm = document.querySelector(userWorkSelector);
    this._userImgElm = document.querySelector(userImageSelector);
  }

// метод возвращает объект с данными пользователя
  getUserInfo() {
    this._userInfo = {};
    this._userInfo.name = this._userNameElm.textContent;
    this._userInfo.about = this._userWorkElm.textContent;
    this._userInfo.avatar = this._userImgElm.src;
  
    return this._userInfo;
    }
  
//метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._userNameElm.textContent = data.name;
    this._userWorkElm.textContent = data.about;  //data.work
    this._userImgElm.src = data.avatar;
    this._userImgElm.alt = data.name;
  }


}