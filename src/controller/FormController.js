export default class FormController {
  constructor(root, submitCallback) {
    this.form = root.querySelector('.product-form');
    this.form.onsubmit = this.submitHandler;
    this.submitCallback = submitCallback;

    [
      this.nameField,
      this.descriptionField,
      this.imageField,
      this.priceField,
      this.addButton,
    ] = this.form;

    this.initInput(this.nameField, 'name');
    this.initInput(this.descriptionField, 'description');
    this.initInput(this.imageField, 'image');
    this.initInput(this.priceField, 'price');

    this.newProduct = {
      name: '',
      description: 'Описание отсутствует',
      image: '',
      price: '',
    };
  }

  inputHandler = (evt) => {
    const { target } = evt;
    this.newProduct[target.dataset.field] = target.value;
    if (target.value.length === 1) {
      target.classList.remove('form-input__input_invalid');
    }
    this.checkValidity();
  };

  initInput = (input, dataName) => {
    const inputLink = input;
    inputLink.dataset.field = dataName;
    inputLink.oninput = this.inputHandler;
    inputLink.onfocus = this.focusHandler;
    inputLink.onblur = this.blurHandler;
  };

  submitHandler = (evt) => {
    evt.preventDefault();
    this.submitCallback(this.newProduct);
    this.nameField.value = '';
    this.imageField.value = '';
    this.priceField.value = '';
    this.descriptionField.value = '';
    this.newProduct = {
      name: '',
      description: 'Описание отсутствует',
      image: '',
      price: '',
    };
  };

  blurHandler = (evt) => {
    const { target } = evt;
    target.classList.remove('form-input__input_invalid');
  };

  focusHandler = (evt) => {
    const { target } = evt;
    if (evt.relatedTarget === this.addButton && !target.validity.valid) {
      target.classList.add('form-input__input_invalid');
    }
  };

  checkValidity = () => {
    if (
      this.nameField.validity.valid &&
      this.imageField.validity.valid &&
      this.priceField.validity.valid
    ) {
      this.addButton.classList.remove('button_disabled');
    } else if (!this.addButton.classList.contains('button_disabled')) {
      this.addButton.classList.add('button_disabled');
    }
  };
}
