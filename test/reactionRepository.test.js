const expect = require('chai').expect
const reactionRepository = require('../repositories/reactionRepository.js')

describe('reactionRepository', () => {
  it('should create a reaction', async function () {
    const data = {
      status: 'Me gusta'
    }

    var reaction = await reactionRepository.createReaction(data)
    return expect(reaction.id).to.be.eql(1)
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
