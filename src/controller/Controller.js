import FormController from './FormController';
import sortFunctions from '../helpers/filter-sort-functions';

export default class Controller {
  constructor(root, store) {
    this.root = root;
    this.store = store;
    this.formController = new FormController(root, this.submitHandler);
    this.initFilterController();
  }

  submitHandler = async (newProduct) => {
    const { products } = this.store.getState();
    this.store.changeState('loading', true);

    const response = await this.useApiService({ id: Date.now() });
    const { id } = response.data;

    const newProductWithId = { ...newProduct, id };
    const updatedProducts = [newProductWithId, ...products];
    this.store.changeState('products', updatedProducts);
  };

  deleteProductHandlerCreator = (productId) => async () => {
    const { products } = this.store.getState();
    this.store.changeState('loading', true);

    const response = await this.useApiService();
    if (response.status === 200) {
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      this.store.changeState('products', updatedProducts);
    } else {
      console.error('Something went wrong...');
    }
  };

  initFilterController = () => {
    const filterSelect = document.querySelector('.select');
    filterSelect.onchange = async (evt) => {
      const { options } = evt.target;
      const { selectedIndex } = options;
      const { value } = options[selectedIndex];

      const response = await this.useApiService();
      if (response.status === 200) {
        this.store.changeState('filter', value);
        const { products, filter } = this.store.getState();
        const updatedProducts = [...products].sort(sortFunctions[filter]);
        this.store.changeState('products', updatedProducts);
      }
    };
  };

  useApiService = async (expectedData) => {
    this.store.changeState('loading', true);
    let response;
    try {
      response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ status: 200, data: expectedData });
        }, 1000);
      });
    } catch (e) {
      console.error(e);
    } finally {
      this.store.changeState('loading', false);
    }
    return response;
  };
}
