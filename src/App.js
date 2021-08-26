import './styles/styles.scss';
import Store from './Store';
import cameraImg from './assets/images/camera.jpg';
import View from './view/View';

export default class App {
  constructor() {
    this.store = new Store([]);

    const productListElement = document.querySelector('.product-list');
    if (!productListElement) {
      throw new Error('productListElement not found!');
    }
    this.view = new View(productListElement);

    this.store.subscribe('products', this.view.renderProducts);
    this.store.subscribe('loading', this.view.loadingListener);
  }

  async init() {
    this.store.changeState('loading', true);
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: 1,
              image: cameraImg,
              name: 'Наименование товара',
              description:
                'Довольно-таки интересное описание товара в несколько строк.',
              price: 10000,
            },
          ],
        });
      }, 2000);
    });
    this.store.changeState('products', response.data);
    this.store.changeState('loading', false);
  }
}
