export default class Store {
  constructor(productsInitialState) {
    if (!(productsInitialState instanceof Array)) {
      throw new Error('Initial state should be an Array!');
    }
    this.state = {
      products: productsInitialState,
      loading: false,
      filter: null,
    };
    this.subscribers = {};
  }

  getState() {
    return this.state;
  }

  changeState(stateField, value) {
    if (this.state[stateField] === undefined) {
      throw new Error(
        `Check correct stateField, ${stateField} don't exist in the state!`
      );
    }

    this.state = { ...this.state, [stateField]: value };
    this.notify(stateField);
  }

  subscribe(stateField, listener) {
    if (!this.subscribers[stateField]) {
      this.subscribers[stateField] = [];
    }
    this.subscribers[stateField].push(listener);
  }

  notify(stateField) {
    if (this.subscribers[stateField]) {
      this.subscribers[stateField].forEach((listener) =>
        listener(this.state[stateField])
      );
    }
  }
}
