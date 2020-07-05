const expect = require('chai').expect
const Resource = require('../models').Resource
const reactionService = require('../services/reactionService.js')
const dataCreator = require('../dataCreator/dataCreator.js')

describe('reactionService', () => {
  beforeEach('Seed data', async () => {
    await dataCreator.seedAll()
  })

  afterEach('clean data', async () => {
    await dataCreator.cleanTables()
  })

  context('reactToResource', () => {
    it('should return the reaction when reacting to a resource', async function () {
      const data = {
        status: 'Me gusta',
        owner: 'JP'
      }

      var resource = await Resource.create({ id: 'ID-RICHARD', name: 'RichardResource' })

      var reaction = await reactionService.reactToResource(resource, data)
      return expect(reaction.status).to.be.eql(data.status)
    })

    it('should asign the reaction to the resource', async function () {
      const data = {
        status: 'Me gusta',
        owner: 'JP'
      }

      var resource = await Resource.create({ id: 'ID-RICHARD', name: 'RichardResource' })

      var reaction = await reactionService.reactToResource(resource, data)

      var reactionOfResource = (await resource.getReactions({ where: { id: reaction.id } }))[0]

      return expect(reactionOfResource).not.to.be.null
    })

    it('should update the last reaction if exists', async function () {
      const data = {
        status: 'No me gusta',
        owner: 'RICHARD'
      }

      var resource = await Resource.findOne({
        where: {
          id: '1'
        }
      })

      await reactionService.reactToResource(resource, data)

      await resource.reload()

      expect((await resource.getReactions())[0].status).to.eql('No me gusta')

      return expect(await resource.getReactions()).to.have.lengthOf(1)
    })
  })

  context('getReactionsInformation', async () => {
    it('Should append count and user specific reaction', async () => {
      var result = await reactionService.getReactionsInformation('1', 'RICHARD')
      expect(result.likes).to.eql(1)
      expect(result.dislikes).to.eql(0)
      return expect(result.userReaction.status).to.eql('Me gusta')
    })

    it('Should return null in user specific reaction', async () => {
      var result = await reactionService.getReactionsInformation('1')
      return expect(result.userReaction).to.be.null
    })
  })
})
