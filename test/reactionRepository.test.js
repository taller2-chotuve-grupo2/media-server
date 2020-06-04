const expect = require('chai').expect
const reactionRepository = require('../repositories/reactionRepository.js')
const dataCreator = require('../dataCreator/dataCreator.js')

describe('reactionRepository', () => {
  beforeEach('Generate Test Data', async () => {
    await dataCreator.cleanTables()
  })

  it('should create a reaction', async function () {
    const data = {
      status: 'Me gusta'
    }

    var reaction = await reactionRepository.createReaction(data)
    return expect(reaction).not.to.be.null
  })

  it('should get a reaction by id', async function () {
    const data = {
      status: 'Me gusta'
    }

    var reactionCreated = await reactionRepository.createReaction(data)
    var reactionGet = await reactionRepository.getOneById(reactionCreated.id)
    return expect(reactionCreated.id).to.be.eql(reactionGet.id)
  })
})
