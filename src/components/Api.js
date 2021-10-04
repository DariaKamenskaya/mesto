// класс для работы с сервером
export class API {

  constructor(url,token) {
    this.url = url;
    this.token = token;
  }

  // метод инициализации карточек
  getInitialCards() {
    return fetch(this.url +'/cards', {
      headers: {
        authorization: this.token
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    // отклоняем промис, чтобы перейти в блок catch, если сервер вернул ошибку
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .catch((err) => {
        console.log(err); // "Что-то пошло не так: ..."
        return [];
    }); 
  }

    // метод инициализации карточек
  getUserData() {
    return fetch(this.url +'/users/me', {
      headers: {
        authorization: this.token
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    // отклоняем промис, чтобы перейти в блок catch, если сервер вернул ошибку
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
      return [];
    }); 
    }

  patchUserData(data) {
    return fetch(this.url +'/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    // отклоняем промис, чтобы перейти в блок catch, если сервер вернул ошибку
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
      .catch((err) => {
        console.log(err); // "Что-то пошло не так: ..."
        return [];
    });  
  }

}