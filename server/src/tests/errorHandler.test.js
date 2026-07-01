const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');

const errorHandler = require('../middleware/errorHandler');

const createMockRes = () => {
  const res = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };

  return res;
};

test('maps Mongoose validation errors to a 400 response', () => {
  const err = new mongoose.Error.ValidationError();
  err.errors = {
    email: new mongoose.Error.ValidatorError({ path: 'email', message: 'Email is required' }),
  };

  const req = { method: 'POST', originalUrl: '/api/v1/users' };
  const res = createMockRes();

  errorHandler(err, req, res, () => {});

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.success, false);
  assert.equal(res.body.message, 'Validation failed');
});

test('maps duplicate key errors to a 409 response', () => {
  const err = new Error('duplicate key');
  err.code = 11000;
  err.name = 'MongoServerError';

  const req = { method: 'POST', originalUrl: '/api/v1/users' };
  const res = createMockRes();

  errorHandler(err, req, res, () => {});

  assert.equal(res.statusCode, 409);
  assert.equal(res.body.success, false);
  assert.equal(res.body.message, 'Resource already exists');
});
