// класс, который отвечает за отрисовку элементов на странице
export class Section {

    constructor({items, renderer}, classSelector) {
        this._items = items;
        this._renderer = renderer;
        this.container = document.querySelector(classSelector);
    }

// метод отрисовки всех элементов
rendererItem() {
    this._items.forEach(item => {
        this._renderer(item);
    });
}

// метод для добавления DOM-элемента в контейнер
    addItem(element) {
        this.container.prepend(element);
    }

}