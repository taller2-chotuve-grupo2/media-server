const request = require('supertest')
const app = require('../../app')
const config = require('../../config')
const expect = require('chai').expect
// const dataCreator = require('../../dataCreator')

describe('GET /resource', () => {
  beforeEach('Generate Test Data', async () => {
    // await dataCreator.seedAll()
  })

  afterEach('clean data', async () => {
    // await dataCreator.cleanTables()
  })

  context('With invalid token', () => {
    const baseRequest = request(app).get('/resource/23')

    it('No auth token should return unauthorized', (done) => {
      baseRequest
        .expect(response => {
          expect(response.statusCode).to.equal(401)
        })
        .end(done)
    })

    it('Invalid auth token should return unauthorized', (done) => {
      request(app).get('/resource/23')
        .set('authorization', 'invalid token')
        .expect(response => {
          expect(response.statusCode).to.equal(401)
        })
        .end(done)
    })
  })

  context('With valid auth token', () => {
    it('respond with 404 if no resources found', (done) => {
      request(app).get('/resource/notvalid').set('authorization', config.common.token)
        .expect(response => {
          expect(response.statusCode).to.equal(404)
        })
        .end(done)
    })

    it('respond with 200 if resources found', (done) => {
      request(app).get('/resource/1').set('authorization', config.common.token)
        .expect(response => {
          expect(response.statusCode).to.equal(200)
          // expect(response.body.message).to.contain(messageExpected)
        })
        .end(done)
    })
  })

  context('POST /resource ', () => {
    it('respond with 200 if post succeeded', (done) => {
      const data = {
        name: 'My first name',
        path: 'www.richard.com',
        size: '1MB',
        owner: 'RICHARDINHO',
        title: 'A resource title',
        description: 'A resource description',
        location: 'Argentina',
        visibility: 'Public'
      }
      request(app).post('/resource').set('authorization', config.common.token)
        .send(data)
        .expect(response => {
          expect(response.statusCode).to.equal(200)
        })
        .end(done)
    })

    it('respond with 200 if resources found', (done) => {
      request(app).get('/resource/1').set('authorization', config.common.token)
        .expect(response => {
          expect(response.statusCode).to.equal(200)
          // expect(response.body.message).to.contain(messageExpected)
        })
        .end(done)
    })
  })
})
