const createLoader = () => {
  const container = document.createElement('div');
  container.classList.add('app-loader');

  const loader = document.createElement('div');
  loader.classList.add('loader');

  container.append(loader);
  return container;
};

export default class AppLoader {
  constructor(root) {
    this.root = root;
    this.loader = createLoader();
    this.root.append(this.loader);
  }

  showLoader() {
    this.loader.classList.add('app-loader_visible');
  }

  hideLoader() {
    this.loader.classList.remove('app-loader_visible');
  }
}
