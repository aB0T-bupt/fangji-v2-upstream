import test from 'node:test'
import assert from 'node:assert/strict'

import { shouldClearAuthAfterRefreshError } from '../src/lib/authRefresh.js'

test('clears stored auth only when the server rejects the credentials', () => {
  assert.equal(shouldClearAuthAfterRefreshError({ status: 401 }), true)
  assert.equal(shouldClearAuthAfterRefreshError({ response: { status: 403 } }), true)
})

test('keeps stored auth for transient refresh failures', () => {
  assert.equal(shouldClearAuthAfterRefreshError(new TypeError('fetch failed')), false)
  assert.equal(shouldClearAuthAfterRefreshError({ status: 0 }), false)
  assert.equal(shouldClearAuthAfterRefreshError({ status: 429 }), false)
  assert.equal(shouldClearAuthAfterRefreshError({ status: 500 }), false)
  assert.equal(shouldClearAuthAfterRefreshError({ response: { status: 502 } }), false)
  assert.equal(shouldClearAuthAfterRefreshError({ response: { status: 503 } }), false)
})
