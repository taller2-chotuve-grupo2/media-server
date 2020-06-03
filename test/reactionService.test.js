const expect = require('chai').expect
const Resource = require('../models').Resource
const reactionService = require('../services/reactionService.js')
const dataCreator = require('../dataCreator/dataCreator.js')

describe('reactionService', () => {
  afterEach('clean data', async () => {
    await dataCreator.cleanTables()
  })

  context('reactToResource', () => {
    it('should return the reaction when reacting to a resource', async function () {
      const data = {
        status: 'Me gusta'
      }

      var resource = await Resource.create({ id: 'ID-RICHARD', name: 'RichardResource' })

      var reaction = await reactionService.reactToResource(resource, data)
      return expect(reaction.status).to.be.eql(data.status)
    })

    it('should asign the reaction to the resource', async function () {
      const data = {
        status: 'Me gusta'
      }

      var resource = await Resource.create({ id: 'ID-RICHARD', name: 'RichardResource' })

      var reaction = await reactionService.reactToResource(resource, data)

      var reactionOfResource = (await resource.getReactions({ where: { id: reaction.id } }))[0]

      return expect(reactionOfResource).not.to.be.null
    })

    it('should asign the resource to the reaction', async function () {
      const data = {
        status: 'Me gusta'
      }

      var resource = await Resource.create({ id: 'ID-RICHARD', name: 'RichardResource' })

      var reaction = await reactionService.reactToResource(resource, data)

      var resourceOfReaction = (await reaction.getResource())

      return expect(resourceOfReaction).not.to.be.null
    })
  })
})
