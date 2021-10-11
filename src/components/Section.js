// класс, который отвечает за отрисовку элементов на странице
export class Section {

  constructor({items, renderer}, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(classSelector);
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