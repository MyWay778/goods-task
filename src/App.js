import './styles/styles.scss';
import Store from './Store';
import mockData from './mock-data/data';
import View from './view/View';
import Controller from './controller/Controller';

export default class App {
  constructor() {
    this.store = new Store([]);
    this.controller = new Controller(document.body, this.store);
    const productListElement = document.querySelector('.product-list');
    if (!productListElement) {
      throw new Error('productListElement not found!');
    }
    this.view = new View(productListElement, this.controller);

    this.store.subscribe('products', this.view.renderProducts);
    this.store.subscribe('loading', this.view.loadingListener);
  }

  async init() {
    this.store.changeState('loading', true);
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: mockData,
        });
      }, 1000);
    });
    this.store.changeState('products', response.data);
    this.store.changeState('loading', false);
  }
}
