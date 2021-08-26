export default class ProductItem {
  constructor(productObject) {
    this.data = productObject;
    this.element = this.createElement();
  }

  render(root) {
    root.append(this.element);
  }

  remove() {
    this.element.remove();
  }

  createElement() {
    const item = document.createElement('li');
    item.classList.add('product-list__item');

    const card = document.createElement('div');
    card.classList.add('product-card');

    const controls = document.createElement('div');
    controls.classList.add('product-card-control');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('product-card-control__button');

    const cardImage = document.createElement('div');
    cardImage.classList.add('product-card-image');

    const image = new Image();
    image.classList.add('product-card-image__image');
    image.src = this.data.image;

    const cardDescription = document.createElement('div');
    cardDescription.classList.add('product-card-description');

    const title = document.createElement('h3');
    title.classList.add('product-card-description__title');
    title.textContent = this.data.name;

    const description = document.createElement('p');
    description.classList.add('product-card-description__description');
    description.textContent = this.data.description;

    const price = document.createElement('p');
    price.classList.add('product-card-description__price');
    price.textContent = `${this.data.price} руб.`;

    cardDescription.append(title, description, price);
    cardImage.append(image);
    controls.append(deleteButton);
    card.append(controls, cardImage, cardDescription);
    item.append(card);

    return item;
  }
}
