const expect = require('chai').expect
const reactionRepository = require('../repositories/reactionRepository.js')
const dataCreator = require('../dataCreator/dataCreator.js')

describe('reactionRepository', () => {
  beforeEach('Generate Test Data', async () => {
    await dataCreator.seedAll()
  })

  afterEach('Generate Test Data', async () => {
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

  it('should get the count of reactions types by resource', async function () {
    var reactionsCount = await reactionRepository.countReactionsForResourceId('1')
    expect(reactionsCount.likes).to.be.an('number')
    expect(reactionsCount.dislikes).to.be.an('number')
    expect(reactionsCount.likes).to.eql(1)
    return expect(reactionsCount.dislikes).to.eql(0)
  })

  it('should get the reaction of a user to specific resource', async function () {
    var reaction = await reactionRepository.getOwnerReactionToResource('1', 'RICHARD')
    return expect(reaction.status).to.eql('Me gusta')
  })
})
