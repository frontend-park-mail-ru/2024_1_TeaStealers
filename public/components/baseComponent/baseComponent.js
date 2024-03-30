/**
 * Класс базового компонента
 */
export class BaseComponent {
  constructor({
    parent, template, state = {}, innerComponents = [], listeners = {},
  }) {
    this.parent = parent;
    this.template = template;
    this.listeners = listeners;
    this.state = state;
    this.innerComponents = innerComponents;
  }

  /**
     * Получение элемента
     */
  get self() {
    return document.getElementById(this.state.id);
  }

  /**
     * Проверяет равенство объектов состояния
     * @param {State} state - состояние, в которое необходимо привести элемент
     * @returns
     */
  checkState(state) {
    if (!state || !this.state) {
      return false;
    }
    const statesAreEqual = Object.keys(this.state)
      .every((key) => { return this.state[key] === state[key]; });
    return statesAreEqual;
  }

  /**
     * Производить отрисовку элемента и добавление листенеров
     */
  renderAndDidMount() {
    this.render();
    this.componentDidMount();
  }

  /**
     * Производит рендер элемента
     */
  render() {
    document.getElementById(this.parent).insertAdjacentHTML(
      'beforeend',
      this.template(this.state),
    );
    this.componentLink = document.getElementById(this.parent).lastChild;
    this.innerComponents.forEach((component) => {
      component.render();
    });
  }

  /**
     * Добавление листенеров
     */
  componentDidMount() {
    this.innerComponents.forEach((component) => {
      component.componentDidMount();
    });
  }

  /**
   * Функция добавления обработчика события
   * @param {BaseComponent} component - компонент, к которому применяется обработчик
   * @param {string} selector - селектор для querySelector
   * @param {string} event - тип события
   * @param {func} handler - обработчик события
   */
  addListener(component, selector, event, handler) {
    component.self.querySelector(selector)
      .addEventListener(event, handler);
  }

  /**
   * Функция удаления обработчика события
   * @param {BaseComponent} component - компонент, к которому применяется обработчик
   * @param {string} selector - селектор для querySelector
   * @param {string} event - тип события
   * @param {func} handler - обработчик события
   */
  removeListener(component, selector, event, handler) {
    component.self.querySelector(selector)
      .removeEventListener(event, handler);
  }

  /**
     * Изменение состояния элемента
     * @param {State} state - состояние, в которое надо привести элемент
     * @returns
     */
  componentDidUpdate(state) {
    if (!state) {
      return;
    }
    if (this.checkState(state)) { // проверка внутренних элементов
      return;
    }
    this.state = state;
    this.unmountAndClean();
    this.renderAndDidMount();
  }

  /**
     * Вызов функций удаление обработчиков и элементов
     */
  unmountAndClean() {
    this.componentWillUnmount();
    this.clean();
  }

  /**
     * Удаление листенеров
     */
  componentWillUnmount() {
    this.innerComponents.forEach((component) => { return component.componentWillUnmount(); });
  }

  /**
     * Удаление элемента
     */
  clean() {
    this.innerComponents.forEach((component) => { return component.clean(); });
    document.getElementById(this.parent).innerHTML = '';
  }
}
