const expect = require('chai').expect
const commentRepository = require('../repositories/commentRepository.js')
const dataCreator = require('../dataCreator/dataCreator.js')

describe('commentRepository', () => {
  beforeEach('Generate Test Data', async () => {
    await dataCreator.cleanTables()
  })

  it('should create a comment', async function () {
    const data = {
      message: 'Un comentario para el resource'
    }

    var comment = await commentRepository.createComment(data)
    return expect(comment).not.to.be.null
  })

  it('should get a comment by id', async function () {
    const data = {
      status: 'un comentario'
    }

    var commentCreated = await commentRepository.createComment(data)
    var commentGet = await commentRepository.getOneById(commentCreated.id)
    return expect(commentCreated.id).to.be.eql(commentGet.id)
  })
})
