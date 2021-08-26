import FormController from './FormController';

export default class Controller {
  constructor(root) {
    this.root = root;
    this.formController = new FormController(root);
  }
}
