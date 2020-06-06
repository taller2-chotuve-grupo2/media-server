const request = require('supertest')
const app = require('../../app')
const config = require('../../config')
const expect = require('chai').expect
const dataCreator = require('../../dataCreator/dataCreator.js')
// const resourceRepository = require('../../repositories/resourceRepository.js')

describe('End-to-End tests', () => {
  // Populate data for End-To-End tests only
  context('GET /resource', () => {
    beforeEach('Generate Test Data', async () => {
      await dataCreator.seedAll()
    })

    afterEach('Generate Test Data', async () => {
      await dataCreator.cleanTables()
    })

    context('With invalid token', () => {
      it('No auth token should return unauthorized', async () => {
        const response = await request(app).get('/resource')
        expect(response.statusCode).to.equal(401)
      })

      it('Invalid auth token should return unauthorized', async () => {
        const response = await request(app).get('/resource')
          .set('authorization', 'invalid token')
        expect(response.statusCode).to.equal(401)
      })
    })

    context('With valid auth token', () => {
      it('respond with 200 if resources found', async () => {
        const response = await request(app).get('/resource').set('authorization', config.common.token)
        expect(response.statusCode).to.equal(200)
        const resources = response.body
        expect(resources.length).to.be.greaterThan(0)
      })
    })
  })

  context('GET /resource/{id}', () => {
    beforeEach('Generate Test Data', async () => {
      await dataCreator.seedAll()
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
          })
          .end(done)
      })

      it('should give the resource if found', (done) => {
        request(app).get('/resource/1').set('authorization', config.common.token)
          .end((req, res) => {
            const resourceId = res.body.id
            expect(resourceId).to.be.eql('1')
            done()
          })
      })
    })
  })

  context('POST /resource ', () => {
    beforeEach('Generate Test Data', async () => {
      await dataCreator.seedAll()
    })
    const data = {
      id: '100',
      name: 'My first name',
      path: 'www.richard.com',
      size: '1MB',
      owner: 'RICHARDINHO',
      title: 'A resource title',
      description: 'A resource description',
      location: 'Argentina',
      visibility: 'Public'
    }

    it('respond with 200 if post succeeded', (done) => {
      request(app).post('/resource').set('authorization', config.common.token)
        .send(data)
        .expect(response => {
          expect(response.statusCode).to.equal(200)
        })
        .end(done)
    })

    it('respond with resource id if post succeeded', (done) => {
      request(app).post('/resource').set('authorization', config.common.token)
        .send(data)
        .expect(response => {
          expect(response.body.id).to.equal(data.id)
        })
        .end(done)
    })

    it('respond with 400 if post failed', (done) => {
      // dataCreator is seeding a resource with this title
      const failingData = {
        title: 'RICHARD VIDEO'
      }
      request(app).post('/resource').set('authorization', config.common.token)
        .send(failingData)
        .expect(response => {
          expect(response.statusCode).to.equal(400)
        })
        .end(done)
    })
  })

  context('POST /resource/{id}/reaction', () => {
    beforeEach('Generate Test Data', async () => {
      await dataCreator.seedAll()
    })
    it('respond with 200 if post succedeed', (done) => {
      const data = {
        status: 'Me gusta'
      }
      request(app).post('/resource/1/reaction').set('authorization', config.common.token)
        .send(data)
        .expect(response => {
          expect(response.statusCode).to.equal(200)
        })
        .end(done)
    })

    it('respond with 400 if resource does not exists', (done) => {
      const data = {
        status: 'Me gusta'
      }
      request(app).post('/resource/2/reaction').set('authorization', config.common.token)
        .send(data)
        .expect(response => {
          expect(response.statusCode).to.equal(400)
        })
        .end(done)
    })
  })

  context('GET /resource/{id}/reaction', () => {
    beforeEach('Generate Test Data', async () => {
      await dataCreator.seedAll()
    })
    it('respond with 200 if get succedeed', async () => {
      const response = await request(app).get('/resource/1/reaction').set('authorization', config.common.token)
      expect(response.statusCode).to.equal(200)
    })

    it('respond with a list of reactions in the body', async () => {
      const response = await request(app).get('/resource/1/reaction').set('authorization', config.common.token)
      return expect(response.body[0]).not.to.be.null
    })
  })

  context('POST /resource/{id}/comment', () => {
    beforeEach('Generate Test Data', async () => {
      await dataCreator.seedAll()
    })
    it('respond with 200 if post succedeed', (done) => {
      const data = {
        message: 'Me gusta tu video'
      }
      request(app).post('/resource/1/comment').set('authorization', config.common.token)
        .send(data)
        .expect(response => {
          expect(response.statusCode).to.equal(200)
        })
        .end(done)
    })

    it('respond with 400 if resource does not exists', (done) => {
      const data = {
        message: 'Me gusta'
      }
      request(app).post('/resource/2/comment').set('authorization', config.common.token)
        .send(data)
        .expect(response => {
          expect(response.statusCode).to.equal(400)
        })
        .end(done)
    })
  })

  context('GET /resource/{id}/comment', () => {
    beforeEach('Generate Test Data', async () => {
      await dataCreator.seedAll()
    })
    it('respond with 200 if get succedeed', (done) => {
      request(app).get('/resource/1/comment').set('authorization', config.common.token)
        .expect(response => {
          expect(response.statusCode).to.equal(200)
        })
        .end(done)
    })

    it('respond with 400 if resource does not exist', (done) => {
      request(app).get('/resource/2/comment').set('authorization', config.common.token)
        .expect(response => {
          expect(response.statusCode).to.equal(400)
        })
        .end(done)
    })

    it('respond with a list of comments in the body', (done) => {
      request(app).get('/resource/1/comment').set('authorization', config.common.token)
        .expect(response => {
          return expect(response.body[0].message).to.be.eql('Buen video Richard!')
        })
        .end(done)
    })
  })
})
