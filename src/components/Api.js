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

    // сохранение на сервере отредактированных данных пользователя
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

    // добавление на сервере новой карточки
  postCard(data) {
    return fetch(this.url +'/cards', {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
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

  // метод удаления карточек
  deleteCard(idCard) {
    return fetch(this.url +'/cards/' + idCard, {
      method: 'DELETE',
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

  // ставим лайк карточке
  putLikeCard(idCard){
    return fetch(this.url +'/cards/likes/' + idCard, {
      method: 'PUT',
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

  // ставим лайк карточке
  deleteLikeCard(idCard){
    return fetch(this.url +'/cards/likes/' + idCard, {
      method: 'DELETE',
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


    // метод получения данных карточки
    getCard(idCard) {
        return fetch(this.url +'/cards/' + idCard, {
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

}
