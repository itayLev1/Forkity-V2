import test from 'node:test';
import assert from 'node:assert/strict';

globalThis.localStorage = {
  store: {},
  getItem(key) {
    return Object.prototype.hasOwnProperty.call(this.store, key) ? this.store[key] : null;
  },
  setItem(key, value) {
    this.store[key] = String(value);
  },
  clear() {
    this.store = {};
  },
};

const loadModel = async () => import('../js/model.js');

test('bookmark toggling keeps one copy and ignores unknown deletions', async () => {
  const { state, addBookmark, deleteBookmark, updateServings } = await loadModel();

  state.bookmarks.length = 0;
  state.recipe = { id: 'r1', bookmarked: false, servings: 2, ingredients: [{ quantity: 1 }, { quantity: 2 }] };

  const recipe = { id: 'r1', title: 'Test Recipe' };

  addBookmark(recipe);
  addBookmark(recipe);
  assert.equal(state.bookmarks.length, 1, 'duplicate bookmark should not be added');

  deleteBookmark('missing-id');
  assert.equal(state.bookmarks.length, 1, 'deleting an unknown bookmark should keep the list stable');

  deleteBookmark('r1');
  assert.equal(state.bookmarks.length, 0, 'bookmark should be removed once');
  assert.equal(state.recipe.bookmarked, false, 'recipe should no longer be marked as bookmarked');

  updateServings(4);
  assert.deepEqual(
    state.recipe.ingredients.map(ing => ing.quantity),
    [2, 4],
    'servings updates should scale ingredient quantities proportionally'
  );
  assert.equal(state.recipe.servings, 4, 'servings count should update to the new value');
});

test('search input trims whitespace before processing', async () => {
  const searchField = { value: '   veggie curry   ' };

  globalThis.document = {
    querySelector(selector) {
      if (selector === '.search') {
        return {
          querySelector(innerSelector) {
            if (innerSelector === '.search__field') return searchField;
            return null;
          },
        };
      }
      return null;
    },
  };

  const { default: searchView } = await import('../js/views/searchView.js');

  assert.equal(searchView.getQuery(), 'veggie curry', 'search text should be trimmed before being used');
  assert.equal(searchField.value, '', 'search input should be cleared after reading');
});
