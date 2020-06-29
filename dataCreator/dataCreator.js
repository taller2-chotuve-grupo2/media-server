const Resource = require('../models').Resource
const Reaction = require('../models').Reaction
const Comment = require('../models').Comment
const sequelize = require('../models').sequelize

const reactionData = {
  status: 'Me gusta',
  IdResource: '1'
}

const commentData = {
  message: 'Buen video Richard!'
}

const resourceData = {
  id: '1',
  name: 'My first name',
  path: 'www.richard.com',
  size: '1MB',
  owner: 'RICHARDINHO',
  title: 'RICHARD VIDEO',
  description: 'A description',
  location: 'Argentina',
  visibility: 'Public',
  reactions: [reactionData]
}

const anotherResourceData = {
  id: '1827897', // hay tests que preguntan por el id 2 -> no es conveniente
  name: 'My second name',
  path: 'www.richard.com',
  size: '1MB',
  owner: 'RICHARDINHO',
  title: 'RICHARD SECOND VIDEO',
  description: 'A description for this second video',
  location: 'Argentina',
  visibility: 'Public'
}

async function seedAll () {
  await seedResources()
}

async function seedResources () {
  // Primer recurso con comentarios y reacciones
  var asd = await Resource.create(resourceData)
  asd.addReaction(await Reaction.create(reactionData))
  asd.addComment(await Comment.create(commentData))

  // Segundo recurso sin nada
  await Resource.create(anotherResourceData)
}

async function cleanTables () {
  await Object.values(sequelize.models).map(function (model) {
    return model.destroy({ truncate: true })
  })
}

exports.seedAll = seedAll
exports.cleanTables = cleanTables
