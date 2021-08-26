import FormController from './FormController';

export default class Controller {
  constructor(root, store) {
    this.root = root;
    this.store = store;
    this.formController = new FormController(root, this.submitHandler);
  }

  submitHandler = (newProduct) => {
    const { products } = this.store.getState();
    const newProductWithId = { ...newProduct, id: Date.now() };
    const updatedProducts = [newProductWithId, ...products];
    console.log(updatedProducts);
    this.store.changeState('products', updatedProducts);
  };

  deleteProductHandlerCreator = (productId) => () => {
    const { products } = this.store.getState();
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    this.store.changeState('products', updatedProducts);
  };
}
