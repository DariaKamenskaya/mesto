// класс, который отвечает за отрисовку элементов на странице
export class Section {

  constructor({items, renderer}, classContainer) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(classContainer);
  }

// метод отрисовки всех элементов
  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }

// метод для добавления DOM-элемента в контейнер
  addItem(element) {
    this._container.prepend(element);
  }

}