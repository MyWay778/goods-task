import FormController from './FormController';

export default class Controller {
  constructor(root, store) {
    this.root = root;
    this.store = store;
    this.formController = new FormController(root, this.submitHandler);
  }

  submitHandler = async (newProduct) => {
    const { products } = this.store.getState();
    this.store.changeState('loading', true);

    let response;
    try {
      response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: { id: Date.now() } });
        }, 1000);
      });
    } catch (e) {
      console.error(e);
    } finally {
      this.store.changeState('loading', false);
    }
    const { id } = response.data;

    const newProductWithId = { ...newProduct, id };
    const updatedProducts = [newProductWithId, ...products];
    this.store.changeState('products', updatedProducts);
  };

  deleteProductHandlerCreator = (productId) => async () => {
    const { products } = this.store.getState();
    this.store.changeState('loading', true);

    let response;
    try {
      response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ status: 200 });
        }, 1000);
      });
    } catch (e) {
      console.error(e);
    } finally {
      this.store.changeState('loading', false);
    }

    if (response.status === 200) {
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      this.store.changeState('products', updatedProducts);
    } else {
      console.error('Something went wrong...');
    }
  };
}
