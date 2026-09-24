// import { log10 } from "core-js/core/number";
import View from "./view.js";
import { handleUploadSubmit } from '../utils/uploadGuard.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :-)'
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super()
      this.addHandlerShowWindow();
      this.addHandlerHideWindow()
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  uploadRecipe
  
  addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this))
  }

  
  addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this))
    this._overlay.addEventListener('click', this.toggleWindow.bind(this))
  }
  
  addHandlerUpload(handler) {
    return handleUploadSubmit(handler, this._parentElement);
  }
  
  generateMarkup() {
    
  }
}

export default new AddRecipeView();