import View from "./view.js";
import previewView from "./previewView.js";
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');

  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it 😀`;
  
  _message = '';

  render(data, render = true) {
    if (!this._parentElement) return;
    return super.render(data, render);
  }

  update(data) {
    if (!this._parentElement) return;
    return super.update(data);
  }

  addHandlerRender(handler) {
    if (!this._parentElement) return;
    window.addEventListener('load', handler);
  }

  _generateMarkup() {

    return this._data.map(bookmark => previewView.render(bookmark, false)).join('');

  }
}

export default new BookmarksView();