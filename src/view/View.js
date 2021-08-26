import ProductItem from './ProductItem';
import AppLoader from './AppLoader';

export default class View {
  constructor(productListRootElement) {
    this.root = productListRootElement;
    this.renderedProducts = [];
    this.loader = new AppLoader(document.body);
  }

  renderProducts = (products) => {
    products.forEach((product) => {
      const newProduct = new ProductItem(product);
      newProduct.render(this.root);
      this.renderedProducts.push(newProduct);
    });
  };

  loadingListener = (loading) => {
    if (loading) {
      this.loader.showLoader();
    } else {
      this.loader.hideLoader();
    }
  };
}
