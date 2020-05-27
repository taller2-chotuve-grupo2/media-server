const Resource = require('../models').Resource
const sequelize = require('../models').sequelize

const resourceData = {
  id: '1',
  name: 'My first name',
  path: 'www.richard.com',
  size: '1MB',
  owner: 'RICHARDINHO',
  title: 'RICHARD VIDEO',
  description: 'A description',
  location: 'Argentina',
  visibility: 'Public'
}

async function seedAll () {
  await seedResources()
}

async function seedResources () {
  await Resource.upsert(resourceData)
}

async function cleanTables () {
  await Object.values(sequelize.models).map(function (model) {
    return model.destroy({ truncate: true })
  })
}

exports.seedAll = seedAll
exports.cleanTables = cleanTables
