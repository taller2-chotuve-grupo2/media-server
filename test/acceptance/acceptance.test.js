const request = require('supertest')
const app = require('../../app')
// const config = require('../../config')
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

  //   context('With valid auth token', () => {
  //     it('respond with 404 if no resources found', (done) => {
  //         request(app).get('/resource/notvalid').set('authorization', config.authToken)
  //         .expect(response => {
  //           expect(response.statusCode).to.equal(404)
  //         })
  //         .end(done)
  //     })

//     it('respond with 200 if resources found', (done) => {
//         request(app).get('/resource/1').set('authorization', config.authToken)
//         .expect(response => {
//           expect(response.statusCode).to.equal(200)
//           // expect(response.body.message).to.contain(messageExpected)
//         })
//         .end(done)
//     })
//   })
})
