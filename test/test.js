const request = require('supertest')
const app = require('../app')
const expect = require('chai').expect

describe('GET /docs', () => {
  it('respond with 200', (done) => {
    request(app).get('/').expect('Richard', done)
  })
})

describe('GET /health', () => {
  it('respond with 200', (done) => {
    request(app).get('/health')
      .expect(response => {
        expect(response.statusCode).to.equal(200)
      })
      .end(done)
  })
})
