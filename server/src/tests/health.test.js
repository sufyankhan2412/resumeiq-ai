const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');

const app = require('../app');

test('GET /api/v1/health returns runtime diagnostics', async () => {
  const server = http.createServer(app);

  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/v1/health`);
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.success, true);
    assert.equal(body.data.status, 'ok');
    assert.ok(body.data.uptime);
    assert.ok(body.data.nodeVersion);
    assert.ok(body.data.memoryUsage);
    assert.ok(body.data.environment);
    assert.ok(body.data.timestamp);
  } finally {
    await new Promise((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  }
});
