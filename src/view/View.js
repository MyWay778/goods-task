import ProductItem from './ProductItem';
import AppLoader from './AppLoader';

export default class View {
  constructor(productListRootElement, controller) {
    this.root = productListRootElement;
    this.controller = controller;
    this.renderedProducts = {};
    this.loader = new AppLoader(document.body);
  }

  renderProducts = (products) => {
    this.root.innerHTML = '';
    this.renderedProducts = {};

    products.forEach((product) => {
      this.createAndRenderProduct(product);
    });
  };

  loadingListener = (loading) => {
    if (loading) {
      this.loader.showLoader();
    } else {
      this.loader.hideLoader();
    }
  };

  createAndRenderProduct = (product) => {
    const newProduct = new ProductItem(
      product,
      this.controller.deleteProductHandlerCreator(product.id)
    );
    newProduct.render(this.root);
    this.renderedProducts[product.id] = newProduct;
  };
}
