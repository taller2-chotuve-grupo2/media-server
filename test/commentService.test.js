const expect = require('chai').expect
const Resource = require('../models').Resource
const commentService = require('../services/commentService.js')
const dataCreator = require('../dataCreator/dataCreator.js')

describe('commentService', () => {
  afterEach('clean data', async () => {
    await dataCreator.cleanTables()
  })

  context('commentResource', () => {
    it('should return the comment when commenting a resource', async function () {
      const data = {
        message: 'Buen video Richard!'
      }

      var resource = await Resource.create({ id: 'ID-RICHARD', name: 'RichardResource' })

      var comment = await commentService.commentResource(resource, data)
      return expect(comment.message).to.be.eql(data.message)
    })

    it('should assign the comment to the resource', async function () {
      const data = {
        message: 'Buen video Richard!'
      }

      var resource = await Resource.create({ id: 'ID-RICHARD', name: 'RichardResource' })

      var comment = await commentService.commentResource(resource, data)

      var commentOfResource = (await resource.getComments({ where: { id: comment.id } }))[0]

      return expect(commentOfResource).not.to.be.null
    })

    it('should assign the resource to the comment', async function () {
      const data = {
        id: '1',
        message: 'Buen video Richard!'
      }

      var resource = await Resource.create({ id: 'ID-RICHARD', name: 'RichardResource' })

      await commentService.commentResource(resource, data)

      var comment = await commentService.getCommentById('1')

      var resourceOfComment = (await comment.getResource())

      return expect(resourceOfComment.id).to.be.eql('ID-RICHARD')
    })
  })
})
