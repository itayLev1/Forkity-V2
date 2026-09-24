import test from 'node:test';
import assert from 'node:assert/strict';

import { handleUploadSubmit } from '../js/utils/uploadGuard.js';

test('handleUploadSubmit ignores missing handlers without throwing', () => {
  const form = {
    addEventListener(event, callback) {
      if (event === 'submit') {
        assert.doesNotThrow(() => callback.call(form, { preventDefault() {} }));
      }
    },
  };

  assert.doesNotThrow(() => handleUploadSubmit(undefined, form));
});
