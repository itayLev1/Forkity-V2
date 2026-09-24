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

const mockUserPayload = { id: 'user-123', email: 'demo@example.com', name: 'Demo User' };

globalThis.fetch = async (url, options = {}) => {
  if (url.endsWith('/users') && (options.method || 'GET') === 'POST') {
    return {
      ok: true,
      json: async () => mockUserPayload,
    };
  }

  if (url.includes('/users/') && (options.method || 'GET') === 'GET') {
    return {
      ok: true,
      json: async () => [],
    };
  }

  return {
    ok: true,
    json: async () => ({})
  };
};

const loadModel = async () => import('../js/model.js');

test('initializeUser creates and persists a demo user once', async () => {
  const { state, initializeUser } = await loadModel();

  state.user = null;
  localStorage.clear();

  const firstUser = await initializeUser();
  const secondUser = await initializeUser();

  assert.equal(firstUser.id, 'user-123');
  assert.equal(secondUser.id, 'user-123');
  assert.equal(JSON.parse(localStorage.getItem('forkity-user')).id, 'user-123');
});
