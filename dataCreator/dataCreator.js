const Resource = require('../models').Resource
const Reaction = require('../models').Reaction
const sequelize = require('../models').sequelize

const reactionData = {
  status: 'Me gusta',
  IdResource: '1'
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

async function seedAll () {
  await seedResources()
}

async function seedResources () {
  var asd = await Resource.create(resourceData)
  asd.addReaction(await Reaction.create(reactionData))
}

async function cleanTables () {
  await Object.values(sequelize.models).map(function (model) {
    return model.destroy({ truncate: true })
  })
}

exports.seedAll = seedAll
exports.cleanTables = cleanTables
